/**
  Project Name: cip2psn

  LICENSE: MIT

  Created By: Lightnet

 */

// https://blog.logrocket.com/how-to-build-a-blazingly-fast-api-with-fastify/
// https://www.fastify.io/benchmarks/

// https://www.fastify.io/docs/latest/Getting-Started/
// https://www.fastify.io/docs/latest/Middleware/
// https://github.com/fastify/fastify
// https://www.fastify.io/ecosystem/
// https://github.com/fastify/fastify-auth
// https://github.com/fastify/example/blob/master/fastify-session-authentication/authentication.js
// https://devhints.io/fastify CHEATS

const fastifyCookie = require('fastify-cookie');
const fastifyFormbody = require('fastify-formbody');
// Require the framework and instantiate it
const fastify = require('fastify')({ 
  //logger: true 
  logger: false
});
// BODY PRASE
fastify.register(fastifyFormbody);
fastify.register(fastifyCookie);
// https://github.com/SerayaEryn/fastify-session
// a secret with minimum length of 32 characters
fastify.register(fastifySession, {
  cookieName: 'sessionId'
  ,expires: 1800
  //,expires: 1800000
  ,secret: 'a secret with minimum length of 32 characters'
  ,cookie: { 
    secure: false
  }
});
//fastify.addHook('preHandler', (request, reply, next) => {
  //const session = request.session;
  //request.sessionStore.destroy(session.sessionId, next);
//});
//fastify.addHook('preHandler', (request, reply, next) => {
  //request.session.user = {name: 'max'};
  //next();
//})
//fastify.addHook('onRequest', (request, reply, next) => {
  //const session = request.session;
  //request.sessionStore.destroy(session.sessionId, next);
//});
// https://www.fastify.io/docs/latest/Decorators/
// Decorate request with a 'user' property
//fastify.decorateRequest('user', '');
//fastify.decorateRequest('count', 0);
//fastify.addHook('preHandler', (req, reply, done) => {
  //req.user = 'Bob Dylan';
  //done();
//})
//https://www.fastify.io/docs/latest/Plugins/
fastify.register(require('../server/fastify/myPlugin'));

// https://www.fastify.io/docs/latest/Hooks/
fastify.addHook('preHandler', (request, reply, next) => {
  // Some code
  //console.log("addhook...");
  //console.log(request.session);
  console.log(request.session.sessionId);
  let views = request.session.views || 0;
  request.session.views = ++views;
  console.log("views",request.session.views);
  request.session.isAuth = request.session.isAuth || false;
  request.session.alias = request.session.alias || "Guest";
  //request.user="GUEST";
  //console.log(request.user);
  //let count=request.count || 0;
  //request.count=++count;
  //console.log(request.count);
  next();
});
//fastify.addHook('onRequest', (request, reply, next) => {
  //console.log("request.session.isAuth:", request.session.isAuth);
  //const session = request.session;
  //request.sessionStore.destroy(session.sessionId, next);
  //next();
//});
// Declare a route index #1
//fastify.get('/', async (request, reply) => {
  //return { hello: 'world' }
//})
// Declare a route index #2
//fastify.get('/', function (request, reply) {
  //reply.send({ hello: 'world' });
//});
// Declare a route index #3
fastify.register(require('../server/fastify/route_index'));
//fastify.register(require('./fastify/route_login')); //added into the index route
// Run the server!
const PORT = process.env.PORT || 3000;
const start = async () => {
  try {
    // https://www.fastify.io/docs/v1.13.x/Server/
    //await fastify.listen(PORT);
    //console.log(`Fastify server running on http://localhost:${PORT}`);

    fastify.listen(PORT, (err, address) => {
      if (err) {
        fastify.log.error(err);
        process.exit(1);
      }
      //console.log(address);
      //console.log(`>Fastify server running on http://localhost:${PORT}`);
      console.log(`>Fastify server running on %s`,address);
    });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}
start();
/*
// Require the framework and instantiate it
const fastify = require('fastify')({ 
  logger: false
});
// Declare a route
fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
})
// Run the server!
const start = async () => {
  try {
    await fastify.listen(3000)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start();
*/