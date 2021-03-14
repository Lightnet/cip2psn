/**
  Project Name: cip2psn

  LICENSE: MIT

  Created By: Lightnet

 */

// https://github.com/koajs/router/blob/master/API.md
// https://github.com/koajs/examples/blob/master/blog/app.js
// https://github.com/koajs/logger
// https://github.com/koajs/session
// https://github.com/koajs/csrf

//const logger = require('koa-logger');
const session = require('koa-session');
const Koa = require('koa');
const routes = require('./koa/routes');
const koaBody = require('koa-body');
//const CSRF = require('koa-csrf');
const db = require('./db');
// INIT DATABASE
console.log('Init database...');
db.init();
// CREATE WEB SERVER MODULE
console.log('Init web server modules...');
const app = new Koa();
// https://koajs.com/#app-keys-
// https://stackoverflow.com/questions/35362507/why-need-more-than-one-secret-key-on-koa
//key
app.keys = ['session secret'];
// for post request body 
app.use(koaBody());
const CONFIG = {
  key: 'koa.sess', /** (string) cookie key (default is koa.sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  //maxAge: 86400000,
  maxAge: 10000,
  //autoCommit: true, /** (boolean) automatically commit headers (default true) */
  //overwrite: true, /** (boolean) can overwrite or not (default true) */
  //httpOnly: true, /** (boolean) httpOnly or not (default true) */
  //signed: true, /** (boolean) signed or not (default true) */
  //rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  //renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
  //secure: true, /** (boolean) secure cookie*/
  //sameSite: null, /** (string) session cookie sameSite options (default null, don't set it) */
};
app.use(session(CONFIG, app));
//===============================================
// https://stackoverflow.com/questions/35362507/why-need-more-than-one-secret-key-on-koa
// add the CSRF middleware
//app.use(new CSRF({
  //invalidTokenMessage: 'Invalid CSRF token',
  //invalidTokenStatusCode: 403,
  //excludedMethods: [ 'GET', 'HEAD', 'OPTIONS' ],
  //disableQuery: false
//}));
//app.use(logger());
// https://github.com/koajs/koa
// https://github.com/koajs/koa/blob/master/docs/guide.md
//===============================================
// GLOBAL PROPS
//app.context.db = db();
//app.use(async ctx => { //test but error
  //console.log(ctx.db);
//});
//app.context.test='texttest';
//app.use(async (ctx,next )=> {
  //console.log(ctx.test); //works
  //next();
//});
//===============================================
// METHOD AND URL TIME
async function responseTimeLogger(ctx, next){
  var start = new Date;
  await next();
  var ms = new Date - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
}
//app.use(responseTimeLogger);
//===============================================
// DEFINE ROUTES
//===============================================
routes(app);
//===============================================
// SET PORT
//===============================================
const PORT = process.env.PORT || 3000;
//===============================================
// SERVER LISTEN
//===============================================
app.listen(PORT, function(){
  // `this` refers to the http server here
  let { address, port } = this.address();
  //console.log(this.addContext);
  let protocol = this.addContext ? 'https' : 'http';
  if(address == '::'){address='localhost';}
  console.log(`> Koa Server running on ${protocol}://${address}:${port}`);
  //console.log(`> Koa Server running on http://localhost:${PORT}`);
});