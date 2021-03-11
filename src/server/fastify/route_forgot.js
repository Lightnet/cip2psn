/**
  Project Name: cip2psn

  LICENSE: MIT

  Created By: Lightnet

 */
// https://stackoverflow.com/questions/3350247/how-to-prevent-form-from-being-submitted
const user=require('../model/user');
const { isEmpty }=require('../model/utilities');

// HTML PAGE
function forgotPage () {
  return '<html>' +
    `<head>
      <title>Forgot</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>` +
    '<body>' +
    '<label>Forgot</label>' +
    //'<form action="/forgot" method="post">' +
    '<form id="gethint" onsubmit="return gethint(event);" action="/forgot">' +
    '<table>'+
    '<tr><td>'+
    '<label>Alias:</label>' +
    '</td><td>'+
    '<input id="alias" type="text" name="alias" value="testalias">' +
    '<td></tr>'+
    '<tr><td>'+
    '<label>Passphrase Question1:</label>' +
    '</td><td>'+
    '<input id="question1" type="text" name="question1" value="testpass">' +
    '<td></tr>'+
    '<tr><td>'+
    '<label>Passphrase Question2:</label>' +
    '</td><td>'+
    '<input id="question2" type="text" name="question2" value="testpass">' +
    '<td></tr>'+

    '<tr><td>'+
    '<label>Hints:</label>' +
    '</td><td>'+
    '<input id="hint" type="text" name="hint" value="">' +
    '<td></tr>'+


    '<tr><td colspan="2">'+
    '<a href="/">Home</a>'+
    '<button style="float:right;" type="">Get Hint</button>' +
    '</td></tr>'+
    '</table>'+
    '</form>' +
    '<script src="client_gethint.js"></script>' +
    '</body>' +
    '</html>'
}
// ROUTES
module.exports = function (fastify, opts, done) {
  // GET FORGOT
  fastify.get('/forgot', function (request, reply) {
    reply.type('text/html');
    reply.send(forgotPage());
  });
  // https://stackoverflow.com/questions/64817562/giving-error-with-node-fastify-unsupported-media-type-application-x-www-form-ur
  // https://www.w3schools.com/js/js_json_parse.asp
  // POST FORGOT 
  fastify.post('/forgot',async function (request, reply) {
    //console.log(request.body);
    const { alias, question1, question2} = JSON.parse(request.body);
    //console.log("alias:",alias);
    //console.log("question1:",question1);
    //console.log("question2:",question2);

    if(isEmpty(alias)==true || isEmpty(question1)==true || isEmpty(question2)==true){
      console.log("Empty!");
      return reply.send({error:"Empty!"});
    }

    let checkhint = await user.aliasGetHintSync({alias:alias,question1:question1,question2:question2});
    console.log('checkhint:',checkhint);
    if(checkhint){
      if(checkhint=='FAIL'){
        reply.send({message:'NOTFOUND'});
      }else{
        reply.send({message:'FOUND',hint:checkhint});
      }
    }else{
      reply.send({message:'NOTFOUND'});
    }
    //reply.send({message:"POST FORGOT"});
  });
  //FINISH
  done();
}