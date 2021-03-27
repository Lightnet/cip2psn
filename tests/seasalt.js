console.log('gun test');

const Gun = require('gun');
const SEA = require('gun/sea');
//const SEA = require('gun/sea');
var gunoptions={
  file: 'radatatest',// folder default > radata
}
var gun = Gun(gunoptions);

let user = gun.user();

user.create('alias', 'pass', (ack)=>{
  //console.log(ack);
  
  user.auth('alias', 'pass', (ack)=>{
    //console.log(ack);
    devUser();
  },{})
},{})

async function devUser(){
  //console.log('test');
  let user = gun.user();
  let own = await user.then();
  //console.log(own);
  console.log(user._.sea); //pair
  
  let data = await gun.get('~'+own.pub).then(); // ok
  //console.log(data);
  console.log(data.auth);
  console.log(typeof data.auth);
  let aut = JSON.parse(data.auth);
  console.log(aut);

  
  //data = await gun.get('~'+'alias').then();
  //console.log(data);
  
  //data = await gun.get('~@'+'alias').then();
  //console.log(data);

  //let salt = Gun.text.random(64);
  //console.log(salt);
  //let p1 = await SEA.work('pass', salt);

  var act = {}, u;
`alias: 'alias',
auth: '{"ek":{"ct":"Zf6CCjLBPnF1O89j+Ix/DY+FOgtqLH3CDvkO4ByfBE0N8H15SBQYDWG/h0LPHhMD3pr5rUD1DUxo0yig0VPba5sUiKN+e9M6LXFbwlUlndzFu24Od3HHyCCddQ+spwUcFazWXM5dQwR2vWPGnwoUGQG602Amu5lEyDkQmA==","iv":"PgEZY8iP7FQGH5z+unKc","s":"JCv6wobrs6tm"},"s":"U649UfRmcL1iSPoQQtyUVjTa9bFAVOqREVjsxoJcmJzfb5sAdRsFS3VE9VRH5BEn"}',
epub: 'M_49IwsjU8-zuit6SsZ2Tn1XRsrTWgLn7D8SBNYxj-Y.LxwjWuaHLErYdMaWLCyanz8lgQCIOEKprv--ZGl2gMA',
pub: 'XbH-D5W_6xm9uNN4YMfVYZ9D_QQbB3bJNlUi1NrHRCM.rxRYlYBcduYyTqRwCDwuwOx6zLeargLxICDvUAdc-2k'`;

  //let auth = {"ek":{"ct":"Zf6CCjLBPnF1O89j+Ix/DY+FOgtqLH3CDvkO4ByfBE0N8H15SBQYDWG/h0LPHhMD3pr5rUD1DUxo0yig0VPba5sUiKN+e9M6LXFbwlUlndzFu24Od3HHyCCddQ+spwUcFazWXM5dQwR2vWPGnwoUGQG602Amu5lEyDkQmA==","iv":"PgEZY8iP7FQGH5z+unKc","s":"JCv6wobrs6tm"},"s":"U649UfRmcL1iSPoQQtyUVjTa9bFAVOqREVjsxoJcmJzfb5sAdRsFS3VE9VRH5BEn"};
  //let auth = data.auth;
  //let auth = JSON.stringify(data.auth);
  let auth = JSON.parse(data.auth);
  //SEA.work('pass', 'test', act.d, act.enc);
  //var proof = await SEA.work('pass','test', act.d, act.enc);
  //var proof = await SEA.work('pass',(act.auth = auth).s, act.d, act.enc);
  
  //console.log(proof);

  act.d = function(proof){
    console.log('test proff?');
    SEA.decrypt(act.auth.ek, proof, act.e, act.enc);
  }
  act.e = function(half){
    console.log('/////////////')
    console.log(half)
    if(u === half){
      if(!act.enc){ // try old format
        act.enc = {encode: 'utf8'};
        return act.c(act.auth);
      } act.enc = null; // end backwards
      return act.b();
    }
    act.half = half;
    //act.f(act.data);
  }

  act.f = function(data){
    if(!data || !data.pub){ return act.b() }
    var tmp = act.half || {};
    act.g({pub: data.pub, epub: data.epub, priv: tmp.priv, epriv: tmp.epriv});
  }

  console.log('SALT');
  console.log((act.auth = auth).s);
  SEA.work('pass',(act.auth = auth).s, act.d, act.enc);

}