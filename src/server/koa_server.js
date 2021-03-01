/**
 * 
 * Created By: Lightnet
 */
// https://github.com/koajs/router/blob/master/API.md
// https://github.com/koajs/examples/blob/master/blog/app.js
// https://github.com/koajs/logger
// https://github.com/koajs/session
// https://github.com/koajs/csrf

const logger = require('koa-logger');
const session = require('koa-session');
const Koa = require('koa');
const router = require('@koa/router')();
const koaBody = require('koa-body');
const CSRF = require('koa-csrf');

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

// https://stackoverflow.com/questions/35362507/why-need-more-than-one-secret-key-on-koa
// add the CSRF middleware
app.use(new CSRF({
  invalidTokenMessage: 'Invalid CSRF token',
  invalidTokenStatusCode: 403,
  excludedMethods: [ 'GET', 'HEAD', 'OPTIONS' ],
  disableQuery: false
}));

//app.use(logger());
// https://github.com/koajs/koa
// https://github.com/koajs/koa/blob/master/docs/guide.md
async function responseTimeLogger(ctx, next){
  var start = new Date;
  await next();
  var ms = new Date - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
}
//app.use(responseTimeLogger);

//app.use(async ctx => {
//  ctx.body = 'Hello World';
//});
//===============================================
// FAVICON / COUNT VIEWS
app.use(async (ctx, next) => {
  //ctx.body = 'Hello World';
  //console.log(ctx.keys);
  if (ctx.path === '/favicon.ico'){
    console.log('favicon');
    return next(); // next progress
  }
  let n = ctx.session.views || 0;
  ctx.session.views = ++n;
  //console.log(ctx.session.views);
  //console.log("ctx.keys:",ctx.keys);
  return next(); // next progress
});

function index_html(data){
  return`
  <!doctype html>
  <html lang="en">
     <head>
     <!--
      <script src="https://redom.js.org/redom.min.js"></script>
      -->
     </head>
     <body>
        <!--
        <script src="/client_login.js"></script>
        -->
        <form action="/login" method="post">
          
          <a href="/login">Login</a>
          <a href="/signup">Sign Up</a>
          <a href="/forgot">Forgot</a>
          <br><label> INDEX </label>
        </form>
      </body>
  </html>
  `;
}

async function url_index(ctx) {
  ctx.body = 'Hello World! koa!';
  //ctx.body = index_html({});
}

// route definitions
router.get('/', url_index);
  //.get('/login',get_login)
  //.post('/login',post_login)
app.use(router.routes());

var route_login=require('./koa/route_login.js');
app.use(route_login.routes());

var route_signup=require('./koa/route_signup.js');
app.use(route_signup.routes());

var route_admin=require('./koa/route_admin.js');
app.use(route_admin.routes());

//last for url for user name /:user
// filter by order added
var route_user=require('./koa/route_user.js');
app.use(route_user.routes());


app.listen(3000);