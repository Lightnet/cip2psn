/**
  Project Name: cip2psn

  LICENSE: MIT

  Created By: Lightnet

  Information:
  This used gun.js. It used graph node and timestamp.

*/

const gun = require('./index');
//const gun = require('../index');
const jwt = require('jsonwebtoken');
const bcrypt=require('bcrypt');
const config=require('../../../../config');
const { isEmpty, timeStamp, createUserId } =require('../../model/utilities');
//const Gun = require('gun');
const SEA = require('gun/sea');

// https://www.npmjs.com/package/bcrypt
const saltRounds = config.saltRounds || 10;

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
      //console.log('NOT FOUND ALIAS!');
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
          let time = timeStamp();

          // for SEARCH PUB ID for username
          gun.get(pub).put({
            alias:data.alias
            ,pub:pub
            ,time:time
          })
          
          /// for account set up
          gun.get(data.alias).put({
            alias:data.alias
            ,aliasId:userId
            ,passphrase: pass
            ,role:'user'
            ,token:''
            ,pub:pub
            ,auth:sea
            ,date:time
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
  //console.log('PROGRESS PASSWORD');
  //console.log(gun);
  if(!gun){
    //console.log('ERROR');
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
          , sea:datasub.auth
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
async function aliasSetHint(data,callback){
  //console.log('SET HINT GUN...');
  //console.log(data);

  //TODOLIST work on ecoding
  //let sec = await Gun.SEA.secret(user.is.epub, user._.sea);
  let sec = await SEA.secret(data.sea.epub, data.sea);
  let enc_question1 = await SEA.encrypt(data.question1, sec);
  //console.log(enc_question1);
  let enc_question2 = await SEA.encrypt(data.question2, sec);

  let enc = await SEA.work(data.question1, data.question2);
  let enc_hint = await SEA.encrypt(data.hint,enc);
  
  gun.get(data.alias).put({
    question1:enc_question1
    ,question2:enc_question2
    ,hint:enc_hint
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
        //console.log('FOUND HINT');
        callback({
          hint:data.hint
          , question1:data.question1
          , question2:data.question2
        });
      }else{
        //console.log('FAIL HINT');
        callback('FAIL');
      }
    }else{
      callback('FAIL');
    }
  });
}
exports.aliasGetHint = aliasGetHint;
//===============================================
// ALIAS CHECK PASSPHRASE
//===============================================
function aliasCheckPassphrase(data,callback){
  gun.get(data.alias).once(function(datasub, key){
    if(datasub){
      if(datasub.passphrase){
        let decoded = bcrypt.compareSync(data.oldpassphrase, datasub.passphrase);
        //console.log('decoded:',decoded);
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
// ALIAS CHANGE PASSPHRASE
//===============================================
function aliasChangePassphrase(data,callback){
  gun.get(data.alias).once(async function(datasub, key){
    if(datasub){
      if(datasub.passphrase){
        let decoded = bcrypt.compareSync(data.oldpassphrase, datasub.passphrase);
        //console.log('decoded:',decoded);
        if(decoded){
          // passphrase is verify
          //callback('PASS');
          //console.log(datasub);
          let sea =datasub.auth;
          //console.log(sea);
          let oldSaltKey = await SEA.work(data.oldpassphrase, data.alias);
          sea = await SEA.decrypt(sea, oldSaltKey);
          //console.log(sea);
          let newSaltKey = await SEA.work(data.newpassphrase, data.alias);
          sea = await SEA.encrypt(sea, newSaltKey);
          //console.log(sea);
          let pass = bcrypt.hashSync(data.newpassphrase, saltRounds);

          gun.get(data.alias).put({
            auth:sea,
            passphrase:pass
          },(ack)=>{
            if(ack.err){
              //console.log('GUN PUT FAIL CHANGE PASSPRASE');
              return callback('FAIL');
            }
            if(ack.ok){
              return callback('PASS');
            }
          });
          //console.log('PASS/////////////////////');
          //callback('PASS');
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
exports.aliasChangePassphrase = aliasChangePassphrase;
//===============================================
// ALIAS LOGOUT
//===============================================
//TODOLIST need work on two checks
// if user logout
// if fake user logout
// check for expire date
function aliasLogout(data,callback){
  if(data){
    //let datatoken = jwt.verify(data, config.tokenKey);
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
        //console.log('LOGOUT ERROR:',e);
        return callback('FAIL');
      }
    }else{
      callback('FAIL');
    }
    //console.log('nothing yet...');
  }else{
    //console.log('Alias Logout NULL field!');
    callback('FAIL');
  }
}
exports.aliasLogout = aliasLogout;