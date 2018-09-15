const router = require('koa-router')();
const compose = require('koa-compose');
const checkToken = require('../token/checkToken');
const user = require('./user')
router.use(checkToken);
router.use('/api/user',user.routes(),user.allowedMethods())
module.exports = function routes() {
  return compose(
      [
          router.routes(),
          router.allowedMethods()
      ]
  )
}


