// https://stackoverflow.com/questions/5869216/how-to-store-node-js-deployment-settings-configuration-files
var config={
  host:"localhost"
  ,port:3000
  ,salt:'0123456789'
  ,secretkey:'a secret with minimum length of 32 characters'
  ,tokenkey:'token'
  ,session_TTL:1800000
  ,sessionId:'sessionId'
  ,cookieId:'sessionid'
};
//exports=config;
module.exports = config;