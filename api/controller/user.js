const express = require("express");
const User = require("../model/user");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const sendToken = require("../utils/jwtToken");
const { isAuthenticated, isAdmin } = require("../middleware/auth");
const { sendResetPasswordEmail } = require("../utils/mailer");
const bcrypt = require("bcryptjs");
require("dotenv").config();

//create user
router.post("/create-user", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists based on email
    const userEmail = await User.findOne({ email }); // Use findOne instead of findById

    if (userEmail) {
      return next(new ErrorHandler("User already exists", 400)); // Provide a 400 status for this error
    }

    const user = {
      name: name,
      email: email,
      password: password, // Make sure to hash the password before saving to DB
    };

    // Create an activation token (make sure the function is defined elsewhere)
    const activationToken = createActivationToken(user);

    const activationUrl = `http://localhost:5173/activation/${activationToken}`; // Fixed URL

    try {
      await sendMail({
        email: user.email,
        subject: "Activation Email",
        message: `Hello ${user.email}, please click the link below to activate your account: ${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `Please check your email: ${user.email}, to activate your account.`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

//create activation token
const createActivationToken = (user) => {
  // Set token expiration to 1 hour for example
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "1h", // Token expires in 1 hour
  });
};

// activate user
router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activation_token } = req.body;

      const newUser = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );

      if (!newUser) {
        return next(new ErrorHandler("Invalid or expired token", 400));
      }
      const { name, email, password } = newUser;

      let user = await User.findOne({ email });

      if (user) {
        return next(new ErrorHandler("User already exists", 400));
      }
      user = await User.create({
        name,
        email,
        password,
      });

      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//login user
// Example: Express Backend Login Route
router.post("/login-user", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await user.comparePasswords(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = user.getJwtToken();

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//load user
router.get(
  "/getuser",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);

      if (!user) {
        return next(new ErrorHandler("User doesn't exist", 400));
      }
      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Get all users (Admin only)
router.get(
  "/getallusers",
  isAuthenticated,
  isAdmin, // Make sure only admins can access this route
  catchAsyncErrors(async (req, res, next) => {
    try {
      // Fetch all users from the database, excluding the admin if needed
      const users = await User.find(); // You can add filters to exclude certain roles if needed (e.g., excluding admin)

      res.status(200).json({
        success: true,
        users, // Send back the list of users
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500)); // Return error message if something goes wrong
    }
  })
);

// Forgot Password Route
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a reset token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    // Create a password reset URL
    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;

    // Send email to user with reset link
    await sendResetPasswordEmail(user.email, resetLink);

    res.status(200).json({ message: "Password reset link sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Reset Password Route
router.post("/reset-password", async (req, res) => {
  const { token, password } = req.body; // Ensure 'token' is sent in the body

  try {
    // Check if token exists
    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userId = decoded.userId;

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password has been reset successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// update user info
router.put(
  "/update-user-info",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password, phoneNumber, name } = req.body;

      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        return next(new ErrorHandler("User not found", 400));
      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return next(
          new ErrorHandler("Please provide the correct information", 400)
        );
      }

      user.name = name;
      user.email = email;
      user.phoneNumber = phoneNumber;

      await user.save();

      res.status(201).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// log out user
router.get(
  "/logout",
  catchAsyncErrors(async (req, res, next) => {
    try {
      res.clearCookie("token", {
        httpOnly: true,
        sameSite: "None",
        secure: process.env.NODE_ENV === "production",
      });

      res.status(200).json({
        success: true,
        message: "Logout successful!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);




// Environment Variables
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;
const JWT_SECRET = process.env.JWT_SECRET;

// Check if env variables are loaded correctly
if (!ADMIN_EMAIL || !ADMIN_PASSWORD || !ADMIN_PASSWORD_HASH || !JWT_SECRET) {
  console.error("Error: Missing required environment variables!");
  process.exit(1); // Exit server if critical env variables are missing
}

// Function to create an admin account
const createAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({ email: ADMIN_EMAIL });

    if (!existingAdmin) {
      console.log("Admin does not exist. Creating new admin...");

      // Hash the admin password before saving
      const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);
      const adminUser = new User({
        name: "Admin",
        email: ADMIN_EMAIL,
        password: hashedPassword,
        role: "admin", // Ensure role exists in the User schema
      });

      await adminUser.save();
      console.log("✅ Admin account created successfully!");
    } else {
      console.log("ℹ️ Admin already exists.");
    }
  } catch (error) {
    console.error("❌ Error creating admin:", error);
  }
};

// Run the script
createAdmin();

// Admin Login Route
router.post("/login-admin", async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("📩 Incoming login request:", { email });

    // Validate email and password
    if (!email || !password) {
      console.error("⚠️ Validation error: Missing email or password");
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    // Check if email matches the admin email
    if (email !== ADMIN_EMAIL) {
      console.error("❌ Authentication error: Invalid email");
      return res.status(401).json({ message: "Invalid admin credentials." });
    }

    // Check if ADMIN_PASSWORD_HASH is correctly loaded
    if (!ADMIN_PASSWORD_HASH) {
      console.error("⚠️ Error: ADMIN_PASSWORD_HASH is missing in .env");
      return res
        .status(500)
        .json({
          message: "Server configuration error. Please check .env file.",
        });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);

    if (!isMatch) {
      console.error("❌ Authentication error: Incorrect password");
      return res.status(401).json({ message: "Invalid admin credentials." });
    }

    // Generate JWT token
    const token = jwt.sign({ role: "admin" }, JWT_SECRET, { expiresIn: "2h" });

    console.log("✅ Login successful for:", email);
    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error("❌ Server error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/admin-dashboard", isAuthenticated, isAdmin, (req, res) => {
  res.status(200).json({ message: "Welcome Admin!" });
});

// 3️⃣ Change Admin Password (Protected)
router.put(
  "/change-password",
  isAuthenticated,
  isAdmin("admin"),
  async (req, res) => {
    try {
      const { oldPassword, newPassword } = req.body;
      const admin = await User.findById(req.user.id).select("+password");

      if (!admin) return res.status(404).json({ message: "Admin not found" });

      const isMatch = await bcrypt.compare(oldPassword, admin.password);
      if (!isMatch)
        return res.status(400).json({ message: "Incorrect old password" });

      admin.password = await bcrypt.hash(newPassword, 10);
      await admin.save();

      res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  }
);

module.exports = router;
