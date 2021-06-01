/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-12-13 22:16:52
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-12-18 20:39:13
 */
// function defaultTask(cb) {
//     console.log("siljsdk");
//     cb();
// }
// exports.default = defaultTask

// const { series, parallel } = require('gulp');


/*
//! 处理文件
const { src, dest } = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
exports.default = function () {
    return src('src/js/*.js')                           //输入
        .pipe(uglify())                                 //压缩
        .pipe(rename({extname: '.min.js'}))             //重命名
        .pipe(dest('dist/js'))                          //输出
}
*/


/*
//! 文件监控
const { watch } = require('gulp');
watch('src/css/*', {
    delay: 3000                                         //延迟3s
}, function (cb) {
    console.log('文件被修改了');
    cb();
});
*/




const { series, src, dest, watch } = require('gulp');
const htmlClean = require('gulp-htmlclean');
const less = require('gulp-less');
const cleanCss = require('gulp-clean-css');
const stripDebug = require('gulp-strip-debug');
const uglify = require('gulp-uglify');
const imgMin = require('gulp-imageMin');
const connect = require('gulp-connect');

const folder = {
    src: 'src/',
    dist: 'dist/'
}

function html() {
    return src(folder.src + 'html/*')
        .pipe(htmlClean())                          //压缩html代码
        .pipe(dest(folder.dist + 'html/'))
        .pipe(connect.reload());
}

function css() {
    return src(folder.src + 'css/*')
        .pipe(less())                               //less代码转css代码
        .pipe(cleanCss())                           //压缩css代码
        .pipe(dest(folder.dist + 'css/'))
        .pipe(connect.reload());
}

function js() {
    return src(folder.src + 'js/*')
        .pipe(stripDebug()) 
        .pipe(uglify())                              //压缩
        .pipe(dest(folder.dist + 'js/'))
        .pipe(connect.reload());
}

function image() {
    return src(folder.src + 'images/*')
        .pipe(imgMin())                             //压缩图片
        .pipe(dest(folder.dist + 'images/'))
}

function server(cb) {
    connect.server({
        port: '1573',
        livereload: true        //自动刷新
    });
    cb();
}

watch()

exports.default = series(html, css, js, image)