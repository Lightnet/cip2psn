


// https://www.w3schools.com/nodejs/nodejs_http.asp
// https://stackoverflow.com/questions/3393854/get-and-set-a-single-cookie-with-node-js-http-server
// https://github.com/pillarjs/cookies
// https://github.com/jshttp/cookie
// https://gist.github.com/substack/7c03c37b5ff03aca2915
// https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/
// https://stackoverflow.com/questions/4295782/how-to-process-post-data-in-node-js
// https://dev.to/ajkachnic/make-a-simple-http-server-with-node-in-6-steps-491c
// https://stackoverflow.com/questions/27978868/destroy-cookie-nodejs
// https://nodejs.org/dist/latest-v14.x/docs/api/http.html#http_response_getheader_name
// https://nodejs.org/dist/latest-v14.x/docs/api/http.html#http_response_statuscode
// https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/
// https://www.w3schools.com/nodejs/
// 
const http = require('http');
//const cookie = require('cookie');
const Cookies = require('cookies');
const qs = require('querystring');
const db = require('./db/hcv1/index');
const user = require('./model/user');
const jwt = require("jsonwebtoken");
const config=require('../../config');

const host = 'localhost';
const port = 3000;
// Optionally define keys to sign cookie values
// to prevent client tampering
//const keys = ['keyboard cat']
var keys = [config.cookieKey] || ['keyboard cat'];
//INIT DATABASE
db.init();
//===============================================
// Cookies
//===============================================
function parseCookies(str) {
  let rx = /([^;=\s]*)=([^;]*)/g;
  let obj = { };
  for ( let m ; m = rx.exec(str) ; )
    obj[ m[1] ] = decodeURIComponent( m[2] );
  return obj;
}
function stringifyCookies(cookies) {
  return Object.entries( cookies )
    .map( ([k,v]) => k + '=' + encodeURIComponent(v) )
    .join( '; ');
}

function isEmpty(str) {
  return (typeof str === 'string' && 0 === str.length);
}
//===============================================
//
//===============================================
function html_index(){
  return `
<html>
  <head>
    <title>nodejs http</title>
  </head>
  <body>
    <a href="/login">Login</a>
    <a href="/signup">Sign Up</a>
    <!--
    <a href="/forgot">Forgot</a>
    -->
    <br> <label> Weclome Guest! [http]</label>
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
//
//===============================================
async function url_login(req,res){
  if(req.method=='GET'){
    res.writeHead(200);
    res.end(loginPage());
    return;
  }
  if(req.method=='POST'){
    //res.writeHead(200);
    let body = [];
    req.on('error', (err) => {
      console.error(err);
      res.end(err);
    }).on('data', (chunk) => {
      body.push(chunk);
    }).on('end',async () => {
      body = Buffer.concat(body).toString();
      let post = qs.parse(body);
      //console.log(body);
      //console.log(post);
      let {alias, passphrase} = post;
      if(isEmpty(alias)==true || isEmpty(passphrase)==true){
        res.end('Not the Alias || passphrase');
        return;
      }
      //CHECK USER AND TOKEN KEY
      let data = await user.loginAliasSync({
        alias:alias
        ,passphrase:passphrase
      });
      if(data){
        let cookies = new Cookies(req, res, { keys: keys });
        cookies.set('token', data, { signed: true });
        res.end(`<html><body> LOGIN [ PASS ] <a href='/'>Home</a></body></html>`);
      }else{
        res.end(`<html><body> LOGIN [ FAIL ] <a href='/'>Home</a></body></html>`);
      }
      // At this point, we have the headers, method, url and body, and can now
      // do whatever we need to in order to respond to this request.
      //res.end(`login`);
    });
  }
}
//===============================================
//
//===============================================
function signUpPage () {
  return '<html>' +
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
    '</html>'
}
function url_signup(req,res){
  if(req.method=='GET'){
    res.writeHead(200);
    res.end(signUpPage());
    return;
  }
  if(req.method=='POST'){
    res.writeHead(200);
    let body = [];
    req.on('error', (err) => {
      console.error(err);
      res.end(err);
    }).on('data', (chunk) => {
      body.push(chunk);
    }).on('end', async () => {
      body = Buffer.concat(body).toString();
      let post = qs.parse(body);
      console.log(body);
      console.log(post);
      let {alias, passphrase1, passphrase2} = post;
      console.log(alias);
      console.log(isEmpty(alias));
      if(isEmpty(alias)==true || isEmpty(passphrase1)==true || isEmpty(passphrase2)==true || passphrase1!=passphrase2){
        res.end('Not the Alias || passphrase');
        return;
      }
      //CHECK USER EXIST AND IF CREATE
      let isExist = await user.checkAliasExistSync(alias);
      if(isExist){
        //reply.send('Alias Exist!');
        res.end(`<html><body>POST SIGNUP [ Alias Exist! ] <a href='/'>Home</a></body></html>`);
        return;
      }

      let isDone = await user.createAliasSync({alias:alias,passphrase:passphrase1 });
      if(isDone){
        res.end(`<html><body>POST SIGNUP [${isDone}] <a href='/'>Home</a></body></html>`);
      }else{
        res.end('Alias Error!');
      }
      
      // At this point, we have the headers, method, url and body, and can now
      // do whatever we need to in order to respond to this request.
      //res.end(`url_signup`);
    });
  }
}
// REQUEST HANDLE
const requestListener = function (req, res) {
  // Create a cookies object
  let cookies = new Cookies(req, res, { keys: keys });
  var token = cookies.get('token', { signed: true });
  console.log('token:',token);
  try{
    let data = jwt.verify(token, config.tokenKey);
    console.log('[ data ]: ', data);
  }catch(err){
    console.log('TOKEN ERROR');
  }
  // MATCH URL SWITCH
  switch (req.url) {
    case "/favicon.ico":
      res.statusCode=204;
      break
    case "/":
      //res.writeHead(200);
      //res.statusCode=200;
      res.writeHead(200, {'Content-Type': 'text/html'});
      let body;
      if(token){//check user has token key
        body=html_access();
      }else{
        body=html_index();
      }
      res.end(body);
      break
    case "/login":
      //res.writeHead(200);
      res.statusCode=200;
      //console.log(req.method);
      url_login(req,res);
      break
    case "/signup":
      //res.writeHead(200);
      res.statusCode=200;
      url_signup(req,res);
      //res.end(`signup`);
      break
    case "/logout":
      // https://www.npmjs.com/package/cookies
      //res.writeHead(200);
      // Set the cookie to a value
      cookies.set('token', '', { 
        signed: true
        ,maxAge:Date.now()
      })
      res.statusCode=200;
      res.end(`<html><body>[ Logout ] <a href="/">Home</a></body></html>`);
      break
    default:
      //res.writeHead(404);
      res.statusCode=404;
      res.end(JSON.stringify({error:"Resource not found"}));
  }
}
// SET UP SERVER
const server = http.createServer(requestListener);
// INIT SERVER
server.listen(port, () => {
    console.log(`>http Server is running on http://${host}:${port}`);
});
// 