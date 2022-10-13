const Product = require('../models/Product');
const User = require('../models/User')



// Start of Creating Product (Admin only)
module.exports.addProduct = (data, requestBody) => {
	console.log('data')
	console.log(data)
	console.log('requestBody')
	console.log(requestBody)
	return User.findById(data.id).then(result => {

		console.log('result')
		console.log(result)
		if(result.isAdmin === true) { 

			let newProduct = new Product ({

				name: requestBody.name,
				description: requestBody.description,
				price: requestBody.price
			})

			return Product.find({name:requestBody.name}).then(result => {

				console.log('{name:requestBody.name}')
				console.log({name:requestBody.name})

				console.log('result')
				console.log(result)

				if(result.length > 0) {
					return `${result[0].name} item is already exist!`
				} else {
					return newProduct.save().then(product => {

						return `${newProduct.name} was succesfully added to your inventory`

					})
					.catch(error => {
						return error.message
					})
				}
			})	
		} else {

			return 'Authorized admin only'
		}
	})
}
// End of Creating Product (Admin only)



//Start of Retrieving all active products
module.exports.getActiveProduct = () => {

	return Product.find({isActive: true}).then(result => {

		console.log('result')
		console.log(result)

		if(result.length === 0) {
			return 'No product available'
		}

		return result
	})
}
//End of Retrieving all active products



// Start of Retrieving single product
module.exports.getSpecificProduct = (requestParams) => {

	console.log('requestParams')
	console.log(requestParams)
	return Product.findById(requestParams.productId).then(result => {

		console.log('result')
		console.log(result)
		return result
	}).catch(error => {
		return 'Product cant found'
	})
}
// End of Retrieving single product



// Start of Updating Product information (Admin only)
module.exports.updateProduct = (data, requestBody) => {
	console.log('userData')
	console.log(data)
	console.log('requestBody')
	console.log(requestBody)

	return Product.findById(data.productId).then(result => {

		console.log('result')
		console.log(result)
		if(data.isAdmin === true) {

			let updatedProduct = {
				name: requestBody.name,
				description: requestBody.description,
				price: requestBody.price
			}

			return Product.findByIdAndUpdate(result._id, updatedProduct).then((product, error) => {

				if(error){

					return 'Product failed to update!'
				} else {

					return 'Product updated succesfully!'
				}
			})
		} else {

			return 'Authorized admin only'
		}
	})
}
// End of Updating Product information (Admin only)



//Start of Archiving Product (Admin only)
module.exports.archiveProduct = (data) => {

	console.log('data')
	console.log(data)

	return Product.findById(data.productId).then(result => {

		console.log("result")
		console.log(result)

		if(data.isAdmin === true) {

			result.isActive = false;

			return result.save().then((archivedProduct,error) => {

				if(error) {

					return 'Product failed to archive'
				} else {

					return 'Product archived succesfully'
				}
			})
		} else {

			return 'Authorized admin only'
		}
	})
	
}
//End of Archiving Product (Admin only)



//Start of Enable Product (Admin only)
module.exports.enableProduct = (data) => {

	console.log('data')
	console.log(data)

	return Product.findById(data.productId).then(result => {

		console.log("result")
		console.log(result)

		if(data.isAdmin === true) {

			result.isActive = true;
			
			return result.save().then((enabledProduct,error) => {

				if(error) {

					return 'Product failed to enable'
				} else {

					return 'Product enabled succesfully'
				}
			})
		} else {

			return 'Authorized admin only'
		}
	})
	
}
//End of Enable Product (Admin only)
