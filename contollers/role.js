const RoleModel = require('../models/role');
const IdsModel = require('../models/ids');
exports.addRole = async ctx =>{
    const {roleName,description,roletype} = ctx.request.body;
    try{
        const data = await RoleModel.findOne({roleName:roleName});
        if(data){
            ctx.body = {
                status:1,
                data:data
            }
        }else{
            ctx.body = {
                status:0,
                msg:''
            }
        }
    }catch(err){
        ctx.body = {status:0,msg:err.message};
    }
}
