var gulp = require('gulp'),
	less = require('gulp-less'),
	concat = require('gulp-concat'),
	jshint = require('gulp-jshint'),
	vendor = {
		js: [
			'vendor/socket.io-client/socket.io.js',
			'vendor/jquery/index.js',
			'vendor/react/react.js',
			'vendor/react/react-dom.js'
		]
	},
	paths = {
		index: './src/index.html',
		img: './images/*.{png,jpg}',
		less: './src/**/*.less',
		font: './fonts/*.{ttf,eot,svg,woff,woff2,otf}',
		js: [
			'./src/**/*.js'
		]
	},
	babel = require('gulp-babel'),
	browserify = require('gulp-browserify'),
	rename = require('gulp-rename'),
	moduleName = 'app';

gulp.task('less', function() {
	return gulp.src(paths.less)
		.pipe(concat('main.css'))
		.pipe(less())
		.pipe(gulp.dest('./build/css'));
});

gulp.task('js', function() {
	return gulp.src('/src/index.js')
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(browserify())
		.pipe(babel({
			presets: ['es2015', 'react']
		}))
		// .pipe(browserify({
      // transform: ['babelify'],
    // }))
		// .pipe(browserify({debug:true}))
		.pipe(rename('main.js'))
		// .pipe(concat('main.js'))
		.pipe(gulp.dest('./build/js'));
});

gulp.task('vendor', function() {
	return gulp.src(vendor.js)
		.pipe(concat('vendor.js'))
		// .pipe(uglify())
		.pipe(gulp.dest('./build/js'));
});

gulp.task('index', function() {
	return gulp.src(paths.index)
		.pipe(gulp.dest('./build'));
});

gulp.task('img', function() {
	return gulp.src(paths.img)
		.pipe(gulp.dest('./build/images'));
});

gulp.task('font', function() {
	return gulp.src(paths.font)
		.pipe(gulp.dest('./build/fonts'));
});

gulp.task('watch', function() {
	gulp.watch(paths.index, ['index']);
	gulp.watch(paths.less, ['less']);
	gulp.watch(paths.js, ['js']);
	gulp.watch(paths.img, ['img']);
});

gulp.task('default', [
	'watch',
	'less',
	'index',
	'js',
	'img',
	'font',
	'vendor'
]);