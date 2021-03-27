/**
  Project Name: cip2psn

  LICENSE: MIT

  Created By: Lightnet

 */

const jwt = require("jsonwebtoken");
const user=require('../model/user');
const { isEmpty }=require('../model/utilities');
const config = require('../../../config');
const SEA = require('gun/sea');

const { processAccessToken } =require('./helper');

// HTML PAGE
function accountPage () {
  return '<html>' +
    `<head>
      <title>Account</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <script src="https://redom.js.org/redom.min.js"></script>
    </head>
    ` +
    '<body>' +
    '<script src="/client_account.js"></script>' +
    '</body>' +
    '</html>'
}
// ROUTES
module.exports = function (fastify, opts, done) {
  // GET LOGIN
  fastify.get('/account', function (request, reply) {
    reply.type('text/html');
    reply.send(accountPage());
  });

  fastify.get('/account/pubkey', async function (request, reply) {
    //reply.type('text/html');
    let data = await processAccessToken(request, reply);
    console.log(data);
    if(data){
      reply.send({publickey:data.sea.pub});
    }else{
      reply.send({error:'TOKEN INVALID'});
    }
  });

  fastify.post('/sethint', async function (request, reply) {
    //reply.type('text/html');
    const { question1, question2, hint } = JSON.parse(request.body);
    //reply.send('data');
    //console.log('SET HINT');
    //console.log('question1: ',question1);
    //console.log('question2: ',question2);
    //console.log('hint: ',hint);

    if(isEmpty(question1)==true || isEmpty(question2)==true || isEmpty(hint)==true){
      reply.send({message:'Empty question1 || question2 || hint'});
      return;
    }
    //console.log('START TOKEN');
    let bCookie;
    let token = request.cookies.token;
    //let data;
    let sea;
    if(token){
      bCookie = request.unsignCookie(request.cookies.token);
      token=bCookie.value;
    }
    try{
      token = jwt.verify(token, config.tokenKey);
      //console.log(token);
      let saltkey = await SEA.work(token.key, token.alias);
      sea = await SEA.decrypt(token.sea, saltkey);
      //console.log('sea');
      //console.log(sea);
    }catch(err){
      //console.log(err);
      return reply.send({message:'TOKEN INVALID!'});
    }
    
    if(!token){
      return reply.send({message:'NOT FOUND ALIAS!'});
    }
    //console.log('END TOKEN');
    //console.log(token);

    let alias = token.alias;
    //console.log('question1',question1);
    //console.log('question2',question2);
    //console.log('hint',hint);
    let chceckhint = await user.aliasSetHintSync({alias:alias,question1:question1,question2:question2,hint:hint,sea:sea});
    if(chceckhint){
      //console.log('FOUND');
      reply.send({message:'FOUND',hint:chceckhint});
    }else{
      //console.log('NOTFOUND');
      reply.send({message:'NOTFOUND'});
    }
  });

  fastify.post('/gethint', async function (request, reply) {
    let bCookie;
    let token = request.cookies.token;
    let sea;

    if(token){
      bCookie = request.unsignCookie(request.cookies.token);
      token=bCookie.value;
      //console.log('token:',token);
    }
    try{
      token = jwt.verify(token, config.tokenKey);
      //console.log('token:',token);
      //console.log(token);
      let saltkey = await SEA.work(token.key, token.alias);
      sea = await SEA.decrypt(token.sea, saltkey);
    }catch(err){
      //console.log(err);
      //console.log('NO TOKEN');
      return reply.send({message:'TOKEN INVALID!'});
    }

    if(!token){
      return reply.send({message:'TOKEN INVALID!'});
    }

    let chceckhint = await user.aliasGetHintSync({alias:token.alias,sea:sea});
    if(chceckhint){
      //console.log('FOUND');
      reply.send({message:'FOUND',data:chceckhint});
    }else{
      //console.log('NOTFOUND');
      reply.send({message:'NOTFOUND'});
    }
  });

  fastify.post('/changepassphrase', async function (request, reply) {
    const { oldpassphrase, newpassphrase } = JSON.parse(request.body);
    //console.log('oldpassphrase',oldpassphrase);
    //console.log('newpassphrase',newpassphrase);

    let bCookie;
    let token = request.cookies.token;
    let sea;
    if(token){
      bCookie = request.unsignCookie(request.cookies.token);
      token=bCookie.value;
      //console.log('token:',token);
    }
    //if(!token){//401
      //reply.code( 401 ).send();
      //return;
    //}

    try{
      let data = jwt.verify(token, config.tokenKey);
      let saltkey = await SEA.work(data.key, data.alias);
      sea = await SEA.decrypt(token.sea, saltkey);
      //console.log(data);
      //console.log('aliasId:',data.aliasId);
      //console.log('sea');
      //console.log(sea);
      
      let isPassphraseChange = await user.aliasChangePassphraseSync({
          alias:data.alias,
          oldpassphrase:oldpassphrase,
          newpassphrase:newpassphrase,
          sea:sea
        });
      //console.log('isPassphraseChange:',isPassphraseChange);
      reply.send({isPassphraseChange:isPassphraseChange});

    }catch(e){
      //console.log('No Token //////////////!');
      console.log(e);
      reply.code( 401 ).send();
    }
    //let chceckhint = await user.aliasSetHintSync({alias:alias,question1:question1,question2:question2,hint:hint});
  });
  // FINISH
  done();
}