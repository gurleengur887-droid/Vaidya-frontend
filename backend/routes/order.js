const express = require("express");
const Order = require("../models/orderModel");

const router = express.Router();

// ========================================
// CREATE NEW ORDER
// ========================================

router.post("/create", async (req, res) => {
  try {
    console.log("ORDER RECEIVED:", req.body);

    const {
      name,
      productName,
      quantity,
      packs,
      boxesPerPack,
      price,
      address,
      phone,
      payment,
    } = req.body;

    // ========================================
    // BASIC VALIDATION
    // ========================================

    if (
      !name?.trim() ||
      !productName?.trim() ||
      quantity === undefined ||
      quantity === null ||
      !Number.isInteger(Number(quantity)) ||
      Number(quantity) < 1 ||
      !phone ||
      !address
    ) {
      return res.status(400).json({
        message: "Please provide all required order details.",
      });
    }

    // ========================================
    // ADDRESS VALIDATION
    // ========================================

    const requiredAddressFields = [
      "houseNumber",
      "street",
      "area",
      "pincode",
      "city",
      "state",
    ];

    if (
      typeof address !== "object" ||
      Array.isArray(address) ||
      requiredAddressFields.some(
        (field) =>
          typeof address[field] !== "string" ||
          !address[field].trim()
      )
    ) {
      return res.status(400).json({
        message: "Please provide a complete delivery address.",
      });
    }

    // ========================================
    // PHONE AND PIN VALIDATION
    // ========================================

    if (!/^\d{10}$/.test(phone)) {
      return res.status(400).json({
        message: "Please provide a valid 10-digit phone number.",
      });
    }

    if (!/^\d{6}$/.test(address.pincode)) {
      return res.status(400).json({
        message: "Please provide a valid 6-digit PIN code.",
      });
    }

    // ========================================
    // PAYMENT VALIDATION
    // ========================================

    if (payment && payment !== "COD") {
      return res.status(400).json({
        message: "The selected payment method is not supported.",
      });
    }

    // ========================================
    // PRODUCT QUANTITY AND PRICE
    // ========================================

    const finalPacks = Number(packs ?? 1);
    const finalBoxesPerPack = Number(boxesPerPack ?? 2);
    const finalQuantity = Number(quantity);
    const finalPrice = Number(price ?? 0);

    if (
      !Number.isInteger(finalPacks) ||
      finalPacks < 1 ||
      !Number.isInteger(finalBoxesPerPack) ||
      finalBoxesPerPack < 1 ||
      !Number.isFinite(finalPrice) ||
      finalPrice < 0
    ) {
      return res.status(400).json({
        message: "Invalid product quantity or price.",
      });
    }

    // Ensure pack and box quantities match.
    if (finalPacks * finalBoxesPerPack !== finalQuantity) {
      return res.status(400).json({
        message: "Product quantity does not match pack details.",
      });
    }

    // ========================================
    // CREATE ORDER
    // ========================================

    const newOrder = new Order({
      name: name.trim(),

      productName: productName.trim(),

      packs: finalPacks,

      boxesPerPack: finalBoxesPerPack,

      quantity: finalQuantity,

      price: finalPrice,

      address: {
        houseNumber: address.houseNumber.trim(),
        street: address.street.trim(),
        area: address.area.trim(),

        landmark:
          typeof address.landmark === "string"
            ? address.landmark.trim()
            : "",

        pincode: address.pincode.trim(),
        city: address.city.trim(),
        state: address.state.trim(),
      },

      phone,

      payment: "COD",

      status: "Pending",
    });

    await newOrder.save();

    console.log("✅ ORDER SAVED:", newOrder._id);

    return res.status(201).json({
      message: "Order placed successfully!",
      orderId: newOrder._id,
    });

  } catch (error) {
    console.error("❌ ORDER ERROR:", error);

    return res.status(500).json({
      message: "Error placing order. Please try again.",
    });
  }
});

module.exports = router;