// https://www.tutorialspoint.com/pouchdb/pouchdb_database_info.htm
// https://pouchdb.com/guides/documents.html

//Requiring the package
var PouchDB = require('PouchDB');

//Creating the database object
//var db = new PouchDB('my_pouchdb');
//Creating the database object
//var db = new PouchDB('http://localhost:5984/my_pouchdb');
var db;

function init(){
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


