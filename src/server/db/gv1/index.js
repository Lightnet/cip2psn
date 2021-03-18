/**
  Project Name: cip2psn

  LICENSE: MIT

  Created By: Lightnet

  Information:
  This used gun.js. It used graph node and timestamp.

*/

// GUNJS
// https://gun.eco/docs/Installation#node

console.log("GUN JS INIT...");
const jwt = require('jsonwebtoken');
const bcrypt=require('bcrypt');
const config=require('../../../../config');
//const { isEmpty, timeStamp, createUserId } =require('../../model/utilities');
const Gun = require('gun');
//const SEA = require('gun/sea');

// https://www.npmjs.com/package/bcrypt
const saltRounds = config.saltRounds || 10;
var gun;
//var user; //sub database
//https://gun.eco/docs/API
var gunoptions={
  //file: 'radatagun',// folder default > radata
}
//INIT DATABASE
function init(){
  //Gun Config
  if(!gun){
    console.log("NEW DATABASE GUN...");
    gun = Gun(gunoptions);
  }else{
    console.log("REUSED DATABASE GUN...");
  }
}
init();
module.exports = gun;
//===============================================
// GET DATABASE
function get(){
  return gun;
}
exports.get = get;
//===============================================
// GET DB USER
//function getuser(){
  //return user;
  //return gun;
//}
//exports.getuser=getuser;

//get alias functions

const {
  checkAliasId
  , createAliasId
  , getAliasPassphrase
  , aliasSetHint
  , aliasGetHint
  , aliasCheckPassphrase
  , aliasCheckPassphraseSync
  , aliasChangePassphrase
  , aliasLogout
}=require('./db_alias');

//export module function
module.exports.checkAliasId = checkAliasId;
module.exports.createAliasId = createAliasId;
module.exports.getAliasPassphrase = getAliasPassphrase;
module.exports.aliasSetHint = aliasSetHint;
module.exports.aliasGetHint = aliasGetHint;
module.exports.aliasCheckPassphrase = aliasCheckPassphrase;
module.exports.aliasCheckPassphraseSync = aliasCheckPassphraseSync;
module.exports.aliasChangePassphrase = aliasChangePassphrase;
module.exports.aliasLogout = aliasLogout;

const {
  aliasCheckPubId
  , aliasCreatePubId
  , aliasCreatePubIdPost
  , aliasGetPubIdPosts
}=require('./db_blog');

module.exports.aliasCheckPubId = aliasCheckPubId;
module.exports.aliasCreatePubId = aliasCreatePubId;
module.exports.aliasCreatePubIdPost = aliasCreatePubIdPost;
module.exports.aliasGetPubIdPosts = aliasGetPubIdPosts;


//===============================================
// ALIAS
//===============================================
//function alias(data,callback){
  //callback(null);
//}
//exports.alias = alias;
//===============================================
// TESTING AREA
//===============================================