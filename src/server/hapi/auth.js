'use strict';

exports.plugin = {
  name:"auth",
  register: async function (server, options) {
    console.log("init auth...");

    
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