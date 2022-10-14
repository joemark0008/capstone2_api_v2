const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../auth');



// Create Product (Admin only)
router.post('/add', auth.verify, (request, response) => {

	const data = auth.decode(request.headers.authorization)

	productController.addProduct(data, request.body).then(resultFromController => response.send(resultFromController));
});



// Retrieve all active products
router.get('/', (request, response) => {

	productController.getActiveProduct().then(resultFromController => response.send(resultFromController));
});

// Retrieve all products (Admin Only)
router.get('/all', auth.verify, (request, response) => {

	const userData = auth.decode(request.headers.authorization)

	productController.getAllProducts(userData).then(resultFromController => response.send(resultFromController));
})

// Retrieve single product
router.get('/:productId', (request, response) => {

	productController.getSpecificProduct(request.params).then(resultFromController => response.send(resultFromController));
});



// Update Product information (Admin only)
router.put('/:productId/update', auth.verify, (request,response) => {

	const data = {
		productId: request.params.productId,
		isAdmin: auth.decode(request.headers.authorization).isAdmin
	}

	productController.updateProduct(data, request.body).then(resultFromController => response.send(resultFromController));
});



//Archive Product (Admin only)
router.put('/:productId/archive', auth.verify , (request, response) => {

	const data = {
		productId: request.params.productId,
		isAdmin: auth.decode(request.headers.authorization).isAdmin
	}

	productController.archiveProduct(data).then(resultFromController => response.send(resultFromController));
});



//Enable Product (Admin only)
router.put('/:productId/enable', auth.verify , (request, response) => {

	const data = {
		productId: request.params.productId,
		isAdmin: auth.decode(request.headers.authorization).isAdmin
	}

	productController.enableProduct(data).then(resultFromController => response.send(resultFromController));
});

module.exports = router;