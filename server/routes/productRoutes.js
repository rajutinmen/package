var express = require('express');
var AuthRouter = express.Router();

var productControllers = require('./../controllers/productController');


/**
 * @swagger
 * /api/products/:
 *   get:
 *     tags:
 *       - Getting Products List
 *     description: for fetching all the products data.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: success message
 *       400:
 *         description: Sends response error response.
 * 		 500:
 * 		   description: Sends Internal Server error message
 */
AuthRouter.get('/', productControllers.getProducts);
/**
 * @swagger
 * /api/products/:productId:
 *   get:
 *     tags:
 *       - Product Details
 *     description: For Particular Product Details.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: success message
 *       400:
 *         description: Sends response error response.
 * 		 500:
 * 		   description: Sends Internal Server error message
 */
AuthRouter.get('/:productId', productControllers.getProduct);
/**
 * @swagger
 * /api/products/create:
 *   post:
 *     tags:
 *       - Create Product
 *     description: For Creating Product.
 *     produces:
 *       - application/json
 *     responses:
 *       201:
 *         description: success message
 *       400:
 *         description: Sends response error response.
 * 		 500:
 * 		   description: Sends Internal Server error message
 */
AuthRouter.post('/create', productControllers.createProduct);
/**
 * @swagger
 * /api/users/update:
 *   post:
 *     tags:
 *       - Update product
 *     description: for updating product details.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: success message
 *       400:
 *         description: Sends response error response.
 * 		 500:
 * 		   description: Sends Internal Server error message
 */
AuthRouter.put('/update', productControllers.updateproduct);

module.exports = {
	AuthRouter: AuthRouter
};

