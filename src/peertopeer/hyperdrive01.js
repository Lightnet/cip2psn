/**
  Project Name: cip2psn

  LICENSE: MIT

  Created By: Lightnet

 */

// https://hypercore-protocol.org/guides/walkthroughs/sharing-files-with-hyperdrive/
// https://hypercore-protocol.org/guides/examples/hyperdrive-app/
// https://github.com/hypercore-protocol/hyperdrive

const Hyperdrive = require('hyperdrive')

var _key="a6c3123f4bf9751f5039fff02217332e6837edf9435087e2a0936fe4dd50c0c3";

const drive = new Hyperdrive('./my-hyperdrive', Buffer.from(_key, 'hex')) // load
//const drive = new Hyperdrive('./storage-path', null) // create new

// https://stackoverflow.com/questions/18879880/how-to-display-nodejs-raw-buffer-data-as-hex-string
drive.ready(err => {
  if (err) throw err
  console.log("drive.key: ",drive.key);
  var key = drive.key.toString('hex');
  console.log(key);
  //console.log(Buffer.from(key, 'hex'));
  //console.log(drive.key); // the drive's public key, used to identify it
  //console.log(drive.discoveryKey); // the drive's discovery key for the DHT
  console.log("drive.discoveryKey: ",drive.discoveryKey); // the drive's discovery key for the DHT
  //var discoveryKey = drive.discoveryKey.toString('hex');
  //console.log(discoveryKey);

  console.log(drive.writable); // do we possess the private key of this drive?
  console.log(drive.version); // what is the version-number of this drive?
  console.log(drive.peers); // list of the peers currently replicating this drive
});

//drive.promises.writeFile('/hello.txt', 'World');


