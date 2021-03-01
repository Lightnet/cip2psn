// https://www.fastify.io/docs/latest/Decorators/
// https://www.fastify.io/docs/latest/Routes/
// https://github.com/fastify/fastify/blob/master/docs/Routes.md

function html_index(){
  return `
<html>
  <head>
    <title>Index</title>
  </head>
  <body>
    <a href="/login">Login</a>
    <a href="/signup">Sign Up</a>
    <a href="/forgot">Forgot</a>
    <br> <label> Weclome Guest! </label>
  </body>
</html>
`;
}

function html_main(){
  return `
<html>
  <head>
    <title>Index</title>
  </head>
  <body>
    <a href="/logout">Logout</a>
    <br> <label> Weclome Guest! </label>
  </body>
</html>
`;
}

async function routes (fastify, options, done) {
  //fastify.get('/', async (request, reply) => {
    //return { hello: 'world' }
  //});
  fastify.get('/', function (request, reply) {
    //console.log(request.session);
    reply.code(200);
    reply.send({ hello: 'world! fastify!' });
    //reply.header('Content-Type', 'text/html');
    //reply.send(html_index());
    //reply.view('./src/server/templates/index.ejs', { alias: 'Guest' });
  });
  //fastify.register(require('./route_login'), { prefix: '/v1' }); //nope, crash
  fastify.register(require('./route_login')); // works
  done();
}
module.exports = routes;