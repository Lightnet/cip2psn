/**
  Project Name: cip2psn

  LICENSE: MIT

  Created By: Lightnet

  Information:
  http://127.0.0.1:5984 PouchDB default port REST API

*/

//const db = require('../database/pdb/db');
// PACKAGE SE TUP
const fs = require('fs');
const restify = require('restify');
const PouchDB = require('PouchDB');
const path = require('path');
// VAR SET UP
const currentDir = path.resolve('./');
//console.log(currentDir);
var PrefixedPouchDB;
if(!PrefixedPouchDB){
  PouchDB.plugin(require('pouchdb-find'));
  PrefixedPouchDB =PouchDB.defaults({
    //prefix: '/database/' //drive dir
    prefix:path.join(currentDir, "/database/")
  });
}
var db = new PrefixedPouchDB('pouchdb',{
  //live:true
});

const PORT = 5984; //pouchdb default port REST API
var HOST = '127.0.0.1';
HOST = 'localhost';
//NOTE url allow access url are sensitive for match ip and string url
var allowUrls=[
  'http://localhost:5984',
  'http://127.0.0.1:5984',
  'http://localhost:3000',
  'http://127.0.0.1:3000'
]
// SLEEP = DELAY
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
// https://stackoverflow.com/questions/10995601/node-restify-how-to-indent-json-output
// https://www.npmjs.com/package/restify-safe-json-formatter
function myCustomFormatJSON(req, res, body) {
  if (!body) {
    if (res.getHeader('Content-Length') === undefined &&
        res.contentLength === undefined) {
      res.setHeader('Content-Length', 0);
    }
    return null;
  }

  if (body instanceof Error) {
    // snoop for RestError or HttpError, but don't rely on instanceof
    if ((body.restCode || body.httpCode) && body.body) {
      body = body.body;
    } else {
      body = {
        message: body.message
      };
    }
  }

  if (Buffer.isBuffer(body))
    body = body.toString('base64');

  var data = JSON.stringify(body, null, 2);

  if (res.getHeader('Content-Length') === undefined &&
      res.contentLength === undefined) {
    res.setHeader('Content-Length', Buffer.byteLength(data));
  }

  return data;
}

// https://github.com/restify/node-restify/issues/1042
// SERVER INIT SET UP
const server = restify.createServer({
  name: 'PouchDB Restify',
  version: '1.0.0',
  formatters: {
    'application/json': myCustomFormatJSON
    //'application/json': function(req, res, body, cb) {
      //return cb(null, JSON.stringify(body, null, '\t'));
    //}
  }
});
// PLUGIN
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
//server.use(restify.plugins.fullResponse());
//server.use(restify.plugins.pre.context());
// TODOLIST
function authParse(auth){

}
// middleware
// https://stackoverflow.com/questions/62152847/how-to-set-middleware-in-restify-route
server.use((req, res, next)=>{
  console.log('req.url:',req.url);
  console.log('req.method:',req.method);
  //console.log(req.headers);
  //allowUrls.indexOf()
  let origin = req.headers.origin;
  if(origin){//if other ip or host for fetch query
    //console.log(origin);
    //console.log(allowUrls.indexOf(origin));
    if(allowUrls.indexOf(origin) !== -1){
      //console.log('ALLOW LIST!');
      //res.setHeader('Access-Control-Allow-Origin', "http://localhost:8888");
      //pouchdb url allow access not "*"
      //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5984');
      res.setHeader('Access-Control-Allow-Origin', origin);
      let authorization = req.headers.authorization;
      if(authorization){
        //console.log('Found authorization!');
        authParse(authorization);
      }else{
        //console.log('Not Found authorization!');
      }
    }
  }else{//this is localhost current from listen ip address
    //console.log('Not Found! origin!');
    let authorization = req.headers.authorization;
    if(authorization){
      //console.log('Found authorization!');
      authParse(authorization);
    }else{
      //console.log('Not Found authorization!');
    }
  }
  //res.setHeader('Access-Control-Allow-Origin', "http://localhost:8888");
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'Origin, authorization, accept, x-access-token, Options, content-type');
  //res.setHeader('Access-Control-Allow-Headers', 'Origin, authorization, accept, x-access-token, Options, content-type, X-Requested-With');
  //res.setHeader('Access-Control-Allow-Origin', "*");
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  //this is for pouchdb browser client remote url
  res.setHeader('Access-Control-Allow-Credentials', true);
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Max-Age
  //res.setHeader('Access-Control-Max-Age', 86400);

  // Pass to next layer of middleware
  next();
});
//FAV ICON
server.get('/favicon.ico', function(req, res, next) {
  ///favicon.ico
  res.status(200);
  console.log('/favicon.ico');
  res.writeHead(204); // 204 No Content
  return next();
});
// HTML INDEX
function HTML_INDEX(){
  return `
<html>
  <head>
    <title>Index</title>
    <!--
    <script src="//cdn.jsdelivr.net/npm/pouchdb@7.2.1/dist/pouchdb.min.js"></script>
    <script src="https://raw.githubusercontent.com/pouchdb/pouchdb/7.2.2/dist/pouchdb.js"></script>
    -->
    <script src="//cdn.jsdelivr.net/npm/pouchdb@7.2.1/dist/pouchdb.js"></script>
    <script src="https://redom.js.org/redom.min.js"></script>
  </head>
  <body>
    Hello
    <script src="clientpouchdb.js"></script>
  </body>
</html>`;
}
// load javascript file to url get
var client_databasejs;
var clientpouchdbjs;
try {
  client_databasejs = fs.readFileSync('./src/client/client_database.js', 'utf8');
  clientpouchdbjs = fs.readFileSync('./src/client/clientpouchdb.js', 'utf8');
  //console.log(databasejs);
} catch (err) {
  console.error(err)
}
server.get('/clientpouchdb.js', function (req, res, next) {
  res.write(clientpouchdbjs);
  res.end();
});
server.get('/client_database.js', function (req, res, next) {
  res.write(client_databasejs);
  res.end();
});
//INDEX
server.get('/', function (req, res, next) {
  //res.send('Hello world!');
  let body=HTML_INDEX();
  //res.writeHead(200, {
    //'Content-Length': Buffer.byteLength(body),
    //'Content-Type': 'text/html'
  //});
  res.write(body);
  res.end();
  return next();
});
//Pouchdb GET DATABASE INFO
server.get('/:database/', function (req, res, next) {
  console.log('DATABASE/');
  //console.log(req.params);
  //res.send(req.params);
  db.info().then(function (info) {
    //console.log(info);
    res.send(info);
  })
  return next();
});

