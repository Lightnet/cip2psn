const { src, dest, watch, parallel, series } = require("gulp");
// const sync = require("browser-sync").create();
const nodemon = require('gulp-nodemon');

function client_build(callback){
  // task body
  callback();
}
exports.client_build = client_build;


function watchFiles(cb) {
  //watch('views/**.ejs', generateHTML);
  //watch('sass/**.scss', generateCSS);
  //watch([ '**/*.js', '!node_modules/**'], parallel(runLinter, runTests));
}

exports.watch = watchFiles;

function browserSync(cb) {
  sync.init({
      server: {
          baseDir: "./public"
      }
  });
}
exports.sync = browserSync;

function reload_server(done) {
  nodemon({
    //script: 'index.js'
    script: 'app.js'
  , ext: 'js html'
  , env: { 'NODE_ENV': 'development' }
  , done: done
  })
}
exports.reload_server = reload_server;

//exports.default = series(runLinter,parallel(generateCSS,generateHTML),runTests);
exports.default = series(reload_server);



