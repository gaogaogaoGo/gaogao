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
		this.bind();
	};
	this.bind = function () {
		$(document).scroll(function (){
		  this.scrollTop = $(window).scrollTop();	
			var dHeight = $(document).height();
			var wHeight = $(window).height();

			console.log(this.scrollTop);
			console.log(dHeight);		
			console.log(wHeight);

			var topH = $('.banner-info').height() - $('.banner-info-buttom').height();
			var bottomH = wHeight - $('.banner-info-buttom').height();
			if (this.scrollTop >= topH) {
				$('.banner-info-buttom').css({
					'position': 'fixed',
					'bottom': bottomH,
					'background': '#000'
				});
				$('.banner-info').css('opacity', 1);
			}
			else {
				$('.banner-info-buttom').css({
					'position': 'absolute',
					'bottom': 0,
					'background': null
				});
				$('.banner-info').css('opacity', 0.56);
			}

			if ( this.scrollTop >= 400 ) {
				$('.left-img').animate({
					opacity: 1,
					left: '50px'				
				},1000);

				$('.right-font').animate({
					opacity: 1,
					right: '13%'				
				},1000);
			}

			if ( this.scrollTop >= 1050 ) {
				$('.left-img2, .left-font3').animate({
					opacity: 1,
					left: '150px'
				},1000);

				$('.right-img2, .right-font3').animate({
					opacity: 1,
					right: '100px'
				},1000);
			}

			if (this.scrollTop >= 1800) {
				$('.bule-info .container').fadeIn (1500, function () {
				});			
			}
		});

		$('.banner-info-buttom ul li').on('click', function () {
			console.log('ss');
		});
	};


	// this.jump = function (evt) {
		
	// 	// var $target = $(evt.currentTarget);
	// 	// var index = $target.index();
	// 	console.log(index);
	// }.bind(this);
	Index = new Index();
};

// $(document).ready(function() {
// 	Index();
// });


//# sourceMappingURL=home.js.map
