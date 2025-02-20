const express = require("express");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Property = require("../model/property");
const Event = require("../model/event");
const ErrorHandler = require("../utils/ErrorHandler");
const { isSeller, isAdmin, isAuthenticated } = require("../middleware/auth");
const router = express.Router();
const cloudinary = require("cloudinary");

// Create Event
router.post(
  "/create-event",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { propertyId, images } = req.body;

      const property = await Property.findById(propertyId);
      if (!property) {
        return next(new ErrorHandler("Invalid Property ID!", 400));
      }

      let imageArray = Array.isArray(images) ? images : [images];
      const imageLinks = [];

      for (const image of imageArray) {
        const result = await cloudinary.v2.uploader.upload(image, {
          folder: "events",
        });

        imageLinks.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }

      const eventData = { ...req.body, images: imageLinks, property };
      const event = await Event.create(eventData);

      res.status(201).json({
        success: true,
        event,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Get All Events
router.get(
  "/get-all-events",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const events = await Event.find();
      res.status(200).json({
        success: true,
        events,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Get All Events of a Property
router.get(
  "/get-all-events/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const events = await Event.find({ propertyId: req.params.id });
      res.status(200).json({
        success: true,
        events,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Delete Event of a Property
router.delete(
  "/delete-property-event/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const event = await Event.findById(req.params.id);

      if (!event) {
        return next(new ErrorHandler("Event not found with this ID", 404));
      }

      // Delete images from Cloudinary
      for (const img of event.images) {
        await cloudinary.v2.uploader.destroy(img.public_id);
      }

      await event.deleteOne();

      res.status(200).json({
        success: true,
        message: "Event deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Get All Events for Admin
router.get(
  "/admin-all-events",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const events = await Event.find().sort({ createdAt: -1 });
      res.status(200).json({
        success: true,
        events,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
