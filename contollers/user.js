const UserModel = require('../models/user');
const IdsModel = require('../models/ids');
const tokenModel = require('../models/token');
const createToken = require('../token/createToken');
exports.userLogin = async ctx =>{
    const {account,password} = ctx.request.body;
    try{
        if(account&&password){
            const user = await UserModel.findOne({account:account});
            if(user&& user.password === password){
                const token = createToken(user.uid);
                const userToken = {
                    token:token,
                    uid:user.uid
                }
                await tokenModel.update({uid:user.uid}, userToken, {upsert:true});
                ctx.body = {status:1,msg:'登陆成功',data:token};
            }else{
                ctx.body = {status:0,msg:'账号或密码错误'}
            }
        }else{
            ctx.body = {status:0,msg:'请输入完整的账号和密码'}
        }
    }catch(err){
        ctx.body = {status:0,msg:err.message};
    }
}

exports.userRegister = async ctx =>{
    try{
        const {account,password,nickname,phone} = ctx.request.body;
        const user = await UserModel.findOne({account:account})
        if(user){
            ctx.body = {status:0,msg:'账号已被注册'}
        }else{
            if(!(account&&password&&nickname&&phone)) ctx.body = {status:0,msg:'参数错误'};
            await IdsModel.findOne({_id:'uid'},(err, data) => {
                if (!data) {
                    const newIds = {
                        _id: "uid",
                        sequence_value:'0'
                    };
                    IdsModel.create(newIds);
                }
            })
            const uid =  await IdsModel.findOneAndUpdate({_id:"uid"},{$inc:{sequence_value:1}});
            const options = {
                uid:uid.sequence_value,
                ...ctx.request.body
            }
            await UserModel.create(options);
            ctx.body = {status:1,msg:'注册成功'};
        }
    }catch(err){
        ctx.body = {status:0,msg:err.message};
    }
}


exports.getUserInfo = async ctx =>{
    const {uid} = ctx.state;
    try{
        const userInfo = await UserModel.findOne({uid:uid},{_id:0,password:0,created:0,updated:0,uid:0});
        if(userInfo){
            ctx.body = {status:1,msg:'',data:userInfo};
        }else{
            ctx.body = {status:0,msg:'未查到用户信息'};
        }
    }catch(err){
        ctx.body = {status:0,msg:err.message};
    }
}


exports.signOut = async ctx =>{
    const {uid} = ctx.state;
    try{
        await tokenModel.findOneAndUpdate({uid:uid},{token:null});
        ctx.body = {status:1,msg:'退出成功'};
    }catch(err){
        ctx.body = {status:0,msg:err.message};
    }
}