const mongoose = require("mongoose");

// ========================================
// DELIVERY ADDRESS SCHEMA
// ========================================

const addressSchema = new mongoose.Schema(
  {
    houseNumber: {
      type: String,
      required: true,
      trim: true,
    },

    street: {
      type: String,
      required: true,
      trim: true,
    },

    area: {
      type: String,
      required: true,
      trim: true,
    },

    landmark: {
      type: String,
      default: "",
      trim: true,
    },

    pincode: {
      type: String,
      required: true,
      match: /^\d{6}$/,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    state: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false }
);

// ========================================
// ORDER SCHEMA
// ========================================

const orderSchema = new mongoose.Schema(
  {
    // Customer Details
    name: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      match: /^\d{10}$/,
    },

    // Product Details
    productName: {
      type: String,
      required: true,
      trim: true,
    },

    packs: {
      type: Number,
      default: 1,
      min: 1,
    },

    boxesPerPack: {
      type: Number,
      default: 2,
      min: 1,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    price: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Delivery Address
    address: {
      type: addressSchema,
      required: true,
    },

    // Payment
    payment: {
      type: String,
      required: true,
      default: "COD",
      enum: ["COD"],
    },

    // Order Status
    status: {
      type: String,
      enum: ["Pending", "Completed"],
      default: "Pending",
    },

    // Order Date
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = mongoose.model("Order", orderSchema);