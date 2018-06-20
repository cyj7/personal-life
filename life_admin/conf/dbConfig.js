//配置数据库
var mysql = require('mysql');

var db = mysql.createConnection({ //建立数据库连接
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'life',
	// port: 3306
});

//连接数据库
// db.connect();

function insertFun(db, username, password, callback) { //插入数据
	var insertStr = 'insert into admin(user_name, password) value(?,?)';
	var userInfo = [username, password];
	db.query(insertStr, userInfo, function(err, result){
		if(err) return console.log("[insert into]:", err.message);
		callback(result);
	});
}

// function selectUserName(username, callback) { //注册查询用户名是否存在
// 	var selStr = 'select username from admin where user_name=' + username;
// }

function selectFun(user, username, callback) {//查询 密码
	var selStr = 'select ' + user + ' from admin where user_name=' + username;
	db.query(selStr, function(err, result){
		// if(err) return err;
		callback(err, result);
	});
}

function selectCategory(name, callback, dbName, row){ //查询 类别\文章
	var selStr = '';
	if(typeof name == 'function' || name == ''){
		if(typeof name == 'function'){
			dbName = callback;
			callback = name;
		}
		if(typeof dbName == 'undefined'){
			dbName = 'category';
		}
		selStr = 'select * from '+dbName;
	}else{
		if(typeof row != 'undefined'){
			selStr = 'select * from '+ dbName +' where '+ row +'=' + name;
		}else{
			selStr = 'select * from '+ dbName +' where name=' + name;
		}
	}
	db.query(selStr, function(err, result){
		callback(err, result);
	});
}

function addCategory(name, callback){ //添加类别
	var addStr = 'insert into category(name) value(?)';
	db.query(addStr, name, function(err, result){
		callback(err, result);
	});
}

function updateCategory(item, callback){//更新 类别
	var updateStr = 'update category set name = ? where id= ?';
	db.query(updateStr,[item.name, item.id],function(err, result){
		callback(err, result);
	});
}

function deleteCategory(id, callback){ //删除 类别
	var delStr = 'delete from category where id = '+id;
	db.query(delStr, function(err, result) {
		callback(err,result);
	});
}

function addArticle(item, callback){ // 添加 文章
	var addStr = 'insert into article(title, content, creat_time, category) value(?,?,?,?)';
	db.query(addStr, [item.title, item.content, item.creatTime, item.category], function(err, result){
		callback(err,result);
	});
}

//对外返回数据库连接
exports.dbConnect = db;
exports.insertFun = insertFun;
exports.selectFun = selectFun;
exports.selectCategory = selectCategory;
exports.addCategory = addCategory;
exports.updateCategory = updateCategory;
exports.deleteCategory = deleteCategory;
exports.addArticle = addArticle;




