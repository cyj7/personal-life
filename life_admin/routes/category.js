var express = require("express");
var app = express();
var router = express.Router();
var dbConfig = require("../db/dbConfig");



router.route('/').get(function(req, res){
	dbConfig.selectCategory(function(err, result){
		res.render('category',{"username": req.session.user, "categoryList": result});
	});
}).post(function(req, res){
	var categoryName = req.body.categoryName;
	dbConfig.selectCategory(categoryName, function(err, result){
		if(typeof result != 'undefined' && result.length > 0){
			// res.render('category',{"username": req.session.user, "categoryList": result, "error": '该栏目已存在'});
			return res.send({'code': 0, 'msg': '该栏目已存在'});
		}else{
			dbConfig.addCategory(categoryName, function(err, result){
				if(err){
					return res.send({'code': 0, 'msg': err})
					// res.render('category',{"username": req.session.user, "error": err});
				}
				return res.send({'code': 1, 'msg': ''})
				// res.render('category',{"username": req.session.user, "categoryList": result});
			});
		}
	}, 'category');
});

router.route('/edit').post(function(req, res){ //编辑
	var categoryName = req.body.categoryName;
	dbConfig.selectCategory(categoryName, function(err, result){
		if(typeof result != 'undefined' && result.length > 0){
			return res.send({'code': 0, 'msg': '该栏目已存在'});
		}else{
			dbConfig.updateCategory({'name': req.body.categoryName, 'id': req.body.id}, function(err, result){
				if(err){
					return res.send({'code': 0, 'msg': err});
				}
				return res.send({'code': 1, 'msg': ''});
			});
		}
		
	});
});

router.route('/delete/:_id').get(function(req, res){ //删除
	dbConfig.deleteCategory(req.params._id, function(err,result) {
		if(err){
			return res.send({'error': true});
		}
		res.send({'success':1});
	});
});

module.exports = router;