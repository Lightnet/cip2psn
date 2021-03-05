/**
  Project Name: cip2psn

  LICENSE: MIT

  Created By: Lightnet

 */

const polka = require('polka');
const { json } = require('body-parser');
const session = require('express-session');
// POLKA FRAMEWORK SERVER
const app = polka();

//const sleep = ms => new Promise(r => setTimeout(r, ms));
app.use(json());
// SESSION
app.use(
  session({
    secret: 'SECRET_KEY',
    resave: true,
    saveUninitialized: true,
  })
)
// AUTH
async function authenticate(req, res, next) {
  //let token = req.getHeader('authorization');
  //if (!token) return app.send(res, 401);
  //req.user = await Users.find(token); // <== fake
  //console.log(req.session);
  //console.log("auth...");
  next(); // done, woot!
}
//app.use(authenticate);
// INDEX PAGE
app.get('/', (req, res) => {
  res.end('Hello there !');
});
// ROUTES
const login = require('./polka/route_login');
app.use('/login', login);
// SET PORT
const PORT = process.env.PORT || 3000;
// SERVER LISTEN
app.listen(PORT, function(err){
  if (err) throw err;
  let { address, port } = this.address();
  //console.log(address);
  //console.log(port);
  if(address == '::'){address='localhost';}
  console.log(`>Polka.js Server Running on http://${address}:${port}`);
});