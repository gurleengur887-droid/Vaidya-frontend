const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

const Admin = require("../models/adminModel");

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    const password = process.env.ADMIN_PASSWORD;

    if (!email || !password) {
      throw new Error("Admin email or password is missing.");
    }

    if (password.length < 12) {
      throw new Error("Admin password must contain at least 12 characters.");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await Admin.findOneAndUpdate(
      { email },
      {
        $set: {
          email,
          password: hashedPassword,
          role: "admin",
        },
      },
      {
        upsert: true,
        new: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      }
    );

    console.log("Admin account created/updated successfully!");
    console.log("Admin email:", email);

  } catch (error) {
    console.error("Admin creation failed:", error.message);
    process.exitCode = 1;

  } finally {
    await mongoose.disconnect();
  }
};

createAdmin();