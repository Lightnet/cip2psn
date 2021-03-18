/**
  Project Name: cip2psn

  LICENSE: MIT

  Created By: Lightnet

 */

// https://www.fastify.io/docs/latest/Decorators/
// https://www.fastify.io/docs/latest/Routes/
// https://github.com/fastify/fastify/blob/master/docs/Routes.md
// https://stackoverflow.com/questions/31828568/jsdom-in-nodejs-how-do-i-get-back-the-manipulated-html

const user=require('../model/user');
const jwt = require("jsonwebtoken");
const config =require('../../../config');
//const SEA = require('gun/sea');

const {html_index,html_main }=require('./views/index');

//CHECK FOR URL MATCH FOR WHITELIST
function checkUrl(value,arr){
  let status = false;
  for(let i=0; i<arr.length; i++){
    let name = arr[i];
    if(name == value){
      status = true;
      break;
    }
  }
  return status;
}

// https://developer.okta.com/blog/2020/10/12/build-modern-api-using-fastify
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
// ROUTES
async function routes (fastify, options, done) {
  //fastify.get('/', async (request, reply) => {
    //return { hello: 'world' }
  //});
  // https://stackoverflow.com/questions/35408729/express-js-prevent-get-favicon-ico/35408810
  //fastify.register(require('fastify-favicon'))
  fastify.get('/favicon.ico', function (request, reply) {
    console.log("No Favicon!");
    reply.code(204); // 204 No Content
  });
  // https://github.com/fastify/fastify/blob/master/docs/Middleware.md
  // https://www.fastify.io/docs/latest/Decorators/
  // Decorate request with a 'user' property
  //fastify.decorateRequest('user', 'guest');
  //fastify.addHook('preHandler', (req, reply, done) => {
    //req.user = 'Bob Dylan';
    //console.log(req.user );
    //done();
  //});
  //=
  //fastify.addHook('preHandler', (request, reply, next) => {
    // Some code
    //console.log("addhook...");
    //console.log(request.session);
    //console.log(request.session.sessionId);
    //let views = request.session.views || 0;
    //request.session.views = ++views;
    //console.log("views",request.session.views);
    //next();
  //});
  //fastify.addHook('onRequest', (request, reply, next) => {
    //console.log(request.session);
    //console.log("sessionId: ",request.session.sessionId);
    //let views = request.session.views || 0;
    //request.session.views = ++views;
    //console.log("views",request.session.views);
    //next();
  //});
  
  // https://github.com/fastify/help/issues/50
  //fastify.addHook('onRequest', (req, reply, done) => {
    //req.log.info({ url: req.raw.url, id: req.id }, 'received request');
    //console.log('isMobile?:',
      //mobile({ ua: req })
    //);
    //done();
  //})
  // PLUGIN TEST
  //https://www.fastify.io/docs/latest/Plugins/
  //fastify.register(require('./myPlugin'));
  // https://www.fastify.io/docs/latest/Hooks/

  let urllist=[
    '/'
    , '/login'
    , '/signup'
    , '/forgot'
    , '/logout'
    , '/termofservice'
    , '/about'
    , '/client_access.js'
    , '/favicon.ico'
  ]

  // Request/Response validation and hooks
  // https://www.fastify.io/docs/latest/Hooks/ 
  fastify.addHook('preHandler', async (request, reply) => {
    //req.log.info({ url: req.raw.url, id: req.id }, 'received request');
    //console.log('isMobile?:',
      //mobile({ ua: req })
    //);
    let bCookie;
    let token = request.cookies.token;
    if(token){
      //console.log('[ FOUND TOKEN ]');
      bCookie = request.unsignCookie(request.cookies.token);
    }else{
      //console.log('[ NULL TOKEN ]');
    }
    //console.log(token);
    //console.log(bCookie);
    //console.log('URL:',request.url);
    //WHITELIST URL
    // Need to check for refresh load
    if(request.url == '/' && token == null){
      return;
    }
    //WHITELIST URL
    if(checkUrl(request.url, urllist) == true){
      return;
    }

    //console.log('checking token...');
    //Check if there no token to not allow user access other urls.
    if(!token){//401
      //throw new Error('Unauthorized Access!');
      return reply.code( 401 ).send();
    }
    //console.log(token);
    try{
      //console.log('[ TOKEN ACCESS AUTH CHECKS]');
      //console.log('config.tokenKey:',config.tokenKey);
      let data = jwt.verify(bCookie.value, config.tokenKey);
      //console.log(data);
      //console.log(data.key)
      //console.log(data.sea)
      //let saltkey = await SEA.work(data.key, data.alias);
      //let sea = await SEA.decrypt(data.sea, saltkey);
      //console.log('aliasId:',data.aliasId);
      //console.log('sea');
      //console.log(sea);
    }catch(e){
      console.log('[ No Token! || Invalid Token! ]');
      //clear cookie token if not valid
      reply.clearCookie('token',{signed: true});
      console.log(e);
      reply.code( 401 ).send();
    }
  });
  
  fastify.addHook('onError', async (request, reply, error) => {
    console.log("ERROR!");
    reply.send('Unauthorized Access!');
    // Useful for custom error logging
    // You should not use this hook to update the error
  })
  // https://www.fastify.io/docs/latest/Reply/#raw
  // GET INDEX PAGE
  fastify.get('/', async function (request, reply) {
    reply.code(200);
    reply.header('Content-Type', 'text/html');
    //console.log(`Hello, ${request.user}!`);
    let bCookie;
    let token = request.cookies.token;
    if(token){
      //make sure the token time is valid.
      //bCookie = request.unsignCookie(request.cookies.token);
      //console.log(bCookie);
    }
    //console.log(token);
    let body='';
    if(token){
      body=html_main();
    }else{
      body=html_index();
    }
    reply.send(body);
  });

  fastify.get('/logout', async function (request, reply) {
    reply.code(200);
    reply.type('text/html');
    //CHECK IF TOKEN IS NULL OR STRING
    let token=request.cookies.token;
    //console.log('token:',token);
    if(token){
      //let data = jwt.verify(token, config.tokenKey);
      //console.log(data);
      //make sure cookie expire need to check that later.
      let bCookie = request.unsignCookie(request.cookies.token);
      console.log(bCookie);
      token = bCookie.value;

      let islogout = await user.aliasLogoutSync(bCookie.value);
      console.log('islogout:',islogout);

      reply.clearCookie('token',{
        signed: true
      });
      reply.redirect(302,'/');
      //reply.send(`<html><body>[ Logout ] <a href="/">Home</a></body></html>`);
    }else{
      //console.log('FAIL TOKEN');
      reply.clearCookie('token',{
        signed: true
      });

      //reply.redirect('/');
      //reply.redirect(302,'/');
      reply.send(`<html><body>[ FAIL ] <a href="/">Home</a></body></html>`);
    }
    //reply.send(`<html><body>[ LOGOUT ] <a href="/">Home</a></body></html>`);
  });

  fastify.get('/test', async function (request, reply) {
    //reply.code(200);
    reply.type('text/html');
    reply.send(`<html><body>[ Test ] <a href="/">Home</a></body></html>`);
  });

  //ROUTES
  //fastify.register(require('./route_login'), { prefix: '/v1' }); //nope, crash
  fastify.register(require('./route_login')); // works
  fastify.register(require('./route_signup')); // 
  fastify.register(require('./route_forgot')); // 
  fastify.register(require('./route_account')); // 
  fastify.register(require('./route_alias')); // 
  //fastify.register(require('./route_community')); // 
   
  //fastify.register(require('./route_blank')); // 
  
  //fastify.register(require('./route_mod')); // 
  //fastify.register(require('./route_admin')); // 
  //fastify.register(require('./route_ticket')); //
  // FINISH
  done();
}
module.exports = routes;