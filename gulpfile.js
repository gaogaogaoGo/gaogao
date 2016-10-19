/*!
 * project name: emtp
 * name:         gulpfile.js
 * version:      v0.0.1
 * author:       gao
 * date:         2016/8/1
 */

/* 插件作用
	gulp-load-plugins 加载package.json中的插件，无需每个引用节省代码
	gulp-useref 可以将html中零碎的东西合并成一个文件，但是不压缩代码
	gulp.pipe: 管道
	gulp-autorefixer 根据浏览器自动处理浏览器前缀，不用考虑浏览器兼容
	gulp-plumber 自动处理全部错误信息防止因为错误而导致 watch 不正常工作
	gulp-imgagemin 压缩图片文件
	gulp-cache原理是监控图片被改变了，替换了，才去压缩
*/
'use strict';

var gulp = require('gulp');

//加载package.json中的插件
var $    = require('gulp-load-plugins')({scope: 'devDependencies'});

// var sass = require('gulp-sass');
// var concat = require('gulp-concat');//合并
// var uglify = require('gulp-uglify');//uglify 组件（用于压缩 JS）
// var rename = require('gulp-rename');//重命名
var browserSync = require('browser-sync');
var reload  = browserSync.reload;
var runSequence = require('run-sequence');

//clean .temp  del 删除文件、文件夹
gulp.task('clean', require('del').bind(null, ['dist']));

//检查js脚本任务
gulp.task('jshint', function () {
	return gulp.src(['develop/js/*.js','!develop/vender/**/*.js'])
		.pipe(reload({stream:true, once: true}))
		.pipe($.jshint('.jshintrc'))
	  .pipe($.jshint.reporter('jshint-stylish'))
	  .pipe((!browserSync.active, $.jshint.reporter('fail')));
});

//sass编译
gulp.task('sass', function () {
	//浏览器处理前缀
	var AUTOPREFIXER_BROWSERS = [
    //'> 1%',
    //'last 2 versions',
    //'Firefox ESR',
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.1',
    'bb >= 10'
  ];

	return gulp.src(['develop/scss/*.scss', '!develop/scss/_*.scss'])
			.pipe($.plumber())
			.pipe($.sourcemaps.init())
			.pipe($.sass.sync({		//scss中的引用
	      outputStyle: 'expanded',
	      precision: 10,
	      includePaths: ['.']
	    }).on('error', $.sass.logError))
	    .pipe($.autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
			.pipe($.sourcemaps.write('.'))
			.pipe(gulp.dest('dist/css'))
			.pipe(reload({stream: true}));		
});

//js
gulp.task('scripts', function () {
	return gulp.src('develop/js/**/*.js')
		.pipe($.plumber()) 
		.pipe($.sourcemaps.init())
    	.pipe($.sourcemaps.write('.'))
		.pipe(gulp.dest('dist/js'))
		.pipe(reload({stream: true}));
});

gulp.task('images', function () {
	return gulp.src('develop/img/*')	
		.pipe($.cache($.imagemin({
			//optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
      progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
      interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
     // multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
		})))
		.pipe(gulp.dest('dist/img'));
});

gulp.task('html',['sass', 'scripts'], function () {
	return gulp.src([
		'develop/html/*.html',
		'!develop/html/_*.html',
		])
			/*ejs is unnecessary, here you can use gulp-file-include
			html代码的维护性和可复用性 在html中可以引用其他html
			<%-include include/header  %>*/
	    .pipe($.ejs({
	      compileDebug: true,
	      client: false
	    },{ext: '.html'}))

	    	//gulp-file-include这种方式在html中 @@include('include/header.html')
	    //.pipe(fileinclude({
	    //  prefix: '@@',
	    //  basepath: '@file'
	    //}))
			.pipe(gulp.dest('dist/html'))
			.pipe(reload({stream: true}));				
});

gulp.task('serve',['sass', 'scripts', 'html', 'images'], function () {
	browserSync.init({
		  port: 3000,
		server: {
			baseDir: ['dist', 'develop'] //引入目录和开发目录
		}
	});
	gulp.watch('develop/**/*.html', ['html']);
  	gulp.watch('develop/**/*.scss', ['sass']);
  	gulp.watch('develop/js/*.js', ['jshint', 'scripts']);
});

//doc task
gulp.task('doc', function () {
  return gulp.src('./develop/**/*.js')
    .pipe($.jsdoc('dist/doc'));
});

gulp.task('build', function (cb) {
	runSequence(
    'clean',
    'doc',
    'html',
    'images',
    function (err) {
      if (err) {
        console.log(err.message);
      }
      else {
        console.log('EMTP: RELEASE FINISHED SUCCESSFULLY');
      }

      cb(err);
    }
  );
});

gulp.task('default', ['clean'], function () {
	gulp.start('build');
});
