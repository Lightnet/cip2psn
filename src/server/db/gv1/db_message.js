const gun = require('./index');
const config=require('../../../../config');
const SEA = require('gun/sea');
const { once } = require('gulp');

async function addPMContact(args,callback){
  if(!gun){
    console.log("Database is not setup!");
    return callback("Database not init.",null);
  }
  //console.log(args);
  if(!args.user){
    return callback("Null Alias");
  }
  let pub = args.sender;
  //let to = await gun.get(' ').then();
  let to = await gun.get(pub).then();
  //console.log(to);
  if(!to){
    console.log('NULL USER');
    return callback("Null Sender");
  }
  //console.log(to)
  
  gun.get(args.user.alias).get('contact').get(pub).put({
    alias:to.alias
    , pub:to.pub
  },function(ack){
    //console.log(ack);
    callback(ack);
  });
}
exports.addPMContact=addPMContact;

async function removePMContact(args,callback){
  if(!gun){
    console.log("Database is not setup!");
    return callback("Database not init.",null);
  }
  let pub = args.sender;
  let to = await gun.get(pub).then();
  if(!to){
    console.log('NULL USER');
    return callback("Null Sender");
  }
  //console.log(to)
  
  gun.get(args.user.alias).get('contact').get(pub).put('null',function(ack){
    //console.log(ack);
    callback(ack);
  });

}
exports.removePMContact=removePMContact;

async function listPMContact(args,callback){
  if(!gun){
    console.log("Database is not setup!");
    return callback("Database not init.",null);
  }
  gun.get(args.alias).get('contact').map().once((data,key)=>{
    //console.log(data);
    //console.log(key);
    callback(data);
  })

}
exports.listPMContact=listPMContact;

async function sentPrivateMessage(args){
  if(!gun){
    console.log("Database is not setup!");
    return callback("Database not init.",null);
  }

  let pub = args.sender;
  let to = await gun.get(pub).then();
  if(!to){
    console.log('NULL USER');
    return callback("Null Sender");
  }
  //console.log(to)
  callback('checking');
  
  //gun.get(args.user.alias).get('contact').get(pub).put('null',function(ack){
    //console.log(ack);
    //callback(ack);
  //});

}
exports.sentPrivateMessage=sentPrivateMessage;