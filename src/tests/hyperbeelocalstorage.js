// https://npm.io/package/pouchdb-adapter-hyperbee

const chalk = require('chalk');
const hypercore = require('hypercore');
//const ram = require('random-access-memory')
const Hyperbee = require('hyperbee');
//const HyperbeeDown = require('hyperbeedown')
//const PouchDB = require('pouchdb')

console.log('init db');

async function testdb() {
  var feed = hypercore('./my-first-dataset', {valueEncoding: 'utf-8'} );

//feed.append('hello')
//feed.append('world', function (err) {
  //if (err) throw err
  //feed.get(0, console.log) // prints hello
  //feed.get(1, console.log) // prints world
//})

const db = new Hyperbee(feed, {
  keyEncoding: 'utf-8', // can be set to undefined (binary), utf-8, ascii or and abstract-encoding
  valueEncoding: 'json' // same options as above
  //valueEncoding: 'binary'
})

//await db.put('key', {value:'test'});
await db.put('key', 'test');
const node = await db.get('key'); // null or { key, value }
console.log(node);


//await db.put('key', 'value');
//const node = await db.get('key'); // null or { key, value }
//console.log(node);

/*
// if you own the feed
await db.put('key', 'value')
//await db.del('some-key')
// if you want to query the feed
const node = await db.get('key') // null or { key, value }
console.log(node);
*/
}

testdb();