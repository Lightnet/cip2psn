/**
  Project Name: cip2psn

  LICENSE: MIT

  Created By: Lightnet

  Note: 
    Can't be used as browser since session and cookie can't be used.
    Used fetch query to assign token key.

 */
// https://medium.com/@sarthakmittal1461/to-build-login-sign-up-and-logout-restful-apis-with-node-js-using-jwt-authentication-f3d7287acca2
// https://www.makeschool.com/academy/track/standalone/reddit-clone-in-node-js/sign-up-and-login
// https://bezkoder.com/node-js-jwt-authentication-mysql/
// https://github.com/sohamkamani/jwt-nodejs-example
//===============================================
// https://gist.github.com/repkam09/03d4b84d7dc9f530800d
// http://restify.com/docs/home/
// http://restify.com/docs/plugins-api/
// auth
// https://github.com/restify/node-restify/issues/102
// https://stackoverflow.com/questions/18411946/what-is-the-best-way-to-implement-a-token-based-authentication-for-restify-js/27442155#27442155
// https://medium.com/sean3z/json-web-tokens-jwt-with-restify-bfe5c4907e3c
// COOKIE
// https://stackoverflow.com/questions/38504107/why-restify-not-have-its-own-plugin-for-support-cookies

//===============================================
// PACKAGES
var restify = require('restify');
var CookieParser = require('restify-cookies');
//const user = require('./restify/user');

const db = require('./db/hcv1/index');
const user = require('./model/user');
const jwt = require("jsonwebtoken");
const config=require('../../config');
//const jwtKey = "my_secret_key";
//===============================================
// INIT DATABASE
db.init();
//===============================================
// HELPER FUNCTIONS
function isEmpty(str) {
  return (typeof str === 'string' && 0 === str.length);
}
//===============================================
// CREATE SERVER
var server = restify.createServer({
  name: 'restify',
  version: '1.0.0'
});
// COOKIE
server.use(CookieParser.parse);
// data can be either a String or Buffer (or null). The this object will be the response itself.
//restify.defaultResponseHeaders = function(data) {
  //this.header('Server', 'helloworld');
//};
//server.defaultResponseHeaders = function(data) {
  //this.header('Server', 'helloworld');
//};
//restify.defaultResponseHeaders = false; // disable altogether
//console.log(server.defaultResponseHeaders);
//server.get('/hello/:name', respond);
//server.head('/hello/:name', respond);
//===============================================
// API Restify
// https://stackoverflow.com/questions/22208975/restify-on-node-js-post-body-json/27825853
// http://restify.com/docs/plugins-api/
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
//server.use(restify.plugins.CORS()); //not working
server.use(restify.plugins.fullResponse());
server.use(restify.plugins.bodyParser());
// https://github.com/restify/node-restify/issues/1457
//server.use(restify.plugins.context()); //not working
server.use(restify.plugins.pre.context()); //
// https://github.com/restify/errors
//===============================================
// AUTH CHECKS
function authenticate(req, res, next){
  console.log(req.url);
  console.log('req.method',req.method);
  if(req.url=='/login'){
    return next();
  }
  if(req.url=='/signup'){
    return next();
  }
  if(req.url=='/logout'){
    return next();
  }
  if(req.url=='/forgot'){
    return next();
  }
  if(req.url=='/' && req.method=='GET'){
    res.status(200);
    return next();
  }
  if(req.url=='/favicon.ico'){
    res.status(200);
    return next();
  }
  //res.clearCookie('token');
  let token;
  if(req.cookies['token']){
    // if there key are change it will error out
    try{
      token = jwt.verify(req.cookies['token'], config.tokenKey);
      //console.log('[ token ]: ',token);
    }catch(err){
      console.log('TOKEN ERROR');
    }
  }
  //console.log("auth >> token:",token);
  if(!token){
    res.status(401);
    //res.send('Unauthorized');
    res.end('Unauthorized');
    //return next('Unauthorized');
    //console.log(restify.errors);
    //return next(new restify.errors.NotAuthorizedError());
    return next(false);//stop next process
  }
  // set cookie
  //res.setCookie('token', 'Hi There! Restify!');
  // Gets read-only cookies from the request
  //let mycookie = req.cookies['token']; //pass  
  //console.log(mycookie);
  return next();
}
server.use(authenticate);
//================================================
//server.use(restify.plugins.authorizationParser());
//req.set('foo', 'bar');
//console.log(req.get('foo'));
//================================================
// https://stackoverflow.com/questions/38504107/why-restify-not-have-its-own-plugin-for-support-cookies
// https://www.npmjs.com/package/restify-cookies
//server.use(function (req, res, next) {
  // set cookie
  //res.setCookie('my-new-cookie', 'Hi There! Restify!'); // Adds a new cookie to the response

  //var cookies = req.header('Cookie');
  //console.log(cookies); // display cookie
  //console.log(cookies['sessionId']); //not correct way to get value

  // Gets read-only cookies from the request
  //let mycookie = req.cookies['my-new-cookie'];//pass  
  //console.log('mycookie: ',mycookie);
  //let token = req.cookies['token'];//pass  
  //console.log('token: ',token);
  //next();
