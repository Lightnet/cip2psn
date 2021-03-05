/**
  Project Name: cip2psn

  LICENSE: MIT

  Created By: Lightnet

 */

// https://hapi.dev/tutorials/plugins/?lang=en_US
// https://hapi.dev/tutorials/expresstohapi/?lang=en_US
// https://hapi.dev/plugins/
// https://futurestud.io/tutorials/hapi-extend-your-server-functionality-with-plugins
'use strict';

exports.plugin = {
  name:"myplugin",
  register: async function (server, options) {
    console.log("init myplugin...");

    //server.ext('onRequest', function (request, h) {
      //request.setUrl('/test');
      //console.log("onRequest...");
      //return h.continue;
    //});

    // Create a route for example
    /*
    server.route({
      method: 'GET',
      path: '/test',
      handler: function (request, h) {
        const name = options.name;
        return `Hello ${name}`;
      }
    });
    */
    // etc...
    //await someAsyncMethods();
  }
};