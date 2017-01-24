var gulp = require('gulp'),
    less = require('gulp-less'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    LessPluginAutoPrefix = require('less-plugin-autoprefix'),
    autoprefix = new LessPluginAutoPrefix({ browsers: ["last 2 versions"] });

var appScripts = [
    'app/**/*.module.js',
    'app/**/*.js'],
    vendorScripts = [];

gulp.task('less', function () {
    gulp.src('**/*.less')
        .pipe(less({
            plugins: [autoprefix]
        }))
        .pipe(gulp.dest(function (f) {
            return f.base;
        }));
});

gulp.task('compress', function () {
    gulp.src([
        'app/**/*.module.js',
        'app/**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('concat.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('app.min.js'))
        //.pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist'));
});

gulp.task('copy_vendors', function () {
    gulp.src(vendorScripts)
        .pipe(gulp.dest('vendor'));
});

gulp.task('default', ['less', 'copy_vendors', 'compress'], function () {
    gulp.watch('**/*.less', ['less']);
    gulp.watch('app/**/*.js', ['compress']);
});