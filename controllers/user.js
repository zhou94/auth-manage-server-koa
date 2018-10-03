const UserModel = require('../models/user');
const IdsModel = require('../models/ids');
const UploadModel = require('../models/upload');
const tokenModel = require('../models/token');
const createToken = require('../utils/createToken');
const md5 = require('md');
const multer = require('../utils/upload');

exports.userLogin = async ctx =>{
    try{
        const {account,password} = ctx.request.body;
        if(account&&password){
            const user = await UserModel.findOne({account:account});
            if(user &&user.password&& user.password === password){
                const token = createToken(user.uid);
                const userToken = {
                    token:token,
                    uid:user.uid
                }
                await tokenModel.update({uid:user.uid}, userToken, {upsert:true});
                ctx.state.success(token,'登陆成功')
            }else{
                ctx.state.error('账号或密码错误')
            }
        }else{
            ctx.state.error('请输入完整的账号和密码')
        }
    }catch(err){
        ctx.state.error(err);
    }
}

exports.userRegister = async ctx =>{
    try{
        const {account,password,nickname,phone} = ctx.request.body;
        const user = await UserModel.findOne({account:account});
        const userPhone = await UserModel.findOne({phone:phone});
        if(user){
            ctx.state.error('账号已被注册')
        }else if(userPhone){
            ctx.state.error('该手机号已注册')
        }else{
            if(!(account&&password&&nickname&&phone)) ctx.state.error('参数错误');
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
            options.password = md5(options.password);
            await UserModel.create(options);
            ctx.state.success(null,'注册成功')
        }
    }catch(err){
        ctx.body = {status:0,msg:err.message};
    }
}


exports.getUserInfo = async ctx =>{
    const {uid} = ctx.state;
    try{
        const userInfo = await UserModel.findOne({uid},{_id:0,password:0,created:0,updated:0,uid:0});
        if(userInfo){
            ctx.state.success(userInfo)
        }else{
            ctx.state.error('未查到用户信息');
        }
    }catch(err){
        ctx.state.error(err.message)
    }
}


exports.signOut = async ctx =>{
    const {uid} = ctx.state;
    try{
        await tokenModel.findOneAndUpdate({uid:uid},{token:null});
        ctx.state.success(null,'退出成功')
    }catch(err){
        ctx.state.error(err.message)
    }
}

exports.userList = async ctx =>{
    try{
        const {current,pageSize,nickname} = ctx.request.body;
        const query = {};
        if(!(nickname == null))  query.nickname = nickname;
        const total = await UserModel.find(query).countDocuments();
        const list = await UserModel.aggregate([{
            $skip:(Number(current)-1)*Number(pageSize)
        },{
            $limit:Number(pageSize)
        },{
            $lookup:
              {
                from: 'roles',
                localField: 'roleId',
                foreignField: 'roleId',
                as: 'role'
              }
         },{
            $project:{
                "role.created":0,
                "role.description":0,
                "role.updated":0,
                "role.__v":0,
                "role._id":0,
                "roleName":0,
                "password":0,
                "__v":0,
                "_id":0,
                "roleId":0
            }
         },{
            $unwind:"$role"
         }]);
        ctx.state.success({total:total,list:list})
    }catch(err){
        ctx.state.error(err.message)
    }
}

// 上传头像
exports.uploadAvatar = async ctx =>{
    const {uid} = ctx.state;
    try{
        await multer.single('file')(ctx);
        const {filename} = ctx.req.file;
        const fileId = await IdsModel.findOneAndUpdate({_id:"fileId"},{$inc:{sequence_value:1}},{upsert:true,new:true});
        let obj = {
            path:`http://localhost:3000/uploads/${filename}`,
            id:fileId.sequence_value
        }
        await UploadModel.create(obj);
        ctx.state.success(obj,'上传成功');
    }catch(err){
        ctx.state.error(err.message);
    }
} 

exports.sureAvater = async ctx =>{
    const {uid} = ctx.state;
    const {path} = ctx.request.body;
    try{
        await UserModel.findOneAndUpdate({uid},{avater:path});
        ctx.state.success(path,'保存成功');
    }catch(err){
        ctx.state.error(err.message);
    }
}
