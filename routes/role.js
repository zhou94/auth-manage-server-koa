const router = require('koa-router')()
const controller =require('../controllers/role');


router.post('/add.json',controller.addRole)
      .post('/roleList.json',controller.roleList)
module.exports = router;