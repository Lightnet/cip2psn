/**
  Project Name: cip2psn

  LICENSE: MIT

  Created By: Lightnet

 */

// https://stackoverflow.com/questions/27766623/how-to-store-routes-in-separate-files-when-using-hapi
// https://hapi.dev/tutorials/expresstohapi/?lang=en_US

var login = require('./route_login');


//ARRAY methods
module.exports = [
{
  method: 'GET',
  path: '/',
  handler: (request, h) => {
    //request.session.views = request.session.views + 1 || 1;
    //console.log("views:",request.session.views);
    return 'Hello World! hapi!';
  }
}
].concat(login);

//var cart = require('./cart');
//var user = require('./user');
//module.exports = [].concat(cart, user);