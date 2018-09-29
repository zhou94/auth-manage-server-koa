const router = require('koa-router')()
const controller =require('../controllers/user');


router.post('/login.json',controller.userLogin)
      .post('/register.json',controller.userRegister)
      .post('/userInfo.json',controller.getUserInfo)
      .post('/singout.json',controller.signOut)
      .post('/list.json',controller.userList)

module.exports = router;