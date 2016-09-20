'use strict';

var appStatus = require('./app_status');

module.exports = function(req, res, next) {

	if (appStatus.status !== 'stop') {
		next();
	} else {

		res.json({
			error: 0,
			message: 'server is stop'
		});

		res.end();
		return;
	}
}