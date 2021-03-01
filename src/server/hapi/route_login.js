
// https://hapi.dev/tutorials/auth/?lang=en_US


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

module.exports = [
  {
    method: 'GET',
    path: '/login',
    handler: (request, h) => {
      //return 'GET LOGIN !';
      return loginPage();
    }
  }
  ,
  {
    method: 'POST',
    path: '/login',
    handler: (request, h) => {
      const post = request.payload;
      console.log("post: ",post);
      console.log(post.alias);
      //console.log(request.body);
      return 'POST LOGIN !';
    }
  }
];