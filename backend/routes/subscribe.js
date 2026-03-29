const express = require("express");
const router = express.Router();
const Subscribe = require("../models/subscribemodel");

// POST /api/subscribe
router.post("/", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email required" });
    }

    const newSub = new Subscribe({ email });
    await newSub.save();

    res.json({ message: "Subscribed successfully 🔥" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error ❌" });
  }
});

module.exports = router;