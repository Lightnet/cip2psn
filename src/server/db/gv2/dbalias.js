const gun = require('./db');

module.exports.settest=function(){
  gun.get('T0T').put({text:'settext'},ack=>{
    if(ack.err){
      return console.log(ack.err);
    }
    if(ack.ok){
      console.log(ack.ok);
    }
  });
}

module.exports.gettest=function(){
  gun.get('T0T').once((data,key)=>{
    console.log(data);
  });
}