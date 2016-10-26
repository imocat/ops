'use strict';

var os = require('os');

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
			status: 'running'
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
			status: 'running'
		});
	});

};