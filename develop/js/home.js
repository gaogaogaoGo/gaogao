/*!
 * project name: emtp_m_www
 * name:         index.js
 * version:      v0.0.1
 * author:       gao
 * date:         2016/8/3
 */
'use strict';

var Index = function () {

	this.init = function () {

		// $('body').scrollspy({ target: '#myScrollspy' });
		this.bind();
	};
	this.bind = function () {
		 $('.container').scrollspy();
	};	
};

var index = new Index();

$(document).ready(function() {
	index.init();
});
