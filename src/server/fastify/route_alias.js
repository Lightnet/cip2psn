/**
  Project Name: cip2psn

  LICENSE: MIT

  Created By: Lightnet

  alias ID system public ssearch?

 */

//const jwt = require("jsonwebtoken");
//const user=require('../model/user');
//const { isEmpty }=require('../model/utilities');
//const config = require('../../../config');

// HTML PAGE
function blankPage () {
  return '<html>' +
    `<head>
      <title>blank</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <script src="https://redom.js.org/redom.min.js"></script>
    </head>
    ` +
    '<body>' +
    '<script src="/client_blank.js"></script>' +
    '</body>' +
    '</html>'
}
// ROUTES
module.exports = function (fastify, opts, done) {
  // GET ALIAS
  fastify.get('/alias', function (request, reply) {
    console.log("ALIAS?");
    reply.type('text/html');
    console.log(request.params);
    reply.send(blankPage());
  });

  fastify.get('/alias/:id', function (request, reply) {
    console.log("ALIAS ID?");
    reply.type('text/html');
    console.log(request.params);
    reply.send(blankPage());
  });

  fastify.get('/alias/:id/:page', function (request, reply) {
    console.log("ALIAS ID d?");
    reply.type('text/html');
    console.log(request.params);
    reply.send(blankPage());
  });

  fastify.post('/alias', async function (request, reply) {
    //reply.type('text/html');
    //const { question1, question2, hint } = JSON.parse(request.body);
    //reply.send('data');
    //if(isEmpty(question1)==true || isEmpty(question2)==true || isEmpty(hint)==true){
      //reply.send({message:'Empty question1 || question2 || hint'});
      //return;
    //}
    //let token = request.session.token;
    //let data = jwt.verify(token, config.tokenKey);
    //if(!data){
      //reply.send({message:'NOT FOUND ALIAS!'});
    //}
    //console.log(data);
    //let alias = data.alias;
  });
  // FINISH
  done();
}