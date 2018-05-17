const express = require('express');
const path = require('path');


//创建路由对象
const accountRouter = express.Router();
//导入
const accountCyrl = require(path.join(__dirname,'../controllers/accountController.js'));

accountRouter.get('/login',accountCyrl.accountController);
accountRouter.get('/vcode',accountCyrl.getVcodeImage);

//处理跳转注册
accountRouter.get('/register',accountCyrl.getRegister);

//处理注册
accountRouter.post('/register',accountCyrl.register)

//处理登录
accountRouter.post('/login',accountCyrl.login)
//导出
module.exports = accountRouter

