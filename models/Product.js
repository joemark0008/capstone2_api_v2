const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

	name: {
		type: String,
		require: [true, 'Product name is required']
	},
	description: {
		type: String,
		require: [true, 'Product description is required']
	},
	price: {
		type: Number,
		require: [true, 'Product price is required']
	},
	isActive: {
		type: Boolean,
		default: true
	},
	createdOn: {
		type: Date,
		default: new Date()
	}
})

module.exports = mongoose.model("Product", productSchema);