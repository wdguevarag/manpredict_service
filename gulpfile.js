const gulp = require('gulp');
const clean = require('gulp-clean');
const uglify = require('gulp-uglify-es').default;
const pipeline = require('readable-stream').pipeline;
const javascriptObfuscator = require('gulp-javascript-obfuscator');
const runSequence = require('gulp4-run-sequence');

function cleanAll() {
    return gulp
        .src(['.nyc_output', 'coverage', 'dist'], {
            read: false,
            allowEmpty: true,
        })
        .pipe(clean());
}

function minifyDist() {
    return pipeline(gulp.src('dist/**/*.js'), uglify(), gulp.dest('dist'));
}

function ofuscatorDist() {
    return gulp
        .src('dist/**/*.js')
        .pipe(
            javascriptObfuscator({
                compact: true,
            })
        )
        .pipe(gulp.dest('dist'));
}

function build(cb) {
    runSequence('ofuscate', 'minify', cb);
}

gulp.task('clean', cleanAll);
gulp.task('minify', minifyDist);
gulp.task('ofuscate', ofuscatorDist);
gulp.task('build', build);
