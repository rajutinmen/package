swaggerJSDoc = require('swagger-jsdoc');

// swagger definition
var swaggerDefinition = {
    info: {
        title: 'TMPackaging API Specifications',
        version: '1.0.0',
        description: "RESTful API's of TMPackaging",
    },
    host: 'localhost:3000',
    basePath: '/',
};

// options for the swagger docs
var options = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // path to the API docs
    apis: ['./server.js','./server/routes/userRoutes.js','./server/routes/productRoutes.js','./server/routes/orderRoutes.js'],
};

// initialize swagger-jsdoc
module.exports = swaggerJSDoc(options);
