/**
  Project Name: cip2psn

  LICENSE: MIT

  Created By: Lightnet

 */

// https://stackoverflow.com/questions/27766623/how-to-store-routes-in-separate-files-when-using-hapi
// https://hapi.dev/tutorials/expresstohapi/?lang=en_US

const jwt = require("jsonwebtoken");
const config=require('../../../config');

var login = require('./route_login');
var signup = require('./route_signup');

function html_index(){
  return `
<html>
  <head>
    <title>nodejs http</title>
  </head>
  <body>
    <a href="/login">Login</a>
    <a href="/signup">Sign Up</a>
    <!--
    <a href="/forgot">Forgot</a>
    -->
    <br> <label> Weclome Guest! [Hapijs]</label>
  </body>
</html>
`;
}
function html_access(){
  return `
<html>
  <head>
    <title>Index</title>
  </head>
  <body>
    <a href="/logout">Logout</a>
    <br> <label> Weclome Guest! [Hapijs]</label>
  </body>
</html>
`;
}

//ARRAY methods
module.exports = [
{
  method: 'GET',
  path: '/',
  handler: (request, h) => {
    request.session.views = request.session.views + 1 || 1;
    //console.log("views:",request.session.views);
    //return 'Hello World! hapi!';

    let token = request.state.token;
    let body='';
    //console.log('Token:',token);

    try{
      let data = jwt.verify(token, config.tokenKey);
      //console.log('[ data ]: ', data);
    }catch(err){
      console.log('TOKEN ERROR');
    }

    if(token){
      body=html_access();
    }else{
      body=html_index();
    }
    return body;
  }
},
{
  method: 'GET',
  path:'/logout',
  handler: (request, h) => {
    h.state('token', '');
    return `<html><body>[ Logout ] <a href="/">Home</a></body></html>`;
  }
},
{
  method: 'GET',
  path:'/getc',
  handler: (request, h) => {
    h.state('token', null);
    return `<html><body>[ Logout ] <a href="/">Home</a></body></html>`;
  }
},
{
  method: 'GET',
  path:'/gets',
  handler: (request, h) => {
    h.state('token', 'test');
    return `<html><body>[ Logout ] <a href="/">Home</a></body></html>`;
  }
},
{
  method: 'GET',
  path:'/geta',
  handler: (request, h) => {
    //h.state('token', 'test');
    console.log('COOKIE:', request.state.token);
    return `<html><body>[ Logout ] <a href="/">Home</a></body></html>`;
  }
}

].concat(login,signup);

//var cart = require('./cart');
//var user = require('./user');
//module.exports = [].concat(cart, user);