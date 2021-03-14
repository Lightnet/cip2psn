/**
  Project Name: cip2psn

  LICENSE: MIT

  Created By: Lightnet

 */

const polka = require('polka');
const { json } = require('body-parser');
const session = require('express-session');
const jwt = require("jsonwebtoken");
const db = require('./db');
const config=require('../../config');
// INIT DATABASE
db.init();
// POLKA FRAMEWORK SERVER
const app = polka();
//const sleep = ms => new Promise(r => setTimeout(r, ms));
app.use(json());
// SESSION
app.use(
  session({
    secret: 'SECRET_KEY',
    resave: true,
    saveUninitialized: true,
  })
)
// AUTH
async function authenticate(req, res, next) {
  //let token = req.getHeader('authorization');
  //if (!token) return app.send(res, 401);
  //req.user = await Users.find(token); // <== fake
  //console.log(req.session);
  //console.log("auth...");
  next(); // done, woot!
}
//app.use(authenticate);
//===============================================
// INDEX HTML
function html_index(){
  return `
<html>
  <head>
    <title>polka index</title>
  </head>
  <body>
    <a href="/login">Login</a>
    <a href="/signup">Sign Up</a>
    <!--<a href="/forgot">Forgot</a>-->
    <br> <label> Weclome Guest! [Polka]</label>
  </body>
</html>
`;
}
//===============================================
// MAIN HTML
function html_access(){
  return `
<html>
  <head>
    <title>polka access</title>
  </head>
  <body>
    <a href="/logout">Logout</a>
    <br> <label> Weclome Guest! [Polka]</label>
  </body>
</html>
`;
}
//===============================================
// INDEX PAGE
app.get('/', (req, res) => {
  let token=req.session.token;
  console.log(req.session);
  console.log('token: ',token);
  if(token){
    // if there key are change it will error out
    try{
      let data = jwt.verify( token, config.tokenKey);
      console.log('[ data ]: ',data);
    }catch(err){
      console.log('TOKEN ERROR');
    }
  }
  let body;
  if(token){
    body=html_access();
  }else{
    body=html_index();
  }
  //res.end('Hello there !');
  res.end(body);
});
//===============================================
// ROUTES
const login = require('./polka/route_login');
app.use('/login', login);
// SIGN UP
const signup = require('./polka/route_signup');
app.use('/signup', signup);
// LOGOUT
app.get('/logout', (req, res) => {
  //res.end(`Logout`);
  req.session.token=null;
  res.end(`<html><body>[ Logout ] <a href="/">Home</a></body></html>`);
});
//===============================================
// SET PORT
const PORT = process.env.PORT || 3000;
// SERVER LISTEN
app.listen(PORT, function(err){
  if (err) throw err;
  let { address, port } = this.address();
  //console.log(address);
  //console.log(port);
  if(address == '::'){address='localhost';}
  console.log(`>Polka.js Server Running on http://${address}:${port}`);
});