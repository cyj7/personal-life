var express = require("express");
var router = express.Router();
var crypto = require("crypto");
var dbConfig = require('../db/dbConfig');

router.route('/').get(function(req,res){
	if(req.session.user){
		res.redirect('/');
	}else{
		res.render('login',{"title": "登录-后台管理系统"});
	}
}).post(function(req, res){
	var md5 = crypto.createHash("md5");
	var pwd = md5.update(req.body.password).digest('hex');
	dbConfig.selectFun("password", req.body.username, function(err, result){
		if(typeof err != 'undefined'){
			return res.send({'error': '服务器出错了，请稍后！'});
		}
		if(result[0].password === pwd){
			req.session.user = req.body.username;
			res.redirect("/");
		}else{
			res.render('login',{"title": "登录-后台管理系统","error": '用户名或密码错误'})
		}
	});
});

module.exports = router;