var gulp = require('gulp');
var jshint = require('gulp-jshint');
var server = require('gulp-server-livereload');
var connect = require('gulp-connect');
var nodemon = require('gulp-nodemon');


// configure webserver task
gulp.task('connect', function() {
  connect.server({
    livereload: true,
  });
});

// configure jshint task
gulp.task('jshint', function() {
  return gulp.src('client/public/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('html', function(){
  gulp.src('client/public/html/*.html')
  .pipe(connect.reload());
});

gulp.task('css', function(){
  gulp.src('client/public/css/*.css')
  .pipe(connect.reload());
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
  gulp.watch('client/public/js/*.js', ['jshint']);
  gulp.watch('client/public/html/*.html', ['html']);
  gulp.watch('client/public/css/*.css', ['css']);
  //this is saying on change to javascript files run jshint
});

// gulp.task('watch', function () {
//   server.listen();
//   nodemon({
//     script: 'server/app.js',
//     ext: 'js html css'
//   }).on('restart', function(){
//     gulp.src('server/app.js')
//     .pipe(server())
//     .pipe(notify('reloading page, please wait... '));
//   });
// });


// default task!
gulp.task('default', ['watch', 'connect']);
