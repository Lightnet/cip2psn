/**
  Project Name: cip2psn

  LICENSE: MIT

  Created By: Lightnet

 */
// GULP FUNCTIONS
const { src, dest, watch, parallel, series } = require("gulp");
// const sync = require("browser-sync").create();
const nodemon = require('gulp-nodemon');

const src_client_file=[
  './src/client/client_access.js'
  ,'./src/client/client_theme.js'
];

const src_html_file=[
  './src/html/access_page.html'
  ,'./src/html/theme.html'
];

const output_dest = 'public';

// CLIENT BUILD
function client_build(callback){
  // task body
  return src(src_client_file)
    .pipe(dest(output_dest));
  //callback();
}
// COPY HTML
exports.client_build = client_build;
// COPY HTML
function copy_html(callback){
  // task body
  return src(src_html_file)
    .pipe(dest(output_dest));
  //callback();
}
exports.copy_html = copy_html;
// WATCH FILES
function watchFiles(callback) {
  watch(src_client_file, client_build);
  watch(src_html_file, copy_html);
  //watch('views/**.ejs', generateHTML);
  //watch('sass/**.scss', generateCSS);
  //watch([ '**/*.js', '!node_modules/**'], parallel(runLinter, runTests));
  callback();
}
exports.watch = watchFiles;
// BROWSER SYNC
function browserSync(cb) {
  sync.init({
      server: {
          baseDir: "./public"
      }
  });
}
exports.sync = browserSync;

var config = require('./config');

// NODEMON
function reload_server(done) {
  nodemon({
    //script: 'index.js'
    script: 'app.js'
    //, ext: 'js html'
    , ext: 'js'
    , env: { 
    'NODE_ENV': 'development' // ex. process.env.NODE_ENV
    ,'PORT': config.port || 3000
    ,'HOST': config.host || 'localhost'
    ,'SECRET': config.secretkey || '1234567890123456789012345678901234567890'
    ,'TOKEN': config.tokenkey || 'token'
  }
  ,ignore: [
    'gulpfile.js'
    ,'node_modules/'
    ,'public/'
  ]
  , done: done
  })
}
exports.reload_server = reload_server;
// GULP DEFAULT CONFIGS
//exports.default = series(runLinter,parallel(generateCSS,generateHTML),runTests);
exports.default = series(client_build, copy_html, watchFiles, reload_server);
//cmd: gulp default 


