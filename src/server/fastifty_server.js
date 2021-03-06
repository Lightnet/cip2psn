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
//===============================================
//https://www.npmjs.com/package/fastify-csrf
//===============================================
// https://github.com/mgcrea/fastify-session
//const fastifySession = require('@mgcrea/fastify-session');
// https://www.npmjs.com/package/fastify-session
//const fastifySession = require('fastify-session'); // error FastifyDeprecation: request 
// https://openbase.com/js/fastify-server-session/documentation
//const fastifySession = require('fastify-server-session'); // error FastifyDeprecation: request 
//===============================================
const path = require('path');
const fastifyCookie = require('fastify-cookie');
const fastifyCaching = require('fastify-caching');
const fastifyFormbody = require('fastify-formbody');
//const SESSION_SECRET = 'a secret with minimum length of 32 characters';
//var SESSION_TTL = 864e3; // 1 day in seconds
var db = require('./db/hcv1/index');
// DATABASE
//console.log(db);
console.log('Init Database...');
db.init();
//console.log(db.get());
// Require the framework and instantiate it
console.log('Init Fastify Web Server Modules...')
const fastify = require('fastify')({ 
  //logger: true 
  logger: false
});
// https://stackoverflow.com/questions/35408729/express-js-prevent-get-favicon-ico/35408810
//fastify.register(require('fastify-favicon'))
fastify.get('/favicon.ico', function (request, reply) {
  console.log("No Favicon!");
  reply.code(204); // 204 No Content
});
// BODY PRASE
fastify.register(fastifyFormbody);
fastify.register(fastifyCookie);
fastify.register(fastifyCaching);
//===============================================
// START SESSION
//===============================================
/*
var { session } = require('fastify-session-sets');
fastify.register( session , {
  references: {
    user_id: {}
  }
});
*/
//fastify.register(fastifyCookie);
// fastify-server-session
// https://github.com/jsumners/fastify-server-session/issues/9
/*
fastify.register(require('fastify-server-session'), {
  secretKey: 'some-secret-password-at-least-32-characters-long',
  sessionMaxAge: 900000, // 15 minutes in milliseconds
  cookie: {
    //domain: '.example.com',
    path: '/'
  }
});
*/
// https://github.com/SerayaEryn/fastify-session
// https://www.npmjs.com/package/fastify-session

//let fastifySession = require(`fastify-session`);
//let mySessionStore = new fastifySession.MemoryStore;
//console.log(mySessionStore);
fastify.register(require('fastify-session'), { //error on "Property: sessionStore"
  secret: 'a secret with minimum length of 32 characters'
  //,cookieName: 'sessionId'
  //,expires: 1800
  //,expires: 1800000
  ,cookie: { 
    secure: false
  },
  //store: new SessionStore(),
  //store: mySessionStore
});
fastify.addHook('preHandler', (request, reply, next) => {
  const session = request.session;
  request.sessionStore.destroy(session.sessionId, next);
}); //need to check later...

//===============================================
// END SESSION
//===============================================
//console.log(path.join(__dirname, '../../public'));
fastify.register(require('fastify-static'), {
  root: path.join(__dirname, '../../public')
  //,prefix: '/public/', // optional: default '/'
  ,prefix:'/'
});

// https://github.com/fastify/fastify/blob/master/docs/Middleware.md
// https://www.fastify.io/docs/latest/Decorators/
// Decorate request with a 'user' property
//fastify.decorateRequest('user', '');
//fastify.addHook('preHandler', (req, reply, done) => {
  //req.user = 'Bob Dylan';
  //done();
//})
// PLUGIN TEST
//https://www.fastify.io/docs/latest/Plugins/
//fastify.register(require('./fastify/myPlugin'));

// https://www.fastify.io/docs/latest/Hooks/
fastify.addHook('preHandler', (request, reply, next) => {
  //console.log(request.session);
  //console.log("sessionId: ",request.session.sessionId);
  let views = request.session.views || 0;
  request.session.views = ++views;
  console.log("views",request.session.views);
  next();
});

/*
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
*/

//===============================================
// ROUTES
//===============================================
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
//fastify.register(require('./fastify/route_login')); //added into the index route
// PORT SERVER
const PORT = process.env.PORT || 3000;
// LISTEN TRY CATCH
const start = async () => {
  // Run the server!
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
// SERVER INIT
start();
