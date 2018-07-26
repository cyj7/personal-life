var express = require("express");
var app = express();
var router = express.Router();
var dbConfig = require("../db/dbConfig");

router.route('/list').get(function(req, res){ //列表 查询
	dbConfig.selectCategory(function(err, result){
		res.render('article_list',{'title': '已发布的文章', 'username': req.session.user,'list': result});
	}, 'article');
});

router.route('/add').post(function(req, res){//添加 文章
	var title = req.body.title,
	 	content = req.body.content,
	 	category = req.body.category,
	 	creatTime = new Date().getTime();
	 if(title === '' || content === ''){
	 	dbConfig.selectCategory(function(err, data){
			res.render('article_add',{'title': '已发布的文章', 'username': req.session.user,'category': data, 'error': '请填写标题或者内容'});
		}, 'category');
	 	// res.render('article_add', {'title': '已发布的文章', 'username': req.session.user, 'error': '请填写标题或者内容'});
	 }else{
	 	dbConfig.addArticle({'title': title, 'content': content, 'creatTime': creatTime, 'category': category}, function(err, result){
	 		if(err) return res.render('article_add', {'title': '已发布的文章', 'username': req.session.user, 'error': err});
	 		res.redirect('/article/list');
	 	})
	 }
}).get(function(req, res){
	dbConfig.selectCategory(function(err, data){
		res.render('article_add',{'title': '已发布的文章', 'username': req.session.user,'category': data});
	}, 'category');
});

router.route('/detail/:id').get(function(req, res){
	dbConfig.selectCategory(req.params.id,function(err, result){
		res.render('article_show',{'title': '已发布的文章', 'username': req.session.user,'data': result[0]});
	}, 'article', 'id');
});

module.exports = router;