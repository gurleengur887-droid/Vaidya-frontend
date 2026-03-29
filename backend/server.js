console.log("Running in CommonJS mode");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const orderRoutes = require("./routes/order");
const authRoutes = require("./routes/auth");
const subscribeRoutes = require("./routes/subscribe");

dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/subscribe", subscribeRoutes);

// connect DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log(err));

// server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("🚀 Server running on port ${PORT}");
});