//const db = require('../database/pdb/db');

const fs = require('fs');
const restify = require('restify');
const PouchDB = require('PouchDB');
const path = require('path');

const currentDir = path.resolve('./');
console.log(currentDir);
var PrefixedPouchDB;
if(!PrefixedPouchDB){
  PouchDB.plugin(require('pouchdb-find'));
  PrefixedPouchDB =PouchDB.defaults({
    //prefix: '/database/' //drive dir
    prefix:path.join(currentDir, "/database/")
  });
}
var db = new PrefixedPouchDB('pouchdb',{
  live:true
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

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const server = restify.createServer({
  name: 'PouchDB Restify',
  version: '1.0.0'
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
//server.use(restify.plugins.fullResponse());
//server.use(restify.plugins.pre.context());

function authParse(auth){

}

// https://stackoverflow.com/questions/62152847/how-to-set-middleware-in-restify-route
server.use((req, res, next)=>{
  console.log('req.url:',req.url);
  console.log('req.method:',req.method);
  //console.log(req.headers);
  //allowUrls.indexOf()
  let origin = req.headers.origin;
  if(origin){
    console.log(origin);
    console.log(allowUrls.indexOf(origin))
    if(allowUrls.indexOf(origin) !== -1){
      console.log('ALLOW LIST!');
      //res.setHeader('Access-Control-Allow-Origin', "http://localhost:8888");
      //pouchdb url allow access not "*"
      //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5984');
      res.setHeader('Access-Control-Allow-Origin', origin);
      let authorization = req.headers.authorization;
    if(authorization){
      console.log('Found authorization!');
      authParse(authorization);
    }else{
      console.log('Not Found authorization!');
    }
    }
  }else{
    console.log('Not Found! origin!');
    let authorization = req.headers.authorization;
    if(authorization){
      console.log('Found authorization!');
      authParse(authorization);
    }else{
      console.log('Not Found authorization!');
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
  res.setHeader('Access-Control-Allow-Credentials', true);
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Max-Age
  //res.setHeader('Access-Control-Max-Age', 86400);

  // Pass to next layer of middleware
  next();
});

server.get('/favicon.ico', function(req, res, next) {
  ///favicon.ico
  res.status(200);
  console.log('/favicon.ico');
  res.writeHead(204); // 204 No Content
  return next();
});

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
    <script src="client_database.js"></script>
  </body>
</html>`;
}
var databasejs;
try {
  databasejs = fs.readFileSync('./src/client/clientpouchdb.js', 'utf8')
  //console.log(databasejs);
} catch (err) {
  console.error(err)
}

server.get('/client_database.js', function (req, res, next) {
  res.write(databasejs);
  res.end();
});

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

server.get('/:database/', function (req, res, next) {
  console.log('DATABASE /');
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

//pouchdb get
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

/*
;(async () => {
  try {
    var response = await db.put({
      _id: 'mydoc',
      title: 'Heroes'
    });
    console.log('response');
    console.log(response);
  } catch (err) {
    console.log('err');
    console.log(err);
    console.log(err);
  }
})();
*/

//async function init() {
  //console.log(1);
  //var db0 = new PouchDB('pouchdb',{
    //live:true
  //});
  //console.log(db0.adapter);
  //db0.info().then(function (info) {
    //console.log(info);
  //})
  //await sleep(1000);
  //console.log(2);
  //var db1 = new PouchDB('http://localhost:5984/pouchdb');
  //db1.info().then(function (info) {
    //console.log(info);
  //})
//}
//init();

//console.log(db);
// https://pouchdb.com/guides/updating-deleting.html
/*
db.get('config').catch(function (err) {
  if (err.name === 'not_found') {
    //console.log(err);
    return {
      _id: 'config',
      background: 'blue',
      foreground: 'white',
      sparkly: 'false'
    };
  } else { // hm, some other error
    throw err;
  }
}).then(function (configDoc) {
  // sweet, here is our configDoc
  console.log(configDoc);
}).catch(function (err) {
  console.log(err);
  // handle any errors
});
*/
/*
db.get('config').then(function (doc) {
  //console.log(doc);
  //return db.remove(doc);
  return db.put(doc);
});
*/
/*
db.get('config').then(function (doc) {
  // handle doc
}).catch(function (err) {
  console.log(err);
});
*/

/*
db.put({
  _id: 'mydoc',
  title: 'Heroes'
}).then(function (response) {
  // handle response
}).catch(function (err) {
  console.log(err);
});
*/

/*
db.get('mydoc').then(function(doc) {
  return db.put({
    _id: 'mydoc',
    _rev: doc._rev,
    title: "Let's Dance"
  });
}).then(function(response) {
  // handle response
  console.log(response);
}).catch(function (err) {
  console.log(err);
});
*/


