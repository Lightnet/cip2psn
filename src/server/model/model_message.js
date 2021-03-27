const jwt = require("jsonwebtoken");
const bcrypt=require('bcrypt');
const db=require('../db');
const config=require('../../../config');
const SEA = require('gun/sea');
const {create32Key} =require('./utilities');


function addPMContactSync(args){
  //console.log(db);
  return new Promise(resolve => {
    db.addPMContact(args,(data)=>{
      resolve(data);
    });
    //resolve(null);
  });
}
module.exports.addPMContactSync=addPMContactSync;

function removePMContactSync(args){
  //console.log(db);
  return new Promise(resolve => {
    db.removePMContact(args,(data)=>{
      resolve(data);
    });
    //resolve(null);
  });
}
module.exports.removePMContactSync=removePMContactSync;

function listPMContactSync(args){
  //console.log(db);
  return new Promise(resolve => {
    db.listPMContact(args,(data)=>{
      resolve(data);
    });
    //resolve(null);
  });
}
module.exports.listPMContactSync=listPMContactSync;