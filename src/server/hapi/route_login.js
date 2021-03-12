/**
  Project Name: cip2psn

  LICENSE: MIT

  Created By: Lightnet

 */

// https://hapi.dev/tutorials/auth/?lang=en_US

const user=require('../model/user');

function isEmpty(str) {
  return (typeof str === 'string' && 0 === str.length);
}

function loginPage() {
  return '<html>' +
    '<head><title>Login</title></head>' +
    '<body>' +
    '<label>Login</label>' +
    '<form action="/login" method="post">' +
    '<table>'+
    '<tr><td>'+
    '<label>Alias:</label>' +
    '</td><td>'+
    '<input type="text" name="alias" value="testalias">' +
    '<td></tr>'+
    '<tr><td>'+
    '<label>Passphrase:</label>' +
    '</td><td>'+
    '<input type="passphrase" name="passphrase" value="testpass">' +
    '<td></tr>'+
    '<tr><td colspan="2">'+
    '<a href="/">Home</a>'+
    '<button style="float:right;" type="submit">Login</button>' +
    '</td></tr>'+
    '</table>'+
    '</form>' +
    '</body>' +
    '</html>'
}
// 
module.exports = [
  {
    method: 'GET',
    path: '/login',
    handler: (request, h) => {
      //return 'GET LOGIN !';
      return loginPage();
    }
  }
  ,
  {
    method: 'POST',
    path: '/login',
    handler:async (request, h) => {
      const post = request.payload;
      console.log("post: ",post);
      //console.log(post.alias);
      //console.log(request.body);
      let {alias, passphrase} =post;
      //console.log(alias);

      if(isEmpty(alias)==true || isEmpty(passphrase)==true){
        return 'Not the Alias || passphrase';
      }
      let message='FAIL';
      let data = await user.loginAliasSync({
        alias:alias
        ,passphrase:passphrase
      });
      if(data){
        h.state('token', data);
        message='PASS';
      }else{
        message='FAIL';
      }
      return `<html><body>POST LOGIN [${message}] <a href='/'>Home</a></body></html>`;
    }
  }
];