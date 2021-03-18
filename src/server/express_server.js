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
//const jwt = require("jsonwebtoken");
const express = require('express');
const db = require('./db');
const config=require('../../config');
const routes = require('./express/routes');

//INIT DATABASE
//console.log('Init Database...');
//db.init();
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
// Check Token Authenticate 
//===============================================
app.use(auth);
//===============================================
// URL ROUTES
//===============================================
routes(app);
//===============================================
// SERVER PORT
//===============================================
const PORT = process.env.PORT || 3000;
//===============================================
// SERVER LISTEN
//===============================================
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