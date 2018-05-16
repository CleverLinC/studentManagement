const express = require('express');
const path = require('path');

const app = express();

//导入静态
app.use(express.static(path.join(__dirname,'statics')));

const account = require(path.join(__dirname,"/routers/accountRouter.js"));

app.use('/account',account);


//监听
app.listen(2999,'127.0.0.1',err=>{
    if(err){
        console.log(err)
    }

    console.log("start OK")
})