/**
  Project Name: cip2psn

  LICENSE: MIT

  Created By: Lightnet

 */

const polka = require('polka');
const { json } = require('body-parser');
const session = require('express-session');
const jwt = require("jsonwebtoken");
const config=require('../../config');
const routes=require('./polka/routes');
// INIT DATABASE
const db = require('./db');
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

var urllist=[
  '/'
  , '/login'
  , '/logout'
  , '/signup'
  , '/forgot'
];

function checkMatch(url, list){
  let bfound;
  for(let i in list){
    if(url == list[i]){
      bfound=true;
      break;
    }
  }
  return bfound;
}

// AUTH TOKEN
async function authenticate(req, res, next) {

  //WHITE LIST URL
  if(checkMatch(req.url,urllist)){
    return next();
  }
  let token=req.session.token;
  //return next();
  if(token){
    try{
      let data = jwt.verify( token, config.tokenKey);
      console.log('[ data ]: ',data);
      return next();
    }catch(err){
      console.log('TOKEN FAIL');
      res.statusCode=401;
      res.end(JSON.stringify({message:'AUTH TOKEN INVALID!'}));
      return next(false);
    }
  }else{
    console.log('TOKEN INVALID!');
    //console.log(res);
    res.statusCode=401;
    res.end(JSON.stringify({message:'AUTH TOKEN INVALID!'}));
    return next(false);
    //res.end();
  }
  
  //let token = req.getHeader('authorization');
  //if (!token) return app.send(res, 401);
  //req.user = await Users.find(token); // <== fake
  //console.log(req.session);
  //console.log("auth...");
  next(); // done, woot!
}
app.use(authenticate);

routes(app);
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