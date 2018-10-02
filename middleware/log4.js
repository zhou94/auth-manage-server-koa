const logUtil = require('../utils/log_utils');
const NODE_ENV = process.env.NODE_ENV;
module.exports = async (ctx,next) => {
    const start = new Date();
    var ms;
    try {
        await next();
        ms = new Date() - start;
        // NODE_ENV == 'development'?
        // logUtil.logResponse(ctx, ms);
        switch(NODE_ENV){
            case 'production':
                logUtil.logResponse(ctx, ms);
                break;
            default:
                logUtil.logInfo(ctx,ms);
                break;     
        }

    } catch (error) {
        ms = new Date() - start;
        switch(NODE_ENV){
            case 'production':
                logUtil.logError(ctx, error, ms);
                break;
            default:
                logUtil.logInfo(ctx, error, ms);
                break;
        }
    }
}