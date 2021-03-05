/**
  Project Name: cip2psn

  LICENSE: MIT

  Created By: Lightnet

  Information:
    Test build while gulp auto build run test.
 */


console.log('init web server...');
//const port = process.env.PORT;
//const host = process.env.HOST;
//console.log("PORT:",port );
//console.log("HOST:",host );
//var config = require('./config');
//console.log(config);

//require('./src/server/fastifty_server'); // ok // out date session package
//require('./src/server/polka_server'); // ok
//require('./src/server/koa_server'); // ok
//require('./src/server/hapi_server'); // ok
//require('./src/server/express_server'); // ok
//require('./src/server/restify_server'); // fail // no session. cookie to able to store user token
require('./src/server/http_server');


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