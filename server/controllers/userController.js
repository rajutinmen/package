const _ = require('underscore');

const userCollection = require('./../models/schema').User;
const util = require('../utilities/util');

userServices = {
    add: async function(userMobile) {
        try{
            let otp = util.generateRandomString(4);
            var user = await userCollection.findOne({"mobile": userMobile})
            if(user){
               user.otp = otp;
               return await user.save(); 
            }else{
                return await userCollection.create({"mobile": userMobile,"otp": otp})
            }
        }
        catch(error){
            return error;
        }
    },
    update: async function(userId, user) {
        return await userCollection({"_id": userId},user)
    }
}

module.exports = {
    generateOTP: function(req, res) {
        let response = {};
        if( !req.body.mobile ) {
            response.message = "Invalid Input"
            response.error = {};
            res.status(400).json(response)
        }else{
            userServices.add()
        }
    },

    authenticate: function(req, res) {
        let response = {}
        if(!req.body.userMobile && !req.body.otp){
            response.message = "Invalid User Mobile"
            response.error = {};
            res.status(400).json(response);
        }else{
            userServices.add(req.body.userMobile).then((user) => {
                response.message = "authenticated successfully";
                response.data = user;
                res.status(200).json(response);
            }).catch((error) => {
                response.message = "authentication failed"
                response.error = error
                response.staus(500).json(response);
            })
        } 
    },

    updateUserDetails: function(req, res) {
        let response = {};
        userServices.update(req.params.userId,req.body).then((user) => {
            response.message = "user details updated successfully";
            response.data = user;
            res.status(200).json(response);
        }).catch((error) => {
            response.message = "update user details failed"
            response.error = error;
            response.status(500).json(response);
        })
    }
}