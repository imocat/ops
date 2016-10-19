# OPS 中间件

这是一个应用运维中间件, 服务端使用该中间件即让改应用提供 ping(监测) 服务接口

本中间件支持 express, restify 框架  

服务接口挂接在 /__ops 路径下, 如 

	/__ops/ping 
    
# 使用

## express

```js

var app = require('express')();

// 使用中间件
require('../index')(app);

```

## restify

```js

var server = restify.createServer({
	name: 'test'
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser({
	mapParams: false
}));

// 使用中间件
require('../index')(server);

```

