const cors = require('cors');
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const config = require('./server/config/'+ (process.env.NODE_ENV || 'development'));

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser());

const http = require('http').Server(app);

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

app.route('/user', UserRoutes.AuthRouter);
app.use('/order', OrderRoutes.AuthRouter);
app.use('/product', productRoutes.AuthRouter);

http.listen(config.port, function () {
	console.log('server up and running at ', config.port);
});

