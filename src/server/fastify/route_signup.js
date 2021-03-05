/**
  Project Name: cip2psn

  LICENSE: MIT

  Created By: Lightnet

 */

// HTML PAGE
function signUpPage() {
  return '<html>' +
    '<head><title>Sign Up</title></head>' +
    '<body>' +
    '<label>Sign Up</label>' +
    '<form action="/signup" method="post">' +
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
//ROUTES
module.exports = function (fastify, opts, done) {
  // GET SIGN UP
  fastify.get('/signup', function (request, reply) {
    reply.type('text/html');
    reply.send(signUpPage());
  });
  // POST SIGN UP
  fastify.post('/signup', function (request, reply) {
    const { alias, passphrase } = request.body;
    //console.log(request.session);
    console.log("alias:",alias);
    console.log("passphrase:",passphrase);
    reply.send("POST SIGN UP");
  });
  // FINISH
  done();
}