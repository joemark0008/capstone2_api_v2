const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({

	userId: {
		type: String,
		require: [true, 'User ID is required']
	},
	products: [
		{
			productId: {
				type: String,
				require: [true, 'Product ID is required']
			},
			quantity: {
				type: Number,
				require: [true, 'Product quantity is required']
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