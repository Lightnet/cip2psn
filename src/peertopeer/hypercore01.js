/**
  Project Name: cip2psn

  LICENSE: MIT

  Created By: Lightnet

 */

// https://hypercore-protocol.org/guides/walkthroughs/creating-and-sharing-hypercores/
// https://github.com/hypercore-protocol/walkthroughs/blob/main/hypercore/step-2.js
//const Corestore = require('corestore');

const Hypercore = require('hypercore');
const { toPromises } = require('hypercore-promisifier');

async function start () {
  const core = toPromises(new Hypercore('./main', {
    valueEncoding: 'utf-8' // The blocks will be UTF-8 strings.
  }));

  await core.append(['hello', 'world']);

  // After the append, we can see that the length has updated.
  console.log('Length of the first core:', core.length) // Will be 2.

  // And we can read out the blocks.
  console.log('First block:', await core.get(0)) // 'hello'
  console.log('Second block:', await core.get(1)) // 'world'
}

start();