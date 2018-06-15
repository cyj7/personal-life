var express = require("express");
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var path = require("path");
var ueditor = require("ueditor");

var index = require('./routes/index');
var register = require('./routes/register');
var loginOut = require('./routes/loginOut');
var login = require('./routes/login');
var category = require('./routes/category');
var article = require('./routes/article');

var app = express();

app.use(bodyParser.urlencoded({ extended: false })); //post提交 req.body接收参数， req.query 接收get参数  string类型
app.use(express.static(path.join(__dirname, 'public'))); //静态文件

app.use(cookieParser('cyj')); //挂载中间件，可以理解为实例化,传一个自定义字符串作为secret,可以提高安全性
app.use(session({
	"resave": true, //重新保存：强制会话保存即使是未修改的。
	"saveUninitialized": true, //强制“未初始化”的会话保存到存储
	"secret": 'cyj', //签名需要与cookieParser设置一致
	"cookie": { 
		"maxAge": 1000*60*60*24 //有效期,单位毫秒,此有效期为24小时
	},
	"name": "session_user" //在浏览器中生成cookie的名称key，默认是connect.sid
}))


app.set('views', path.join(__dirname, 'views')); //于配置页面文件(例如 .ejs 文件)的根目录,访问 ./index 则等同于访问 views/index.ejs
app.set("view engine", "ejs");//使用ejs作为模版

app.use("/ueditor/ue", ueditor(path.join(__dirname, 'public'), function(req, res, next) {  
// ueditor 客户发起上传图片请求  
    if(req.query.action === 'uploadimage'){  
        var foo = req.ueditor;  
        var date = new Date();  
        var imgname = req.ueditor.filename;  
  
        var img_url = '/images/ueditor/';  
        res.ue_up(img_url); //你只要输入要保存的地址 。保存操作交给ueditor来做  
    }  
//  客户端发起图片列表请求  
    else if (req.query.action === 'listimage'){  
        var dir_url = '/images/ueditor/';  
        res.ue_list(dir_url);  // 客户端会列出 dir_url 目录下的所有图片  
    }  
// 客户端发起其它请求  
    else {  
        res.setHeader('Content-Type', 'application/json');  
        res.redirect('/ueditor/ueditor.config.json')  
    }
})); 

app.use('/', index); 
app.use('/register', register);
app.use('/login', login);
app.use('/loginout', loginOut); //退出
app.use('/category', category); //栏目
app.use('/article', article); //文章

var server = app.listen(3000, function(){
	var host = server.address().address;
	var port = server.address().port;
	console.log('Example app listening at http://%s:%s', host, port);
});




