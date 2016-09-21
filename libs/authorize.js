'use strict';

var async = require('async');

var datetime = require('./datetime');
var encrypt = require('./encrypt');

module.exports = function(req, res, next) {

	var APP_TOKEN_EXPIRE = parseInt(process.env.APP_TOKEN_EXPIRE);
	var APP_KEY = process.env.APP_KEY;

	if (isNaN(APP_TOKEN_EXPIRE) || APP_TOKEN_EXPIRE <= 0) {
		APP_TOKEN_EXPIRE = 30;
	}

	// TOKEN 验证
	var appToken = req.query.token || '';

	// 并行验证
	async.parallel({
			// header 验证
			empty: function(cb) {

				if (appToken) {
					cb();
					return;
				}

				cb(new Error('empty token'));
				return;
			},
			// 格式验证
			format: function(cb) {

				if (appToken.indexOf(',') !== -1) {
					cb();
					return;
				}

				cb(new Error('token format error'));

				return;
			},
			// 有效性验证
			valid: function(cb) {

				// 验证标识符
				var error = '';

				// 拆分签名
				var tokenInfo = appToken.split(',');
				// 判断时间戳差
				var token = tokenInfo[0];
				var timestamp = parseInt(tokenInfo[1]);

				var now = datetime.getUnixTimestamp();

				// 1. 是否过期?
				if (
					(
						timestamp > now &&
						timestamp - now > APP_TOKEN_EXPIRE
					) || (
						timestamp < now &&
						now - timestamp > APP_TOKEN_EXPIRE
					)
				) {
					error = 'token expires';
				} else {
					error = 'invalid token';
					// 2. 签名是否有效
					if (token === encrypt.md5(APP_KEY + timestamp)) {
						error = '';
					}
				}

				if (!error) {
					cb();
					return;
				}

				cb(new Error(error));

				return;
			}
		},
		function(err, result) {

			if (err) {
				// 返回 401 错误
				res.statusCode = 401;
			}

			next(err);

		});
};