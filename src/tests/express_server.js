/**
  Project Name: cip2psn

  LICENSE: MIT

  Created By: Lightnet

 */

/*
const express = require('express');
const app = express();
const port = 3000;
app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Port on which the app is listening ${port}!`));
*/
// http://expressjs.com/en/resources/middleware/body-parser.html
const bodyParser = require('body-parser');
// http://expressjs.com/en/resources/middleware/session.html
const session = require('express-session');
const auth = require('../server/express/auth');
const express = require('express');
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
//app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
//INDEX PAGE
app.get('/', auth, (req, res) =>{ 
  res.setHeader('Content-Type', 'text/plain');
  res.send('Hello World!');
});
//HTML PAGE
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
//LOGIN GET PAGE
app.get('/login', function (req, res) {
  res.send(loginPage());
});
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
// POST /login gets urlencoded bodies
//LOGIN POST PAGE
app.post('/login', urlencodedParser, function (req, res) {
  res.send('welcome, ' + req.body.alias);
});
// SERVER LISTEN
const PORT = process.env.PORT || 3000;
app.listen(PORT, function(){ 
  //console.log(app);
  let { address, port } = this.address();
  //console.log(address);
  //console.log(port);
  if(address == '::'){address='localhost';}
  //console.log(this.addContext);
  console.log(`>Express Server running on http://${address}:${port}`);
});

//var server = app.listen(PORT, 'localhost', function(){ 
  //console.log("express server on http://${address}:${port}!");
//});
//console.log(server.address());