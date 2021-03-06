/**
  Project Name: cip2psn

  LICENSE: MIT

  Created By: Lightnet

*/
const jwt = require("jsonwebtoken");
//const db = require('./db');
const config=require('../../../config');

function html_index(){
  return `
<html>
  <head>
    <title>Expressjs</title>
  </head>
  <body>
    <a href="/login">Login</a>
    <a href="/signup">Sign Up</a>
    <!--<a href="/forgot">Forgot</a>-->
    <br> <label> Weclome Guest! [Express]</label>
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
    <br> <label> Weclome Guest! [Restify]</label>
  </body>
</html>
`;
}
//INDEX PAGE
module.exports = (app)=>{
  //===============================================
  app.use(function (req, res, next) {
    //console.log('Time:', Date.now())
    //console.log('req.session.token',req.session.token);
    //console.log(req.session);
    //req.session.token = req.session.token || 'token';
    if (req.session.views) {
      req.session.views++
    }else{
      req.session.views = 1;
    }
    //console.log(req.session.views);
    next();
  });
  //app.get('/', auth, (req, res) =>{ 
  app.get('/', (req, res) =>{ 
    //res.setHeader('Content-Type', 'text/plain');
    //res.send('Hello World!');
    //if (req.session.views) {
      //req.session.views++
    //}else{
      //req.session.views = 1;
    //}
    //console.log(req.session.views);

    res.setHeader('Content-Type', 'text/html');
    let body='';
    let token=req.session.token;
    try{
      let data = jwt.verify(token, config.tokenKey);
      //console.log('[ data ]: ', data);
    }catch(err){
      //console.log('TOKEN ERROR');
    }

    //console.log('Token:',token);
    if(token){
      body=html_access();
    }else{
      body=html_index();
    }
    res.end(body);
  });
  // favicon
  app.get('/favicon.ico', function (req, res) {
    //res.send('welcome, ' + req.body.alias);
    res.statusCode=204;
    //res.end();
  });
  // LOGIN
  var login = require('./route_login');
  app.use('/login', login);
  // SIGN UP
  var signup = require('./route_signup');
  app.use('/signup', signup);
  // LOGOUT
  app.get('/logout', function (req, res) {
    //res.send('welcome, ' + req.body.alias);
    console.log(req.session);
    //null token 
    req.session.token=null;
    res.end(`<html><body>[ Logout ] <a href="/">Home</a></body></html>`);
  });
  // TEST
  app.get('/test', function (req, res) {
    res.end(`<html><body>[ TEST ] <a href="/">Home</a></body></html>`);
  });
}