//});

//===============================================
// Universal handlers
//server.use(function(req, res, next) {
  //console.log('> server.use((req,res,next)=>{next();}) Universal handlers');
  //console.warn('run for all routes!');
  //return next();
//});
//===============================================
server.get('/favicon.ico', function(req, res, next) {
  ///favicon.ico
  res.status(200);
  console.log('/favicon.ico');
  res.writeHead(204); // 204 No Content
  return next();
});
//===============================================
function html_index(){
  return `
<html>
  <head>
    <title>Index</title>
  </head>
  <body>
    <a href="/login">Login</a>
    <a href="/signup">Sign Up</a>
    <!--<a href="/forgot">Forgot</a>-->
    <br> <label> Weclome Guest! [Restify]</label>
  </body>
</html>
`;
}

function html_access(){
  return `
<html>
  <head>
    <title>Index</title>
  </head>
  <body>
    <a href="/logout">Logout</a>
    <br> <label> Weclome Guest! [Restify]</label>
  </body>
</html>
`;
}
//===============================================
// https://stackoverflow.com/questions/10973479/how-do-you-send-html-with-restify
//===============================================
// GET INDEX PAGE
server.get('/', async function(req, res, next) {
  //res.header('content-type', 'text/html');
  //res.send('hello world!');
  //let token = req.cookies['token'];//pass  
  let key = req.cookies['token'];
  console.log('key: ',key);
  let token;
  if(key){
    try{
      token = jwt.verify(req.cookies['token'], config.tokenKey);
      //console.log('[ token ]: ',token);
    }catch(err){
      console.log('TOKEN ERROR');
    }
  }
  console.log('token: ',token);
  let body;
  if(token){
    body = html_access();
  } else {
    body = html_index();
  }
  res.writeHead(200, {
    'Content-Length': Buffer.byteLength(body),
    'Content-Type': 'text/html'
  });
  res.write(body);
  res.end();
  return next();
});
//===============================================
// TESTS
server.get('/a', function(req, res, next) {
  //res.header('content-type', 'text/html');
  console.log(req.cookies['my-new-cookie']);
  res.send('hello world!');
  return next();
});

server.get('/b', function(req, res, next) {
  //res.header('content-type', 'text/html');
  res.setCookie('my-new-cookie', 'Hi There'); // Adds a new cookie to the response
  res.send('hello world!');
  return next();
});

server.get('/c', function(req, res, next) {
  res.clearCookie('my-new-cookie'); // Adds a new cookie to the response
  res.send('hello world!');
  return next();
});

//server.get('/test', function(req, res, next) {
  //res.header('content-type', 'text/html');
  //res.send('hello world!');
  //return next();
