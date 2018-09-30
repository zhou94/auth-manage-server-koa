const MenuModel = require('../models/menu');
const IdsModel = require('../models/ids');
exports.addMenu = async ctx =>{
    try{
        const{url,parentId,title,icon} = ctx.request.body;
        const menuId =  await IdsModel.findOneAndUpdate({_id:"menu_id"},{$inc:{sequence_value:1}},{upsert:true,new:true});
        const save = {
            ...ctx.request.body,
            id:menuId.sequence_value
        }
        await MenuModel.create(save);
        ctx.state.success(null,'新增成功')
    }catch(err){
        ctx.state.error(err.message)
    }
}
exports.getList = async ctx =>{
    try{
        const {id} = ctx.request.body;
        const list = await MenuModel.find({pid:id},{meta:0,__v:0,_id:0});
        ctx.state.success(list)
    }catch(err){
        ctx.state.error(err.message)
    }
}

exports.getTree = async ctx => {
    try{
        var data = await MenuModel.find({},{meta:0,__v:0,_id:0}).lean(

        )
        function fn(data,pid){
            let result = [] , temp;
            for(let i in data){
                if(data[i].pid==pid){
                    data[i].children = [];
                    result.push(data[i]); 
                    temp = fn(data,data[i].id);           
                    if(temp.length>0){
                        data[i].children=temp;
                    }          
                }       
            }
            return result;
        }
        const list  = fn(data,null);
        ctx.state.success(list)
    }catch(err){
        ctx.state.error(err.message)
    }
}

exports.delete = async ctx=>{
    const{id} = ctx.request.body;
    try{
        if(id){
            await MenuModel.findOneAndRemove({id:id});
            ctx.state.success(null,'删除成功')
        }else{
            ctx.state.error('非法参数')
        }
    }catch(err){
        ctx.state.error(err.message)
    }
}

exports.edit = async ctx=>{
    const {id} = ctx.request.body;
    try{
        if(id){
            await MenuModel.findOneAndUpdate({id:id},ctx.request.body);
            ctx.state.success(null,'修改成功')  
        }else{
            ctx.state.error('非法参数')
        }
    }catch(err){
        ctx.state.error(err.message)
    }
}