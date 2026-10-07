
const express = require("express");
const Order = require("../models/orderModel");

const router = express.Router();

// CREATE ORDER
router.post("/create", async (req, res) => {
  try {
    console.log("ORDER RECEIVED:", req.body);

    const {
      name,
      productName,
      quantity,
      address,
      phone,
      payment
    } = req.body;

    // Validate required fields
    if (!name || !productName || !quantity || !address || !phone) {
      return res.status(400).json({
        message: "Please provide all required order details ❌"
      });
    }

    const newOrder = new Order({
      name,
      productName,
      quantity,
      address,
      phone,
      payment: payment || "COD"
    });

    await newOrder.save();

    console.log("✅ ORDER SAVED:", newOrder._id);

    res.status(201).json({
      message: "Order placed successfully 🔥",
      orderId: newOrder._id
    });

  } catch (err) {
    console.log("❌ ORDER ERROR:", err);

    res.status(500).json({
      message: "Error placing order ❌"
    });
  }
});

module.exports = router;