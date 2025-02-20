const express = require("express");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { isAuthenticated, isSeller, isAdmin, isAgent } = require("../middleware/auth");
const Booking = require("../model/booking")
const Property = require("../model/property")

// create new booking
router.post(
  "/create-booking",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { cart, bookingAddress, user, totalPrice, paymentInfo } = req.body;

      // Group cart items by propertyId
      const propertyItemsMap = new Map();

      for (const item of cart) {
        const propertyId = item.propertyId;
        if (!propertyItemsMap.has(propertyId)) {
          propertyItemsMap.set(propertyId, []);
        }
        propertyItemsMap.get(propertyId).push(item);
      }

      // Create a booking for each property
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
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get all bookings of user
router.get(
  "/get-all-bookings/:userId",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const bookings = await Booking.find({ "user._id": req.params.userId }).sort({
        createdAt: -1,
      });

      res.status(200).json({
        success: true,
        bookings,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get all bookings of property owner
router.get(
  "/get-property-all-bookings/:propertyId",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const bookings = await Booking.find({
        "cart.propertyId": req.params.propertyId,
      }).sort({
        createdAt: -1,
      });

      res.status(200).json({
        success: true,
        bookings,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update booking status for property owner
router.put(
  "/update-booking-status/:id",
  isAgent,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const booking = await Booking.findById(req.params.id);

      if (!booking) {
        return next(new ErrorHandler("Booking not found with this id", 400));
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
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// request a refund ---- user
router.put(
  "/booking-refund/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const booking = await Booking.findById(req.params.id);

      if (!booking) {
        return next(new ErrorHandler("Booking not found with this id", 400));
      }

      booking.status = req.body.status;

      await booking.save({ validateBeforeSave: false });

      res.status(200).json({
        success: true,
        booking,
        message: "Booking Refund Request successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// accept the refund ---- property owner
router.put(
  "/booking-refund-success/:id",
  isAgent,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const booking = await Booking.findById(req.params.id);

      if (!booking) {
        return next(new ErrorHandler("Booking not found with this id", 400));
      }

      booking.status = req.body.status;

      await booking.save();

      res.status(200).json({
        success: true,
        message: "Booking Refund successful!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// all bookings --- for admin
router.get(
  "/admin-all-bookings",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const bookings = await Booking.find().sort({
        confirmedAt: -1,
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        bookings,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
