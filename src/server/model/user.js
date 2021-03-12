/**
  Project Name: cip2psn

  LICENSE: MIT

  Created By: Lightnet

 */

// https://developer.okta.com/blog/2018/11/13/create-and-verify-jwts-with-node
// https://www.sohamkamani.com/blog/javascript/2019-03-29-node-jwt-authentication/
// https://www.npmjs.com/package/jsonwebtoken
// https://github.com/sohamkamani/jwt-nodejs-example

const jwt = require("jsonwebtoken");
const bcrypt=require('bcrypt');
const db=require('../db/hcv1/index');
const config=require('../../../config');
const SEA = require('gun/sea');
const {create32Key} =require('./utilities');
//const jwtKey = "my_secret_key";
//console.log('user init db?');
//const jwtExpirySeconds = 300;
//console.log(db.getuser);
//console.log(db.getuser());
//===============================================
// CHECK ALIAS ID
//===============================================
// let isExist = await user.checkAliasExistSync('testalias');
function checkAliasExistSync(alias){
  return new Promise(resolve => {
    db.checkAliasId(alias,function(error,data){
      if(error){
        resolve(false);
      }
      if(data){ 
        if(data.message=='FOUND'){
          resolve(true);
        }else{
          resolve(false);
        }
      }
    });
  });
}
exports.checkAliasExistSync = checkAliasExistSync;
//===============================================
// CREATE ALIAS
//===============================================
function createAliasSync(data){
  return new Promise(resolve => {
    db.createAliasId(data,function(error, data2){
      if(error){
        return resolve(null);
      }
      console.log(data2);
      if(data2){
        if(data2.message=='CREATED'){
          resolve('CREATED');
        }else if(data2.message){
          resolve('EXIST');
        }else{
          resolve(null);
        }
      }else{
        resolve(null);
      }
      console.log('END createAliasSync');
      //resolve(null);
    });
  });
}
exports.createAliasSync = createAliasSync;
//===============================================
// LOGIN ALIAS
//===============================================
// https://stackoverflow.com/questions/45207104/how-to-set-jwt-token-expiry-time-to-maximum-in-nodejs
// https://www.npmjs.com/package/jsonwebtoken
// Backdate a jwt 30 seconds
// iat: Math.floor(Date.now() / 1000) - 30
// Signing a token with 1 hour of expiration:
// exp: Math.floor(Date.now() / 1000) + (60 * 60),
//  
function loginAliasSync(data){
  return new Promise(resolve => {
    db.getAliasPassphrase(data,async function(error,data2){
      if(error){
        //console.log('Login Error!');
        return resolve(null);
      }
      //console.log(error);
      //console.log(data2);
      if(data2){
        if(data2.message=='FOUND'){
          let decoded = bcrypt.compareSync(data.passphrase, data2.passphrase);
          //console.log('decoded:',decoded);
          if(decoded){
            //TODOLIST need to work encoding safe data
            let saltkey = await SEA.work(data.passphrase, data.alias);
            let sea = await SEA.decrypt(data2.sea, saltkey);
            let key = await create32Key();

            saltkey = await SEA.work(key, data.alias);

            //need to be encrypt that token can be read
            sea = await SEA.encrypt(sea, saltkey); 
            //console.log('///////////////////////////////////////////');
            //console.log(data2)
            //console.log('///////////////////////////////////////////');

            let token = jwt.sign({ 
              alias: data.alias
              , aliasId:data2.aliasId
              , key:key
              , sea:sea
              //set expiry  date
              , exp: Math.floor(Date.now() / 1000) + (60 * 60)
            }, config.tokenKey);
            //console.log(token);
            //return callback(null,{message:'FOUND',token:token});
            resolve(token);
          }else{
            resolve(null);  
          }
        }
        if(data2.message=='NOTFOUND'){
          resolve(null);
        }
      }else{
        resolve(null);
      }
      console.log('END loginAliasSync');
    });
  });
}
exports.loginAliasSync = loginAliasSync;
//===============================================
// ALIAS SET HINT
//===============================================
function aliasSetHintSync(data){
  return new Promise(resolve => {
    db.aliasSetHint(data,(ack)=>{
      resolve(ack);
    })
  });
}
exports.aliasSetHintSync = aliasSetHintSync;
//===============================================
// ALIAS GET HINT
//===============================================
function aliasGetHintSync(data){
  return new Promise(resolve => {
    db.aliasGetHint(data,(ack)=>{
      resolve(ack);
    });
  });
}
exports.aliasGetHintSync = aliasGetHintSync;
//===============================================
// CHANGE PASSPHRASE
//===============================================
function aliasChangePassphraseSync(data){
  return new Promise(async (resolve) => {
    //TODOLIST
    let isPassCheck = await db.aliasCheckPassphraseSync(data);
    console.log('isPassCheck:',isPassCheck);
    if(isPassCheck){
      resolve(true);
    }else{
      resolve(false);
    }
  });
}
exports.aliasChangePassphraseSync = aliasChangePassphraseSync;
//===============================================
// LOGOUT
//===============================================
// NEEDED? DB clear token, cookie, session?
function logout(data,callback){
  
  if(data){



  }else{
    console.log('ERROR! NULL DATA!');
    callback(null);
  }
}
exports.logout = logout;
//===============================================
// TMP SET UP
//===============================================
//function createAliasSync(data){
  //return new Promise(resolve => {
    //resolve(null);
  //});
//}
//exports.createAliasSync = createAliasSync;
//===============================================
// TMP SET UP
//===============================================