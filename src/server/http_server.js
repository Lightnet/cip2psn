


// https://www.w3schools.com/nodejs/nodejs_http.asp
// https://stackoverflow.com/questions/3393854/get-and-set-a-single-cookie-with-node-js-http-server
// https://github.com/pillarjs/cookies
// https://github.com/jshttp/cookie
// https://gist.github.com/substack/7c03c37b5ff03aca2915
// https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/
// https://stackoverflow.com/questions/4295782/how-to-process-post-data-in-node-js
// https://dev.to/ajkachnic/make-a-simple-http-server-with-node-in-6-steps-491c
const http = require('http');
//const cookie = require('cookie');
const Cookies = require('cookies');
const qs = require('querystring');
const host = 'localhost';
const port = 3000;

// Optionally define keys to sign cookie values
// to prevent client tampering
const keys = ['keyboard cat']

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
//===============================================
//
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
    <!--
    <a href="/forgot">Forgot</a>
    -->
    <br> <label> Weclome Guest! [http]</label>
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
function url_login(req,res){
  if(req.method=='GET'){
    res.writeHead(200);
    res.end(loginPage());
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
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      let post = qs.parse(body);
      console.log(body);
      console.log(post);
      // At this point, we have the headers, method, url and body, and can now
      // do whatever we need to in order to respond to this request.
      res.end(`login`);
    });
  }
}
//===============================================
//
//===============================================
function signUpPage () {
  return '<html>' +
    '<head><title>Login</title></head>' +
    '<body>' +
    '<label>Login</label>' +
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
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      let post = qs.parse(body);
      console.log(body);
      console.log(post);
      // At this point, we have the headers, method, url and body, and can now
      // do whatever we need to in order to respond to this request.
      res.end(`login`);
    });
  }
}

const requestListener = function (req, res) {
  switch (req.url) {
    case "/":
      res.writeHead(200);
      res.end(html_index());
      break
    case "/login":
      res.writeHead(200);
      //console.log(req.method);
      url_login(req,res);
      break
    case "/signup":
      res.writeHead(200);
      url_signup(req,res);
      //res.end(`signup`);
      break
    case "/logout":
      res.writeHead(200);
      res.end(`<html><body>[ Logout ] <a href="/">Home</a></body></html>`);
      break
    default:
      res.writeHead(404);
      res.end(JSON.stringify({error:"Resource not found"}));
  }
}

const server = http.createServer(requestListener);
server.listen(port, () => {
    console.log(`Server is running on http://${host}:${port}`);
});

/*
const requestListener = function (req, res) {
  // Create a cookies object
  var cookies = new Cookies(req, res, { keys: keys })
  // Get a cookie
  var lastVisit = cookies.get('LastVisit', { signed: true });
  //console.log('>>',lastVisit);
  //console.log(typeof lastVisit);
  if(typeof lastVisit == 'string'){
    //console.log('convert?');
    lastVisit = parseInt(lastVisit);
    //console.log(typeof lastVisit);
  }else{
    lastVisit = lastVisit || 0;
  }
  lastVisit = lastVisit + 1;
  //console.log(typeof lastVisit);
  //console.log(lastVisit);
  lastVisit = lastVisit.toString();

  // Set the cookie to a value
  //cookies.set('LastVisit', new Date().toISOString(), { signed: true })
  cookies.set('LastVisit', lastVisit, { signed: true })

  if (!lastVisit) {
    res.setHeader('Content-Type', 'text/plain')
    res.end('Welcome, first time visitor!')
  } else {
    res.setHeader('Content-Type', 'text/plain')
    res.end('Welcome back! Nothing much changed since your last visit at ' + lastVisit + '.')
  }
}
*/

/*
const requestListener = function (request, response) {
  let cookies = parseCookies( request.headers.cookie );
  console.log( 'Input cookies: ', cookies );
  cookies.search = 'google';
  if ( cookies.counter )
    cookies.counter++;
  else
    cookies.counter = 1;
  console.log( 'Output cookies: ', cookies );
  response.writeHead( 200, {
    'Set-Cookie': stringifyCookies(cookies),
    'Content-Type': 'text/plain'
  } );
  response.end('Hello World\n');
}
*/

/*
const requestListener = function (req, res) {
  // To Read a Cookie
  
  // To Write a Cookie
  //res.setHeader("Content-Type", "application/json");
  //res.writeHead(200, {
    //'Set-Cookie': 'mycookie=test',
    //'Content-Type': 'text/plain'
  //});

  let cookies = parseCookies( req.headers.cookie );
  console.log( 'Input cookies: ', cookies );
  cookies.search = 'google';
  if ( cookies.counter )
    cookies.counter++;
  else
    cookies.counter = 1;
  console.log( 'Output cookies: ', cookies );
  res.writeHead( 200, {
    'Set-Cookie': stringifyCookies(cookies),
    'Content-Type': 'text/plain'
  });

  switch (req.url) {
    case "/":
      //res.writeHead(200);
      res.end(html_index());
      break
    case "/login":
      res.writeHead(200);
      res.end(`login`);
      break
    case "/signup":
      res.writeHead(200);
      res.end(`signup`);
      break
    default:
      res.writeHead(404);
      res.end(JSON.stringify({error:"Resource not found"}));
  }
}
*/

//const server = http.createServer(requestListener);
//server.listen(port, () => {
    //console.log(`Server is running on http://${host}:${port}`);
//});

//create a server object:
//http.createServer(function (req, res) {
  // res.write(req.url);
  //res.writeHead(200, {'Content-Type': 'text/html'});
  //res.write('Hello World!'); //write a response to the client
  //res.end(); //end the response
//}).listen(3000); //the server object listens on port 8080
//const requestListener = function (req, res) {
  //res.write('Hello World! http'); //write a response to the client
  //res.end(); //end the response
//};
//server.listen(port, host, () => {
    //console.log(`Server is running on http://${host}:${port}`);
//});