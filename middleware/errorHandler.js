module.exports = async(ctx, next) => {
    try {
        ctx.error = (code, message) => {
            console.log('threw error');
            if (typeof code === 'string') {
                message = code;
                code = 500;
            }

            ctx.throw(code || 500, message || '服务器错误');
        };

        await next();
    } catch (e) {
        let status = e.status || 500;
        let message = e.message || '服务器错误';
        ctx.body = { status, message };

        // 手动释放 error 事件
        ctx.app.emit('error', e, ctx);
    }
}