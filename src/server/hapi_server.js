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

let urllist=[
  '/'
  ,'/login'
  ,'/signup'
  ,'/logout'
];

function checkMatch(url, list){
  let bfound;
  for(let i in list){
    if(url == list[i]){
      bfound=true;
      break;
    }
  }
  return bfound;
}

const init = async () => {
    //INIT DATABASE
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
    // AUTH PLUGIN
    await server.register({
      plugin: require('./hapi/auth'),
      options: {
        //name: 'auth'
      }
    });
    // AUTH CHECKED FINE
    /*
    server.ext('onPreHandler', function(request, h){
      console.log('inside onPreHandler');
      let token;
      let bfound=false;
      //console.log('request.state:',request.state);
      if(request.state){
        console.log('STATE',request.state);
        token=request.state.token;
      }
      //console.log('url:',request.url);
      //console.log('url:',request.path);
      //request.path
      
      console.log('White List:',checkMatch(request.path,urllist));
      //console.log('token:',token);
      if(checkMatch(request.path,urllist)==true){
        bfound=true;
      }
      if(bfound==true && token ==null){
        return h.continue;
      }
      console.log('PASS CHECK TOKEN....');
      //console.log(token);
      try{
        if(token){
          let data = jwt.verify(token, config.tokenKey);
          //console.log('[ data ]: ', data);
        }else{
          console.log('NO TOKEN');
          const data = {message:'Auth Token Invalid!'};
          return h.response(data).code(401).takeover(); // works
        }
      }catch(err){
        console.log('TOKEN ERROR');
        console.log(err);
        //clear cookie
        //h.state('token', '');
        //console.log(h);
        const data = {message:'Auth Token Invalid!'};
        //console.log(Boom.unauthorized('Auth Token Invalid!'));
        //return Boom.unauthorized('Auth Token Invalid!'); // works
        //return h.response(data).takeover(); // works
        return h.response(data).code(401).takeover(); // works
      }
      return h.continue;
    });
    */
    
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