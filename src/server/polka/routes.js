/**
  Project Name: cip2psn

  LICENSE: MIT

  Created By: Lightnet

*/

/*
const polka = require('polka');
const app = polka();
module.exports=app;
*/
const jwt = require("jsonwebtoken");
//const db = require('./db');
const config=require('../../../config');
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
// EXPORT
module.exports = (app)=>{
  //===============================================
  // INDEX PAGE
  app.get('/', (req, res) => {
    let token=req.session.token;
    //console.log(req.session);
    //console.log('token: ',token);
    if(token){
      // if there key are change it will error out
      try{
        let data = jwt.verify( token, config.tokenKey);
        //console.log('[ data ]: ',data);
      }catch(err){
        //console.log('TOKEN ERROR');
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
  const login = require('./route_login');
  app.use('/login', login);
  // SIGN UP
  const signup = require('./route_signup');
  app.use('/signup', signup);
  // LOGOUT
  app.get('/logout', (req, res) => {
    //res.end(`Logout`);
    req.session.token=null;
    res.end(`<html><body>[ Logout ] <a href="/">Home</a></body></html>`);
  });
  app.get('/test', (req, res) => {
    res.end(`<html><body>[ TEST ] <a href="/">Home</a></body></html>`);
  });

};