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
const SEA = require('gun/sea');

const {html_index,html_main }=require('./views/index');

// https://developer.okta.com/blog/2020/10/12/build-modern-api-using-fastify
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
// ROUTES
async function routes (fastify, options, done) {
  //fastify.get('/', async (request, reply) => {
    //return { hello: 'world' }
  //});
 
  // Request/Response validation and hooks
  // https://www.fastify.io/docs/latest/Hooks/
  fastify.addHook('preHandler', async (request, reply) => {
    //req.log.info({ url: req.raw.url, id: req.id }, 'received request');
    //console.log('isMobile?:',
      //mobile({ ua: req })
    //);
    let token = request.session.token;

    console.log('URL:',request.url);
    if(request.url == '/' && token == null){
      return;
    }
    if(request.url == '/login'){
      return;
    } 
    if(request.url == '/signup'){
      return;
    }
    if(request.url == '/forgot'){
      return;
    }
    if(request.url == '/logout'){
      return;
    }
    if(request.url == '/termofservice'){
      return;
    }
    if(request.url == '/about'){
      return;
    }
    //{
      //throw new Error('Unauthorized Access!');
      //return;
    //}

    //let token = request.session.token;
    console.log('checking token...');
    if(!token){//401
      reply.code( 401 ).send();
      //throw new Error('Unauthorized Access!');
      return;
    }
    //console.log(token);
    try{
      //console.log(token);
      let data = jwt.verify(token, config.tokenKey);
      //console.log(data.key)
      //console.log(data.sea)
      //console.log(data)
      let saltkey = await SEA.work(data.key, data.alias);
      let sea = await SEA.decrypt(data.sea, saltkey);
      //console.log('aliasId:',data.aliasId);
      //console.log('sea');
      //console.log(sea);

      //console.log(data);
    }catch(e){
      console.log('No Token //////////////!');
      console.log(e);
    }
    //return payload;
    //done();
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
    let token=request.session.token;
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
    //console.log('LOGOUT');
    let token=request.session.token;
    //console.log('token:',token);
    if(token){
      //let data = jwt.verify(token, config.tokenKey);
      //console.log(data);
      let islogout = await user.aliasLogoutSync(token);
      console.log('islogout:',islogout);
      request.session.token=null;
      reply.redirect(302,'/');
      //reply.send(`<html><body>[ Logout ] <a href="/">Home</a></body></html>`);
    }else{
      console.log('FAIL TOKEN');
      //reply.redirect('/');
      reply.redirect(302,'/');
      return;
    }
    //request.session.token=null;
    //reply.send(`<html><body>[ Logout ] <a href="/">Home</a></body></html>`);
  });

  fastify.get('/test', async function (request, reply) {

    reply.code(200);
    reply.type('text/html');
    reply.send(`<html><body>[ Logout ] <a href="/">Home</a></body></html>`);
  });

  // GET TEST ASSIGN
  fastify.get('/tester', async function (request, reply) {
    reply.code(200);
    //console.log(request.session);
    //request.user.set("tester");
    //console.log(request.user);
    //reply.header('Content-Type', 'text/html');
    reply.send({ hello: 'world! fastify!' });
  });
  // GET TEST ASSIGN
  fastify.get('/guest', async function (request, reply) {
    reply.code(200);
    //request.user = "guest";
    //console.log(request.user);
    //reply.header('Content-Type', 'text/html');
    reply.send({ hello: 'world! fastify!' });
  });

  //ROUTES
  //fastify.register(require('./route_login'), { prefix: '/v1' }); //nope, crash
  fastify.register(require('./route_login')); // works
  fastify.register(require('./route_signup')); // 
  fastify.register(require('./route_forgot')); // 
  fastify.register(require('./route_account')); // 
  fastify.register(require('./route_alias')); // 
  // FINISH
  done();
}
module.exports = routes;