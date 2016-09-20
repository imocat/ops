'use strict';

process.env.APP_TOKEN_EXPIRE = 3600;
process.env.APP_KEY = '123123';

var http = require('http');
var app = require('express')();

// 使用中间件
require('../index')(app);

var server = http.createServer(app);

server.listen(3000);
server.on('error', function(err) {
	console.log('server has error', err);
});

server.listen(3000, function() {
	console.log('server is start');
});