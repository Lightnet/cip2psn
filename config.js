// https://stackoverflow.com/questions/5869216/how-to-store-node-js-deployment-settings-configuration-files
var config={
  host:"localhost"
  ,port:3000
  ,saltKey:'0123456789'
  ,secretKey:'a secret with minimum length of 32 characters'
  ,tokenKey:'token'
  ,session_TTL:1800000
  ,sessionId:'sessionId'
  ,cookieId:'sessionid'
  ,cookieKey:'cookieKey'
};
//exports=config;
module.exports = config;