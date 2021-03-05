/**
  Project Name: cip2psn

  LICENSE: MIT

  Created By: Lightnet

 */
// https://developer.okta.com/blog/2018/11/13/create-and-verify-jwts-with-node
// https://www.sohamkamani.com/blog/javascript/2019-03-29-node-jwt-authentication/
// https://www.npmjs.com/package/jsonwebtoken
// https://github.com/sohamkamani/jwt-nodejs-example
const jwt = require("jsonwebtoken");
const jwtKey = "my_secret_key";
//const jwtExpirySeconds = 300;
const bcrypt=require('bcrypt');
var db=require('../db/hcv1/index');
console.log('user init db?');
var config=require('../../../config');

//console.log(db.getuser);
//console.log(db.getuser());


function create(alias,passphrase1,passphrase2,callback){

  if(!alias || !passphrase1 || !passphrase2 || passphrase1!=passphrase2){
    return callback({error:'Not the Alias || passphrase'},null);
  }

  db.checkcreateuser(alias,passphrase1,(error,data)=>{
    if(error){
      console.log("ERROR CHECK CREATE USER!!!");
      return callback({error:'DB Check Create User ERROR!'},{message:'FAILCREATE'});
    }
    //console.log('user data');
    //console.log(data);
    if(data.message=='CREATED'){
      return callback(null,data);
    }else{
      return callback(null,data);
    }

    //return callback({error:'Not the Alias || passphrase'},null);
  });
  // Create a new token with the username in the payload
	// and which expires 300 seconds after issue
	//const token = jwt.sign({ alias:alias }, jwtKey, {
		//algorithm: "HS256"//,
		//expiresIn: jwtExpirySeconds,
	//})
	//console.log("token:", token);
  //return callback(null, token);
}
exports.create = create;

// LOGIN
async function authenticate(alias,passphrase,callback){
  if(!passphrase || !alias){
    console.log("USER ERROR! ")
    return callback({error:'empty'},null);
  }
  db.checkaliaspassphrase(alias,(error,data)=>{
    if(error){
      console.log("ERROR USER CHECK ALAIS || PASSPRHASE");
    }
    if(data.message=='NOTFOUND'){
      return callback(null,{message:'NOTFOUND'});
    }

    if(data.message=='FOUND'){
      console.log('USER FOUND AUTH LOGIN...');
      console.log(data);
      //data.passphrase
      //let pass = jwt.sign({ passphrase: passphrase }, 'shhhhh');
      //let decoded = jwt.verify(data.passphrase, 'shhhhh');
      let decoded = bcrypt.compareSync(passphrase, data.passphrase);
      console.log('decoded:',decoded);

      if(decoded){
        //console.log('PASS???????',decoded);
        //console.log('PASS PASSPHRASE!');
          // SECRET KEY NEEED CONFIG
        let token = jwt.sign({ alias: alias }, config.tokenKey);
        return callback(null,{message:'FOUND',token:token});
        /*
        if(decoded.passphrase == passphrase){
          console.log('PASS PASSPHRASE!');
          // SECRET KEY NEEED CONFIG
          let token = jwt.sign({ alias: alias }, 'shhhhh');
          return callback(null,{message:'FOUND',token:token});
        }else{
          return callback(null,{message:'FAIL'});
        }
        */
      }else{
        //return callback(null,{message:'NOTFOUND'});  
        return callback(null,{message:'FAIL'});  
      }
      //return callback(null,{message:'FOUND',token:''});
    }

  });

  //try{
    //let user =db.user();
    //let node = await user.get('test');
    //await user.put('key',{hello:'world'});
    //console.log('node');
    //console.log(node);
  //}catch(e){
    //console.log('DATABASE ERROR GET');
  //}

  //if(alias == 'testalias' && passphrase == 'testpass'){
    //const token = jwt.sign({ alias:alias }, jwtKey, {
      //algorithm: "HS256"//,
      //expiresIn: jwtExpirySeconds,
    //});
    //console.log("token:", token);
    //return callback(null,token);
  //}

  // Create a new token with the username in the payload
	// and which expires 300 seconds after issue
	//const token = jwt.sign({ alias }, jwtKey, {
		//algorithm: "HS256"//,
		//expiresIn: jwtExpirySeconds,
	//});
	//console.log("token:", token);
  //return callback(token);
}
exports.authenticate = authenticate;

async function test(){
  console.log('test...');
  try{
    db.test1();
    //let user = db.get().sub('user');
    //let db = await db.get();
    //console.log(db);
    //let user = await db.sub('user');
    //console.log(user)
    //let node = await user.get('test');
    //console.log('node');
    //console.log(node);
  }catch(e){
    console.log('DATABASE ERROR GET');
  }
  
};
exports.test=test;

async function test2(){
  console.log('test2...');
  try{
    db.test2();
  }catch(e){
    console.log('DATABASE ERROR GET');
  }
};
exports.test2=test2;

async function test3(){
  console.log('test3...');
  try{
    db.test3();
  }catch(e){
    console.log('DATABASE ERROR GET');
  }
};
exports.test3=test3;

// NEEDED? DB clear token, cookie, session?
function logout(alias,token,callback){

}
exports.logout = logout;