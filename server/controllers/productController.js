const _ = require('underscore');

const productCollection = require('./../models/schema').Product;

productServices = {
    add: async function(product) {
        return await productCollection.create(product)  
    },

    update: async function(productId, product) {
        return await productCollection.findByIdAndUpdate({id:productId},product)
    },

    get: async function(productId) {
        if(productId){
            return await productCollection.findOne({ _id:productId })
        }else{
            return await productCollection.find()
        }
    }
}

module.exports = {
    getProducts: function(req, res) {
        let response = {};
        productServices.get().then((products) => {
            response.message = "fecthed products successfully"
            response.data = products;
            res.status(200).json(response);
        }).catch((error) => {
            response.message = "failed to fetch products"
            response.error = error;
            res.status(500).json(response);
        })
    },

    getProduct: function(req, res) {
        let response = {};
        productServices.get(req.params.productId).then((product) => {
            response.message = "fetched product successfully"
            response.data = product
            res.status(200).json(response);
        }).catch((error) => {
            response.message = "failed to fetch product"
            response.error = error
            res.status(500).json(response);
        })
    },

    createProduct: function(req, res) {
        let response = {};
        productServices.add(req.body).then((product) => {
            response.message = "product created successfully";
            response.data = product;
            res.status(201).json(response);
        }).catch((error) => {
            response.message = "failed to create product"
            response.error = error.message;
            res.status(500).json(response);
        })
    },
    
    updateproduct: function(req, res) {
        let response = {};
        productServices.update(req.params.productId,req.body).then((product) => {
            response.message = "product updated successfully"
            response.data = product;
            res.status(200).json(response)
        }).catch((error) => {
            response.message = "failed to update product"
            response.error = error.message;
            res.status(500).json(response);
        })
    }
}