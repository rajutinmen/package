var express = require('express');
var AuthRouter = express.Router();

var orderControllers = require('./../controllers/orderController');

AuthRouter.get('/', orderControllers.getOrders);
AuthRouter.get('/:orderId', orderControllers.getOrder)
AuthRouter.post('/create', orderControllers.createOrder);
AuthRouter.put('/update', orderControllers.updateOrder);

module.exports = {
	AuthRouter: AuthRouter
};

