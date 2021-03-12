/**
  Project Name: cip2psn

  LICENSE: MIT

  Created By: Lightnet

 */

// https://auth0.com/blog/developing-restful-apis-with-hapijs/
// https://hapi.dev/tutorials/routing/?lang=en_US
// https://hapi.dev/tutorials/expresstohapi/?lang=en_US
// https://dev.to/miteshkamat27/extension-points-in-hapi-5ckk
// 
// 

'use strict';
const db = require('./db/hcv1/index');
const Hapi = require('@hapi/hapi');

const PORT = process.env.PORT || 3000;

var routes = require('./hapi/routes');
const init = async () => {
    //INIT DATABASE
    console.log('Init Database...');
    db.init();
    console.log('Init Web Server Modules...');
    // SET UP WEB SERVER MODULES
    const server = Hapi.server({
      port: PORT,
      host: 'localhost'
    });
    // COOKIE
    server.state('token', {
      ttl: null,
      isSecure: false,
      isHttpOnly: true
    });
    // SESSION
    await server.register({
      plugin: require('hapi-server-session'),
      options: {
        cookie: {
          isSecure: false, // never set to false in production
        },
      },
    });
    // CUSTOM PLUGIN
    //await server.register({
      //plugin: require('./hapi/myplugin'),
      //options: {
        //name: 'myplugin'
      //}
    //});
    // CUSTOM PLUGIN
    //await server.register({
      //plugin: require('./hapi/auth'),
      //options: {
        //name: 'auth'
      //}
    //});
    // REQUEST
    //server.ext('onRequest', function(request, h){
      //console.log('inside onRequest');
      //return h.continue;
    //});
    // REQUEST
    //server.ext('onRequest', function (request, h) {
      //request.setUrl('/test');
      //console.log("onRequest...");
      //return h.continue;
    //});
    // ROUTES
    server.route(routes);
    // START SERVER
    await server.start();
    console.log('>Hapi.js Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();