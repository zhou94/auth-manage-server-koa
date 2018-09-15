const jwt = require('jsonwebtoken')
const config = require('../config/index')
module.exports = async(ctx,next) =>{
    if(ctx.originalUrl.indexOf('/login') >= 0 || ctx.originalUrl.indexOf('/register.json') >= 0 ){
        return next()
    }
    if(ctx.request.header['authorization']){
        let token = ctx.request.header['authorization'];
        let decoded = await jwt.decode(token, config.jwtsecret);
        if(!decoded){
            ctx.status = 401;
            ctx.body = {
                status:0,
                msg: 'token解析失败'
            }; 
        }else{
            if(token && decoded.exp <= new Date()/1000){
                ctx.status = 401;
                ctx.body = {
                    status:0,
                    msg: 'token过期'
                };
            }else{
                ctx.state.uid = decoded.uid
                await next()
            }
        }
    }else{
        ctx.status = 401;
        ctx.body = {
            status:0,
            msg: '没有token'
        }
    }
}