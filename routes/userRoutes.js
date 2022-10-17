const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../auth');

// User registration
router.post('/register', (request, response) => {
	userController.registerUser(request.body).then(resultFromController => response.send(resultFromController));
});

// Retrieve all users (Admin only)
router.get('/all', auth.verify, (request, response) => {

	const userData = auth.decode(request.headers.authorization)

	userController.getAllUsers(userData).then(resultFromController => response.send(resultFromController))
})


// Retrieve the details of a user.
router.get('/profile', auth.verify, (request, response) => {

	const userData = auth.decode(request.headers.authorization)

	userController.getProfile(userData).then(resultFromController => response.send(resultFromController))
});


// User Authentication
router.post('/login', (request, response) => {
	userController.loginUser(request.body).then(resultFromController => response.send(resultFromController))
});

// Set user as admin (Admin only)
router.put('/:userId/setAdmin', auth.verify, (request, response) => {

	const data = {
		userId: request.params.userId,
		isAdmin: auth.decode(request.headers.authorization).isAdmin
	}

	userController.setAdmin(data).then(resultFromController => response.send(resultFromController))
})

// Set admin as user (Admin only)
router.put('/:userId/removeAdmin', auth.verify, (request, response) => {

	const data = {
		userId: request.params.userId,
		isAdmin: auth.decode(request.headers.authorization).isAdmin
	}

	userController.removeAdmin(data).then(resultFromController => response.send(resultFromController))
})












// Non-admin User checkout (Create Order)
router.post('/checkout', auth.verify, (request, response) => {

	const userData = auth.decode(request.headers.authorization)

	userController.checkoutProduct(userData).then(resultFromController => response.send(resultFromController))
})


module.exports = router;