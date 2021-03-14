/**
  Project Name: cip2psn

  LICENSE: MIT

  Created By: Lightnet

  Information:
  
  This is pouchdb. Work in progress tests.

   After some researching database that has replicate.
   
   https://pouchdb.com/guides/replication.html#couchdb-sync

*/

// https://www.tutorialspoint.com/pouchdb/pouchdb_database_info.htm
// https://pouchdb.com/guides/documents.html

console.log("POUCHDB INIT...");
//Requiring the package
const jwt = require('jsonwebtoken');
const bcrypt=require('bcrypt');
const config=require('../../../../config');
//const Gun = require('gun');
const SEA = require('gun/sea');
const { isEmpty, timeStamp, createUserId } =require('../../model/utilities');
var PouchDB = require('PouchDB');

//Creating the database object
//var db = new PouchDB('my_pouchdb');
//Creating the database object
//var db = new PouchDB('http://localhost:5984/my_pouchdb'); //remote


const saltRounds = config.saltRounds || 10;
var db;

function init(){
   //file name
   db = new PouchDB('my_pouchdb');
   db.info(function(err, info) {
      if (err) {
         return console.log(err);
      } else {
         console.log(info);
      }
   });
}
exports.init = init;
//===============================================
// CHECK ALIAS ID
//===============================================
async function checkAliasId(alias,callback){
   if(!db){
     console.log("Database is not setup!");
     return callback("Database not init.",null);
   }

   db.get(alias, function(err, doc) {
      if (err) {
         //return console.log(err);
         return callback(null,{message:'NOTFOUND'});
      } else {
         //console.log(doc);
         return callback(null,{message:'FOUND'});
      }
   });
}
exports.checkAliasId = checkAliasId;
//===============================================
// CREATE ALIAS ACCOUNT
//===============================================
async function createAliasId(data, callback){
   if(!db){
     return callback('Database not init!',null);
   }
 
   if(data){

      let pass = bcrypt.hashSync(data.passphrase, saltRounds);
      let sea = await SEA.pair();
      let pub = sea.pub;
      let userId = await createUserId();

      let doc = {
         _id : data.alias,
         alias:data.alias
         ,aliasId:userId
         ,passphrase: pass
         ,role:'user'
         ,token:''
         ,pub:pub
         ,sea:sea
         ,date:timeStamp()
      };

      db.put(doc, function(err, response) {
         if (err) {
            console.log(err);
            return callback(null,{message:"FAIL"});
         } else {
            console.log("Document created Successfully");
            return callback(null,{message:"CREATED",alias:data.alias});
         }
      });
   }else{
     return callback('No args!',null);
   }
 }
 exports.createAliasId = createAliasId;
//===============================================
// GET ALIAS PASSPHRASE (password)
//===============================================
async function getAliasPassphrase(data, callback){
   if(!db){
     return callback('Database not init!',null);
   }
   if(data){
      if(isEmpty(data.alias)==true || isEmpty(data.passphrase)==true){
         return callback('Empty alias || passphrase',null);
      }

      db.get(data.alias, function(err, doc) {
         if (err) {
            console.log(err);
            return callback(null,{message:'NOTFOUND',alias:data.alias});
         } else {
            console.log(doc);
            return callback(null,{
               message:'FOUND'
               , passphrase: doc.passphrase
               , sea:doc.sea
               , aliasId:doc.aliasId
            });
            //return callback(null,{message:'CHECKING'});
         }
      });
   }else{
     return callback('No args!',null);
   }
 }
 exports.getAliasPassphrase = getAliasPassphrase;
//===============================================
// ALIAS LOGOUT
//===============================================
function aliasLogout(data,callback){
   if(!db){
      return callback('Database not init!',null);
   }

   if(data){
     let datatoken = jwt.verify(data, config.tokenKey);
     if(datatoken){
         console.log(datatoken);
         /*
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
         */
         return callback('PASS');
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
// BASIC OF POUCHDB
//===============================================
//Database information
/*
db.info(function(err, info) {
   if (err) {
      return console.log(err);
   } else {
      console.log(info);
   }
});
*/
//deleting database
/*
db.destroy(function (err, response) {
  if (err) {
     return console.log(err);
  } else {
     console.log ("Database Deleted");
  }
});
*/

//Preparing the document
/*
doc = {
  _id : '001',
  name: 'Raju',
  age : 23,
  designation : 'Designer'
  }
//Inserting Document
db.put(doc, function(err, response) {
  if (err) {
     return console.log(err);
  } else {
     console.log("Document created Successfully");
  }
});
*/

//Reading the contents of a Document
/*
db.get('001', function(err, doc) {
  if (err) {
     return console.log(err);
  } else {
     console.log(doc);
  }
});
*/


