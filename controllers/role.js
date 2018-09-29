const RoleModel = require('../models/role');
const IdsModel = require('../models/ids');
exports.addRole = async ctx =>{
    const {roleName,description,roletype} = ctx.request.body;
    try{
        const data = await RoleModel.findOne({roleName:roleName});
        if(data){
            ctx.state.error('角色已存在');
        }else{
            await IdsModel.findOne({_id:'roleId'},(err, data) => {
                if (!data) {
                    const newIds = {
                        _id: "roleId",
                        sequence_value:'0'
                    };
                    IdsModel.create(newIds);
                }
            })
            const roleId =  await IdsModel.findOneAndUpdate({_id:"roleId"},{$inc:{sequence_value:1}});
            const save = {
                ...ctx.request.body,
                roleId:roleId.sequence_value
            }
            await RoleModel.create(save);
            ctx.state.success(null,'新增成功');
        }
    }catch(err){
        ctx.state.error(err.message)
    }
}

exports.roleList = async ctx =>{
    try{
        const {current,pageSize,roleName} = ctx.request.body;
        const query = {};
        if(!(roleName == null))  query.roleName = roleName;
        const total = await RoleModel.find(query).countDocuments();
        let list = []
        if(!pageSize){
            list = await RoleModel.find()
        }else{
            list = await RoleModel.find(query,{_id:0,__v:0,password:false}).skip((Number(current)-1)*Number(pageSize)).limit(Number(pageSize));
        }
        ctx.state.success({total:total,list:list})
    }catch(err){
        ctx.state.error(err.message);
    }
}