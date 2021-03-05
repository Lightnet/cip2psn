/**
  Project Name: cip2psn

  LICENSE: MIT

  Created By: Lightnet

 */
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
    const { alias, passphrase } = request.body;
    //console.log(request.session);
    console.log("alias:",alias);
    console.log("passphrase:",passphrase);
    reply.send("POST LOGIN");
  });
  // FINISH
  done();
}