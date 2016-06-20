var gulp = require('gulp'),
    del = require('del'),
    runSequence = require('run-sequence'),
    inject = require('gulp-inject'),
    nodemon = require('gulp-nodemon'),
    jshint = require('gulp-jshint'),
    karma = require('gulp-karma');

var conf = require('./gulp/gulp.config.js');

var buildPath = function () {
    return Array.from(arguments).join('');
};

gulp.task('default', function(callback) {
    runSequence('test',
                'build',
                'watch',
                'serve',
                callback);
});

gulp.task('build', function(callback) {
    runSequence('clean', 'copy-files', 'inject-index', callback);
});

gulp.task('clean', function() {
    return del([conf.deploy_dir], {force : true});
});

gulp.task('copy-files', ['copy-html', 'copy-assets', 'copy-app-js', 'copy-vendor-js']);

gulp.task('copy-html', function () {
    return gulp.src([buildPath(conf.src_dir,'/**/*.html'), buildPath('!', conf.src_dir, '/index.html')])
        .pipe(gulp.dest(conf.deploy_dir));
});

gulp.task('copy-assets', function() {
    return gulp.src(buildPath(conf.src_dir,'/assets/**/*'))
        .pipe(gulp.dest(buildPath(conf.deploy_dir, '/assets')))
});

gulp.task('copy-app-js', function() {
    return gulp.src(buildPath(conf.src_dir,'/app/**/*.js'))
        .pipe(gulp.dest(buildPath(conf.deploy_dir, '/app')))
});

gulp.task('copy-vendor-js', function() {
    return gulp.src(buildPath(conf.src_dir, '/vendor/**/*.js'))
        .pipe(gulp.dest(buildPath(conf.deploy_dir, '/vendor')))
});

gulp.task('inject-index', function() {
    return gulp.src('./src/index.html')
            .pipe(inject(gulp.src(conf.app_files.tpl_src, {read: false}), {ignorePath: conf.inject_ignore_dir}))
            .pipe(gulp.dest(conf.deploy_dir))
});

gulp.task('serve', function(callback) {
    nodemon({ script: 'index.js' });
});

gulp.task('lint', function() {
    return gulp.src(conf.app_files.js)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('test', function() {
    return gulp.src('./invalidpath')
        .pipe(karma({
            configFile: 'karma.conf.js',
            action: 'run'
        }))
        .on('error', function(err) {
            console.log(err);
            this.emit('end');
        });
});

gulp.task('watch', function() {
    return gulp.watch(conf.app_files.js, ['lint', 'test', 'build']);
});
