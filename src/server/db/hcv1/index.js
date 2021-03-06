/**
  Project Name: cip2psn

  LICENSE: MIT

  Created By: Lightnet

 */
// https://hypercore-protocol.org/guides/modules/hyperbee/
// https://hypercore-protocol.org/guides/walkthroughs/p2p-indexing-with-hyperbee/
// https://hypercore-protocol.org/guides/getting-started/standalone-modules/
// https://hypercore-protocol.org/guides/examples/hyperbee-app/
// https://github.com/hypercore-protocol/walkthroughs/blob/main/hyperspace/1-start-servers.js
// GUNJS
// https://gun.eco/docs/Installation#node

console.log("DATABASE INIT...");
//console.log("HYPERCORE DB HYPERBEE");
//const Hypercore = require('hypercore');
//const Hyperbee = require('hyperbee');
const jwt = require('jsonwebtoken');
const bcrypt=require('bcrypt');
var config=require('../../../../config');

// https://www.npmjs.com/package/bcrypt
const saltRounds = config.saltRounds || 10;
const myPlaintextPassword = 'not_bacon';

//const hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);
//var check =bcrypt.compareSync(myPlaintextPassword, hash); // true
//console.log(check);

//var hash ='';
//const salt = bcrypt.genSaltSync(saltRounds);
//hash = bcrypt.hashSync(myPlaintextPassword, salt);
//console.log(hash);
//hash='$2b$10$qlhBGbjvBsIZmBylnJ6VcukDUW0KwC/XFm/PLu8ndwO1tmxwJ0i0000';
//hash='$2b$10$qlhBGbjvBsIZmBylnJ6VcukDUW0KwC/XFm/PLu8ndwO1tmxwJ0ira';
//hash='$2b$10$lX8cnOmjnWOkpOhZT21SZeN3gTUNaFsGruDMePcCImKZrmTMNGSEW'
//var check =bcrypt.compareSync(myPlaintextPassword, hash); // true
//console.log(check);

/*
bcrypt.genSalt(saltRounds, function(err, salt) {
  bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
      // Store hash in your password DB.
      console.log(hash);
  });
});

var hash = '$2b$10$nrrze4JJOjb3hHfwwR8wM.0Lr9jKAGRq3y.2KyWO8K9BDn4ZrlDWe';
// Load hash from your password DB.
bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
  // result == true
  console.log(result);
});
*/

//var core;
//var db;
var gun;
//
var user; //sub database
//https://gun.eco/docs/API
var gunoptions={
  //file: 'radatagun',// folder default > radata
}
//INIT DATABASE
async function init(){
  var Gun=require('gun');
  gun = Gun(gunoptions);
  //gun.get('key11').put({property: 'value'});
  //gun.get('key11').once(function(data, key){
    // {property: 'value'}, 'key'
    //console.log('data');
    //console.log(data);
    //console.log(key);
  //});
  //gun.get('key').get('property',function(ack){
    //console.log(ack);
  //});
  //gun.get('key0').once(function(data, key){
    // {property: 'value'}, 'key'
    //console.log('data');
    //console.log(data);
    //console.log(key);
  //});
}
exports.init = init;

async function get(){
  return gun;
}
exports.get = get;
// CHECK CREATE USER 
async function checkcreateuser(alias,passphrase,callback){
  //check if alias exist
  gun.get(alias).once(function(data, key){
    // {property: 'value'}, 'key'
    //console.log('data');
    //console.log(data);
    //console.log(key);
    if(data){
      //console.log('FOUND ALIAS!');
      return callback(null,{message:"FOUND"});
    }else{
      //console.log('NOT FOUND ALIAS!');
      //let pass = jwt.sign({ passphrase: passphrase }, 'shhhhh');
      let pass = bcrypt.hashSync(passphrase, saltRounds);
      gun.get(alias).put({
        alias:alias,
        passphrase: pass
      });
      return callback(null,{message:"CREATED",alias:alias});
    }
  });
  //return callback();
}
exports.checkcreateuser = checkcreateuser;
// CHECK ALIAS PASSPHRASE
function checkaliaspassphrase(alias, callback){
  //console.log(gun);
  gun.get(alias).once(function(data, key){
    if(data){
      //console.log('FOUND ALIAS!');
      return callback(null,{message:'FOUND',passphrase: data.passphrase});
    }else{
      //console.log('NOT FOUND ALIAS!');
      return callback(null,{message:'NOTFOUND',alias:alias});
    }
  });
}
exports.checkaliaspassphrase = checkaliaspassphrase;
// GET DB USER
async function getuser(){
  //return user;
  return gun;
}
exports.getuser=getuser;
// https://gun.eco/docs/API#-a-name-get-a-gun-get-key-
async function test1(){
  //await user.put('key',{hello:'world'});
  gun.get('key').put({property: 'value'});
}
exports.test1=test1;

async function test2(){
  //let node = await user.get('key');
  //console.log(node);
  gun.get('key').once(function(data, key){
    // {property: 'value'}, 'key'
    console.log('data');
    console.log(data);
    //console.log(key);
  });
  //gun.get('key').get('property',function(data){
    //console.log(data);
  //});
}
exports.test2=test2;

async function test3(){
  //await user.put('key',{hello:'world3'});
  gun.get('key0').once(function(data, key){
    // {property: 'value'}, 'key'
    console.log('data');
    console.log(data);
    //console.log(key);
  });
}
exports.test3=test3;

//async function init(){
  //core = new Hypercore('./mydb',null,{ 
    //sparse: true
    //,valueEncoding:'json'
  //});
  //core = await new Hypercore('./mydb', '24139f7fe13f801de1103ae5f23f126267dd8277ebb3202a941a602b659a8bb0',{
    //overwrite:true
    //,createIfMissing:true
    //,writable:true
    //,storeSecretKey:true
    //,sparse: true
    //,valueEncoding:'json'
  //});
  //await core.ready();
  //console.log('core');
  //console.log(core);
  //db = new Hyperbee(core ,{
    //writable:true
    //,keyEncoding: 'utf-8', // can be set to undefined (binary), utf-8, ascii or and abstract-encoding
    //valueEncoding: 'ascii' // same options as above
    //valueEncoding: 'json'
  //});

  //await db.ready();
  //https://stackoverflow.com/questions/66348330/hypercore-protocol-function-to-get-hypercore-discovery-key-from-a-public-key
  //console.log('New bee created, key:');
  //console.log('Bee feed');
  //console.log('  ', db.feed);
  //console.log('KEY: ',db.feed.key.toString('hex'));
  //console.log('  ', db.feed.key.toString('hex'));
  //console.log(db);
  // if you own the feed
  //await db.put('key',{hello:'world'});
  //await db.put('2key2',{hello:'world2'});
  // A sub-database will append a prefix to every key it inserts.
  // This prefix ensure that the sub acts as a separate "namespace" inside the parent db.
  // https://hypercore-protocol.org/guides/walkthroughs/p2p-indexing-with-hyperbee/
  //const sub1 = db.sub('sub1')
  // if you want to query the feed
  //const node = await db.get('key'); // null or { key, value }
  //console.log('node');
  //console.log(node);
  //GET THE LIST INDEX
  //for await (const { key, value } of db.createReadStream()) {
    //console.log(`${key} -> ${value}`);
    //console.log(value);
  //}
  //const b = db.batch();
  //await b.put('key',{hello:'world'});
  // When a batch is flushed, it's atomically committed to the Hyperbee.
  //await b.flush();
  //const node = await db.get('key'); // An object of the form { key, value }
  //console.log(node);
  //user = await db.sub('user');
//};