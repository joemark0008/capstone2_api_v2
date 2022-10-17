
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const productController = require('../controllers/productController');
const auth = require('../auth');



router.post('/addorder', auth.verify, (request, response) => {

	const data = auth.decode(request.headers.authorization)

    orderController.addOrder(data, request.body).then(resultFromController => response.send(resultFromController));
});




module.exports = router;