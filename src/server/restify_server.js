/**
  Project Name: cip2psn

  LICENSE: MIT

  Created By: Lightnet

  Note: 
    Can't use session since it rest api that it simalar to feeds or data sheet request to format to json, xml and other format.
    Cookie can be still be used for browser that is by default for http and https to store data on broswer for settings or keys.
    Used fetch query to assign token key.

 */
// https://medium.com/@sarthakmittal1461/to-build-login-sign-up-and-logout-restful-apis-with-node-js-using-jwt-authentication-f3d7287acca2
// https://www.makeschool.com/academy/track/standalone/reddit-clone-in-node-js/sign-up-and-login
// https://bezkoder.com/node-js-jwt-authentication-mysql/
// https://github.com/sohamkamani/jwt-nodejs-example
// https://stackoverflow.com/questions/38504107/why-restify-not-have-its-own-plugin-for-support-cookies
// https://www.npmjs.com/package/restify-cookies
// https://stackoverflow.com/questions/10973479/how-do-you-send-html-with-restify
//===============================================
// https://gist.github.com/repkam09/03d4b84d7dc9f530800d
// http://restify.com/docs/home/
// http://restify.com/docs/plugins-api/
// auth
// https://github.com/restify/node-restify/issues/102
// https://stackoverflow.com/questions/18411946/what-is-the-best-way-to-implement-a-token-based-authentication-for-restify-js/27442155#27442155
// https://medium.com/sean3z/json-web-tokens-jwt-with-restify-bfe5c4907e3c
// COOKIE
// https://stackoverflow.com/questions/38504107/why-restify-not-have-its-own-plugin-for-support-cookies
//===============================================
// PACKAGES
var restify = require('restify');
var CookieParser = require('restify-cookies');
const db = require('./db');
//const user = require('./model/user');
//const jwt = require("jsonwebtoken");
const config=require('../../config');
const routes =require('./restify/routes');
const {authenticate}=require('./restify/authenticate');

//const jwtKey = "my_secret_key";
//===============================================
// INIT DATABASE
//===============================================
//db.init();
//===============================================
// CREATE SERVER
//===============================================
var server = restify.createServer({
  name: 'restify',
  version: '1.0.0'
});
// COOKIE
server.use(CookieParser.parse);
//===============================================
// API Restify
//===============================================
// https://stackoverflow.com/questions/22208975/restify-on-node-js-post-body-json/27825853
// http://restify.com/docs/plugins-api/
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
//server.use(restify.plugins.CORS()); //not working
server.use(restify.plugins.fullResponse());
server.use(restify.plugins.bodyParser());
// https://github.com/restify/node-restify/issues/1457
//server.use(restify.plugins.context()); //not working
server.use(restify.plugins.pre.context()); //
// https://github.com/restify/errors
//===============================================
// authenticate
//===============================================
server.use(authenticate);
//===============================================
// Universal handlers
//server.use(function(req, res, next) {
  //console.log('> server.use((req,res,next)=>{next();}) Universal handlers');
  //console.warn('run for all routes!');
  //return next();
//});
//===============================================
// ROUTE URL ANG PAGE
//===============================================
routes(server);
//===============================================
console.log('init close event!');
//===============================================
// END SECTION 
// CLEAN UP
// https://stackoverflow.com/questions/15471555/nodejs-process-info/56585414

if (process.pid) {
  console.log('This process is your pid ' + process.pid);
}

process.stdin.resume();//so the program will not close instantly

function exitHandler(options, exitCode) {
    console.log("closing...");
    if (options.cleanup) console.log('clean');
    if (exitCode || exitCode === 0) console.log(exitCode);
    if (options.exit) process.exit();
}

//process.on(process.pid, exitHandler.bind(null, {exit:true}));

//process.on('SIGTERM',()=> {
//  console.info('SIGTERM signal received.');
//});

process.on('SIGQUIT', exitHandler.bind(null, {exit:true}));
process.on('SIGTERM', exitHandler.bind(null, {exit:true}));

//do something when app is closing
process.on('exit', exitHandler.bind(null,{cleanup:true}));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {exit:true}));

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler.bind(null, {exit:true}));
process.on('SIGUSR2', exitHandler.bind(null, {exit:true}));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {exit:true}));

//process.stdin.resume();//so the program will not close instantly

//===============================================
// SERVER PORT
const PORT = process.env.PORT || 3000;
// SERVER LISTEN
server.listen(PORT, function() {
  var {address, port} = server.address();
  if(address=='::'){address="localhost";}
  console.log(`>Restify Server running on http://${address}:${port}`);
  //let hostname = server.name;
  //if(server.name=='::'){hostname='localhost';}
  //console.log(hostname);
  //console.log(server.url);
  //console.log('%s listening at %s', hostname, server.url);
});