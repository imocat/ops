'use strict';

process.env.APP_TOKEN_EXPIRE = 3600;
process.env.APP_KEY = '123123';

var http = require('http');
var restify = require('restify');

var server = restify.createServer({
	name: 'test'
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser({
	mapParams: false
}));

// 使用中间件
require('../index')(server);

server.listen(3000);
server.on('error', function(err) {
	console.log('server has error', err);
});

server.listen(3000, function() {
	console.log('server is start');
});