var express = require('express');
var AuthRouter = express.Router();

var productControllers = require('./../controllers/productController');

AuthRouter.get('/', productControllers.getProducts);
AuthRouter.get('/:productId', productControllers.getProduct);
AuthRouter.post('/create', productControllers.createProduct);
AuthRouter.put('/update', productControllers.updateproduct);

module.exports = {
	AuthRouter: AuthRouter
};

