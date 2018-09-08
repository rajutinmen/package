const _ = require('underscore');
 
const orderCollection = require('./../models/schema').Order;

orderServices = {
    add: async function(order) {
        return await orderCollection.create(order)  
    },

    update: async function(orderId, order) {
        return await orderCollection.findByIdAndUpdate({id:orderId},order)
    },
    
    get: async function(orderId) {
        if(orderId){
            return await orderCollection.findOne({id:orderId})
        }else{
            return await orderCollection.find()
        }
    }
}

module.exports = {

    getOrders: function(req, res) {
        let response = {};
        orderServices.get().then((response) => {
            response.message = "feteched orders successfully";
            response.data = orders;
            res.status(200).json(response);
        }).catch((error) => {
            response.message = "failed to getOrders"
            response.error = error
            res.status(500).json(response);
        })
    },

    getOrder: function(req, res) {
        let response = {};
        orderServices.get(req.params.orderId).then((order) => {
            response.message = "fetched order successfully"
            response.data = order;
            res.status(200).json(response);
        }).catch((error) => {
            response.message = "failed to getOrder"
            response.error = error
            res.status(500).json(response);
        })
    },

    createOrder: function(req, res) {
        let response = {};
        orderServices.add(req.body.order).then((order) => {
            response.message = "order created successfully"
            response.data = order;
            res.status(201).json(response);
        }).catch((error) => {
            response.message = "failed to create order";
            response.error = error;
            res.status(500).json(response);
        })
    },

    updateOrder: function(req, res) {
        let response = {};
        orderServices.update(req.params.orderId,req.body).then((order) => {
            response.message = "order updated successfully"
            response.data = order
            res.status(200).json(order)
        }).catch((error) => {
            response.message = "failed to update order"
            response.error = error;
            res.status(500).json(response);
        })
    }
}