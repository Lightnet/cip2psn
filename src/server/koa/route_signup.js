/**
  Project Name: cip2psn

  LICENSE: MIT

  Created By: Lightnet

 */
const router = require('@koa/router')();
const user=require('../model/user');
//
function isEmpty(str) {
  return (typeof str === 'string' && 0 === str.length);
}
//
function html_signup(){
  return '<!doctype html><html lang="en">' +
    '<head><title>Sign Up</title></head>' +
    '<body>' +
    '<label>Sign Up</label>' +
    '<form action="/signup" method="post">' +
    '<table>'+
    '<tr><td>'+
    '<label>Alias:</label>' +
    '</td><td>'+
    '<input type="text" name="alias" value="testalias" placeholder="alias">' +
    '<td></tr>'+
    '<tr><td>'+
    '<label>Passphrase 1:</label>' +
    '</td><td>'+
    '<input type="text" name="passphrase1" value="testpass"  placeholder="passphrase">' +
    '<td></tr>'+
    '<tr><td>'+
    '<label>Passphrase 2:</label>' +
    '</td><td>'+
    '<input type="text" name="passphrase2" value="testpass"  placeholder="passphrase">' +
    '<td></tr>'+
    '<tr><td colspan="2">'+
    '<a href="/">Home</a>'+
    '<button style="float:right;" type="submit">Login</button>' +
    '</td></tr>'+
    '</table>'+
    '</form>' +
    '</body>' +
    '</html>';
}
//
async function get_signup(ctx) {
  //ctx.body = 'GET Login';
  ctx.body = html_signup();
}
//
// https://github.com/koajs/koa/issues/719
// https://www.npmjs.com/package/koa-body
async function post_signup(ctx) {
  console.log("POST!");
  //ctx.request.body // your POST params
  console.log(ctx.request.body );
  //ctx.params // URL params, like :id
  //console.log(ctx.params);
  //ctx.body = 'POST Signup';

  let {alias, passphrase1, passphrase2 } = ctx.request.body;
  if(isEmpty(alias)==true || isEmpty(passphrase1)==true || isEmpty(passphrase2)==true || passphrase1!=passphrase2){
    //res.send({error:'Not the Alias || passphrase'});
    ctx.body='Not the Alias || passphrase';
    return;
  }
  let message='FAIL';
  let isExist = await user.checkAliasExistSync(alias);
  if(isExist){
    //reply.send('Alias Exist!');
    ctx.body=`<html><body> SIGNUP [ Alias Exist! ] <a href='/'>Home</a></body></html>`;
    return;
  }

  let isDone = await user.createAliasSync({alias:alias,passphrase:passphrase1 });
  if(isDone){
    ctx.body=`<html><body>POST SIGNUP [${isDone}] <a href='/'>Home</a></body></html>`;
  }else{
    ctx.body='Alias Error!';
  }
}

// route definitions
router.get('/signup',get_signup);
router.post('/signup',post_signup);

module.exports = router;