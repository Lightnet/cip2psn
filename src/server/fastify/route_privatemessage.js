/**
  Project Name: cip2psn

  LICENSE: MIT

  Created By: Lightnet

 */

//const user=require('../model/user');
const { isEmpty }=require('../model/utilities');
const jwt = require("jsonwebtoken");
const config = require('../../../config');

// HTML PAGE
function blankPage () {
  return '<html>' +
    `<head>
      <title>blank</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <script src="https://redom.js.org/redom.min.js"></script>
      <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
    </head>
    ` +
    '<body>' +
    '<script src="/client_privatemessage.js"></script>' +
    '</body>' +
    '</html>'
}
// ROUTES
module.exports = function (fastify, opts, done) {
  // GET LOGIN
  fastify.get('/privatemessage', function (request, reply) {
    reply.type('text/html');
    reply.send(blankPage());
  });

  fastify.post('/privatemessage', async function (request, reply) {
    //reply.type('text/html');
    //const { content } = JSON.parse(request.body); //fetch
    const { content } = request.body;
    console.log(content);
    if(isEmpty(content)){
      reply.send({message:'empty!'});  
    }
    reply.send({message:'privatemessage',content:content});
  });

  fastify.post('/privatemessage/addcontact', async function (request, reply) {
    //reply.type('text/html');
    //const { content } = JSON.parse(request.body); //fetch
    //const { content } = request.body;
    //console.log(content);
    //if(isEmpty(content)){
      //reply.send({message:'empty!'});  
    //}
    let bCookie;
    let token = request.cookies.token;
    let data;
    if(token){
      //console.log('[ FOUND TOKEN ]');
      bCookie = request.unsignCookie(request.cookies.token);
    }else{
      //console.log('[ NULL TOKEN ]');
    }
    try{
      data = jwt.verify(bCookie.value, config.tokenKey);
    }catch(err){
      console.log(err);
    }
    console.log(data);
    console.log(request.body);
    reply.send({message:'privatemessage'});
  });

  fastify.post('/privatemessage/removecontact', async function (request, reply) {
    //reply.type('text/html');
    let bCookie;
    let token = request.cookies.token;
    let data;
    if(token){
      //console.log('[ FOUND TOKEN ]');
      bCookie = request.unsignCookie(request.cookies.token);
    }else{
      //console.log('[ NULL TOKEN ]');
    }
    try{
      data = jwt.verify(bCookie.value, config.tokenKey);
    }catch(err){
      console.log(err);
    }
    console.log(data);


    console.log(request.body);
    const { pub } = JSON.parse(request.body); //fetch
    console.log(pub)
    //const { content } = request.body;
    //console.log(request.body);
    //console.log(content);
    //if(isEmpty(content)){
      //reply.send({message:'empty!'});  
    //}
    reply.send({message:'privatemessage'});
  });
  // FINISH
  done();
}