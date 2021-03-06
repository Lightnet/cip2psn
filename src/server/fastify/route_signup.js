/**
  Project Name: cip2psn

  LICENSE: MIT

  Created By: Lightnet

 */

const user=require('../model/user');

function isEmpty(str) {
  return (typeof str === 'string' && 0 === str.length);
}
// HTML PAGE
function signUpPage() {
  return '<!doctype html><html lang="en">' +
    '<head><title>Sign Up</title></head>' +
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
  fastify.post('/signup', function (request, reply) {
    reply.type('text/html');
    //const { alias, passphrase } = request.body;
    //console.log(request.session);
    //console.log("alias:",alias);
    //console.log("passphrase:",passphrase);
    //reply.send("POST SIGN UP");
    const { alias, passphrase1, passphrase2} = request.body;
    if(isEmpty(alias)==true || isEmpty(passphrase1)==true || isEmpty(passphrase2)==true || passphrase1!=passphrase2){
      reply.send('Not the Alias || passphrase');
      return;
    }

    user.create(alias, passphrase1, passphrase2, (error, data) => {
      if(error){
        reply.send('signup error!');
        return;
      }
      console.log(data);
      reply.send(`<html><body>POST SIGNUP [${data.message}] <a href='/'>Home</a></body></html>`);
      return;
    });
  });
  // FINISH
  done();
}