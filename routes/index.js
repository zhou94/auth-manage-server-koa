const router = require('koa-router')();
const compose = require('koa-compose');
const checkToken = require('../middleware/checkToken');
const user = require('./user')
const role = require('./role')
const menu = require('./menu')
router.use(checkToken);
router.use('/api/user',user.routes(),user.allowedMethods())
router.use('/api/role',role.routes(),role.allowedMethods())
router.use('/api/menu',menu.routes(),menu.allowedMethods())
module.exports = function routes() {
  return compose(
      [
          router.routes(),
          router.allowedMethods()
      ]
  )
}


