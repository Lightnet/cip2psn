/**
  Project Name: cip2psn

  LICENSE: MIT

  Created By: Lightnet

  Information:

*/

const jwt = require('jsonwebtoken');
const bcrypt=require('bcrypt');
const { isEmpty, timeStamp, createUserId } =require('../../model/utilities');
//const Gun = require('gun');
const SEA = require('gun/sea');

const config=require('../../../../config');
const saltRounds = config.saltRounds || 10;
//var database = require('./index');
//var gun = database.get();
const gun = require('./index');

//===============================================
// ALIAS CHECK PUB ID
//===============================================
function aliasCheckPubId(data,callback){
  gun.get(data.pub).once((data,key)=>{
    //console.log(data);
    if(data){
      return callback('EXIST');
    }else{
      return callback(null);
    }
  });
  //return callback(null);
}
exports.aliasCheckPubId = aliasCheckPubId;
//===============================================
// ALIAS CREATE PUB
//===============================================
function aliasCreatePubId(data,callback){
  console.log(data);
  console.log('CHecking...');
  var userinfo={
    alias:data.user.alias
    ,aliasId:data.user.aliasId
  };
  //console.log(userinfo);
  gun.get(data.pub).put(userinfo,(ack)=>{
    if(ack.err){
      //console.log('PUB ID ERROR!');
      return callback(null);
    }
    if(ack.ok){
      //console.log('PUB CREATED!');
      return callback('PASS');
    }else{
      //console.log('PUB FAIL!');
      return callback(null);
    }
  });
  //return callback(null);
}
exports.aliasCreatePubId = aliasCreatePubId;
//===============================================
// 
//===============================================
function aliasCreatePubIdPost(data,callback){
  if(!gun){
    return callback('Database not init!',null);
  }
  //TODOLIST encode text
  //public
  //private

  if(data){
    //console.log(data);
    let time = timeStamp();
    //console.log(time);

    gun.get(data.pub).get('post').get(time).put({
        content:data.content
        , date:time
        , isDraft:false
        , isDelete:false
        , isPublic:true
      },(ack)=>{
        //console.log(ack);
        if(ack.err){
          return callback(null);
        }
        if(ack.ok){
          callback({
            id:time
            , content:data.content
          });
        }
      });
  }else{
    callback(null);
  }
}
exports.aliasCreatePubIdPost = aliasCreatePubIdPost;
//===============================================
// 
//===============================================
function getPubPostId(pub,id){
  return new Promise(resolve => {
    gun.get(pub).get('post').get(id).once((data)=>{
      //console.log('data');
      //console.log(data);
      let d={
        id:id
        , content:data.content
      }
      resolve(d);
    });
  });
}

// https://gun.eco/docs/RAD#lex
function aliasGetPubIdPosts(data,callback){
  if(!gun){
    return callback('Database not init!',null);
  }
  //TODOLIST encode text
  //public
  //private

  if(data){
    //console.log(data);
    let time = timeStamp();
    //console.log(time);
    // 50KB == 50000
    gun.get(data.pub).get('post').get({
      '.':{'<':time},'%': 50000
    //}).map().once((data,key)=>{
    }).once(async (feeddata,key)=>{
      //console.log("DATA FEEDS:");
      //console.log('data:',feeddata);
      //console.log('key:',key);
      let d=[];
      for(let k in feeddata){
        //console.log('K:',k)
        if(k == '_'){
          //TDOLIST Need to fixed this
        }else{
          //console.log('K:',k)
          let pd = await getPubPostId(data.pub,k);
          d.push(pd);
        }
      }
      callback(d);  
    });

    //callback('PASS');
  }else{
    callback(null);
  }
}
exports.aliasGetPubIdPosts = aliasGetPubIdPosts;
