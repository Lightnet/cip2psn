/**
  Project Name: cip2psn

  LICENSE: MIT

  Created By: Lightnet

 */
// GULP FUNCTIONS
const { src, dest, watch, parallel, series } = require("gulp");
// const sync = require("browser-sync").create();
const nodemon = require('gulp-nodemon');
const config = require('./config');

const src_client_files=[
  './src/client/client_access.js'
  ,'./src/client/client_theme.js'
  ,'./src/client/client_gethint.js'
  ,'./src/client/client_account.js'
  ,'./src/client/client_blank.js'
  ,'./src/client/client_alias.js'
  ,'./src/client/client_login.js'
  ,'./src/client/client_community.js'
  ,'./src/client/client_mod.js'
  ,'./src/client/client_admin.js'
  ,'./src/client/client_ticket.js'
  ,'./src/client/client_chatmessage.js'
  ,'./src/client/client_privatemessage.js'
];
const src_html_files=[
  './src/html/access_page.html'
  ,'./src/html/theme.html'
  ,'./src/html/icons.html'
];
const src_svg_files=[
  './src/files/star.svg'
  ,'./src/files/cross.svg'
  ,'./src/files/underscore.svg'
];
const output_dest = 'public';

// CLIENT BUILD
function client_build(callback){
  // task body
  return src(src_client_files)
    .pipe(dest(output_dest));
  //callback();
}
// COPY HTML
exports.client_build = client_build;
// COPY HTML
function copy_html(callback){
  // task body
  return src(src_html_files)
    .pipe(dest(output_dest));
}
exports.copy_html = copy_html;
// COPY SVG
function copy_svg(callback){
  return src(src_svg_files)
    .pipe(dest(output_dest));
}
exports.copy_svg = copy_svg;
// WATCH FILES
function watchFiles(callback) {
  watch(src_client_files, client_build);
  watch(src_html_files, copy_html);
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
    ,'SECRET': config.secretKey || '1234567890123456789012345678901234567890'
    ,'TOKEN': config.tokenKey || 'token'
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

function reload_database(done) {
  nodemon({
    script: 'database.js'
    , ext: 'js'
    , env: { 
    'NODE_ENV': 'development' // ex. process.env.NODE_ENV
    ,'PORT': config.port || 3000
    ,'HOST': config.host || 'localhost'
    ,'SECRET': config.secretKey || '1234567890123456789012345678901234567890' //required 32 char
    ,'TOKEN': config.tokenKey || 'token'
  }
  ,ignore: [
    'gulpfile.js'
    ,'node_modules/'
    ,'public/'
  ]
  , done: done
  })
}
exports.reload_database = reload_database;
// GULP DEFAULT CONFIGS
exports.default = series(
  client_build
  , copy_html
  , copy_svg
  , watchFiles
  , reload_server
);
//cmd: gulp default 


