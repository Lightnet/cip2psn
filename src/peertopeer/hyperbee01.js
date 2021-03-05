/**
  Project Name: cip2psn

  LICENSE: MIT

  Created By: Lightnet

 */

// https://hypercore-protocol.org/guides/getting-started/standalone-modules/
// https://hypercore-protocol.org/guides/getting-started/standalone-modules/
// 
// 
// 



const Hypercore = require('hypercore');
const Hyperbee = require('hyperbee');

const core = new Hypercore('./my-hypercore');

const db = new Hyperbee(core , {
  keyEncoding: 'utf-8', // can be set to undefined (binary), utf-8, ascii or and abstract-encoding
  valueEncoding: 'binary' // same options as above
})

async function main(){

  await bee.ready();
  console.log('New bee created, key:');
  console.log('  ', bee.feed.key.toString('hex'));


  // if you own the feed
  await db.put('key', 'value')
  await db.del('some-key')

  // if you want to insert/delete batched values
  const batch = db.batch()

  await batch.put('key', 'value')
  await batch.del('some-key')
  await batch.flush() // execute the batch

  // if you want to query the feed
  const node = await db.get('key') // null or { key, value }
  console.log(node);

  // if you want to read a range
  //const rs = db.createReadStream({ gt: 'a', lt: 'd' }) // anything >a and <d
  //const rs = db.createReadStream({ gte: 'a', lte: 'd' }) // anything >=a and <=d

  // get the last written entry
  //const rs = db.createHistoryStream({ reverse: true, limit: 1 })
}

main();