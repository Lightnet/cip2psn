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
 * Fastify current build web server

# Status ( PRODUCTION ):
 * NOT CONFIG YET
 * NOT SAFE BUILD
 * Not recommend for production.

# Information:
  Prototype idea to develop community peer to peer, server, web server, torrent and other networking types of coding. By using the different type of databases that used network to replicate, peer to peer, torrent, and other type of format to access data.

  There are Hypercore Protocol(peer to peer), gun.js (graph data mod­el ) and pouchdb (replicate). Working on a Separate or both.

  By creating javascript from nodejs web server, database, network and browser client with javascript code.
  
  To create peer to peer server data sharing by using Id and tag system coding logic.

  Reason is to develop hub system management network node like those torrent site and file but with web hosting for local. Scaling is not yet test as code layer has not be refine yet.

# Goals:
 * Game Building World Text / Simple 2D world logic not real time with physics
 * Community Share Database Server 

# Information peer to peer:
  Peer to peer prototype idea for database on local not in local. But depend on the code.

 * https://hypercore-protocol.org/

# Links:
 * https://www.youtube.com/watch?v=RymFCytTWz8  Building on Hypercore


# Frameworks:
  After some testing and learning. It is base on research and challange on the development of code understand. As well ease of used and what type of framework design best work on the coder mind set. There is no right and no wrong answer to development. It should be the same as other programing languages that does take time to adapt and understand.

| Name    | required sync |session    | cookie  | build |
|---      |---            |---        |---      |---    |
|Restify  | 0             | 0, n/a    | x       | s     |
|Polka    | 0             | x         | x       | s     |
|Express  | 0             | x         | x       | s     |
|Fastify  | 0             | x, n/a    | x       | m     |
|Hapi     | x             | x         | x       | s     |
|Koa      | x             | x         | x       | s     |
|http     | 0             | 0, n/a    | x       | s     |
```
0 = no
x = yes
n/a = not applicable
s = simple build
m = main build
Note: 
 * Few packages are outdate for session. 
 * Restify session is out date. Security risk.
 * Fastify session is out date does but give store data error.
 * http session is out date.
```
# Database:

| Name        | types                             | peer to peer  |  replicate  | Server    | Client    | connections   |
|---          |---                                |---            |---          |---        |---        |--             |
| gun         | graph model / json                | yes           | yes         | yes       | yes       | ws://         |
| pouchdb     | documents / json / binary         | no            | yes         | yes       | yes       | http://       |
| hypercore   | Append-only logs                  | yes           | yes         | yes       | yes       | hyper://      |
| hyperbee    | Peer-to-peer key/value database   | yes           | yes         | yes       | yes       | hyper://      |
| hyperdrive  | Peer-to-peer file archives        | yes           | yes         | yes       | yes       | hyper://      |
```
* pouchdb express server (have not tested). Out date server pouchdb rest api.
https://github.com/hypercore-protocol/hypercore
https://github.com/hypercore-protocol/cli

```