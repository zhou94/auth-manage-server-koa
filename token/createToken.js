const jwt = require('jsonwebtoken');
const config = require('../config/index')
module.exports = function(user_id){
    const token = jwt.sign({
        uid: user_id
    }, config.jwtsecret, {
        expiresIn: '3600s'
    });
    return token;
}