module.exports = async (ctx,next) => {
    try{
        ctx.state.success = function(data,msg){
            ctx.body = {
                status:1,
                msg:msg||'',
                data:data||null
            }
            
        }
        ctx.state.error = function(msg,data){
            ctx.body = {
                status:0,
                msg:msg||'',
                data:data||null
            }
        }
        await next();
    }catch(err){

    }
}