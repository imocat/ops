'use strict';

module.exports = {
	getUnixTimestamp: function() {
		return parseInt((new Date()).getTime() / 1000);
	}
};