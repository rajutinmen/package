var express = require('express');
var Router = express.Router();

var userControllers = require('./../controllers/userController');

Router.post('/authenticate', userControllers.authenticate);
Router.put('/updateUser/:userId', userControllers.updateUserDetails);

module.exports = {
	userRoutes: Router
};

