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
const jwt = require("jsonwebtoken");
const config=require('../../config');
const db = require('./db');
const Hapi = require('@hapi/hapi');
//var Boom = require('@hapi/boom');

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
    let urllist=[
      '/'
      ,'/login'
      ,'/signup'
      ,'/logout'
    ];
    // REQUEST AUTH CHECKS
    server.ext('onRequest', function(request, h){
      console.log('inside onRequest');
      let token;
      //console.log(request.state);
      //if(request.state){
      //}
      //console.log('url:',request.url);
      console.log('url:',request.path);
      //request.path
      let bfound=false;
      for(let u in urllist){
        if(urllist[u]==request.path){
          bfound=true;
          break;
        }
      }
      if(bfound){
        return h.continue;
      }

      try{
        token=request.state.token;
        if(token){
          let data = jwt.verify(token, config.tokenKey);
          console.log('[ data ]: ', data);
        }else{
          console.log('NO TOKEN');
        }
      }catch(err){
        console.log('TOKEN ERROR');
        //clear cookie
        h.state('token', '');
        //console.log(h);
        const data = {message:'Auth Token Invalid!'};
        //console.log(Boom.unauthorized('Auth Token Invalid!'));
        //return Boom.unauthorized('Auth Token Invalid!'); // works
        //return h.response(data).takeover(); // works
        return h.response(data).code(401).takeover(); // works
      }
      return h.continue;
    });

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