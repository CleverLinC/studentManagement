const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const session = require('express-session');

//导入静态
app.use(express.static(path.join(__dirname,'statics')));


app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

const account = require(path.join(__dirname,"/routers/accountRouter.js"));

app.use('/account',account);


//监听
app.listen(2999,'127.0.0.1',err=>{
    if(err){
        console.log(err)
    }

    console.log("start OK")
})