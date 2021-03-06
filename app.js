/**
  Project Name: cip2psn

  LICENSE: MIT

  Created By: Lightnet

  Information:
    Test build while gulp auto build run test.
 */
// https://medium.com/@LindaVivah/the-beginners-guide-understanding-node-js-express-js-fundamentals-e15493462be1
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await
// 
/*
let myPromise = new Promise(function(myResolve, myReject) {
  // "Producing Code" (May take some time)
  
    myResolve("OK"); // when successful
    myReject("Error");  // when error
});
// "Consuming Code" (Must wait for a fulfilled Promise)
myPromise.then(
  function(value) {  //code if successful 
    console.log('value:',value);
  },
  function(error) { // code if some error 
    console.log('error:',error);
  }
);
function resolveAfter2Seconds(x) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(x);
    }, 2000);
  });
}
async function f1() {
  var x = await resolveAfter2Seconds(10);
  console.log(x); // 10
}
f1();
*/

console.log('init web server...');
//const port = process.env.PORT;
//const host = process.env.HOST;
//console.log("PORT:",port );
//console.log("HOST:",host );
//var config = require('./config');
//console.log(config);

require('./src/server/fastifty_server'); // ok // out date session package
//require('./src/server/polka_server'); // ok
//require('./src/server/koa_server'); // ok
//require('./src/server/hapi_server'); // ok
//require('./src/server/express_server'); // ok
//require('./src/server/restify_server'); // ok // no session. cookie to able to store user token
//require('./src/server/http_server');


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