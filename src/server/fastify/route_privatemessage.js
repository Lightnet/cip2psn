/**
  Project Name: cip2psn

  LICENSE: MIT

  Created By: Lightnet

 */

//const user=require('../model/user');
const { isEmpty }=require('../model/utilities');
const jwt = require("jsonwebtoken");
const config = require('../../../config');
const SEA = require('gun/sea');

const message=require('../model/model_message');

const { processAccessToken }=require('./helper');

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
    console.log('ADD CONTACT');
    //reply.type('text/html');
    var { pub } = JSON.parse(request.body); //fetch
    //const { content } = request.body;
    //console.log(content);
    //if(isEmpty(content)){
      //reply.send({message:'empty!'});  
    //}
    //console.log(request.body)
    //var { pub } =request.body;
    //console.log(pub);
    //console.log(isEmpty(pub));
    if(isEmpty(pub)){
      return reply.send({error:'PUBKEY NULL'});
    }
    let data = await processAccessToken(request, reply);
    //console.log(data);
    //console.log(data.sea.pub);
    if(pub == data.sea.pub){
      //console.log('SAMEPUBLICKEY')
      return reply.send({error:'SAMEPUBLICKEY'});
    }
    if(data){
      //console.log(request.body);
      //console.log('process add');
      let result = await message.addPMContactSync({
        user:data
        ,sender:pub
      });
      //console.log(result);
      reply.send({message:'ok'});
    }else{
      reply.send({error:'TOKEN INVALID'});
    }
  });

  fastify.post('/privatemessage/removecontact', async function (request, reply) {
    console.log(request.body);
    const { pub } = JSON.parse(request.body); //fetch
    console.log(pub)
    reply.send({message:'privatemessage'});
  });

  fastify.get('/privatemessage/listcontact', async function (request, reply) {
    //console.log(request.body);
    //const { pub } = JSON.parse(request.body); //fetch
    //console.log(pub)

    let data = await processAccessToken(request, reply);
    //console.log(data);
    //console.log(data.sea.pub);
    //if(pub == data.sea.pub){
      //console.log('SAMEPUBLICKEY')
      //return reply.send({error:'SAMEPUBLICKEY'});
    //}
    if(data){
      //console.log(request.body);
      //console.log('process add');
      let result = await message.listPMContactSync(data);
      console.log(result);
      reply.send({alias:result.alias,pub:result.pub});

      //reply.send({message:'ok'});
    }else{
      reply.send({error:'TOKEN INVALID'});
    }

    reply.send({message:'privatemessage'});
  });
  // FINISH
  done();
}