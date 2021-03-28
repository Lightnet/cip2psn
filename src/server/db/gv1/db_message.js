/**
  Project Name: cip2psn

  LICENSE: MIT

  Created By: Lightnet

  Information:

*/

const gun = require('./index');
//const config=require('../../../../config');
//const SEA = require('gun/sea');
const {timeStamp} =require('../../model/utilities')

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
  gun.get(args.alias).get('contact').once(async(data,key)=>{
    //console.log(data);
    //console.log(key);
    let list = [];
    for(let i in data){
      //console.log(typeof data[i])
      //console.log(i);
      if(i == '_'){
      }else{
        //check data from key data
        let who = await gun.get(args.alias).get('contact').get(i).then();
        //check if string 'null' reason the sea give error on null
        //console.log(who);
        if(who != 'null'){
          list.push({alias:who.alias,pub:who.pub});
        }
      }
    }
    callback(list);
  })
}
exports.listPMContact=listPMContact;

async function sentPrivateMessage(args,callback){
  if(!gun){
    console.log("Database is not setup!");
    return callback("Database not init.");
  }
  //console.log(args);
  let pub = args.pub;
  let to = await gun.get(pub).then();
  if(!to){
    console.log('NULL USER');
    return callback("Null Sender");
  }
  //console.log(to)
  //callback('checking');
  let clock =timeStamp();
  gun.get(args.user.alias).get('message').get(pub).get(clock).put(args.msg,function(ack){
    //console.log(ack);
    callback(ack);
  });
}
exports.sentPrivateMessage=sentPrivateMessage;

async function getPrivateMessageList(args,callback){
  if(!gun){
    console.log("Database is not setup!");
    return callback("Database not init.");
  }
  //console.log(args);
  let pub = args.pub;
  let to = await gun.get(pub).then();
  if(!to){
    console.log('NULL USER');
    return callback("Null Sender");
  }
  console.log(to)
  //callback('checking');
  let clock =timeStamp();
  gun.get(args.user.alias).get('message').get(pub).once(function(data,key){
    console.log(data);
    let list = []
    for(let i in data){
      if(i == '_'){

      }else{
        //data[i]
        list.push({id:i,msg:data[i]})
      }
    }
    callback(list);
    //callback(data);
  });
}
exports.getPrivateMessageList=getPrivateMessageList;