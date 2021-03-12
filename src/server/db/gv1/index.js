/**
  Project Name: cip2psn

  LICENSE: MIT

  Created By: Lightnet

 */
// GUNJS
// https://gun.eco/docs/Installation#node

console.log("DATABASE INIT...");
//const jwt = require('jsonwebtoken');
const bcrypt=require('bcrypt');
var config=require('../../../../config');
const { isEmpty, timeStamp } =require('../../model/utilities');
//===============================================
const Gun = require('gun');
const SEA = require('gun/sea');
var gun;
//var user; //sub database
//https://gun.eco/docs/API
var gunoptions={
  //file: 'radatagun',// folder default > radata
}
//INIT DATABASE
async function init(){
  //Gun Config
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
// GET DATABASE
async function get(){
  return gun;
}
exports.get = get;
//===============================================
// CHECK ALIAS ID
//===============================================
function checkAliasId(alias,callback){
  if(!gun){
    console.log("Database is not setup!");
    return callback("Database not init.",null);
  }
  gun.get(alias).once(function(data, key){
    // {property: 'value'}, 'key'
    //console.log('data');
    //console.log(data);
    //console.log(key);
    if(data){
      //console.log('FOUND ALIAS!');
      return callback(null,{message:'FOUND'});
    }else{
      return callback(null,{message:'NOTFOUND'});
    }
  });
}
exports.checkAliasId = checkAliasId;
//===============================================
// CREATE ALIAS ACCOUNT
//===============================================
function createAliasId(data, callback){
  if(!gun){
    return callback('Database not init!',null);
  }
  if(data){
    if(isEmpty(data.alias)==false){
      gun.get(data.alias).once(async function(data2, key){
        if(data2){
          console.log(data2);
          return callback(null,{message:"EXIST"});
        }else{
          let pass = bcrypt.hashSync(data.passphrase, saltRounds);

          //TODOLIST
          //need to work on encrypt data...
          let sea = await SEA.pair();
          let pub = sea.pub;
          let saltkey = await SEA.work(data.passphrase, data.alias);
          sea = await SEA.encrypt(sea, saltkey);

          gun.get(data.alias).put({
            alias:data.alias
            ,passphrase: pass
            ,role:'user'
            ,token:''
            ,pub:pub
            ,sea:sea
            ,date:timeStamp()
          });
          return callback(null,{message:"CREATED",alias:data.alias});
        }
      });
    }else{
      return callback('Empty Alias!',null);
    }
  }else{
    return callback('No args!',null);
  }
}
exports.createAliasId = createAliasId;
//===============================================
// GET ALIAS PASSPHRASE (password)
//===============================================
function getAliasPassphrase(data, callback){
  if(!gun){
    return callback('Database not init!',null);
  }
  if(data){
    //if(isEmpty(data.alias)==true || isEmpty(data.passphrase)==true){
    if(isEmpty(data.alias)==true){
      //return callback('Empty alias || passphrase!');
      return callback('Empty alias',null);
    }
    gun.get(data.alias).once(function(datasub, key){
      if(datasub){
        //console.log('FOUND ALIAS!');
        return callback(null,{message:'FOUND',passphrase: datasub.passphrase, sea:datasub.sea});
      }else{
        //console.log('NOT FOUND ALIAS!');
        return callback(null,{message:'NOTFOUND',alias:data.alias});
      }
    });
  }else{
    return callback('No args!',null);
  }
}
exports.getAliasPassphrase = getAliasPassphrase;
//===============================================
// ALIAS SET HINT
//===============================================
function aliasSetHint(data,callback){
  console.log('SET HINT GUN...');

  //TODOLIST 
  let question1;
  question1 =data.question1;
  let question2;
  question2 =data.question2;
  let hint;
  hint =data.hint;

  
  gun.get(data.alias).put({
    question1:question1
    ,question2:question2
    ,hint:hint
  },
  (ack)=>{
    //console.log('ack');
    //console.log(ack);
    callback(ack);
  });
}
exports.aliasSetHint = aliasSetHint;
//===============================================
// ALIAS GET HINT
//===============================================
function aliasGetHint(data,callback){
  gun.get(data.alias).once(function(data, key){
    //console.log(data);
    if(data){
      if(data.hint){
        console.log('FOUND HINT');
        callback(data.hint);
      }else{
        console.log('FAIL HINT');
        callback('FAIL');
      }
    }else{
      callback('FAIL');
    }
    //callback('TEST');
  });
}
exports.aliasGetHint = aliasGetHint;
//===============================================
// GET DB USER
async function getuser(){
  //return user;
  return gun;
}
exports.getuser=getuser;
//===============================================
// TESTING AREA
//===============================================
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
//===============================================
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