
// Initizlise modules
const {src, dest, watch, series, parallel} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

// File paths variables
const files = {
    scssPath: './src/scss/**/*.scss',
    jsPath: './src/js/**/*.js'
};

const adminFiles = {
    scssPath: './src/admin/scss/**/*.scss',
    jsPath: './src/admin/js/**/*.js'
};

// Sass tasks
let sassBuild = () => {
    return src(files.scssPath)
        .pipe(sass())
        .pipe(postcss([ autoprefixer('since 2015-03-10'), cssnano() ]))
        .pipe(dest('./public/css'));
}

let sassWatch = () => {
    return src(files.scssPath)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('./public/css'));
}

// JavaScript tasks
let jsBuild = () => {
    return src(files.jsPath)
        .pipe(concat('script.js'))
        .pipe(uglify())
        .pipe(dest('./public/js'));
}

let jsWatch = () => {
    return src(files.jsPath)
        .pipe(sourcemaps.init())
        .pipe(concat('script.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('./public/js'));
}

// Watch task
let watchTask = () => {
    watch([files.scssPath, files.jsPath],
        parallel(sassWatch, jsWatch));
}

let adminSass = () => {
    return src(adminFiles.scssPath)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([ autoprefixer('since 2015-03-10'), cssnano() ]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('./public/css'));
}

let adminJs = () => {
    return src(adminFiles.jsPath)
        .pipe(sourcemaps.init())
        .pipe(concat('admin.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('./public/js'));
}

let adminWatch = () => {
    watch([adminFiles.scssPath, adminFiles.jsPath],
        parallel(adminSass, adminJs));
}

exports.build = series(sassBuild, jsBuild);

exports.watch = series(
    parallel(sassWatch, jsWatch),
    watchTask
);

exports.admin = series(
    parallel(adminSass, adminJs),
    adminWatch
);

