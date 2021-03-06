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

function AuthSync(alias,passphrase) {
  return new Promise((resolve) => {
    user.authenticate(alias, passphrase, (error,data) => {
      if(error){
        console.log('error >> ');
        console.log(error);
        return resolve(null);
      }
      //CHECK DATA
      console.log(data);
      if(data){
        if(data.message=='FOUND'){
          //console.log('SET COOOKIE');
          //res.setCookie('token', data.token );
          //ctx.cookies.set('token',data.token,{
            //signed:true
            //,maxAge:Date.now()
          //});
          //return ctx.body=`<html><body>POST LOGIN [${data.message}] <a href='/'>Home</a></body></html>`;
          return resolve(data);
        }else{
          //return ctx.body=`<html><body>POST LOGIN [ FAIL ] <a href='/'>Home</a></body></html>`;
          return resolve(data);
        }
      }else{
        //return ctx.body=`<html><body>POST LOGIN [ FAIL ] <a href='/'>Home</a></body></html>`;
        return resolve(data);
      }
    });
  });
}

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

      let data = await AuthSync(alias,passphrase);
      let message='FAIL';
      if(data){
        console.log(data);
        console.log('data.token');
        console.log(data.token);
        if(data.token){
          //ctx.cookies.set('token',data.token,{
            //signed:true
            //,maxAge:Date.now()
          //});
          h.state('token', data.token);
          message=data.message;
        }
      }
      

      //return 'POST LOGIN !';
      return `<html><body>POST LOGIN [${message}] <a href='/'>Home</a></body></html>`;
    }
  }
];