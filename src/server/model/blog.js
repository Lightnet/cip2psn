/**
  Project Name: cip2psn

  LICENSE: MIT

  Created By: Lightnet

  Information:

*/

const jwt = require("jsonwebtoken");
const bcrypt=require('bcrypt');
const blog=require('../db/gv1/dbblog');
const config=require('../../../config');
const SEA = require('gun/sea');
const {create32Key} =require('./utilities');

//===============================================
// CHECK PUB GET POSTS
//===============================================
function aliasGetPubIdPostsSync(data){
  return new Promise(resolve => {
    blog.aliasGetPubIdPosts(data,(ack)=>{
      if(ack){
        resolve(ack);
      }else{
        resolve(false);
      }
    });
  });
}
exports.aliasGetPubIdPostsSync = aliasGetPubIdPostsSync;