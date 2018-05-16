const express = require('express');
const path = require('path');
//创建路由对象
const accountRouter = express.Router();
//导入
const accountCyrl = require(path.join(__dirname,'../controllers/accountController.js'));

accountRouter.get('/login',accountCyrl.accountController);
accountRouter.get('/vcode',accountCyrl.getVcodeImage)

//导出
module.exports = accountRouter

