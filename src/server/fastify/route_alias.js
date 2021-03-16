/**
  Project Name: cip2psn

  LICENSE: MIT

  Created By: Lightnet

  alias ID system public search?

  module design
  - create blog or post
  - check if alias exist public access

 */

const jwt = require("jsonwebtoken");
const user=require('../model/user');
const { isEmpty }=require('../model/utilities');
const config = require('../../../config');
const SEA = require('gun/sea');

// HTML PAGE
function blankPage(){
  return '<html>' +
`<head>
  <title>blank</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://redom.js.org/redom.min.js"></script>
</head>
` +
'<body>' +
  '<script src="/client_alias.js"></script>' +
  '</body>' +
'</html>';
}
// ROUTES
module.exports = function (fastify, opts, done) {
  // GET ALIAS
  fastify.get('/alias',async function (request, reply) {
    //console.log("/ALIAS");
    let token = request.cookies.token;
    let bCookie;
    //console.log('checking token...');
    if(!token){//401
      reply.code( 401 ).send();
      //throw new Error('Unauthorized Access!');
      return;
    }

    reply.type('text/html');
    reply.send(blankPage());
  });

  fastify.get('/alias/checkPubIdExist',async function (request, reply) {
    //reply.type('text/html');
    //console.log(request.params);
    let token = request.cookies.token;
    let bCookie;
    let bfound=false;
    //console.log('checking token...');
    if(!token){//401
      reply.code( 401 ).send();
      //throw new Error('Unauthorized Access!');
      return;
    }
    let sea;
    try{
      bCookie = request.unsignCookie(request.cookies.token);


      let data = jwt.verify(bCookie.value, config.tokenKey);
      let saltkey = await SEA.work(data.key, data.alias);
      sea = await SEA.decrypt(data.sea, saltkey);
      //console.log('aliasId:',data.aliasId);
      //console.log('sea');
      //console.log(sea);
      //console.log(data);
      bfound=true;
    }catch(e){
      console.log('No Token //////////////!');
      console.log(e);
    }
    if(bfound){
      let isExistPub = await user.aliasCheckPubIdSync({pub:sea.pub});
      console.log('isExistPub:',isExistPub);
      if(isExistPub){
        reply.send({message:'EXIST'});
      }else{
        reply.send({message:'NONEXIST'});
      }
    }else{
      reply.send({message:'FAIL'});
    }

    //reply.send({message:'data'});
  });

  fastify.get('/alias/createPublicId',async function (request, reply) {
    //reply.type('text/html');
    //console.log(request.params);
    let token = request.cookies.token;
    let bfound=false;
    let bCookie;
    console.log('checking token...');
    if(!token){//401
      reply.code( 401 ).send();
      //throw new Error('Unauthorized Access!');
      return;
    }
    let sea;
    let data;
    try{
      bCookie = request.unsignCookie(request.cookies.token);
      data = jwt.verify(bCookie.value, config.tokenKey);
      let saltkey = await SEA.work(data.key, data.alias);
      sea = await SEA.decrypt(data.sea, saltkey);
      //console.log('aliasId:',data.aliasId);
      //console.log('sea');
      //console.log(sea);
      //console.log(data);
      bfound=true;
    }catch(e){
      console.log('No Token //////////////!');
      console.log(e);
    }
    if(bfound){
      let isExistPub = await user.aliasCreatePubIdSync({
        user:data,
        pub:sea.pub
      });
      //console.log('isExistPub:',isExistPub);
      if(isExistPub){
        reply.send({message:'CREATE'});
      }else{
        reply.send({message:'NONEXIST'});
      }
    }else{
      reply.send({message:'FAIL'});
    }
    //reply.send({message:'CHECKING...'});
  });

  fastify.post('/alias/post',async function (request, reply) {
    const { aliascontent } = JSON.parse(request.body);
    console.log(aliascontent);
    if(isEmpty(aliascontent)==true){
      return reply.send({message:'FAIL'});
    }

    let token = request.cookies.token;
    let bCookie;
    console.log('checking token...');
    if(!token){//401
      return reply.code( 401 ).send();
    }
    let sea;
    let data;
    let bfound=false;
    
    try{
      bCookie = request.unsignCookie(request.cookies.token);
      data = jwt.verify(bCookie.value, config.tokenKey);
      let saltkey = await SEA.work(data.key, data.alias);
      sea = await SEA.decrypt(data.sea, saltkey);
      //console.log('data:',data);
      //console.log('sea:',sea);
      bfound=true;
    }catch(e){
      console.log('No Token //////////////!');
      console.log(e);
      return reply.send({message:'FAIL'});
    }
    if(bfound){
      let isExistPost = await user.aliasCreatePubIdPostSync({
        user:data
        , pub:sea.pub
        , content:aliascontent
      });
      console.log('isExistPost:',isExistPost);
      if(isExistPost){
        reply.send({message:'CREATE',post:isExistPost});
      }else{
        reply.send({message:'FAIL'});
      }
    }else{
      reply.send({message:'FAIL'});
    }
    //reply.send({message:'CHECKING...'});
  });

  fastify.post('/alias/getPubIdPosts',async function (request, reply) {
    //const { aliascontent } = JSON.parse(request.body);
    //console.log(aliascontent);
    let token = request.cookies.token;
    let bCookie;
    console.log('checking token...');
    if(!token){//401
      return reply.code( 401 ).send();
    }
    let sea;
    let data;
    let bfound=false;
    
    try{
      bCookie = request.unsignCookie(request.cookies.token);
      data = jwt.verify(bCookie.value, config.tokenKey);
      let saltkey = await SEA.work(data.key, data.alias);
      sea = await SEA.decrypt(data.sea, saltkey);
      //console.log('data:',data);
      //console.log('sea:',sea);
      bfound=true;
    }catch(e){
      console.log('No Token //////////////!');
      console.log(e);
    }
    if(bfound){
      let feeds = await user.aliasGetPubIdPostsSync({
        user:data
        , pub:sea.pub
      });
      console.log('feeds:',feeds);
      if(feeds){
        //console.log(feeds);

        reply.send({message:'FOUND',feeds:feeds});
      }else{
        reply.send({message:'FAIL'});
      }
    }else{
      reply.send({message:'FAIL'});
    }
    //reply.send({message:'CHECKING...'});
  });


  //=============================================
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