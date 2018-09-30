const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const db = require('./database/db');
const routes =require('./routes/index'); 
const errorHandler = require('./middleware/errorHandler');
const response = require('./middleware/response');
const logger = require('./middleware/log4');

process.env.NODE_ENV = 'development';
// error handler
onerror(app)
// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(require('koa-static')(__dirname + '/public'))


//errorHandler
app.use(errorHandler);
//返回中间件
app.use(response);
//日志
app.use(logger);
//路由
app.use(routes())

module.exports = app
