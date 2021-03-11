const chalk = require('chalk')
const hypercore = require('hypercore')
const ram = require('random-access-memory')
const Hyperbee = require('hyperbee')
const HyperbeeDown = require('hyperbeedown')
const PouchDB = require('pouchdb')

console.log('init pouchdb');
// https://pouchdb.com/api.html#defaults
// https://npm.io/package/pouchdb-adapter-hyperbee
async function initurl () {

  PouchDB.plugin(require('pouchdb-adapter-hyperbee')())
  // CUSTOM CONFIG
  var MyPouch = PouchDB.defaults({
    adapter: 'hyperbee',
  });
  console.log(__dirname + '/../../')

  // You can pass any valid `hyper://` URL
  // URLs with a `name` in them will generate a local hyperbee
  // You can sparsely load remote DBs with a full `hyper://` URL
  let urlname='hyper://example';
  urlname='mypdb'
  urlname='hyper://5af63e46b8823992a55c2a3baeaa3dc328c053793217c997917b3988eb897f42/'
  const pouch = MyPouch(urlname);

  // Wait for the DB to open if you want to access the bee directly
  pouch.once('open',async () => {
    const url = await pouch.getURL();
    console.log('open',url);

    // In case you want to access the hyperbee instance directly
    const bee = pouch.bee;
  })
  console.log('open pouchdb');
}

initurl();