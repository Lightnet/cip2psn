# CHEAT SHEETS




Links:
 * https://www.npmjs.com/package/pouchdb-adapter-hyperbee


# pouchdb
```javascript
const PouchDB = require('pouchdb');
const db = new PouchDB('my-database');//file name
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
```

# nodejs sub module package
```javascript
//creating sub module need default file name.
/testfolder
    -index.js

//creating sub module need no default file name.
/testfolder
    -app.js
    -package.json
{
  "name": "testfolder",
  "version": "1.0.0",
  "description": "",
  "main": "app.js", <- entry point for module
  "scripts": {
    "test": "node app.js"
  },
  "keywords": [
  ],
  "author": "",
  "license": "ISC"
}
```

```javascript
const Gun =require('gun');
const SEA =require('gun/sea');

var pass='test';
//1 method random salt
let salt = Gun.text.random(64);
console.log(salt);
let saltkey = await SEA.work(pass,salt);

//2 method random salt
let saltkey = await SEA.work(pass);

//encode
var enc = await SEA.encrypt('hello self', saltkey);
//decode
var dec = await SEA.decrypt(enc, saltkey);
console.log('dec1: ',dec);

//note it can used once for password checked

let saltkey = await SEA.work(pass);
var enc = await SEA.encrypt('hello self', saltkey);
var dec = await SEA.decrypt(enc, saltkey);
console.log('dec1: ',dec); //pass

saltkey = await SEA.work(pass);
dec = await SEA.decrypt(enc, saltkey);
console.log('dec1: ',dec); //fail
//note there are other package to compare password
//sea.js has but not look into how it check password salt
```

# bcrypt
```javascript
const bcrypt=require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 'not_bacon';

const hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);
var check =bcrypt.compareSync(myPlaintextPassword, hash); // true
console.log(check);
```
# jsonwebtoken
```javascript
const jwt = require('jsonwebtoken');
let token = jwt.sign({ name: 'guest'}, 'tokenkey');

let body = jwt.verify(token, 'tokenkey');
console.log(body);
```

```javascript

```

```javascript
// https://stackoverflow.com/questions/14031763/doing-a-cleanup-action-just-before-node-js-exits

process.stdin.resume();//so the program will not close instantly

function exitHandler(options, exitCode) {
    if (options.cleanup) console.log('clean');
    if (exitCode || exitCode === 0) console.log(exitCode);
    if (options.exit) process.exit();
}

//do something when app is closing
process.on('exit', exitHandler.bind(null,{cleanup:true}));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {exit:true}));

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler.bind(null, {exit:true}));
process.on('SIGUSR2', exitHandler.bind(null, {exit:true}));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {exit:true}));
```

```javascript
https://jsbin.com/lusobipini/edit?js,console

//gun.get('data1').set({name:'test',id:'000 '})
//gun.get('data1').set({name:'23',id:'002 '})

gun.get('data1')
  .once(function(data){
  //console.log(key);
   //console.log(data);
  //console.log(Gun.list.is(data))
  //console.log(Gun.obj.is(data))
  
  for(let key in data){
   //console.log(key);
    if(key != '_'){
      gun.get('data1').get(key).once((v1)=>{
        console.log(v1);
      })
    }
  }
});

```
# Promise
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await

```javascript
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

```
# crypto

```javascript
// https://cryptojs.gitbook.io/docs/
const crypto = require('crypto');
const assert = require('assert');
// Generate Alice's keys...
const alice = crypto.createECDH('secp521r1');
const aliceKey = alice.generateKeys();
// Generate Bob's keys...
const bob = crypto.createECDH('secp521r1');
console.log(bob);
const bobKey = bob.generateKeys();
console.log(bobKey);
// Exchange and generate the secret...
const aliceSecret = alice.computeSecret(bobKey);
const bobSecret = bob.computeSecret(aliceKey);
assert.strictEqual(aliceSecret.toString('hex'), bobSecret.toString('hex'));
// OK

var prime_length = 60;
var diffHell = crypto.createDiffieHellman(prime_length);
diffHell.generateKeys('base64');
console.log("Public Key : " ,diffHell.getPublicKey('base64'));
console.log("Private Key : " ,diffHell.getPrivateKey('base64'));
console.log("Public Key : " ,diffHell.getPublicKey('hex'));
console.log("Private Key : " ,diffHell.getPrivateKey('hex'));
const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem'
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem'
  }
}); 
console.log('publicKey:', publicKey)
console.log('privateKey:', privateKey)
```
# SEA
```javascript
// https://gun.eco/docs/SEA#quickstart
// https://github.com/amark/gun/blob/master/sea.js

const Gun =require('gun');
const SEA =require('gun/sea');
var pair = await SEA.pair();
let pass = 'test';
let salt = Gun.text.random(64);
let saltkey1 = await SEA.work(pass, salt);
let saltkey2 = await SEA.work(pass);



```

 * https://stackoverflow.com/questions/38552003/how-to-decode-jwt-token-in-javascript-without-using-a-library
```javascript
// https://jsbin.com/medosilefe/edit?js,console
const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};
```

```javascript
```

```javascript
```

```javascript
```

```javascript
```



