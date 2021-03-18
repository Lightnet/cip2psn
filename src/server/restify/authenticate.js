/**
  Project Name: cip2psn

  LICENSE: MIT

  Created By: Lightnet

*/

const jwt = require("jsonwebtoken");
const config=require('../../../config');

var urllist=[
  '/login'
  , '/signup'
  , '/logout'
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

// AUTH CHECKS
function authenticate(req, res, next){
  //console.log(req.url);
  //console.log('req.method',req.method);

  if(checkMatch(req.url,urllist)){
    return next();
  }
  
  if(req.url=='/' && req.method=='GET'){
    res.status(200);
    return next();
  }
  if(req.url=='/favicon.ico'){
    res.status(200);
    return next();
  }
  //res.clearCookie('token');
  let token=req.cookies['token'];
  if(token){
    // if there key are change it will error out
    try{
      token = jwt.verify(token, config.tokenKey);
      //console.log('[ token ]: ',token);
    }catch(err){
      //console.log('TOKEN ERROR');
      //console.log(err);
      res.send({message:'Auth Token Invalid!'});
      return next(false);//stop next process
    }
  }
  //console.log("auth >> token:",token);
  if(!token){
    res.status(401);
    //res.end();
    res.send({message:'Auth Token Invalid!'});
    //res.send('Unauthorized');
    //res.end('Unauthorized');
    //return next('Unauthorized');
    //console.log(restify.errors);
    //return next(new restify.errors.NotAuthorizedError());
    return next(false);//stop next process
  }
  // set cookie
  //res.setCookie('token', 'Hi There! Restify!');
  // Gets read-only cookies from the request
  //let mycookie = req.cookies['token']; //pass  
  //console.log(mycookie);
  return next();
}
exports.authenticate=authenticate;

// https://medium.com/sean3z/json-web-tokens-jwt-with-restify-bfe5c4907e3c
//"use strict";

//exports.authenticate = (username, password) => {
  //return Promise.resolve({ uid: 1, name: 'Sean', admin: false });
//};

//exports.authenticate = (username, password) => {  
  //return new Promise((resolve, reject) => {
    //db.findOne({username, password}, (err, data) => {
      //if (err) return reject(err);
      //resolve(data); // {uid: 1, name: Sean, admin: false}
    //});
  //});
//};
