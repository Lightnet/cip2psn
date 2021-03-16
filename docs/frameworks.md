# Frameworks:
 * Frameworks design are either beginner to know how to base on user experience. 
 * Pass/store variable are some time lock down leaks.

# Notes:
  * There are default package limiter to prevent post inject.
  * nodejs http has no limit check on post

|---      |---            |---        |---      |
| Name    | required sync |session    | cookie  |
|Restify  | 0             | n/a       | x       |
|Polka    | 0             | x         | x       |
|Express  | 0             | x         | x       |
|Fastify  | 0             | 0, n/a    | x       |
|Hapi     | x             | x         | x       |
|Koa      | x             | x         | x       |
|http     | 0             | 0, n/a    | x       |
```
0 = no
1 = yes
n/a = not applicable
Note: few packages are outdate for session.
```

# Restify:
 * Not design for web browser. (opinion)
 * Design like feeds or data sheet. (opinion)
 * Out date more months of add on packages.
 * No session. Cookie is tricky to set up bit. But the package restify-cookies work ease.
 * It can be chain array for respond.
 * Chain pass variable, but can't store variable pass.
 * Has build in plugins
 * Has module design

```javascript
var restify = require('restify');

function respond(req, res, next) {
  res.send('hello world!');
  next();
}

server.get('/', respond);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
```

# Polka:
 * Took some time to get know the code.
 * Simple to used.
 * Out date few months

```javascript
const polka = require('polka');

polka()
  .get('', (req, res) => {
    res.end(`hello world!`);
  })
  .listen(3000, err => {
    if (err) throw err;
    console.log(`> Running on localhost:3000`);
  });
```
 
# Express:
 * Easy to used.
 * Most post/blog has some basic tutorial.
 * Has a lot of dependency packages.
 * Easy to read docs.

```javascript
const express = require('express')
const app = express()
const port = 3000
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
```
# Koa:
 * Took some time to get know the code.
 * Has good docs and easy to understand.

```javascript
const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(3000);
```

# Hapi
 * Took some time to get know the code.
 * A different layout from express coding.
 * It used array config url, handle, method to deal with event for get and post 
 * There guide on set up web server.

```javascript
'use strict';

const Hapi = require('@hapi/hapi');

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return 'Hello World!';
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
```
# Fastify
 * Took some time to get know the code. 
 * Just the session middleware or plugin seem out date. (opinion)
 * 

```javascript
// Require the framework and instantiate it
const fastify = require('fastify')({
  logger: true
})

// Declare a route
fastify.get('/', function (request, reply) {
  reply.send({ hello: 'world' })
})

// Run the server!
fastify.listen(3000, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  fastify.log.info(`server listening on ${address}`)
})
```