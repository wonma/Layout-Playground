var gulp = require('gulp'),
	watch = require('gulp-watch'),
	postcss = require('gulp-postcss'),
	autoprefixer = require('autoprefixer'),
	cssvars = require('postcss-simple-vars'),
	nested = require('postcss-nested'),
	cssImport = require('postcss-import'),
	browserSync = require('browser-sync').create();


gulp.task('watch', function() {
	browserSync.init({
		notify: false,
		server: {
			baseDir: "app"
		}
	});
	watch('./app/index.html', function() {
		browserSync.reload();
	});
	watch('./app/styles/**/*.css', function() {
		gulp.start('cssInject');
	});
});

gulp.task('watch2', function() {
	browserSync.init({
		notify: false,
		server: {
			baseDir: "./app",
			index: "about.html"
		}
	});
	watch('./app/about.html', function() {
		browserSync.reload();
	});
	watch('./app/styles/**/*.css', function() {
		gulp.start('cssInject');
	});
});



gulp.task('style', function() {
	return gulp.src(['./app/styles/style.css', './app/styles/style2.css'])
		.pipe(postcss([cssImport, cssvars, nested, autoprefixer]))
		.on('error', function(errorInfo) {
			console.log(errorInfo.toString());
			this.emit('end');			
		})
		.pipe(gulp.dest('./app/temp/styles'))
});

gulp.task('cssInject', ['style'], function() {
	return gulp.src('./app/temp/styles/*.css')
		.pipe(browserSync.stream());
});