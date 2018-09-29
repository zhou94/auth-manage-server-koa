const router = require('koa-router')()
const controller =require('../controllers/menu');


router.post('/add.json',controller.addMenu)
      .post('/treeList.json',controller.getTree)
      .post('/list.json',controller.getList)
      .post('/delete.json',controller.delete)
      .post('/edit.json',controller.edit)
module.exports = router;