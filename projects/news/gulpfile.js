var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

// Paths
var stylesDir = 'theme/styles';
var scriptsDir = 'theme/scripts';

// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'js'], function () {
	browserSync.init({
		server: './',
		notify: false,
		ui: false
	});
	gulp.watch('*.html').on('change', browserSync.reload);
	gulp.watch(stylesDir + '/**/*.scss', ['sass']);
	gulp.watch(scriptsDir + '/**/*.js', ['js-watch']);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function () {
	return gulp.src(stylesDir + '/sass/master.scss')
		.pipe(sass({
			outputStyle: 'compressed' // output minified
		}).on('error', sass.logError))
		.pipe(autoprefixer({ // auto vendor prefixing
			browsers: ['last 3 versions'],
			cascade: false
		}).on('error', sass.logError))
		.pipe(gulp.dest(stylesDir + '/'))
		.pipe(browserSync.stream());
});

// process JS files and return the stream.
gulp.task('js', function () {
	return gulp.src([
			scriptsDir + '/master.js'
		])
		.pipe(concat('master.min.js')) // concatenate to one JS
		.pipe(uglify({ // minify js
			preserveComments: 'some'
		}))
		.on('error', function() { this.emit('end'); })
		.pipe(gulp.dest(scriptsDir + '/'));
});

// create a task that ensures the `js` task is complete before reloading browsers
gulp.task('js-watch', ['js'], browserSync.reload);

// use default task to launch Browsersync and watch JS files
gulp.task('default', ['serve']);
