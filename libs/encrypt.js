'use strict';

var crypto = require('crypto');
var buffer = require('buffer').Buffer;

module.exports = {
	md5: function(str) {
		var buffer = new Buffer(str);
		var binary = buffer.toString('binary');
		return crypto.createHash('md5').update(binary).digest('hex');
	}
};