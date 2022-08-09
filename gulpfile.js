var gulp = require('gulp');
var concat = require('gulp-concat');
// var sass = require('gulp-sass');
 const sass = require('gulp-sass')(require('sass'));

var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var server = require('gulp-server-livereload');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var uglify = require('gulp-uglify');
var webp = require('gulp-webp');
var uncss = require('gulp-uncss');
var webserver = require('gulp-webserver');
 
gulp.task('serve', function() {
  gulp.src('dist')
   .pipe(webserver({
    livereload: true,
    port: 3000,
    open: true,
      fallback: 'index.html'
    }));

});



gulp.task('sass', async function () {
    gulp.src('src/sass/main.scss')
        .pipe(sass())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
        .pipe(rename('app.css'))
        .pipe(cleanCSS())
        // .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/css'));

});

gulp.task('js', async function() {
    gulp.src([
            'src/js/component.js'
        ])
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});
gulp.task('js_v', async function() {
    gulp.src([
            'src/js/vendor/jquery.js',
            // 'src/js/vendor/jquery.scrollTo.js',
            // 'src/js/vendor/jquery.waypoints.min.js',
            // 'src/js/vendor/jqueryrotate.2.1.js',
        ])
        .pipe(concat('vendor.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('images', async function(){
    return gulp.src('src/images/**/*.*')
        .pipe(webp())
        .pipe(gulp.dest('dist/images'))
});


gulp.task('pages', async function(){
    return gulp.src('src/*.html')
        .pipe(gulp.dest('dist'))
});

gulp.task('uncss', async function () {
    return gulp.src('dist/css/app.css')
        .pipe(uncss({
            html: ['dist/head.html']
        }))
        .pipe(rename('head.css'))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('fonts', async function(){
    return gulp.src('src/fonts/**/*.*')
        .pipe(gulp.dest('dist/fonts'))
});


gulp.task('php', async function(){
    return gulp.src('src/php/**/*.*')
        .pipe(gulp.dest('dist/php'))
});


gulp.task('default', async function() {
    //gulp.start('pages', 'js', 'js_v', 'sass', 'images', 'images_css', 'webserver');
    gulp.watch('src/*.html', gulp.parallel('pages') );
    gulp.watch('src/js/*.js', gulp.parallel('js') );
    gulp.watch('src/js/vendor/*.js', gulp.parallel('js_v') );
    gulp.watch('src/sass/**/*.scss', gulp.parallel('sass') );
    gulp.watch('src/images/**/*.*',  gulp.parallel('images'));
    // gulp.watch('src/php/**/*.*',  gulp.parallel('php'));
});



