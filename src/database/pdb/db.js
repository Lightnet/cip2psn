//console.log("POUCHDB INIT...");
const path = require('path');
const PouchDB = require('PouchDB');
const currentDir = path.resolve('./');
//console.log(currentDir);
var PrefixedPouchDB;
if(!PrefixedPouchDB){
  PouchDB.plugin(require('pouchdb-find'));
  PrefixedPouchDB =PouchDB.defaults({
    //prefix: '/database/' //drive dir
    prefix:path.join(currentDir, "/database/")
  });
}
var db;

function init(){
  //file name
  if(!db){
    console.log('INIT DB!');
    db = new PouchDB('pouchdb');
  }else{
    console.log('REUSED DB!');
  }
  //console.log(db);
  
  db.info(function(err, info) {
    if (err) {
        return console.log(err);
    } else {
        console.log(info);
    }
  });
  
  return db;
}
init();
//exports.init = init;
//exports = db;
module.exports = db;