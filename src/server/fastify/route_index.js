/**
  Project Name: cip2psn

  LICENSE: MIT

  Created By: Lightnet

 */

// https://www.fastify.io/docs/latest/Decorators/
// https://www.fastify.io/docs/latest/Routes/
// https://github.com/fastify/fastify/blob/master/docs/Routes.md
// INDEX PAGE
function html_index(){
  return `
<html>
  <head>
    <title>Fastify</title>
  </head>
  <body>
    <a href="/login">Login</a>
    <a href="/signup">Sign Up</a>
    <!--<a href="/forgot">Forgot</a>-->
    <br> <label> Weclome Guest! [Fastify]</label>
  </body>
</html>
`;
}
// ACCESS PAGE when user login
function html_main(){
  return `
<html>
  <head>
    <title>Home</title>
  </head>
  <body>
    <a href="/logout">Logout</a>
    <br> <label> Weclome Guest! </label>
  </body>
</html>
`;
}
// ROUTES
async function routes (fastify, options, done) {
  //fastify.get('/', async (request, reply) => {
    //return { hello: 'world' }
  //});
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
    //console.log(request.session);
    //request.user="tester";
    //console.log(request.user);
    //reply.send({ hello: 'world! fastify!' });
    //console.log(request.session);
    //reply.view('./src/server/templates/index.ejs', { alias: 'Guest' });
  });

  fastify.get('/logout', async function (request, reply) {
    reply.code(200);
    reply.type('text/html');
    console.log('LOGOUT');
    request.session.token=null;
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
  // FINISH
  done();
}
module.exports = routes;