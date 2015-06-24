var gulp = require('gulp'),     
    sass = require('gulp-ruby-sass') ,
    notify = require("gulp-notify") ,
    bower = require('gulp-bower'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    rename = require('gulp-rename');
    connect = require('gulp-connect');

var config = {
     sassPath: './resources/sass',
     bowerDir: './bower_components' 
}

gulp.task('bower', function() { 
    return bower()
         .pipe(gulp.dest(config.bowerDir)) 
});

gulp.task('icons', function() { 
    return gulp.src(config.bowerDir + '/fontawesome/fonts/**.*') 
        .pipe(gulp.dest('./public/fonts')); 
});

gulp.task('images', function() { 
    return gulp.src('./resources/img/**.*') 
        .pipe(gulp.dest('./public/img')); 
});

// uglify task
gulp.task('js', function() {
	gulp.src([
		config.bowerDir + '/jquery/dist/jquery.js',
		config.bowerDir + '/bootstrap/dist/js/bootstrap.js',
        './resources/js/app.js'
		])
		.pipe(concat('app.js'))
		.pipe(gulp.dest('./tmp'))
		.pipe(uglify())
		.pipe(rename('app.min.js'))
		.pipe(uglify())
        .pipe(gulp.dest('./public/js'))
});

gulp.task('sass', function() { 
    return sass(config.sassPath + '/style.scss', 
	{
             style: 'compressed',
             loadPath: [
                 './resources/sass',
                 config.bowerDir + '/bootstrap-sass-official/assets/stylesheets',
                 config.bowerDir + '/fontawesome/scss',
             ]
         }) 
         .on("error", notify.onError(function (error) {
                 return "Error: " + error.message;
             })) 
         .pipe(gulp.dest('./public/css'))
	 	.pipe(connect.reload());
});

gulp.task('connect', function() {
	connect.server({
		root: 'public',
		port: 8000,
		livereload: true
	});
});

// Rerun the task when a file changes
 gulp.task('watch', function() {
     gulp.watch(config.sassPath + '/**/*.scss', ['js', 'images', 'sass']);

	gulp.watch('./resources/js/**/*.js', function() {
			gulp.run('js');
		});
	});

gulp.task('default', ['bower', 'icons', 'js', 'images', 'sass', 'connect', 'watch']);

