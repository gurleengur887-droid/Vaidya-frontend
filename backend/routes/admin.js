const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Admin = require("../models/adminModel");
const Order = require("../models/orderModel");
const adminAuth = require("../middleware/adminAuth");

const router = express.Router();

// ==================================
// ADMIN LOGIN
// ==================================

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required.",
      });
    }

    const admin = await Admin.findOne({
      email: email.trim().toLowerCase(),
    });

    if (!admin) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      admin.password
    );

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    const token = jwt.sign(
      {
        id: admin._id,
        email: admin.email,
        role: admin.role,
      },
      process.env.ADMIN_JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    return res.status(200).json({
      message: "Login successful.",
      token,
      admin: {
        email: admin.email,
      },
    });
  } catch (error) {
    console.error("ADMIN LOGIN ERROR:", error);

    return res.status(500).json({
      message: "Unable to login.",
    });
  }
});

// ==================================
// GET ALL ORDERS
// ==================================

router.get("/orders", adminAuth, async (req, res) => {
  try {
    const {
      status,
      product,
      search,
      from,
      to,
    } = req.query;

    const filter = {};

    if (status === "Pending") {
      filter.$or = [
        { status: "Pending" },
        { status: { $exists: false } },
      ];
    } else if (status === "Completed") {
      filter.status = "Completed";
    }

    if (product) {
      filter.productName = {
        $regex: product,
        $options: "i",
      };
    }

    if (search) {
      filter.$and = [
        ...(filter.$and || []),
        {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { phone: { $regex: search, $options: "i" } },
            { productName: { $regex: search, $options: "i" } },
          ],
        },
      ];
    }

    if (from || to) {
      filter.createdAt = {};

      if (from) {
        filter.createdAt.$gte = new Date(from);
      }

      if (to) {
        const endDate = new Date(to);
        endDate.setHours(23, 59, 59, 999);

        filter.createdAt.$lte = endDate;
      }
    }

    const orders = await Order.find(filter)
      .sort({ createdAt: -1 })
      .lean();

    const formattedOrders = orders.map((order) => ({
      ...order,
      status: order.status || "Pending",
    }));

    return res.status(200).json({
      total: formattedOrders.length,
      orders: formattedOrders,
    });
  } catch (error) {
    console.error("FETCH ORDERS ERROR:", error);

    return res.status(500).json({
      message: "Unable to fetch orders.",
    });
  }
});

// ==================================
// UPDATE ORDER STATUS
// ==================================

router.patch(
  "/orders/:id/status",
  adminAuth,
  async (req, res) => {
    try {
      const { status } = req.body;

      if (!["Pending", "Completed"].includes(status)) {
        return res.status(400).json({
          message: "Invalid order status.",
        });
      }

      const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id,
        { status },
        {
          new: true,
          runValidators: true,
        }
      );

      if (!updatedOrder) {
        return res.status(404).json({
          message: "Order not found.",
        });
      }

      return res.status(200).json({
        message: "Order status updated successfully.",
        order: updatedOrder,
      });
    } catch (error) {
      console.error("UPDATE STATUS ERROR:", error);

      return res.status(500).json({
        message: "Unable to update order status.",
      });
    }
  }
);

module.exports = router;