/**
  Project Name: cip2psn

  LICENSE: MIT

  Created By: Lightnet

 */

//PACKAGE
const fp = require('fastify-plugin');
// SET UP PLUGIN
async function myPlugin (app) {
  //app.decorateRequest('user', null);
  //config value / function
  app.decorateRequest('user', 'setuser');//instance of the server
  app.addHook('onRequest', async (req, reply) => {
    console.log('request');
    console.log("USER:",req.user);
    //req.user = req.user || "guest" ;
  });
}
// EXPORT PLUGIN
module.exports = fp(myPlugin);