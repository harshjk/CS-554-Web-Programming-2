/******************************************
 *  Author : Harsh Jagdishbhai Kevadia   
 *  Created On : Thu Sep 21 2017
 *  File : gulpfile.js
 *******************************************/
const gulp = require("gulp");
const sass = require("gulp-sass");
const gls = require("gulp-live-server");
const connect = require("gulp-connect");
const concatenate = require("gulp-concat");
const cleanCSS = require("gulp-clean-css");
const autoPrefix = require("gulp-autoprefixer");
const rename = require("gulp-rename");

var server;

const vendorJsFiles = [
  "./node_modules/jquery/dist/jquery.min.js",
  "./node_modules/tether/dist/js/tether.min.js",
  "./node_modules/popper.js/dist/umd/popper.min.js",
  "./node_modules/bootstrap/dist/js/bootstrap.min.js"
];

// Static Server + watching scss/html files
gulp.task("serve", ["sass", "vendor"], function() {
  server = gls.new("app.js");
  server.start();
  connect.server();

  gulp.watch("src/scss/*.scss", ["sass"]);
  gulp.watch("views/*", ["html"]);
  gulp.watch("views/*", ["html"]);
  gulp.watch(["pub;/scss/*.scss", "views/*"], function(file) {
    server.notify.apply(server, [file]);
  });
  gulp.watch("app.js", function() {
    server.start.bind(server)();
  });
});
gulp.task("vendor", () => {
  gulp
    .src(vendorJsFiles)
    .pipe(concatenate("vendor.min.js"))
    .pipe(gulp.dest("./public/js/"));
});
// Compile sass into CSS & auto-inject into browsers
gulp.task("sass", function() {
  return gulp
    .src("src/scss/*.scss")
    .pipe(sass())
    .pipe(concatenate("styles.css"))
    .pipe(gulp.dest("public/css"))
    .pipe(
      autoPrefix({
        browsers: ["last 2 versions"],
        cascade: false
      })
    )
    .pipe(cleanCSS())
    .pipe(rename("styles.min.css"))
    .pipe(gulp.dest("./public/css/"))
    .pipe(connect.reload());
});

gulp.task("html", function() {
  return gulp.src("views/*").pipe(connect.reload());
});

gulp.task("default", ["serve"]);
