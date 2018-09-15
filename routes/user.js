const router = require('koa-router')()
const controller =require('../contollers/user');


router.post('/login.json',controller.userLogin)
      .post('/register.json',controller.userRegister)
      .post('/userInfo.json',controller.getUserInfo)
      .post('/singout.json',controller.signOut)


module.exports = router;