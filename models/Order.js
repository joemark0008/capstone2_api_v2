const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({

	userId: {
		type: String,
		required: [true, 'User ID is required']
	},
	products: [
		{
			productId: {
				type: String,
				required: [true, 'Product ID is required']
			},
			quantity: {
				type: Number,
				required: [true, 'Product quantity is required']
			}
		}
	],
	totalAmount: {
		type: Number,
		default: 0
	},
	purchasedOn: {
		type: Date,
		defaul: new Date()
	}
})

module.exports = mongoose.model("Order", orderSchema);