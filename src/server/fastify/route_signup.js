/**
  Project Name: cip2psn

  LICENSE: MIT

  Created By: Lightnet

*/

const user=require('../model/user');
var { isEmpty }=require('../model/utilities');

// HTML PAGE
function signUpPage() {
  return `<!doctype html><html lang="en">` +
    `<head>
      <title>Sign Up</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>` +
    '<body>' +
    '<label>Sign Up</label>' +
    '<form action="/signup" method="post">' +
    '<table>'+
    '<tr><td>'+
    '<label>Alias:</label>' +
    '</td><td>'+
    '<input type="text" name="alias" value="testalias" placeholder="alias">' +
    '<td></tr>'+
    '<tr><td>'+
    '<label>Passphrase 1:</label>' +
    '</td><td>'+
    '<input type="text" name="passphrase1" value="testpass"  placeholder="passphrase">' +
    '<td></tr>'+
    '<tr><td>'+
    '<label>Passphrase 2:</label>' +
    '</td><td>'+
    '<input type="text" name="passphrase2" value="testpass"  placeholder="passphrase">' +
    '<td></tr>'+
    '<tr><td colspan="2">'+
    '<a href="/">Home</a>'+
    '<button style="float:right;" type="submit">Login</button>' +
    '</td></tr>'+
    '</table>'+
    '</form>' +
    '</body>' +
    '</html>';
}
//ROUTES
module.exports = function (fastify, opts, done) {
  // GET SIGN UP
  fastify.get('/signup', function (request, reply) {
    reply.type('text/html');
    reply.send(signUpPage());
  });
  // POST SIGN UP
  fastify.post('/signup',async function (request, reply) {
    reply.type('text/html');
    //const { alias, passphrase } = request.body;
    //console.log(request.session);
    //console.log("alias:",alias);
    //console.log("passphrase:",passphrase);
    //reply.send("POST SIGN UP");
    const { alias, passphrase1, passphrase2} = request.body;
    if(isEmpty(alias)==true || isEmpty(passphrase1)==true || isEmpty(passphrase2)==true || passphrase1!=passphrase2){
      reply.send('Either Empty Field Alias || passphrase');
      return;
    }

    let isExist = await user.checkAliasExistSync(alias);
    if(isExist){
      //reply.send('Alias Exist!');
      reply.send(`<html><body>POST SIGNUP [ Alias Exist! ] <a href='/'>Home</a></body></html>`);
      return;
    }

    let isDone = await user.createAliasSync({alias:alias,passphrase:passphrase1 });
    if(isDone){
      reply.send(`<html><body>POST SIGNUP [${isDone}] <a href='/'>Home</a></body></html>`);
    }else{
      reply.send('Alias Error!');
    }
  });
  // FINISH
  done();
}