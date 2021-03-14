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
const config=require('../../../../config');
const { isEmpty, timeStamp, createUserId } =require('../../model/utilities');

//===============================================
// https://www.npmjs.com/package/bcrypt
const saltRounds = config.saltRounds || 10;

var core;
var db;
const Gun = require('gun');
const SEA = require('gun/sea');
var gun;
//var user; //sub database
//https://gun.eco/docs/API
var gunoptions={
  //file: 'radatagun',// folder default > radata
}
//INIT DATABASE
function init(){
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

  //core = hypercore('./my-dataset', {valueEncoding: 'utf-8'} );
  //db = new Hyperbee(core, {
    //keyEncoding: 'utf-8', // can be set to undefined (binary), utf-8, ascii or and abstract-encoding
    //valueEncoding: 'json' // same options as above
  //})
  //await db.put('key', {value:'test'});
  //await db.put('key', 'test');
  //const node = await db.get('key'); // null or { key, value }
  //console.log(node);

}
exports.init = init;
//===============================================
// GET DATABASE
async function get(){
  return gun;
}
exports.get = get;
//===============================================
// GET DB USER
async function getuser(){
  //return user;
  return gun;
}
exports.getuser=getuser;
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
          //console.log(data2);
          return callback(null,{message:"EXIST"});
        }else{
          let pass = bcrypt.hashSync(data.passphrase, saltRounds);

          //TODOLIST
          //need to work on encrypt data...
          let sea = await SEA.pair();
          let pub = sea.pub;


          
          let saltkey = await SEA.work(data.passphrase, data.alias);
          sea = await SEA.encrypt(sea, saltkey);
          let userId = await createUserId();
          //console.log('userId:',userId)

          gun.get(data.alias).put({
            alias:data.alias
            ,aliasId:userId
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
        //console.log('user data');
        //console.log(datasub);
        //console.log('FOUND ALIAS!');

        return callback(null,{
          message:'FOUND'
          , passphrase: datasub.passphrase
          , sea:datasub.sea
          , aliasId:datasub.aliasId
        });
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

  //TODOLIST work on ecoding
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
  });
}
exports.aliasGetHint = aliasGetHint;
//===============================================
// ALIAS CHANGE PASSPHRASE
//===============================================
function aliasCheckPassphrase(data,callback){
  gun.get(data.alias).once(function(datasub, key){
    if(datasub){
      if(datasub.passphrase){
        let decoded = bcrypt.compareSync(data.oldpassphrase, datasub.passphrase);
        console.log('decoded:',decoded);
        if(decoded){
          // passphrase is verify
          callback('PASS');
        }else{
          callback('FAIL');
        }
      }else{
        callback('FAIL');
      }
    }else{
      callback('FAIL');
    }
  });
}
exports.aliasCheckPassphrase = aliasCheckPassphrase;
//===============================================
function aliasCheckPassphraseSync(data){
  return new Promise(resolve => {
    aliasCheckPassphrase(data,(ack)=>{
      if(ack=='PASS'){
        resolve(true);
      }else{
        resolve(false);
      }
    });
  });
}
exports.aliasCheckPassphraseSync = aliasCheckPassphraseSync;
//===============================================
// ALIAS
//===============================================
//TODOLIST need work on two checks
// if user logout
// if fake user logout
// check for expire date
function aliasLogout(data,callback){
  if(data){
    let datatoken = jwt.verify(data, config.tokenKey);
    if(datatoken){
      //console.log(datatoken);
      try{
        gun.get(datatoken.alias).put({token:''},(ack)=>{
          //console.log(ack);
          if (ack.err){
            return callback('FAIL');
          }
          if(ack.ok){
            return callback('PASS');
          }
        });
      }catch(e){
        console.log('LOGOUT ERROR:',e);
        return callback('FAIL');
      }
    }else{
      callback('FAIL');
    }
    //console.log('nothing yet...');
  }else{
    console.log('Alias Logout NULL field!');
    callback('FAIL');
  }
}
exports.aliasLogout = aliasLogout;
//===============================================
// ALIAS CHECK PUB ID
//===============================================
function aliasCheckPubId(data,callback){
  gun.get(data.pub).once((data,key)=>{
    console.log(data);
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
  console.log(userinfo);

  gun.get(data.pub).put(userinfo,(ack)=>{
    if(ack.err){
      console.log('PUB ID ERROR!');
      return callback(null);
    }
    if(ack.ok){
      console.log('PUB CREATED!');
      return callback('PASS');
    }else{
      console.log('PUB FAIL!');
      return callback(null);
    }
  });
  //return callback(null);
}
exports.aliasCreatePubId = aliasCreatePubId;
//===============================================
// ALIAS
//===============================================
//function alias(data,callback){
//}
//exports.alias = alias;
//===============================================
// TESTING AREA
//===============================================