/**
  Project Name: cip2psn

  LICENSE: MIT

  Created By: Lightnet

 */

// https://hapi.dev/tutorials/auth/?lang=en_US
const user=require('../model/user');

// 
function isEmpty(str) {
  return (typeof str === 'string' && 0 === str.length);
}
// 
function signUpPage() {
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
//
module.exports = [
  {
    method: 'GET',
    path: '/signup',
    handler: (request, h) => {
      //return 'GET LOGIN !';
      return signUpPage();
    }
  }
  ,
  {
    method: 'POST',
    path: '/signup',
    handler: async (request, h) => {
      const post = request.payload;
      //console.log(request.body);
      console.log("post: ",post);
      console.log(post.alias);
      let {alias, passphrase1, passphrase2} =post;
      console.log(alias);

      if(isEmpty(alias)==true || isEmpty(passphrase1)==true || isEmpty(passphrase2)==true || passphrase1!=passphrase2){
        return 'Not the Alias || passphrase';
      }

      let data = await signUpSync(alias, passphrase1, passphrase2);
      let message='FAIL';
      if(data){ 
        console.log(data);
        if(data.message){
          message=data.message;
        }

      }
      return `<html><body>POST SIGNUP [${message}] <a href='/'>Home</a></body></html>`;
      //ctx.body=`<html><body>POST SIGNUP [${data.message}] <a href='/'>Home</a></body></html>`;
      //return 'POST SIGN UP!';
    }
  }
];