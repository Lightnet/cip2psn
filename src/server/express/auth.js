/**
  Project Name: cip2psn

  LICENSE: MIT

  Created By: Lightnet

*/

// https://openclassrooms.com/en/courses/5614116-go-full-stack-with-node-js-express-and-mongodb/5656301-set-up-authentication-middleware
const jwt = require('jsonwebtoken');
const config=require('../../../config');

var urllist=[
  '/'
  , '/login'
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

module.exports = (req, res, next) => {
  //console.log(req.headers);
  //console.log(req.session);
  console.log('req.method',req.method);
  console.log('req.url',req.url);

  if(checkMatch(req.url,urllist)){
    return next();
  }

  let token =req.session.token;
  try{
    if(token){
      let data = jwt.verify(token, config.tokenKey);
      console.log('[ data ]: ', data);
      return next();
    }else{
      res.statusCode=401;
      res.end(JSON.stringify({message:'AUTH TOKEN INVALID!'}));
      return next(false);
    }
  }catch(err){
    console.log('TOKEN ERROR');
    //res.setHeader('Content-Type', 'text/plain');
    res.statusCode=401;
    res.end(JSON.stringify({message:'AUTH TOKEN INVALID!'}));
    return next(false);
  }

  //next();
  //try {
    //const token = req.headers.authorization.split(' ')[1];
    //const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    //const userId = decodedToken.userId;
    //if (req.body.userId && req.body.userId !== userId) {
      //throw 'Invalid user ID';
    //} else {
      //next();
    //}
  //} catch {
    //res.status(401).json({
      //error: new Error('Invalid request!')
    //});
  //}
};