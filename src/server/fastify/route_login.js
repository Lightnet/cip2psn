


function loginPage () {
  return '<html>' +
    '<head><title>Login</title></head>' +
    '<body>' +
    '<h1>Login</h1>' +
    '<form action="/login" method="post">' +
    '<label>Alias</label>' +
    '<input type="text" name="alias" value="testalias">' +
    '<label>Passphrase</label>' +
    '<input type="passphrase" name="passphrase" value="testpass">' +
    '<br><br><button type="submit">Login</button>' +
    '</form>' +
    '</body>' +
    '</html>'
}

module.exports = function (fastify, opts, done) {
  fastify.get('/login', function (request, reply) {
    reply.type('text/html');
    reply.send(loginPage());
  });

  fastify.post('/login', function (request, reply) {
    const { alias, passphrase } = request.body;
    console.log(request.session);
    console.log("alias:",alias);
    console.log("passphrase:",passphrase);
    reply.send("POST LOGIN");
  });
  
  done();
}