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

# Status ( DEVELOPMENT ):
 * Work in progress
 * Idea and testing codes
 * Not recommend for production.

# Status ( PRODUCTION ):
 * NOT CONFIG YET
 * NOT SAFE BUILD

# Information:
  Prototype idea to develop community peer to peer, server, web server, torrent and other networking types of coding. By using the different type of databases that used network to replicate, peer to peer, torrent, and other type of format to access data.

  There are Hypercore Protocol(peer to peer), gun.js (graph data mod­el ) and pouchdb (replicate). Working on a Separate or both.

  By creating javascript from nodejs web server, database, and network to run browser with javascript code.
  
  To create peer to peer server data sharing by using Id and tag system coding logic.

  Reason is to develop hub system management network node like those torrent site and file but with web hosting for local. Scaling is not yet test as code layer has not be refine yet.

# Goals:
 * Game Building World Text / Simple 2D world logic not real time with physics
 * Community Share Database Server 

# Information peer to peer:
  Peer to peer prototype idea for database on local not in local. But depend on the code.

 * https://github.com/hypercore-protocol/cli
 * https://hypercore-protocol.org/
 * https://github.com/hypercore-protocol/hypercore
 * https://github.com/mafintosh/hypercore-crypto

# Links:
 * https://www.youtube.com/watch?v=RymFCytTWz8  Building on Hypercore


# Frameworks:
  After some testing and learning. It is base on research and challange on the development of code understand. As well ease of used and what type of framework design best work on the coder mind set. There is no right and no wrong answer to development. It should be the same as other programing languages that does take time to adapt and understand.

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
http            0.53 ms        8607.21
```
# Notes:
  * Base on hello world print page
  * After some testing that packages slow down request there many middlewares/plugins add ons.
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
http          js               nodejs
sails                             168
derby                              17

Notes:
 * Some frameworks are not include for add on like session, cookies, body and others.
 * Some frameworks has built in sesson, cookies, body for post and others.
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

# NOT TESTED Frameworks:   
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