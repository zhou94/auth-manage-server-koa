/*
 * @Author: zhou94 
 * @Date: 2018-09-30 14:17:43 
 * @Last Modified by: zhou94
 * @Last Modified time: 2018-09-30 16:45:17
 */
const multer = require('koa-multer');
const path = require('path');

const storage = multer.diskStorage({
    destination:'public/uploads/',
    filename(ctx,file,cb){
        const filenameArr = file.originalname.split('.');
        cb(null,(new Date().getTime() + Math.ceil(Math.random()*10000)).toString(16) + '.' + filenameArr[filenameArr.length-1]);
    }
})

const upload = multer(storage);

module.exports = upload;