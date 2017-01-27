'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    watch = require('gulp-watch'),
    concat = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    minifycss = require('gulp-minify-css'),
    sourcemaps = require('gulp-sourcemaps');


//Set application items path
var markup = './markup',
    dist = './dist';

var markupPaths = {
    html    : [markup + '/**/*.html'],
    js      : [markup + '/assets/js/**/*.js'],
    scss    : [markup + '/assets/scss/**/*.scss'],
    fonts   : [markup + '/assets/fonts/**/*.*'],
    image   : [markup + '/assets/images/**/*.+(png|jpg|svg)']
};

//Process browser synchronization for HTML files
gulp.task('html', function () {
    return gulp.src(markupPaths.html)
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

//Concat and compress JS files. Process browser sync.
gulp.task('js', function () {
    return gulp.src(markupPaths.js)
        .pipe(uglify())
        .pipe(concat('assets.js'))
        .pipe(gulp.dest('./dist/assets/js'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

//Compile *.scss files. Process browser sync.
gulp.task('sass', function () {
    return gulp.src(markupPaths.scss)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/assets/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

//Process browser synchronization for font files.
gulp.task('fonts', function () {
    return gulp.src(markupPaths.fonts)
        .pipe(gulp.dest('./dist/assets/fonts'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

//Process browser synchronization for images.
gulp.task('images', function () {
    return gulp.src(markupPaths.image)
        .pipe(imagemin({
            multipass: true,
            interlaced: true,
            svgoPlugins: [{removeViewBox: false}],
            optimizationLevel: 3
        }))
        .pipe(gulp.dest('./dist/assets/images'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

//Configure browser synchronization task.
gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: './dist'
        },
        port: 3004,
        open: true,
        browser: 'default',
        startPath: '/index.html'
    });
});

//Configure file watchers. Used gulp-watch for better perfomance.
gulp.task('watch', function () {
    watch(markupPaths.html, function () {
        gulp.start('html');
    });
    watch(markupPaths.scss, function () {
        gulp.start('sass');
    });
    watch(markupPaths.js, function () {
        gulp.start('js');
    });
    watch(markupPaths.fonts, function () {
        gulp.start('fonts');
    });
    watch(markupPaths.image, function () {
        gulp.start('images');
    });
});


gulp.task('default', ['html', 'sass', 'js', 'fonts', 'images', 'watch', 'browser-sync']);





