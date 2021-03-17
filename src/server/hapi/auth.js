/**
  Project Name: cip2psn

  LICENSE: MIT

  Created By: Lightnet

*/
const jwt = require('jsonwebtoken');
const config=require('../../../config');

'use strict';

let urllist=[
  '/'
  ,'/login'
  ,'/signup'
  ,'/logout'
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

function isEmpty(str) {
  return (typeof str === 'string' && 0 === str.length);
}

exports.plugin = {
  name:"auth",
  register: async function (server, options) {
    console.log("init auth...");
    console.log('options:',options);
    // REQUEST AUTH CHECKS
    server.ext('onPreHandler', function(request, h){
      //console.log('inside onPreHandler');
      let token;
      let bfound=false;
      //console.log('request.state:',request.state);
      if(request.state){
        //console.log('STATE',request.state);
        token=request.state.token;
      }
      //console.log('url:',request.url);
      //console.log('url:',request.path);
      //request.path
      
      //console.log('White List:',checkMatch(request.path,urllist));
      //console.log('token:',token);
      if(checkMatch(request.path,urllist)==true){
        bfound=true;
      }
      if(( bfound == true ) && (isEmpty(token) == true)){
        //console.log('SKIP HERE!');
        return h.continue;
      }else{
        //console.log('HELLO HERE!');
      }
      //console.log('PASS CHECK TOKEN....');
      //console.log(token);
      try{
        if(token){
          let data = jwt.verify(token, config.tokenKey);
          //console.log('[ data ]: ', data);
        }else{
          console.log('NO TOKEN');
          const data = {message:'Auth Token Invalid!'};
          return h.response(data).code(401).takeover(); // works
        }
      }catch(err){
        console.log('TOKEN ERROR');
        console.log(err);
        //clear cookie
        //h.state('token', '');
        //console.log(h);
        const data = {message:'Auth Token Invalid!'};
        //console.log(Boom.unauthorized('Auth Token Invalid!'));
        //return Boom.unauthorized('Auth Token Invalid!'); // works
        //return h.response(data).takeover(); // works
        return h.response(data).code(401).takeover(); // works
      }
      return h.continue;
    });
  }
};