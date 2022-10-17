
const { Schema, model } = require("mongoose");
const mongoose = require('mongoose');
const Order = require('../models/Order');


const userSchema = new mongoose.Schema({

	firstName: {
		type: String,
		required: [true, "First Name is required"]
	},
	lastName: {
		type: String,
		required: [true, "Last Name is required"]
	},
	email: {
		type: String,
		required: [true, 'Email is required']
	},
	mobileNo: {
		type: String,
		required: [true, "Mobile number is required"]
	},
	password: {
		type: String,
		required: [true, ' Password is required']
	},
	isAdmin: {
		type: Boolean,
		default: false
	},

	userOrders: { type: Schema.Types.ObjectId, ref: "Order" },

	registeredOn: {
		type: Date,
		default: new Date()
	}
})

module.exports = mongoose.model("User", userSchema);