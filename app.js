/**
https://www.youtube.com/watch?v=RymFCytTWz8
5:29
19:
 */


 
console.log('init web server...');

var config = require('./config');
console.log(config);

//require('./src/server/koa_server');
require('./src/server/fastifty_server');

//require('./src/peertopeer/hyperbee01');
//require('./src/peertopeer/httphypercore');
//require('./src/peertopeer/hyperdrive01');
//require('./src/peertopeer/hypercore01');





/*
var hypercore = require('hypercore');
var drive = hypercore('./my-first-dataset', {valueEncoding: 'utf-8'});

drive.append('hello');
drive.append('world', function (err) {
  if (err) throw err
  drive.get(0, console.log) // prints hello
  drive.get(1, console.log) // prints world
});
*/

/*
const express = require('express');
const app = express();
const port = 80;
app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Port on which the app is listening ${port}!`));
*/

/*
// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })

// Declare a route
fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
})

// Run the server!
const start = async () => {
  try {
    await fastify.listen(80)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
*/

/*
'use strict';
const Hapi = require('@hapi/hapi');
const init = async () => {
    const server = Hapi.server({
        port: 80,
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
*/