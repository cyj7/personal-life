var express = require('express');
var router = express.Router();
var dbConfig = require("../db/dbConfig");
// var util = require('util');
var crypto = require("crypto");

// router.post('/', function(){

// })

router.route('/').get(function(req,res){
	res.render('register',{'title': '注册'});
}).post(function(req, res){
	// res.render('register', {'title': '注册',"req": util.inspect(req,{depth:null}), "res": util.inspect(res,{depth:null})})
	var clinet = dbConfig.dbConnect;
	var md5 = crypto.createHash("md5");
	var pwd = md5.update(req.body.pwd).digest('hex');
	var username = req.body.username;
	dbConfig.selectFun("user_name", username, function(err, result){
		if(typeof err != 'undefined'){
			return res.send({'error': '服务器出错了，请稍后！'});
		}
		if(typeof(result) != 'undefined' && result.length > 0){
			res.render('register',{'title': '注册', 'error': '用户名已存在', 'username': username, 'pwd': req.body.pwd});
		}else{
			dbConfig.insertFun(clinet, username, pwd, function(){
				req.session.user = username;
				console.log('end');
				res.redirect('/');
				// res.render('index',{'title': '后台管理'});
			});
		}
	})
	
})

module.exports = router;