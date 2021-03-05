# CHEAT SHEETS


```javascript

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