const express = require("express");
const User = require("../model/user");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const sendToken = require("../utils/jwtToken");
const { isAuthenticated, isAdmin } = require("../middleware/auth");

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
    expiresIn: "1h",  // Token expires in 1 hour
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

module.exports = router;
