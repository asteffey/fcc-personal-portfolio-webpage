const gulp = require('gulp');
const del = require('del');
const minifyHtml = require('gulp-minify-html');
const babel = require('gulp-babel');
const terser = require('gulp-terser');
const minifyCss = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');

async function clean() {
    return del.sync('dist');
}

async function html() {
    return gulp
        .src('./app/**/*.html')
        .pipe(minifyHtml())
        .pipe(gulp.dest('dist'));
}

async function js() {
    return gulp
        .src('app/**/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(terser())
        .pipe(gulp.dest('dist'));
}

async function css() {
    return gulp
        .src('app/**/*.css')
        .pipe(minifyCss())
        .pipe(gulp.dest('dist'));
}

async function images() {
    return gulp
        .src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
        .pipe(cache(imagemin({
            interlaced: true
          })))
        .pipe(gulp.dest('dist/images'));
}

const build = gulp.series(clean, gulp.parallel(html, js, css, images));

exports.clean = clean;
exports.html = html;
exports.js = js;
exports.css = css;
exports.images = images;
exports.build = build;
exports.default = build;