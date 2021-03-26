/**
  Project Name: cip2psn

  LICENSE: MIT

  Created By: Lightnet

  Information:
    Test build while gulp auto build run test.
 */

// https://medium.com/@LindaVivah/the-beginners-guide-understanding-node-js-express-js-fundamentals-e15493462be1

// https://gun.eco/docs/SEA#quickstart
//const Gun =require('gun');
//const SEA =require('gun/sea');
//const {encryptKey, decryptKey}=require('./src/server/model/crpyto');
;(async () => {
  
})();

console.log('init Nodejs server...');
if(process.env.NODE_ENV !== 'production') console.log('DEV MODE');
console.log('process.env.NODE_ENV : >> ',process.env.NODE_ENV);
//const port = process.env.PORT;
//const host = process.env.HOST;
//console.log("PORT:",port );
//console.log("HOST:",host );
//var config = require('./config');
//console.log(config);
//===============================================
// WEB SERVER FRAMEWORK
//require('./src/server/express_server'); // ok
require('./src/server/fastifty_server'); // ok // out date session package
//require('./src/server/hapi_server'); // ok
//require('./src/server/http_server'); // ok
//require('./src/server/koa_server'); // ok
//require('./src/server/polka_server'); // ok
//require('./src/server/restify_server'); // ok // no session. cookie to able to store user token

//===============================================
// DATABASE HTTP SERVER REST API
//require('./src/server/database_server');

//===============================================
//
//require = require("esm")(module/*, options*/)
//module.exports = require('./src/tests/expressprom_server');
//require('./src/tests/expressprom_server'); // ok
//===============================================
// Simple Tests

//require('./tests/expressuploadserver');
//require('./tests/httpupload01');
//require('./tests/httpupload02');
//require('./tests/readfile');

//require('./src/tests/http_server01');
//require('./src/tests/httpcookie_server');

//require('./src/tests/fastifty_server'); // ok
//require('./src/tests/polka_server'); // pass
//require('./src/tests/koa_server'); // pass
//require('./src/tests/hapi_server'); // pass
//require('./src/tests/express_server'); // pass

//require('./src/peertopeer/hyperbee01');
//require('./src/peertopeer/httphypercore');
//require('./src/peertopeer/hyperdrive01');
//require('./src/peertopeer/hypercore01');

//require('./src/tests/test_crypto');
//require('./src/tests/assert00');

//require('./src/tests/emailtest01');
//require('./src/tests/hypercorepouchdb01');
//require('./src/tests/hypercorepouchdb02');
//require('./src/tests/hyperbeelocalstorage');