'use strict';

var os = require('os');

// APP 状态
var appStatus = require('./libs/app_status');

// APP 状态处理中间件
var status = require('./libs/status');
// 授权中间件
var authorize = require('./libs/authorize');

module.exports = function(app) {

	/**
	 * ping
	 * 
	 * @param  {[type]} req  [description]
	 * @param  {[type]} res) {		res.send({			id: process.env.APP_ID,			name: os.hostname(),			version: process.env.APP_VERSION || '',			status: appStatus.status || 'running'		});	} [description]
	 * @return {[type]}      [description]
	 */
	app.get('/ping', function onPing(req, res) {
		res.send({
			id: process.env.APP_ID,
			name: os.hostname(),
			version: process.env.APP_VERSION || '',
			status: appStatus.status || 'running'
		});
	});

	/**
	 * 监控服务
	 * @param  {[type]} req  [description]
	 * @param  {[type]} res) {		res.send({			id: process.env.APP_ID,			name: os.hostname(),			version: process.env.APP_VERSION || '',			status: appStatus.status || 'running'		});	} [description]
	 * @return {[type]}      [description]
	 */
	app.get('/__ops/ping', function onPing(req, res) {
		res.send({
			id: process.env.APP_ID,
			name: os.hostname(),
			version: process.env.APP_VERSION || '',
			status: appStatus.status || 'running'
		});
	});

	/**
	 * 开始服务
	 * @param  {[type]} req  [description]
	 * @param  {String} res) {		appStatus.status [description]
	 * @return {[type]}      [description]
	 */
	app.get('/__ops/start', authorize, function onStart(req, res) {
		appStatus.status = 'running';

		res.send({
			status: appStatus.status
		});
	});

	/**
	 * 停止服务
	 * @param  {[type]} req  [description]
	 * @param  {String} res) {		appStatus.status [description]
	 * @return {[type]}      [description]
	 */
	app.get('/__ops/stop', authorize, function(req, res) {

		appStatus.status = 'stop';

		res.send({
			status: appStatus.status
		});
	});

	// 状态中间件
	app.use(status);

};