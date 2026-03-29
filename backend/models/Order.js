
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  productName: {
    type: String,
    required: true
  },

  quantity: {
    type: Number,
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
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Order", orderSchema);