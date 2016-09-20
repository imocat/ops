'use strict';

var appStatus = require('./app_status');

module.exports = function(req, res, next) {

	if (appStatus.status !== 'stop') {
		next();
	} else {
		res.statusCode = 500;
		res.end();
		return;
	}

}