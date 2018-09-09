var express = require('express');
var Router = express.Router();

var userControllers = require('./../controllers/userController');

/**
 * @swagger
 * /api/users/generateOTP:
 *   post:
 *     tags:
 *       - User OTP
 *     description: For Generating OTP.
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
Router.post('generateOTP' , userControllers.generateOTP);

/**
 * @swagger
 * /api/users/authenticate:
 *   post:
 *     tags:
 *       - User Authentication
 *     description: For authenticating user mobile and OTP.
 *     responses:
 *       200:
 *         description: success message
 *       400:
 *         description: Sends response error response.
 * 		 500:
 * 		   description: Sends Internal Server error message
 */
Router.post('/authenticate', userControllers.authenticate);
/**
 * @swagger
 * /api/users//updateUser:
 *   put:
 *     tags:
 *       - Updating User Details
 *     description: For updating user details.
 *     responses:
 *       200:
 *         description: success message
 *       400:
 *         description: Sends response error response.
 * 		 500:
 * 		   description: Sends Internal Server error message
 */
Router.put('/updateUser/:userId', userControllers.updateUserDetails);

module.exports = {
	userRoutes: Router
};

