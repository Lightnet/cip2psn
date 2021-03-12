/**
  Project Name: cip2psn

  LICENSE: MIT

  Created By: Lightnet

 */

const user=require('../model/user');
var { isEmpty }=require('../model/utilities');
//const jwt = require("jsonwebtoken");
//const config =require('../../../config');
//const SEA = require('gun/sea');

// HTML PAGE
function loginPage () {
  return '<html>' +
  `<head>
    <title>Login</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://redom.js.org/redom.min.js"></script>
  </head>
  ` +
  '<body>' +
  '<script src="/client_login.js"></script>' +
    /*
    '<label>Login</label>' +
    '<form action="/login" method="post">' +
      '<table>'+
      '<tr><td>'+
      '<label>Alias:</label>' +
      '</td><td>'+
      '<input type="text" name="alias" value="testalias">' +
      '<td></tr>'+
      '<tr><td>'+
      '<label>Passphrase:</label>' +
      '</td><td>'+
      '<input type="passphrase" name="passphrase" value="testpass">' +
      '<td></tr>'+
      '<tr><td colspan="2">'+
      '<a href="/">Home</a>'+
      '<button style="float:right;" type="submit">Login</button>' +
      '</td></tr>'+
      '</table>'+
    '</form>' +
    */
  '</body>' +
'</html>';
}

// ROUTES
module.exports = function (fastify, opts, done) {
  // GET LOGIN
  fastify.get('/login', function (request, reply) {
    reply.type('text/html');
    reply.send(loginPage());
  });
  // POST LOGIN
  fastify.post('/login', async function (request, reply) {
    reply.type('text/html');
    const { alias, passphrase } = request.body;
    //console.log(request.session);
    //console.log("alias:",alias);
    //console.log("passphrase:",passphrase);
    //reply.send("POST LOGIN");
    if(isEmpty(alias)==true || isEmpty(passphrase)==true){
      reply.send('Empty Alias || passphrase');
      return;
    }
    let data = await user.loginAliasSync({
      alias:alias
      ,passphrase:passphrase
    });
    //console.log(data);
    if(data){
      //let sea;
      //let saltkey = await SEA.work(passphrase, alias);
      //data.sea = await SEA.decrypt(data.sea, saltkey);

      request.session.token=data;
      reply.redirect('/');
      //reply.send(`<html><body> LOGIN [ Pass ] <a href='/'>Home</a></body></html>`);
    }else{
      reply.send(`<html><body> LOGIN [ Fail ] <a href='/'>Home</a></body></html>`);
    }
  });
  // FINISH
  done();
}