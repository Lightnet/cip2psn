// https://www.fastify.io/docs/latest/Getting-Started/
// https://www.fastify.io/docs/latest/Middleware/
// https://github.com/fastify/fastify
// https://www.fastify.io/ecosystem/
// https://github.com/fastify/fastify-auth
// https://github.com/fastify/example/blob/master/fastify-session-authentication/authentication.js
// 




// https://github.com/mgcrea/fastify-session
const fastifySession = require('@mgcrea/fastify-session');
// https://www.npmjs.com/package/fastify-session
//const fastifySession = require('fastify-session'); // error request 
const fastifyCookie = require('fastify-cookie');
const fastifyFormbody = require('fastify-formbody');

const SESSION_SECRET = 'a secret with minimum length of 32 characters';
var SESSION_TTL = 864e3; // 1 day in seconds

// Require the framework and instantiate it
const fastify = require('fastify')({ 
  //logger: true 
  logger: false
});
// https://www.fastify.io/docs/latest/Decorators/
// Decorate request with a 'user' property
fastify.decorateRequest('user', '');

fastify.register(fastifyFormbody);
fastify.register(fastifyCookie);

fastify.register(fastifySession, {
  secret: SESSION_SECRET,
  cookie: { maxAge: SESSION_TTL },
});

// https://github.com/SerayaEryn/fastify-session
// a secret with minimum length of 32 characters
//fastify.register(fastifySession, {
  //cookieName: 'sessionId'
  //,secret: 'a secret with minimum length of 32 characters'
  //,cookie: { 
    //secure: false
  //}
  //,expires: 1800000
  //,expires: 1800
//});
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

// https://www.fastify.io/docs/latest/Hooks/
fastify.addHook('preHandler', (request, reply, done) => {
  // Some code
  //console.log("addhook...");
  //console.log(request.session);
  let views = request.session.views || 0;
  request.session.views = ++views;
  console.log("views",request.session.views);
  request.session.alias = request.session.alias || "Guest";
  return done();
});
// Declare a route index #1
//fastify.get('/', async (request, reply) => {
  //return { hello: 'world' }
//})
// Declare a route index #2
//fastify.get('/', function (request, reply) {
  //reply.send({ hello: 'world' });
//});
// Declare a route index #3
fastify.register(require('./fastify/route_index'));
// Run the server!
const start = async () => {
  try {
    await fastify.listen(80);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}
start();