const express = require("express");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { isAuthenticated, isSeller, isAdmin, isAgent } = require("../middleware/auth");
const Booking = require("../model/booking");

// Create new booking
router.post(
  "/create-booking",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { cart, bookingAddress, user, totalPrice, paymentInfo } = req.body;

      const propertyItemsMap = new Map();

      for (const item of cart) {
        const propertyId = item.propertyId;
        if (!propertyItemsMap.has(propertyId)) {
          propertyItemsMap.set(propertyId, []);
        }
        propertyItemsMap.get(propertyId).push(item);
      }

      const bookings = [];

      for (const [propertyId, items] of propertyItemsMap) {
        const booking = await Booking.create({
          cart: items,
          bookingAddress,
          user,
          totalPrice,
          paymentInfo,
        });
        bookings.push(booking);
      }

      res.status(201).json({
        success: true,
        bookings,
      });
    } catch (error) {
      next(new ErrorHandler(error.message, 500));
    }
  })
);

// Get all bookings of a user
router.get(
  "/get-all-bookings/:userId",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const bookings = await Booking.find({ "user._id": req.params.userId }).sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        bookings,
      });
    } catch (error) {
      next(new ErrorHandler(error.message, 500));
    }
  })
);

// Get all bookings for a property
router.get(
  "/get-property-all-bookings/:propertyId",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const bookings = await Booking.find({ "cart.propertyId": req.params.propertyId }).sort({
        createdAt: -1,
      });

      res.status(200).json({
        success: true,
        bookings,
      });
    } catch (error) {
      next(new ErrorHandler(error.message, 500));
    }
  })
);

// Update booking status (for property owner/agent)
router.put(
  "/update-booking-status/:id",
  isAgent,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const booking = await Booking.findById(req.params.id);

      if (!booking) {
        return next(new ErrorHandler("Booking not found with this ID", 404));
      }

      booking.status = req.body.status;

      if (req.body.status === "Confirmed") {
        booking.confirmedAt = Date.now();
        booking.paymentInfo.status = "Succeeded";
      }

      await booking.save({ validateBeforeSave: false });

      res.status(200).json({
        success: true,
        booking,
      });
    } catch (error) {
      next(new ErrorHandler(error.message, 500));
    }
  })
);

// Request a refund (user)
router.put(
  "/booking-refund/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const booking = await Booking.findById(req.params.id);

      if (!booking) {
        return next(new ErrorHandler("Booking not found with this ID", 404));
      }

      booking.status = req.body.status;
      await booking.save({ validateBeforeSave: false });

      res.status(200).json({
        success: true,
        booking,
        message: "Booking refund request submitted successfully!",
      });
    } catch (error) {
      next(new ErrorHandler(error.message, 500));
    }
  })
);

// Approve refund (property owner/agent)
router.put(
  "/booking-refund-success/:id",
  isAgent,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const booking = await Booking.findById(req.params.id);

      if (!booking) {
        return next(new ErrorHandler("Booking not found with this ID", 404));
      }

      booking.status = req.body.status;
      await booking.save();

      res.status(200).json({
        success: true,
        message: "Booking refund approved successfully!",
      });
    } catch (error) {
      next(new ErrorHandler(error.message, 500));
    }
  })
);

// Get all bookings (Admin)
router.get(
  "/admin-all-bookings",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const bookings = await Booking.find().sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        bookings,
      });
    } catch (error) {
      next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
