const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../model/user");

// Authenticate User
exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  let token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");
  console.log("Received Token:", token); // Debugging

  if (!token) {
    return next(new ErrorHandler("Please login to continue", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return next(new ErrorHandler("User not found", 404));
    }

    next();
  } catch (error) {
    return next(new ErrorHandler("Invalid token, authorization denied", 401));
  }
});



//Agent auth middleware
// Agent Authorization Middleware
exports.isAgent = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please login as an agent!", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  req.user = await User.findById(decoded.id);

  if (!req.user || req.user.role !== "agent") {
    return next(new ErrorHandler("Access denied! Agent role required.", 403));
  }

  next();
});


// Admin Authorization Middleware
exports.isAdmin = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Access denied! ${req.user ? req.user.role : "Unauthorized user"} cannot access this resource.`,
          403
        )
      );
    }
    next();
  };
};


