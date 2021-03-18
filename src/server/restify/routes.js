/**
  Project Name: cip2psn

  LICENSE: MIT

  Created By: Lightnet

*/

// https://github.com/restify/node-restify/issues/1173
// https://github.com/shermify/restify-example/blob/master/routes/index.js

const jwt = require("jsonwebtoken");
const config=require('../../../config');

var login = require('./route_login');
var signup = require('./route_signup');

//===============================================
// INDEX PAGE
function html_index(){
  return `
<html>
  <head>
    <title>Index</title>
  </head>
  <body>
    <a href="/login">Login</a>
    <a href="/signup">Sign Up</a>
    <!--<a href="/forgot">Forgot</a>-->
    <br> <label> Weclome Guest! [Restify]</label>
  </body>
</html>
`;
}
// MAIN PAGE ACCESS
function html_access(){
  return `
<html>
  <head>
    <title>Index</title>
  </head>
  <body>
    <a href="/logout">Logout</a>
    <br> <label> Weclome Guest! [Restify]</label>
  </body>
</html>
`;
}

module.exports = (server)=>{
  //===============================================
  // URL FAVICON
  server.get('/favicon.ico', function(req, res, next) {
    ///favicon.ico
    res.status(200);
    console.log('/favicon.ico');
    res.writeHead(204); // 204 No Content
    return next();
  });
  //===============================================
  // GET INDEX PAGE
  server.get('/', async function(req, res, next) {
    //res.header('content-type', 'text/html');
    //res.send('hello world!');
    //let token = req.cookies['token'];//pass  
    let key = req.cookies['token'];
    //console.log('key: ',key);
    let token;
    if(key){
      try{
        token = jwt.verify(req.cookies['token'], config.tokenKey);
        //console.log('[ token ]: ',token);
      }catch(err){
        //console.log('TOKEN ERROR');
      }
    }
    //console.log('token: ',token);
    let body;
    if(token){
      body = html_access();
    } else {
      body = html_index();
    }
    res.writeHead(200, {
      'Content-Length': Buffer.byteLength(body),
      'Content-Type': 'text/html'
    });
    res.write(body);
    res.end();
    return next();
  });
  //===============================================
  // GET LOGOUT
  server.get('/logout',async function(req, res, next) {
    res.clearCookie('token');
    res.end(`<html><body>GET LOGOUT <a href='/'>Home</a></body></html>`);
    return next();
  });

  //===============================================
  // TEST RESTRICT
  server.get('/test', function(req, res, next) {
    res.end(`<html><body>Test <a href="/">Home</a></body></html>`);
    return next();
  });

  // ROUTE URLS
  login(server);
  signup(server);
};

//export default (server)=>{
  //login(server);
//};

// combine routes
/*
import route1 from './route1';
import route2 from './route2';

export default(server) => {
  route1(server);
  route2(server);
};
*/