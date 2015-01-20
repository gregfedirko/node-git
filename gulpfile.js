var gulp = require('gulp');
var mocha = require('gulp-mocha');

gulp.task('test', function() {
  return gulp.src('./spec/**/*.js')
    .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('watch-test', function() {
  gulp.watch('./components/**/*.js', ['test']);
});



gulp.task('default', ['watch-test']);