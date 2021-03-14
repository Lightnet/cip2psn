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

  fastify.post('/sethint', async function (request, reply) {
    //reply.type('text/html');
    const { question1, question2, hint } = JSON.parse(request.body);
    //reply.send('data');

    if(isEmpty(question1)==true || isEmpty(question2)==true || isEmpty(hint)==true){
      reply.send({message:'Empty question1 || question2 || hint'});
      return;
    }
    let token = request.session.token;
    let data = jwt.verify(token, config.tokenKey);
    if(!data){
      reply.send({message:'NOT FOUND ALIAS!'});
    }
    console.log(data);

    let alias = data.alias;
    console.log('question1',question1);
    console.log('question2',question2);
    console.log('hint',hint);
    let chceckhint = await user.aliasSetHintSync({alias:alias,question1:question1,question2:question2,hint:hint});
    if(chceckhint){
      console.log('FOUND');
      reply.send({message:'FOUND',hint:chceckhint});
    }else{
      console.log('NOTFOUND');
      reply.send({message:'NOTFOUND'});
    }
  });

  fastify.post('/changepassphrase', async function (request, reply) {
    const { oldpassphrase, newpassphrase } = JSON.parse(request.body);
    console.log('oldpassphrase',oldpassphrase);
    console.log('newpassphrase',newpassphrase);
    reply.send({message:'TEST'});

    let token = request.session.token;
    if(!token){//401
      reply.code( 401 ).send();
      return;
    }

    try{
      let data = jwt.verify(token, config.tokenKey);
      //let saltkey = await SEA.work(data.key, data.alias);
      //let sea = await SEA.decrypt(data.sea, saltkey);
      //console.log('aliasId:',data.aliasId);
      //console.log('sea');
      //console.log(sea);
      //console.log(data);

      let isPassphraseChange = await user.aliasChangePassphraseSync({
          alias:data.alias,
          oldpassphrase:oldpassphrase,
          newpassphrase:newpassphrase
        });
      console.log('isPassphraseChange:',isPassphraseChange);
      reply.send({isPassphraseChange:isPassphraseChange});

    }catch(e){
      console.log('No Token //////////////!');
      console.log(e);
      reply.code( 401 ).send();
    }
    //let chceckhint = await user.aliasSetHintSync({alias:alias,question1:question1,question2:question2,hint:hint});
  });
  // FINISH
  done();
}