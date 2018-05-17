const path =require('path');
const captchapng = require('captchapng');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

const dbName = 'nodeProject';

let vcode = null;
//登录页面请求
exports.accountController = (req,res)=>{
   res.sendFile(path.join(__dirname,'../statics/views/login.html'))
}

//验证码
exports.getVcodeImage =(req,res)=>{
    vcode =parseInt(Math.random()*9000+1000);
    //把验证码存在session中
    req.session.vcode = vcode;
    var p = new captchapng(80,30,vcode); // width,height,numeric captcha
    p.color(0, 0, 0, 0);  // First color: background (red, green, blue, alpha)
    p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)

    var img = p.getBase64();
    var imgbase64 = new Buffer(img,'base64');
    res.writeHead(200, {
        'Content-Type': 'image/png'
    });
    res.end(imgbase64);
}

//跳转注册页
exports.getRegister = (req,res)=>{
  res.sendFile(path.join(__dirname,'../statics/views/register.html'))
}

//注册请求处理
exports.register = (req,res)=>{
    const result ={
        status:0, //0代表注册成功
        message:"注册成功"
    }
    //console.log(req);
    MongoClient.connect(url, function(err, client) {
        const db = client.db(dbName);
            // Get the documents collection
            const collection = db.collection('user');
            // Find some documents
            collection.findOne({username:req.body.username},(err, docs)=>{
                //console.log(docs);
                if(docs==null){
                    collection.insertOne(req.body,(err, result2)=>{
                        client.close();
                       res.json(result)
                    })
                }else{
                    client.close();
                    result.status = 1;
                    result.message ="用户已存在";
                    res.json(result)
                }

            });
        })


}


//登录请求处理
exports.login = (req,res)=>{
    const result ={
        status:0,
        message:"登录成功"
    }
//    先判断验证码
    if(req.body.vcode!=req.session.vcode){
        result.status = 2;
        result.message ="验证码错误";

        res.json(result);

        return;
    }
    MongoClient.connect(url, function(err, client) {
        const db = client.db(dbName);
        // Get the documents collection
        const collection = db.collection('user');
        // Find some documents
        collection.findOne({username:req.body.username,password:req.body.password},(err, docs)=>{
            //console.log(docs);
            if(docs==null){
                result.status = 1;
                result.message ="账号或密码错误";

            }
             client.close();

             res.json(result)


        });
    })


}