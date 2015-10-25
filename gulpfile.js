var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var sourcemaps = require('gulp-sourcemaps');
var tslint = require('gulp-tslint');
var ts = require('gulp-typescript');
var browserSync = require('browser-sync');
var superstatic = require('superstatic');

var tsFiles = [
    './src/**/*.ts'
];

var watchedFiles = [
    './src/**/*.ts',
    './public/**/*.html'
];

gulp.task('ts-lint', function() {
    return gulp
        .src(tsFiles)
        .pipe(tslint())
        .pipe(tslint.report('prose', {
            emmitError: false
        }));
})

gulp.task('compile-ts', function() {

    return gulp
        .src(tsFiles)
        .pipe(sourcemaps.init())
        .pipe(ts({
            noImplicitAny: true,
            experimentalDecorators: true,
            module: 'amd',
            target: 'ES5'
        }))
        .js
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./public/js'));
});

gulp.task('serve', ['ts-lint', 'compile-ts'], function() {
    gulp.watch(watchedFiles, ['ts-lint', 'compile-ts']);
    gulp.watch("public/**").on('change', browserSync.reload);

    browserSync({
        port: 3000,
        file: ['./**'],
        injectChanges: true,
        logFileChanges: false,
        logLevel: 'silent',
        notify: true,
        reloadDelay: 0,
        server: {
            baseDir: './public',
            middleware: superstatic({
                cwd: './public',
                clean_urls: true,
                debug: true
            })
        }
    });


});

gulp.task('default', ['serve']);
