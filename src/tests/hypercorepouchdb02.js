// https://npm.io/package/pouchdb-adapter-hyperbee

// NOTE:
// RAM DOES NOT STORE LOCAL FILE

const chalk = require('chalk')
const hypercore = require('hypercore')
const ram = require('random-access-memory')
const Hyperbee = require('hyperbee')
const HyperbeeDown = require('hyperbeedown')
const PouchDB = require('pouchdb')

console.log('init db');
// https://pouchdb.com/api.html#defaults
// https://npm.io/package/pouchdb-adapter-hyperbee
async function initurl () {
  PouchDB.plugin(require('pouchdb-adapter-hyperbee')())

  var MyPouch = PouchDB.defaults({
    adapter: 'hyperbee',
    //prefix: './'
    //prefix: __dirname + '/../../'
  });
  console.log(__dirname + '/../../')

  // You can pass any valid `hyper://` URL
  // URLs with a `name` in them will generate a local hyperbee
  // You can sparsely load remote DBs with a full `hyper://` URL
  let urlname='hyper://example';
  urlname='mypdb'
  urlname='hyper://5af63e46b8823992a55c2a3baeaa3dc328c053793217c997917b3988eb897f42/'
  const pouch = MyPouch(urlname);

  //const pouch = new PouchDB(urlname, {
    //adapter: 'hyperbee'
  //})

  // Wait for the DB to open if you want to access the bee directly
  pouch.once('open',async () => {
    const url = await pouch.getURL();
    console.log('open',url);

    // In case you want to access the hyperbee instance directly
    const bee = pouch.bee;
  })
  console.log('open pouchdb');
}

//initurl();
async function start () {
  const tree = new Hyperbee(hypercore(ram), {
    keyEncoding: 'utf-8',
    valueEncoding: 'json' // same options as above
  })
  //PouchDB.debug.enable();
  // With the addition of a small wrapper (hyperbeedown), Hyperbee supports the LevelDOWN interface.
  // It can be used as the storage backend for many modules in the LevelDB ecosystem.
  // In this example, we'll use it as the backend for PouchDB.
  const db = new PouchDB('pdatabase', {
    //db: () => new HyperbeeDown(tree)
    db: () => new HyperbeeDown(tree)
  })
  // PouchDB is a document store, so we'll store and retrieve a simple record.
  await db.put({ _id: '1', hello: 'world' })
  console.log(chalk.green('\nPouchDB Document 1:\n'))
  const doc = await db.get('1')
  console.log(chalk.blue(JSON.stringify(doc, null, 2)))
}
//start()

async function testdb() {
  var feed = hypercore('./my-first-dataset', {
    valueEncoding: 'utf-8'

  });

//feed.append('hello')
//feed.append('world', function (err) {
  //if (err) throw err
  //feed.get(0, console.log) // prints hello
  //feed.get(1, console.log) // prints world
//})

const db = new Hyperbee(feed, {
  keyEncoding: 'utf-8', // can be set to undefined (binary), utf-8, ascii or and abstract-encoding
  //valueEncoding: 'json' // same options as above
  valueEncoding: 'binary'
})
//await db.put('key', 'value');
const node = await db.get('key'); // null or { key, value }
console.log(node);

/*
// if you own the feed
await db.put('key', 'value')
await db.put('key', {value:'test'})
//await db.del('some-key')

// if you want to query the feed
const node = await db.get('key') // null or { key, value }
console.log(node);
*/

}

testdb();



//const PouchDB = require('pouchdb');
/*
const db = new PouchDB('my-database2');
doc = {
  name: 'Peter',
  age: 23,
  occupation: 'designer'
};
db.post(doc).then((res) => {
  console.log("Document inserted OK");
}).catch((err) => {
  console.error(err);
});
*/
