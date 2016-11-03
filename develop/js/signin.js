/*!
 * project name: emtp_m_www
 * name:         signin.js
 * version:      v0.0.1
 * author:       gao
 * date:         2016/8/5
 */

'use strict';
	
var Signin = function(){
	this.init = function () {
		this.bind();
	};
	this.bind = function () {
		$('.input-top,.input-bottom').on('click',function (evt) {
			$(evt.currentTarget).children('input').val('');
		});

		$('.sign-in').on('click', function() {
			// var account = $('.input-top input').val();
			// var password = $('.input-bottom input').val();

			// if(account === '' || password === ''){
			// 	alert('请输入账号密码');
			// }
			// else if(account === '123' && password === '123') {
			// 	window.location.href ='../html/index.html';
			// } 
			// else {
			// 	alert('请登录');
			// }
			window.location.href ='../html/home.html';
		});
	};
};
	Signin = new Signin(); 
$(document).ready(function() {
	Signin.init();
});
	
