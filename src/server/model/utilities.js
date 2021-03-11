/**
  Project Name: cip2psn

  LICENSE: MIT

  Created By: Lightnet

 */



// CHECK POST STRING IF EMPTY
function isEmpty(str) {
  return (typeof str === 'string' && 0 === str.length);
}
exports.isEmpty = isEmpty;

function timeStamp(){
  //return new Date() / 1000;
  return new Date().getTime();
}
exports.timeStamp = timeStamp;


// https://stackoverflow.com/questions/19485353/function-to-convert-timestamp-to-human-date-in-javascript
function timedateclock(time){
  //return new Date(time);
  let plus0 = num => `0${num.toString()}`.slice(-2);
  let d = new Date(time);
  let year = d.getFullYear();
  let monthTmp = d.getMonth() + 1;
  let month = plus0(monthTmp);
  let date = plus0(d.getDate());
  //let hour = plus0(d.getHours()%12);
  let hour = plus0(d.getHours()%12);
  let minute = plus0(d.getMinutes());
  let second = plus0(d.getSeconds());
  let rest = time.toString().slice(-5);

  return `${year}-${month}-${date}_${hour}:${minute}:${second}.${rest}`;
}
exports.timedateclock = timedateclock;

//import { customAlphabet } from 'nanoid/async'
//const nanoid = customAlphabet('1234567890abcdef', 10)
//async function createUser () {
  //user.id = await nanoid()
//}
//exports.createUser = createUser;

const { customAlphabet } = require('nanoid');
const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz';
const nanoid = customAlphabet(alphabet, 16);
//nanoid() //=> "S1KBXmrTkI2sNxnx"

async function createUser () {
  user.id = await nanoid()
}
exports.createUser = createUser;