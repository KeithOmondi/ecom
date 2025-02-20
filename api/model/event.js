const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your event property name!"],
    },
    description: {
        type: String,
        required: [true, "Please enter your event property description!"],
    },
    category: {
        type: String,
        required: [true, "Please enter your event property category!"],
    },
    start_Date: {
        type: Date,
        required: [true, "Please enter the event start date!"],
    },
    finish_Date: {
        type: Date,
        required: [true, "Please enter the event finish date!"],
    },
    status: {
        type: String,
        default: "Running",
    },
    tags: {
        type: String,
    },
    originalPrice: {
        type: Number,
    },
    discountPrice: {
        type: Number,
        required: [true, "Please enter your event property price!"],
    },
    stock: {
        type: Number,
        required: [true, "Please enter your event property stock!"],
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
    propertyId: {
        type: String,
        required: [true, "Property ID is required!"],
    },
    property: {
        type: Object,
        required: [true, "Property details are required!"],
    },
    sold_out: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Event", eventSchema);
