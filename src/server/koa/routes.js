/**
  Project Name: cip2psn

  LICENSE: MIT

  Created By: Lightnet

*/

const router = require('@koa/router')();
const jwt = require("jsonwebtoken");
//const db = require('./db');
const config=require('../../../config');

//===============================================
// INDEX PAGE
function html_index(){
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
        <a href="/login">Login</a>
        <a href="/signup">Sign Up</a>
        <!--<a href="/forgot">Forgot</a>-->
        <br><label> Hello World! [Koa] </label>
      </body>
  </html>
  `;
}
//===============================================
// MAIN PAGE
function html_access(){
  return `
<html>
  <head>
    <title>Index</title>
  </head>
  <body>
    <a href="/logout">Logout</a>
    <br> <label> Weclome Guest! [Koa]</label>
  </body>
</html>
`;
}

var urllist=[
  '/'
  , '/login'
  , '/logout'
  , '/signup'
  , '/forgot'
];

function checkMatch(url, list){
  let bfound=false;
  for(let i in list){
    if(url == list[i]){
      bfound=true;
      break;
    }
  }
  return bfound;
}
//===============================================
// EXPORT
module.exports = (app)=>{
  //===============================================
  // FAVICON
  app.use(async (ctx, next) => {
    //ctx.body = 'Hello World';
    //console.log(ctx.keys);
    if (ctx.path === '/favicon.ico'){
      console.log('favicon');
      return next(); // next progress
    }
    return next();
  });
  //===============================================
  // VIEWS COUNT
  //app.use(async (ctx, next) => {
    //let n = ctx.session.views || 0;
    //ctx.session.views = ++n;
    //console.log("views:",ctx.session.views);
    //console.log("ctx.keys:",ctx.keys);
    //return next(); // next progress
  //});
  //===============================================
  // AUTH TOKEN
  app.use(async (ctx, next) => {
    //console.log('ctx.request.method:', ctx.request.method);
    //console.log('ctx.request.url:', ctx.request.url);
    //console.log(ctx);
    //WHITE LIST URL
    if(checkMatch(ctx.request.url,urllist)){
      return next();
    }
    
    let token = ctx.cookies.get('token',{signed:true});
    if(token){
      try{
        let data = jwt.verify( token, config.tokenKey);
        //console.log('[ data ]: ',data);
      }catch(err){
        //console.log('TOKEN ERROR');
        ctx.statusCode=401;
        ctx.throw(401,{ message:'AUTH TOKEN INVALID!'});
        return next(false);
      }
    }else{
      //console.log('AUTH TOKEN INVALID!');
      ctx.statusCode=401;
      ctx.throw(401,{ message:'AUTH TOKEN INVALID!'});
      return next(false);
    }
    
    return next();
  });
  //===============================================
  // INDEX URL
  async function url_index(ctx) {
    //ctx.body = 'Hello World! koa!';
    let token = ctx.cookies.get('token',{signed:true});
    //console.log('Token: ',token);
    if(token){
      ctx.body = html_access({});
    }else{
      ctx.body = html_index({});
    }
  }
  //===============================================
  // route definitions
  router.get('/', url_index);
  router.get('/logout', function(ctx){
    ctx.cookies.set('token','',{
      maxAge:Date.now()
      ,signed:true
    });
    ctx.body = `<html><body> LOGOUT <a href='/'>Home</a></body></html>`;
  });
  router.get('/test', function(ctx){
    ctx.body = `<html><body> TEST <a href='/'>Home</a></body></html>`;
  });
  //===============================================
  // URL INDEX and LOGOUT
  app.use(router.routes());
  // LOGIN
  var route_login=require('./route_login.js');
  app.use(route_login.routes());
  // SIGN UP
  var route_signup=require('./route_signup.js');
  app.use(route_signup.routes());
  // ADMIN
  //var route_admin=require('./route_admin.js');
  //app.use(route_admin.routes());
  //last for url for user name /:user
  // filter by order added
  //var route_user=require('./route_user.js');
  //app.use(route_user.routes());
};