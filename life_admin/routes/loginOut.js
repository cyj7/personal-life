var express = require('express');
var app = express();

app.get('/', function(req, res){
	req.session.user.destroy(); //销毁session
	res.redirect('/login');
});

module.exports = app;