//});
//===============================================
// HTML LOGIN PAGE
function loginPage() {
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
//===============================================
// LOGIN GET
server.get('/login', function(req, res, next) {
  //res.send('hello world!');
  var body = loginPage();
  res.writeHead(200, {
    'Content-Length': Buffer.byteLength(body),
    'Content-Type': 'text/html'
  });
  res.write(body);
  res.end();
  return next();
});
//===============================================
// LOGIN POST
server.post('/login',async function(req, res, next) {
  //console.log("req login:");
  //console.log(req.body);
  let {alias, passphrase} = req.body;

  if(isEmpty(alias)==true || isEmpty(passphrase)==true){
    res.end('Not the Alias || passphrase');
    return;
  }

  let data = await user.loginAliasSync({
    alias:alias
    ,passphrase:passphrase
  });

  if(data){
    res.setCookie('token', data );
    //request.session.token=data;
    //reply.redirect('/');
    res.end(`<html><body>POST LOGIN [ PASS ] <a href='/'>Home</a></body></html>`);
  }else{
    res.end(`<html><body> LOGIN [ FAIL ] <a href='/'>Home</a></body></html>`);
    return next(false);
  }

  //res.send('POST LOGIN!');
  //return next();
});
//===============================================
// HTML SIGNUP PAGE
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
//===============================================
// SIGNUP GET
server.get('/signup', function(req, res, next) {
  //res.send('hello world!');
  var body = signUpPage();
  res.writeHead(200, {
    'Content-Length': Buffer.byteLength(body),
    'Content-Type': 'text/html'
  });
  res.write(body);
  res.end('test');
  return next();
});
//===============================================
// SIGNUP POST
server.post('/signup',async function(req, res, next) {
  //console.log("req login:");
  //console.log(req.body);
  let {alias, passphrase1, passphrase2 } = req.body;

  if(isEmpty(alias)==true || isEmpty(passphrase1)==true || isEmpty(passphrase2)==true || passphrase1!=passphrase2){
    res.send({error:'Either Empty Field Alias || passphrase'});
    return next(false);
  }
  let isExist = await user.checkAliasExistSync(alias);
  if(isExist){
    //res.writeHead(200, {
      //'Content-Length': Buffer.byteLength(body),
      //'Content-Type': 'text/html'
    //});

    res.end(`<html><body>POST SIGNUP [ Alias Exist! ] <a href='/'>Home</a></body></html>`);
    return next(false);
  }
  let isDone = await user.createAliasSync({alias:alias,passphrase:passphrase1 });
  if(isDone){
    res.end(`<html><body>SIGNUP [${isDone}] <a href='/'>Home</a></body></html>`);
  }else{
    res.end('Alias Error!');
  }
  return next(false);
  
  //res.send('POST LOGIN!');
  //return next();
});
//===============================================
// LOGOUT GET
server.get('/logout',async function(req, res, next) {
  //res.send('hello world!');
  res.clearCookie('token');
  //var body = 'LOGOUT';
  //res.writeHead(200, {
    //'Content-Length': Buffer.byteLength(body),
    //'Content-Type': 'text/html'
  //});
  //res.write(body);
  //res.end('test');
  res.end(`<html><body>GET LOGOUT <a href='/'>Home</a></body></html>`);
  return next();
});
//===============================================
// SERVER PORT
const PORT = process.env.PORT || 3000;
// SERVER LISTEN
server.listen(PORT, function() {
  var {address, port} = server.address();
  if(address=='::'){address="localhost";}
  console.log(`>Restify Server running on http://${address}:${port}`);
  //let hostname = server.name;
  //if(server.name=='::'){hostname='localhost';}
  //console.log(hostname);
  //console.log(server.url);
  //console.log('%s listening at %s', hostname, server.url);
});
console.log('init close event!');
//===============================================
// END SECTION 
// CLEAN UP
// https://stackoverflow.com/questions/15471555/nodejs-process-info/56585414

if (process.pid) {
  console.log('This process is your pid ' + process.pid);
}

process.stdin.resume();//so the program will not close instantly

function exitHandler(options, exitCode) {
    console.log("closing...");
    if (options.cleanup) console.log('clean');
    if (exitCode || exitCode === 0) console.log(exitCode);
    if (options.exit) process.exit();
}

//process.on(process.pid, exitHandler.bind(null, {exit:true}));

//process.on('SIGTERM',()=> {
//  console.info('SIGTERM signal received.');
//});

process.on('SIGQUIT', exitHandler.bind(null, {exit:true}));
process.on('SIGTERM', exitHandler.bind(null, {exit:true}));

//do something when app is closing
process.on('exit', exitHandler.bind(null,{cleanup:true}));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {exit:true}));

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler.bind(null, {exit:true}));
process.on('SIGUSR2', exitHandler.bind(null, {exit:true}));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {exit:true}));

//process.stdin.resume();//so the program will not close instantly