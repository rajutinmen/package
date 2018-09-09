const _ = require('underscore');

const userCollection = require('./../models/schema').User;
const util = require('../utilities/util');

userServices = {
    add: async function(userMobile) {
        try{
            let otp = util.generateRandomString(4);
            let user = await userCollection.findOne({"mobile": userMobile})
            if(user){
               user.otp = otp;
               user.otpCreatedAt = Date.now();
               await util.sendMessage(otp);
               return await user.save(); 
            }
            else{
               var newUser = userCollection.create({"mobile": userMobile,"otp": otp,"otpCreatedAt": Date.now()})
               await util.sendMessage(otp);
               return newUser;
            }
        }
        catch(error){
            return error;
        }
    },

    authenticate: async function(userMobile, otp) {
        try{
            let user = await userCollection.findOne({"mobile": userMobile,"otp": otp});
            return user? true: false;
        }
        catch(error){
            return error;
        }
    },

    update: async function(userId, user) {
        return await userCollection.update({"_id": userId}, { $set: { name: user.name }});
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
            userServices.add(req.body.mobile).then((user) => {
                response.message = "otp generated successfully"
                response.data = user;
                res.status(200).json(response);
            }).catch((error) => {
                response.message = "generating OTP is failed";
                response.error = error;
                res.status(500).json(response);
            })
        }
    },

    authenticate: function(req, res) {
        let response = {}
        if(!req.body.userMobile || !req.body.otp){
            response.message = "Invalid Valid Paramters"
            response.error = {};
            res.status(400).json(response);
        }else{
            userServices.authenticate(req.body.userMobile,req.body.otp).then((authStatus) => {
                if(authStatus){
                    response.message = "authenticated successfully";
                    response.data = true;
                    res.status(200).json(response);
                }
                else{
                    response.message = "authenticated failed";
                    response.data = false;
                    res.status(401).json(response);
                }
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