server.get('/:database', function (req, res, next) {
  console.log('DATABASE/');
  //console.log(req.params);
  //res.send(req.params);
  db.info().then(function (info) {
    //console.log(info);
    res.send(info);
  })
  return next();
});


function getDoc(req){
  /*
  db.get(req.params.name).then(function (doc) {
    // handle doc
    //console.log(doc);
    res.send(doc);
  }).catch(function (err) {
    console.log(err);
  });
  */
}

//Pouchdb GET DATABASE / DOCID
server.get('/:database/:name', function (req, res, next) {
  console.log('GET DATABASE / DOC NAME');
  //console.log(req.params);
  //console.log(req.method);
  //res.send(req.params);
  db.get(req.params.name).then(function (doc) {
    // handle doc
    //console.log(doc);
    res.send(doc);
  }).catch(function (err) {
    console.log(err);
  });
  return next();
});
//Pouchdb PUT DATABASE / DOCID
server.put('/:database/:name', function (req, res, next) {
  console.log('PUT DATABASE / DOC NAME');
  //console.log(req.params);
  //console.log(req.method);
  //console.log(req.body);
  //res.send(req.params);
  
  db.put(req.body).then(function (response) {
    // handle response
    //console.log(response);
    res.send(response);
  }).catch(function (err) {
    //console.log('err');
    //console.log(err);
    //console.log(JSON.stringify(err));
    //res.send(JSON.stringify(err));
    //res.write(JSON.stringify(err));
    //res.end();
  });
  
  return next(false);
});
//Pouchdb DEL DATABASE / DOCID
server.del('/:database/:name', function (req, res, next) {
  console.log('DEL DATABASE / DOC NAME ');
  //console.log(req.params);
  
  db.get(req.params.name).then(function (doc) {
    // handle doc
    //console.log(doc);
    return db.remove(doc);
  }).catch(function (err) {
    console.log('err.reason/////////////////////////');
    console.log(err);
    console.log('err.reason');
    console.log(err.reason);
    res.send(err);
  });

  //res.send(req.params);
  return next(false);
});

//server.get('/echo/:name', function (req, res, next) {
  //res.send(req.params);
  //return next();
//});

server.listen(PORT, HOST, function(){
  //console.log(server.name);
  //console.log(server.url);
  //console.log(server.address());
  console.log('>%s server on %s', server.name, server.url);
});


// https://pouchdb.com/guides/updating-deleting.html
//;(async () => {
  //try {
    //var response = await db.put({
      //_id: 'mydoc',
      //title: 'Heroes'
    //});
    //console.log('response');
    //console.log(response);
  //} catch (err) {
    //console.log('err');
    //console.log(err);
  //}
//})();