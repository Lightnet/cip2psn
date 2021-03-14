/**
  Project Name: cip2psn

  LICENSE: MIT

  Created By: Lightnet

*/

// http://expressjs.com/en/resources/middleware/body-parser.html
const bodyParser = require('body-parser');
// http://expressjs.com/en/resources/middleware/session.html
const session = require('express-session');
const auth = require('./express/auth');
const jwt = require("jsonwebtoken");
const express = require('express');
const db = require('./db');
const config=require('../../config');

//INIT DATABASE
console.log('Init Database...');
db.init();
console.log('Init Express modules...');
const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// http://expressjs.com/en/resources/middleware/session.html
//app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { 
    //secure: true, // doesn't save session key value
    //maxAge: 60000
  }
}));
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
})
//===============================================
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
var login = require('./express/route_login');
app.use('/login', login);
// SIGN UP
var signup = require('./express/route_signup');
app.use('/signup', signup);
// LOGOUT
app.get('/logout', function (req, res) {
  //res.send('welcome, ' + req.body.alias);
  console.log(req.session);
  //null token 
  req.session.token=null;
  res.end(`<html><body>[ Logout ] <a href="/">Home</a></body></html>`);
});
// SERVER PORT
const PORT = process.env.PORT || 3000;
// SERVER LISTEN
app.listen(PORT, function(){ 
  //console.log(app);
  let { address, port } = this.address();
  //console.log(address);
  //console.log(port);
  if(address == '::'){address='localhost';}
  //console.log(this.addContext);
  console.log(`>Express Server running on http://${address}:${port}`);
});
//var server = app.listen(PORT, 'localhost', function(){ 
  //console.log("express server on http://${address}:${port}!");
//});
//console.log(server.address());