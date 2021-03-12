/**
  Project Name: cip2psn

  LICENSE: MIT

  Created By: Lightnet

 */

// https://nodejs.org/api/http.html
// https://flaviocopes.com/cookies/
// https://stackoverflow.com/questions/3393854/get-and-set-a-single-cookie-with-node-js-http-server
// https://blog.bearer.sh/create-node-http-server/
let http = require('http');

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

function getEntriesFromCookie(cookieString = '') {
  return cookieString.split(';').map((pair) => {
    const indexOfEquals = pair.indexOf('=');
    let name;
    let value;
    if (indexOfEquals === -1) {
      name = '';
      value = pair.trim();
    } else {
      name = pair.substr(0, indexOfEquals).trim();
      value = pair.substr(indexOfEquals + 1).trim();
    }
    const firstQuote = value.indexOf('"');
    const lastQuote = value.lastIndexOf('"');
    if (firstQuote !== -1 && lastQuote !== -1) {
      value = value.substring(firstQuote + 1, lastQuote);
    }
    return [name, value];
  });
}

function createSetCookie(options) {
  return (`${options.name || ''}=${options.value || ''}`)
    + (options.expires != null ? `; Expires=${options.expires.toUTCString()}` : '')
    + (options.maxAge != null ? `; Max-Age=${options.maxAge}` : '')
    + (options.domain != null ? `; Domain=${options.domain}` : '')
    + (options.path != null ? `; Path=${options.path}` : '')
    + (options.secure ? '; Secure' : '')
    + (options.httpOnly ? '; HttpOnly' : '')
    + (options.sameSite != null ? `; SameSite=${options.sameSite}` : '');
}

function get_cookies(request) {
  let cookies = {};
  request.headers && request.headers.cookie.split(';').forEach(function(cookie) {
    let parts = cookie.match(/(.*?)=(.*)$/);
    //console.log(parts);
    if(parts){
      cookies[ parts[1].trim() ] = (parts[2] || '').trim();
    }
  });
  return cookies;
};

// create a server with no callback bound to 'request'
var server = http.createServer().listen(3000, 'localhost');
// bind a listener to the 'request' event
server.on('request', function(req, res) {
  console.log(req.headers.cookie);
  //let cookies = get_cookies(req)['my_cookie'];
  let cookies = get_cookies(req);

  const newCookie = createSetCookie({
    name: 'cookieName2'
    ,value: 'cookieValue'
    ,path:'/'
    ,secure:false
    ,maxAge:3000
  });
  //res.setHeader('Set-Cookie', newCookie);
  console.log(cookies);
  // do something with the request
  res.end('Hello World\n');
});

/*
http.createServer(function ( request, response ) {
  const cookieEntries = getEntriesFromCookie(request.headers.Cookie); 
  console.log(cookieEntries);
  const object = Object.fromEntries(cookieEntries.slice().reverse());
  console.log(object);

  const newCookie = createSetCookie({
    name: 'cookieName'
    ,value: 'cookieValue'
    ,path:'/'
    ,secure:false
    ,maxAge:3000
  });
  //response.setHeader('Set-Cookie', newCookie);
  //response.setHeader('set-cookie', newCookie);

  //response.headers['Set-Cookie'].push(newCookie);//does not work
  //setCookie.push(newCookie);
  //console.log(setCookie);
  
  const setCookie = response.getHeader('set-cookie');
  console.log('setCookie',setCookie);

  //let cookies = parseCookies( request.headers.cookie );
  //console.log( 'Input cookies: ', cookies );
  //cookies.search = 'google';
  //if ( cookies.counter )
    //cookies.counter++;
  //else
    //cookies.counter = 1;
  //console.log( 'Output cookies: ', cookies );
  //response.writeHead( 200, {
    //'Set-Cookie': stringifyCookies(cookies),
    //'Content-Type': 'text/plain'
  //});
  response.end('Hello World\n');
} ).listen(3000);

*/