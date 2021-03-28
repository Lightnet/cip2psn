const http = require('http');
// https://hypercore-protocol.org/guides/modules/hyperdrive/

const Hyperdrive = require('hyperdrive');
/*
let keyStr = 'c6c6754d46e27301ce5be7bae6dacbb37750c105ddc1d44702cd97bda331b30b';

const key = Buffer.from(keyStr,'hex');

var drive = new Hyperdrive('./my-hyperdrive',keyStr,{
  encoding: 'json'
});

drive.ready(err => {
  if (err) throw err
  //console.log(drive.key) // the drive's public key, used to identify it
  //console.log(drive.key.toString('hex'))
  //console.log(drive.discoveryKey) // the drive's discovery key for the DHT
  //console.log(drive.writable) // do we possess the private key of this drive?
  //console.log(drive.version) // what is the version-number of this drive?
  //console.log(drive.peers) // list of the peers currently replicating this drive
})
*/
/*
drive.readFile('/hello.txt', 'utf-8', function (err, data) {
  if (err) throw err
  console.log(data) // prints 'world'
})
*/
/*
drive.writeFile('/hello.txt', 'world', function (err) {
  if (err) throw err
  drive.readdir('/', function (err, list) {
    if (err) throw err
    console.log(list) // prints ['hello.txt']
    drive.readFile('/hello.txt', 'utf-8', function (err, data) {
      if (err) throw err
      console.log(data) // prints 'world'
    })
  })
})
*/

//drive.on('peer-add', (peer) => {
  //console.log('Connected peer', peer.remotePublicKey)
//})
;(async()=>{
//var drive2 = new Hyperdrive('./my-hyperdrive');
//var drive2 = new Hyperdrive('./my-hyperdrive', null);

//let keyStr0 = 'e151aa8cddec0fe98c4bd6a157d3e268e8b566eafc49b9f385edb0f41c2d8e25';

//keyStr0 = 'd8de6245f2ab4761cdb872d52250050e85e55d1759a4d659133a2a7d12f4c202'; //main
//const key0 = Buffer.from(keyStr0,'hex');
//const drive0 = new Hyperdrive('./drive/my-hyperdrive', key0) // create new

const drive0 = new Hyperdrive('./drive/my-hyperdrive', null) // create new

drive0.ready(err => {
  console.log('DATA///')
  let key = drive0.key.toString('hex')
  console.log('key: ',key)
  console.log(drive0.discoveryKey.toString('hex')) // the drive's discovery key for the DHT
  console.log(drive0.writable) // do we possess the private key of this drive?
  console.log(drive0.version) // what is the version-number of this drive?
});

//await drive0.promises.writeFile('/hello.txt', 'world')

const list = await drive0.promises.readdir('/')
console.log(list) // prints ['hello.txt']

//const data = await drive0.promises.readFile('/hello.txt', 'utf-8')
//console.log(data) // prints 'world'

// https://hypercore-protocol.org/guides/walkthroughs/sharing-files-with-hyperdrive/

//let nonhexkey='c6c6754d46e27301ce5be7bae6dacbb37750c105ddc1d44702cd97bda331b30b';

/*
drive2.ready(err => {
  if (err) throw err
  let key = drive2.key;
  //key = Buffer.from(drive2.key, 'ascii');
  key = key.toString('hex');
  console.log(key)


  //console.log(drive2.key) // the drive's public key, used to identify it
  //console.log(Buffer.from(drive2.key, 'ascii'))
  //console.log(drive2.discoveryKey) // the drive's discovery key for the DHT
  //console.log(drive2.writable) // do we possess the private key of this drive?
  //console.log(drive2.version) // what is the version-number of this drive?
  //console.log(drive2.peers) // list of the peers currently replicating this drive
})
*/
//let keyBuf= Buffer.from(keyStr,'hex');
//var drive2 = new Hyperdrive('./my-hyperdrive', keyBuf);

//await drive.promises.writeFile('/hello.txt', 'world')

//const list = await drive2.promises.readdir('/')
//console.log(list) // prints ['hello.txt']

})();







