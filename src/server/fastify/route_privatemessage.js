/**
  Project Name: cip2psn

  LICENSE: MIT

  Created By: Lightnet

 */

//const user=require('../model/user');
const { isEmpty }=require('../model/utilities');
//const jwt = require("jsonwebtoken");
//const config = require('../../../config');
//const SEA = require('gun/sea');

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
    const { pub, msg } = JSON.parse(request.body); //fetch
    if(isEmpty(msg) || isEmpty(pub)){
      reply.send({message:'empty!'});  
      return;
    }
    let data = await processAccessToken(request, reply);
    if(data){
      let result = await message.sentPrivateMessageSync({
        user:data
        , msg:msg
        , pub:pub
      });
      if(result.ok==1){
        return reply.send({ok:1});
      }else{
        return reply.send({error:'PM FAIL'});
      }
    }else{
      return reply.send({error:'NULL PM FAIL'});
    }
  });

  fastify.post('/privatemessage/list', async function (request, reply) {
    const { pub } = JSON.parse(request.body); //fetch
    if( isEmpty(pub)){
      reply.send({message:'empty!'});  
      return;
    }
    let data = await processAccessToken(request, reply);
    if(data){
      let result = await message.getPrivateMessageListSync({
        user:data
        , pub:pub
      });
      if(result){
        return reply.send({ok:1,list:result});
      }else{
        return reply.send({error:'PM FAIL'});
      }
    }else{
      return reply.send({error:'NULL PM FAIL'});
    }
  });

  fastify.post('/privatemessage/addcontact', async function (request, reply) {
    console.log('ADD CONTACT');
    var { pub } = JSON.parse(request.body); //fetch
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
    var { pub } = JSON.parse(request.body); //fetch
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
      let result = await message.removePMContactSync({
        user:data
        ,sender:pub
      });
      //console.log(result);
      reply.send({message:'ok'});
    }else{
      reply.send({error:'TOKEN INVALID'});
    }
  });

  fastify.get('/privatemessage/listcontact', async function (request, reply) {
    let data = await processAccessToken(request, reply);
    if(data){
      let result = await message.listPMContactSync(data);
      console.log(result);
      reply.send({ok:1,list:result});
      return;
    }else{
      reply.send({error:'TOKEN INVALID'});
      return;
    }
    //reply.send({message:'privatemessage'});
  });


  // FINISH
  done();
}