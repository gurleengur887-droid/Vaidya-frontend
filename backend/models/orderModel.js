const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  productName: {
    type: String,
    required: true
  },

  quantity: {
    type: Number,
    required: true,
    default: 1
  },

  address: {
    type: String,
    required: true
  },

  phone: {
    type: String,
    required: true
  },

  payment: {
    type: String,
    required: true,
    default: "COD"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Order", orderSchema);