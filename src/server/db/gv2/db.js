const Gun = require('gun');
//const SEA = require('gun/sea');
//var gunoptions={
  //file: 'radatagun',// folder default > radata
//}
var gun;// = Gun(gunoptions);

function init(arg={}){
  if(!gun){
    let options = arg || {};
    gun = Gun(options);
    console.log('SETUP NEW GUN');
  }else{
    console.log('REUSED GUN');
  }
  return gun;
};
init();
module.exports = gun;
function Test(){
  console.log('test');
}
module.exports.Test=Test;

var { settest, gettest} =require('./dbalias');
module.exports.settest=settest;
module.exports.gettest=gettest;

// https://www.tutorialsteacher.com/nodejs/nodejs-module-exports
// https://stackoverflow.com/questions/13151693/passing-arguments-to-require-when-loading-module/13163075
// https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export
//module.exports=init;
//module.exports=init || init({});//nope
//exports.init=init;
//module.exports.init=init;
//module.exports = {
  //init
//}
/*
module.exports = function(options={}) {
  var module = {};
  init(options);
  console.log('//===========/////');
  console.log('options',options);
  //console.log('db',db);
  return module;
};
*/
//module.exports = gun;
//module.exports = function(options={}) {
  //var module = {};
  //init(options);
  //console.log('//===========/////');
  //console.log('options',options);
  //console.log('db',db);
  //return module;
//}
//module.exports = init || gun;
//module.exports = init;
//module.exports.init=init;
//module.exports ={gun};