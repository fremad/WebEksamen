/// <binding BeforeBuild='default, sass' />
var gulp = require('gulp');
var sass = require('gulp-sass');


gulp.task('default',
    function() {
        console.log("hello world");
    });

var paths = {
    webroot: "./wwwroot/"
};

paths.scss = paths.webroot + "scss/**/*.scss";
paths.css = paths.webroot + "css/";

gulp.task('sass',
    function() {
        gulp.src(paths.scss)
            .pipe(sass())
            .pipe(gulp.dest(paths.css));
    });



