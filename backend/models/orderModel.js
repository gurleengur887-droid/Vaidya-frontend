const mongoose = require("mongoose");

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

const orderSchema = new mongoose.Schema({
name: {
type: String,
required: true,
trim: true,
},

productName: {
type: String,
required: true,
},

quantity: {
type: Number,
required: true,
default: 1,
min: 1,
},

address: {
type: addressSchema,
required: true,
},

phone: {
type: String,
required: true,
match: /^\d{10}$/,
},

payment: {
type: String,
required: true,
default: "COD",
enum: ["COD"],
},

createdAt: {
type: Date,
default: Date.now,
},
});

module.exports = mongoose.model("Order", orderSchema);
