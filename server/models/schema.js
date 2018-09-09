var randomString = require("randomstring");
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var config = require('../config/'+ (process.env.NODE_ENV || 'development'));

mongoose.connect(config.mongodb.url);

var userSchema = new Schema({
    mobile                  : { type: String, required: true, unique: true },
    name                    : { type: String, required: true },
    otp                     : { type: String },
    otpCreatedAt            : { type: Date},
    
    createdAt               : { type: Date, default: Date.now },
    updatedAt               : { type: Date, default: Date.now }
});

var productSchema = new Schema({
    name                    : { type: String, required: true, unique: true },
    type                    : { type: String, required: true },
    size                    : { type: Number, required: true },
    unit                    : { type: String, required: true },
    imageUrl                : { type: String },
    available               : { type: Number, required: true },
    supplied                : { type: Number, required: true },
    total                   : { type: Number, required: true },

    createdAt               : { type: Date, default: Date.now },
    updatedAt               : { type: Date, default: Date.now }
});

var orderSchema = new Schema({
    _user                   : { type: Schema.ObjectId, ref: 'User', required: true },
    _product                : { type: Schema.ObjectId, ref: 'Product', required:true },
    quantity                : { type: Number, required: true },
    requestedAt             : { type: Date, required: true },
    status                  : { type: String, enum: config.orderStatus, default: 'requested'},

    createdAt               : { type: Date, default: Date.now },
    updatedAt               : { type: Date, default: Date.now }
});

var purchaseSchema = new Schema({
    _product                : { type: Schema.ObjectId, ref: 'Product', required:true },
    purchasedOn             : { type: Date, default: Date.now },

    createdAt               : { type: Date, default: Date.now },
    updatedAt               : { type: Date, default: Date.now }
});


var User = mongoose.model('User', userSchema);
var Product = mongoose.model('Product', productSchema);
var Order = mongoose.model('Order', orderSchema);
var Purchase = mongoose.model('Purchase', purchaseSchema);

module.exports = {
    User    : User,
    Product : Product,
    Order   : Order,
    Purchase: Purchase
};