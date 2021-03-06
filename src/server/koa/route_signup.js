/**
  Project Name: cip2psn

  LICENSE: MIT

  Created By: Lightnet

 */
const router = require('@koa/router')();
const user=require('../model/user');

function isEmpty(str) {
  return (typeof str === 'string' && 0 === str.length);
}

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

async function get_signup(ctx) {
  //ctx.body = 'GET Login';
  ctx.body = html_signup();
}

function signUpSync(alias, passphrase1, passphrase2) {
  return new Promise((resolve) => {
    user.create(alias, passphrase1, passphrase2, (error, data) => {
      //res.send(data);
      //console.log(error);
      //console.log(data);
      if(error){
        //res.send('signup error!');
        console.log('ERROR SIGN UP');
        return resolve(error);
        //return next(false);
      }
      console.log(data);
      return resolve(data);
      //console.log(data);
      //let payload;
      //payload = jwt.verify(data, jwtKey);
      //console.log(payload);
      //res.send('POST SIGNUP! [' + data.message + ']');
      //res.end(`<html><body>POST SIGNUP [${data.message}] <a href='/'>Home</a></body></html>`);
      //return next(false);
    })

  });
}

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
  if(!alias || !passphrase1 || !passphrase2 || passphrase1!=passphrase2){
    //res.send({error:'Not the Alias || passphrase'});
    ctx.body='Not the Alias || passphrase';
    return;
  }

  let data = await signUpSync(alias, passphrase1, passphrase2);
  if(data){ 
    console.log(data);
  }
  //res.end(`<html><body>POST SIGNUP [${data.message}] <a href='/'>Home</a></body></html>`);
  ctx.body=`<html><body>POST SIGNUP [${data.message}] <a href='/'>Home</a></body></html>`;

}

// route definitions
router.get('/signup',get_signup);
router.post('/signup',post_signup);

module.exports = router;