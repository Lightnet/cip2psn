# Project Name: cip2psn
```
Community
Island
P2P = Peer to Peer network
Server
Network
```
# Date: 2021.02.27

# LICENSE: MIT

# Created by: Lightnet

# Status:
 * Work in progress
 * Idea and testing codes
 * ...

# Information:
  Prototype idea to develop community p2p server by using the Hypercore Protocol and nodejs web server. To create peer to peer server data sharing. To develop simple 3D or 2D world sandbox in game mode logic code.

# Goals:
 * game building world
 * community share server
 
# Information peer to peer:
  Peer to peer prototype idea for database on local not in local. But depend on the code.

 * https://github.com/hypercore-protocol/cli
 * https://hypercore-protocol.org/
 * https://github.com/hypercore-protocol/hypercore
 * https://github.com/mafintosh/hypercore-crypto

# Links:
 * https://www.youtube.com/watch?v=RymFCytTWz8  Building on Hypercore

# Nodejs web server Comparison:
 * https://www.fastify.io/docs/latest/Benchmarking/

```
npm i autocannon -g
autocannon localhost:3000

```

```
Name:         Lat Avg:      Req/Sec Avg:
fastify         1.22 ms        6126.90
koa             2.16 ms        3581.91
express         5.47 ms        1667.60
hapi            1.45 ms        5276.30
polka           2.28 ms        3821.50
```
# Notes:
  * Base on hello world print page
  * After some testing that packages slow down request there many middle ware add ons.
  * Tested some added on for session, post, logs and other things that slow down result.
  * Result vary in render html and hello world text that add more latency.
```
Name:         Language:        Dependents:
express       dt                50962
koa           dt                 5143
restify       dt                 1159 (can't store session)
fastify       ts                  717
@hapi/hapi    dt                  421
polka         dt                  124

sails                             168
derby                              17

Notes:
 * Some packages are not include for add on like session, cookies, body and others.
```

# Packages / Frameworks:
 * express
   * https://expressjs.com
 * Fastify ( fast ) 46
   * https://www.fastify.io
 * Koa 
   * https://koajs.com
 * Hapi
   * https://hapi.dev
 * restify
   * http://restify.com
 * Nestjs ( cli )
    * https://nestjs.com
 * sails ( create project )
   * https://sailsjs.com
 * derby ( boilerplate )
   * https://derbyjs.com
 * Adonisjs ( cli )
   * https://adonisjs.com/
 * LoopBack.js ( cli )
   * https://loopback.io

# Notes:
 * Researching which packages is easy to used and less coding.
 * Learning some p2p in hypercore protocol.
 * Not tested all that has cli and boilerplates.