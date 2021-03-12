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

// https://cryptojs.gitbook.io/docs/
//const crypto = require('crypto');
//const assert = require('assert');
// Generate Alice's keys...
//const alice = crypto.createECDH('secp521r1');
//const aliceKey = alice.generateKeys();
// Generate Bob's keys...
//const bob = crypto.createECDH('secp521r1');
//console.log(bob);
//const bobKey = bob.generateKeys();
//console.log(bobKey);
// Exchange and generate the secret...
//const aliceSecret = alice.computeSecret(bobKey);
//const bobSecret = bob.computeSecret(aliceKey);
//assert.strictEqual(aliceSecret.toString('hex'), bobSecret.toString('hex'));
// OK
//var crypto = require('crypto');
//var prime_length = 60;
//var diffHell = crypto.createDiffieHellman(prime_length);
//diffHell.generateKeys('base64');
//console.log("Public Key : " ,diffHell.getPublicKey('base64'));
//console.log("Private Key : " ,diffHell.getPrivateKey('base64'));
//console.log("Public Key : " ,diffHell.getPublicKey('hex'));
//console.log("Private Key : " ,diffHell.getPrivateKey('hex'));
//const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
  //modulusLength: 2048,
  //publicKeyEncoding: {
    //type: 'spki',
    //format: 'pem'
  //},
  //privateKeyEncoding: {
    //type: 'pkcs8',
    //format: 'pem'
  //}
//}); 
//console.log('publicKey:', publicKey)
//console.log('privateKey:', privateKey)
// https://gun.eco/docs/SEA#quickstart
//const Gun =require('gun');
//const SEA =require('gun/sea');
//const {encryptKey, decryptKey}=require('./src/server/model/crpyto');
;(async () => {
  //var pair = await SEA.pair();
  //console.log(pair);
  // https://github.com/amark/gun/blob/master/sea.js
  //var pass='test';
  //var act={}
  //act.salt = Gun.text.random(64); // pseudo-randomly create a salt, then use PBKDF2 function to extend the password with it.
  //let saltkey = await SEA.work(pass, act.salt); // this will take some short amount of time to produce a proof, which slows brute force attacks.
  //console.log(saltkey);
  //act.salt = Gun.text.random(64);
})();

//;(async () => {
//})();
//const db = require('./src/server/db/gv1');
//const db = require('./src/server/db/hcv1/index');

//const db = require('./src/server/db');
//console.log(db);

console.log('init web server...');
//const port = process.env.PORT;
//const host = process.env.HOST;
//console.log("PORT:",port );
//console.log("HOST:",host );
//var config = require('./config');
//console.log(config);

//require('./src/server/express_server'); // ok
require('./src/server/fastifty_server'); // ok // out date session package
//require('./src/server/hapi_server'); // ok
//require('./src/server/http_server'); // ok
//require('./src/server/koa_server'); // ok
//require('./src/server/polka_server'); // ok
//require('./src/server/restify_server'); // ok // no session. cookie to able to store user token



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

// https://www.npmjs.com/package/pouchdb-adapter-hyperbee
/*
;(async () => {
var levelup = require('levelup')
//var leveldown = require('leveldown')
//const chalk = require('chalk')
const hypercore = require('hypercore')
const ram = require('random-access-memory')
const Hyperbee = require('hyperbee')
const HyperbeeDown = require('hyperbeedown')
//const PouchDB = require('pouchdb')

const core = hypercore(ram)
const tree = new Hyperbee(core)
const down = new HyperbeeDown(tree)
const db = levelup(down)

await db.put('hello', 'world')
console.log(await db.get('hello'))

})();
*/

/*
const PouchDB = require('pouchdb');
const db = new PouchDB('my-database');
doc = {
    name: 'Peter',
    age: 23,
    occupation: 'designer'
};
db.post(doc).then((res) => {
    console.log("Document inserted OK");
}).catch((err) => {
    console.error(err);
});
*/
