const randomstring = require("randomstring");

module.exports = {
    generateRandomString: function(len) {
        return randomstring.generate({
            length: len,
            charset: 'numeric'
        });
    },
    sendMessage: function(otp) {
        let message = "Hi, Your OTP is" + otp;
        console.log(message);
        return true;
    }
}