const router = require('koa-router')()
const controller =require('../controllers/user');
const upload = require('../utils/upload');
//路由

router.post('/login.json',controller.userLogin)
      .post('/register.json',controller.userRegister)
      .post('/userInfo.json',controller.getUserInfo)
      .post('/singout.json',controller.signOut)
      .post('/list.json',controller.userList)
      .post('/userAvatar.json',controller.uploadAvatar)
module.exports = router;