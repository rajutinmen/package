const cors = require('cors');
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const config = require('./server/config/'+ (process.env.NODE_ENV || 'development'));
const swaggerSpec = require('./server/utilities/swagger.js');

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser());

const http = require('http').Server(app);

app.use('/api-docs', express.static(__dirname + '/api-docs/'));

global.__base = __dirname + '/';

const UserRoutes = require('./server/routes/userRoutes');
const OrderRoutes = require('./server/routes/orderRoutes');
const productRoutes = require('./server/routes/productRoutes');

app.use(function(req, res, next) {
    if ('OPTIONS' == req.method) {
        res.sendStatus(200)
    } else {
        // Pass to next layer of middleware
        next();
    }
});

// serve swagger
app.get('/swagger.json', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

/**
 * @swagger
 * /:
 *   get:
 *     tags:
 *       - TMPackaging Root
 *     description: TMpackaging root that responds with an object with server running status.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An object with server status
 */
// APIs for non-dependent resource
app.get('/', function(req, res) {
    res.json({
        success: 'server up and running...'
    });
});

app.route('/api/user', UserRoutes.AuthRouter);
app.use('/api/order', OrderRoutes.AuthRouter);
app.use('/api/product', productRoutes.AuthRouter);

http.listen(config.port, function () {
	console.log('server up and running at ', config.port);
});

