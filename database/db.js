'use strict';

const mongoose =require('mongoose');
const chalk = require('chalk');
const config = require('../config/index')
mongoose.connect(config.database,{ useNewUrlParser: true });
mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.once('open' ,() => {
	console.log(
    chalk.green('连接数据库成功')
  );
})

db.on('error', function(error) {
    console.error(
      chalk.red('mongodb连接发生错误: ' + error)
    );
    mongoose.disconnect();
});

db.on('close', function() {
    console.log(
      chalk.red('数据库断开，重新连接数据库')
    );
    mongoose.connect(config.database, {server:{auto_reconnect:true}});
});


module.exports = db;
