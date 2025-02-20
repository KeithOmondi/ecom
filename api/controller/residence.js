const express = require("express");
const { isSeller, isAuthenticated, isAdmin, isAgent } = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const router = express.Router();
const Residence = require("../model/residence");
const Booking = require("../model/booking");
const Property = require("../model/property");
const cloudinary = require("cloudinary");
const ErrorHandler = require("../utils/ErrorHandler");

// Create residence
router.post(
  "/create-residence",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const propertyId = req.body.propertyId;
      const property = await Property.findById(propertyId);
      if (!property) {
        return next(new ErrorHandler("Property ID is invalid!", 400));
      } else {
        let images = [];

        if (typeof req.body.images === "string") {
          images.push(req.body.images);
        } else {
          images = req.body.images;
        }

        const imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
          const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "residences",
          });

          imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url,
          });
        }

        const residenceData = req.body;
        residenceData.images = imagesLinks;
        residenceData.property = property;

        const residence = await Residence.create(residenceData);

        res.status(201).json({
          success: true,
          residence,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// Get all residences of a property
router.get(
  "/get-all-residences-property/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const residences = await Residence.find({ propertyId: req.params.id });

      res.status(200).json({
        success: true,
        residences,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// Delete residence
router.delete(
  "/delete-property-residence/:id",
  isAgent,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const residence = await Residence.findById(req.params.id);

      if (!residence) {
        return next(new ErrorHandler("Residence not found with this ID", 404));
      }

      for (let i = 0; i < residence.images.length; i++) {
        await cloudinary.v2.uploader.destroy(residence.images[i].public_id);
      }

      await residence.remove();

      res.status(200).json({
        success: true,
        message: "Residence deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// Get all residences
router.get(
  "/get-all-residences",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const residences = await Residence.find().sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        residences,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// Review for a residence
router.put(
  "/create-new-review",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { user, rating, comment, residenceId, bookingId } = req.body;

      const residence = await Residence.findById(residenceId);

      const review = {
        user,
        rating,
        comment,
        residenceId,
      };

      const isReviewed = residence.reviews.find(
        (rev) => rev.user._id.toString() === req.user._id.toString()
      );

      if (isReviewed) {
        residence.reviews.forEach((rev) => {
          if (rev.user._id.toString() === req.user._id.toString()) {
            rev.rating = rating;
            rev.comment = comment;
            rev.user = user;
          }
        });
      } else {
        residence.reviews.push(review);
      }

      let avg = 0;
      residence.reviews.forEach((rev) => {
        avg += rev.rating;
      });

      residence.ratings = avg / residence.reviews.length;

      await residence.save({ validateBeforeSave: false });

      await Booking.findByIdAndUpdate(
        bookingId,
        { $set: { "listings.$[elem].isReviewed": true } },
        { arrayFilters: [{ "elem._id": residenceId }], new: true }
      );

      res.status(200).json({
        success: true,
        message: "Reviewed successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// Admin - Get all residences
router.get(
  "/admin-all-residences",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const residences = await Residence.find().sort({
        createdAt: -1,
      });
      res.status(200).json({
        success: true,
        residences,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
