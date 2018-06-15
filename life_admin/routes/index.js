var express = require("express");
var app = express();
var dbConfig = require("../conf/dbConfig");

app.get("/", function(req, res){
	if(req.session.user){
		var user = req.session.user;
		var list = [];
		dbConfig.selectCategory(function(err, result){
			// console.log(result);
			res.render('index', {"title": "后台管理系统", "username": user, "categoryList": result});
		});
		
	}else{
		res.redirect('/login');
	}
})

module.exports = app;