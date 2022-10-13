const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../auth');

// User registration
router.post('/register', (request, response) => {
	userController.registerUser(request.body).then(resultFromController => response.send(resultFromController));
});



// User Authentication
router.post('/login', (request, response) => {
	userController.loginUser(request.body).then(resultFromController => response.send(resultFromController))
});

module.exports = router;