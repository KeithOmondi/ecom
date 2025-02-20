const mongoose = require("mongoose");

const residenceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter the residence name!"],
  },
  description: {
    type: String,
    required: [true, "Please enter the residence description!"],
  },
  category: {
    type: String,
    required: [true, "Please enter the residence category!"],
  },
  tags: {
    type: String,
  },
  originalPrice: {
    type: Number,
  },
  discountPrice: {
    type: Number,
    required: [true, "Please enter the residence price!"],
  },
  stock: {
    type: Number,
    required: [true, "Please enter the residence stock!"],
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  reviews: [
    {
      user: {
        type: Object,
      },
      rating: {
        type: Number,
      },
      comment: {
        type: String,
      },
      residenceId: {
        type: String,
      },
      createdAt: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  ratings: {
    type: Number,
  },
  propertyId: {
    type: String,
    required: true,
  },
  property: {
    type: Object,
    required: true,
  },
  sold_out: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Residence", residenceSchema);
