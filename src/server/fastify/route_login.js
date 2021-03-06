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
function loginPage () {
  return '<html>' +
    '<head><title>Login</title></head>' +
    '<body>' +
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
    '</body>' +
    '</html>'
}
// ROUTES
module.exports = function (fastify, opts, done) {
  // GET LOGIN
  fastify.get('/login', function (request, reply) {
    reply.type('text/html');
    reply.send(loginPage());
  });
  // POST LOGIN
  fastify.post('/login', function (request, reply) {
    reply.type('text/html');
    const { alias, passphrase } = request.body;
    //console.log(request.session);
    //console.log("alias:",alias);
    //console.log("passphrase:",passphrase);
    //reply.send("POST LOGIN");
    if(isEmpty(alias)==true || isEmpty(passphrase)==true){
      reply.send('Not the Alias || passphrase');
      return;
    }

    user.authenticate(alias, passphrase, (error,data) => {
      if(error){
        console.log('error >> ');
        console.log(error);
      }
      //console.log(data);
      if(data){
        if(data.message=='FOUND'){
          console.log('SET COOOKIE');
          //res.setCookie('token', data.token );
          //let cookies = new Cookies(req, res, { keys: keys });
          //cookies.set('token', data.token, { signed: true });
          console.log('data.token:',data.token);
          request.session.token=data.token;
        }
      }
      reply.send(`<html><body>POST LOGIN [${data.message}] <a href='/'>Home</a></body></html>`);
      //res.end(`<html><body>POST LOGIN [${data.message}] <a href='/'>Home</a></body></html>`);
    });






  });
  // FINISH
  done();
}