/**
  Project Name: cip2psn

  LICENSE: MIT

  Created By: Lightnet

 */
// https://www.fastify.io/docs/master/Plugins/
// https://www.fastify.io/docs/latest/Decorators/
//PACKAGE
const fp = require('fastify-plugin');
// SET UP PLUGIN
async function myPlugin(fastify, opts, done) {
  //app.decorateRequest('user', null);
  //config value / function
  fastify.decorateRequest('user', ''); // instance of the server

  fastify.decorate('utlitest',function(){
    // do something
    console.log('plugin ultility function');
  });

  fastify.decorate('conf', {
    db: 'some.db',
    port: 3000
  })

  fastify.utlitest();
  console.log(fastify.conf.db);


  // Update our property
  fastify.addHook('preHandler', function(request, reply, next){ // (request, reply, next)=>{} // this will not work when used this.<param>
    // Some code
    request.user = 'guest';
    //fastify.utlitest();
    this.utlitest();
    console.log('this.conf');
    console.log(this.conf);
    next();
  });

  // no change
  //fastify.addHook('onRequest', async (request, reply) => {
    //console.log('request');
    //console.log("USER:",request.user);
  //});

  // And finally access it
  // note it will conlfict the '/' url
  //fastify.get('/', (req, reply) => {
    //reply.send(`Hello, ${req.user}!`)
    //console.log(`Hello, ${req.user}!`);
  //});


  done();
}
// EXPORT PLUGIN
module.exports = fp(myPlugin);