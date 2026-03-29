const express = require("express");
const Order = require("../models/Order");



const router = express.Router();

// ✅ CREATE ORDER
router.post("/create", async (req, res) => {
  try {
    console.log(req.body);
    const { userId, productName, quantity, address, phone, payment } = req.body;

    const newOrder = new Order({
      userId,
      productName,
      quantity,
      address,
      phone,
      payment
    });

    await newOrder.save();

    res.json({ message: "Order placed successfully 🔥" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error placing order ❌" });
  }
});

module.exports = router;