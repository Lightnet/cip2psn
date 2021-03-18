/**
  Project Name: cip2psn

  LICENSE: MIT

  Created By: Lightnet

*/

//===============================================
// SET UP
//const localIpUrl = require('local-ip-url');
//console.log(localIpUrl());
const path = require('path');
const fastifyCookie = require('fastify-cookie');
const fastifyCaching = require('fastify-caching');
const fastifyFormbody = require('fastify-formbody');
//const mobile = require('is-mobile');
//const SESSION_SECRET = 'a secret with minimum length of 32 characters';
//var SESSION_TTL = 864e3; // 1 day in seconds
var db = require('./db');
// DATABASE
//console.log(db);
//db.init();
//===============================================
// Require the framework and instantiate it
console.log('Init Fastify Web Server Modules...')
const fastify = require('fastify')({ 
  //logger: true 
  logger: false
});
//===============================================
// BODY PRASE
fastify.register(fastifyFormbody);
fastify.register(fastifyCookie,{
  secret: "my-secret", // for cookies signature
  parseOptions: {}     // options for parsing cookies
});
fastify.register(fastifyCaching);
//===============================================
// STATIC PUBLIC FOLDER FILES
//console.log(path.join(__dirname, '../../public'));
fastify.register(require('fastify-static'), {
  root: path.join(__dirname, '../../public')
  //,prefix: '/public/', // optional: default '/'
  ,prefix:'/'
});
//===============================================
// ROUTES
//===============================================
fastify.register(require('./fastify/route_index'));
// SERVER PORT
const PORT = process.env.PORT || 3000;
// LISTEN TRY CATCH
const start = async () => {
  // TRY RUN SERVER!
  try {
    // https://www.fastify.io/docs/latest/Server/
    //await fastify.listen(PORT);
    //console.log(`Fastify server running on http://localhost:${PORT}`);
    // SERVER LISTEN 
    fastify.listen(
      {
        port:PORT
        ,host: '127.0.0.1' // localhost dev, closed network
        //,host: '0.0.0.0' // open to network
      }  
      , (err, address) => {
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
