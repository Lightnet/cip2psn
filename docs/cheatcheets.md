# CHEAT SHEETS


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