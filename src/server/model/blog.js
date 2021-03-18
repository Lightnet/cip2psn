/**
  Project Name: cip2psn

  LICENSE: MIT

  Created By: Lightnet

  Information:

*/

const jwt = require("jsonwebtoken");
const bcrypt=require('bcrypt');
const db=require('../db');
const config=require('../../../config');
const SEA = require('gun/sea');
const {create32Key} =require('./utilities');

//===============================================
// CHECK PUB GET POSTS
//===============================================
function aliasGetPubIdPostsSync(data){
  return new Promise(resolve => {
    db.aliasGetPubIdPosts(data,(ack)=>{
      if(ack){
        resolve(ack);
      }else{
        resolve(false);
      }
    });
  });
}
exports.aliasGetPubIdPostsSync = aliasGetPubIdPostsSync;
//===============================================
// CHECK PUB EXIST FOR BLOG
//===============================================
function aliasCheckPubIdSync(data){
  return new Promise(resolve => {
    db.aliasCheckPubId(data,(ack)=>{
      if(ack){
        resolve(true);
      }else{
        resolve(false);
      }
    })
  });
}
exports.aliasCheckPubIdSync = aliasCheckPubIdSync;
//===============================================
// CHECK PUB EXIST FOR BLOG
//===============================================
function aliasCreatePubIdSync(data){
  return new Promise(resolve => {
    db.aliasCreatePubId(data,(ack)=>{
      if(ack){
        resolve(true);
      }else{
        resolve(false);
      }
    });
  });
}
exports.aliasCreatePubIdSync = aliasCreatePubIdSync;
//===============================================
// CHECK PUB CREATE POST
//===============================================
function aliasCreatePubIdPostSync(data){
  return new Promise(resolve => {
    db.aliasCreatePubIdPost(data,(ack)=>{
      if(ack){
        resolve(ack);
      }else{
        resolve(false);
      }
    });
  });
}
exports.aliasCreatePubIdPostSync = aliasCreatePubIdPostSync;
//===============================================
// CHECK PUB GET POSTS
//===============================================
function aliasGetPubIdPostsSync(data){
  return new Promise(resolve => {
    db.aliasGetPubIdPosts(data,(ack)=>{
      if(ack){
        resolve(ack);
      }else{
        resolve(false);
      }
    });
  });
}
exports.aliasGetPubIdPostsSync = aliasGetPubIdPostsSync;