const { Schema, model } = require("mongoose");
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({

	// userId: {
	// 	type: String,
	// 	required: [true, 'User ID is required']
	// },
	// email: {
	// 	type: String,
	// 	required: [true, 'Email is required']
	// },

	orderUser :  { type: Schema.Types.ObjectId, ref: "User" },

	orderedProduct: [
		{
			
			productName: {
				type: String,
				required: [true, 'Product name is required']
			},
			quantity: {
				type: Number,
				required: [true, 'Product quantity is required']
			},
			price: {
				type: Number,
				required: [true, 'Product price is required']
			},
			subTotal: {
				type: Number,
				required: [true, 'Subtotal is required']
			}
		}
	],
	totalAmount: {
		type: Number,
		default: 0
	},
	purchasedOn: {
		type: Date,
		default: new Date()
	},
	isDelivered: {
		type: Boolean,
		default: false
	}
})

module.exports = mongoose.model("Order", orderSchema);