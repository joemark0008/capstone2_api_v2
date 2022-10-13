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
		require: [true, 'Email is required']
	},
	mobileNo: {
		type: String,
		required: [true, "Mobile number is required"]
	},
	password: {
		type: String,
		require: [true, ' Password is required']
	},
	isAdmin: {
		type: Boolean,
		default: false
	}
})

module.exports = mongoose.model("User", userSchema);