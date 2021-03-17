/**
  Project Name: cip2psn

  LICENSE: MIT

  Created By: Lightnet

  Information:

*/

const jwt = require('jsonwebtoken');
const bcrypt=require('bcrypt');
const { isEmpty, timeStamp, createUserId } =require('../../model/utilities');
const Gun = require('gun');
const SEA = require('gun/sea');

const config=require('../../../../config');
const saltRounds = config.saltRounds || 10;
var database = require('./index');
var gun = database.get();


//===============================================
// 
//===============================================
function getPubPostId(pub,id){
  if(!gun){
    //return callback('Database not init!',null);
    gun = database.get();
  }
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
    //return callback('Database not init!',null);
    gun = database.get();
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
