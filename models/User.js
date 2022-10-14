const mongoose = require('mongoose');

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
	userOrders : [
		{
			productId: {
				type: String
			},
			productName: {
				type: String
			},
			quantity: {
				type: Number
			},
			price: {
				type: Number
			},
			subTotal: {
				type: Number
			},
			purchasedOn: {
				type: Date,
				default: new Date()
			},
		}
	],
	registeredOn: {
		type: Date,
		default: new Date()
	}
})

module.exports = mongoose.model("User", userSchema);