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

function html_text(data){
  data.csrf = data.csrf || 'NONE';
var html_login=`
<!doctype html>
<html lang="en">
   <head>
    <!--
    <script src="https://redom.js.org/redom.min.js"></script>
    -->
   </head>
   <body>
      <!--
      <script src="/client_login.js"></script>
      -->
      <form action="/login" method="post">
        <input type="hidden" name="_csrf" value="${data.csrf}">
        <label>[Login Access] </label>
        <br><label>Alias: </label>
        <br><input id="alias" name="alias" value="testalias">
        <br><label>Passphrase: </label>
        <br><input id="passphrase" name="passphrase" value="testpass">
        <br><input type="submit" value="Submit">
        <a href="/signup">Sign Up</a>
        <!--<a href="/forgot">Forgot</a>-->
        <a href="/">Home</a>
      </form>
    </body>
</html>
`;
return html_login;
}
async function get_login(ctx) {
  //ctx.body = 'GET Login';
  //ctx.csrf='NONE';
  //console.log("ctx.csrf:",ctx.csrf);
  //ctx.body = html_login;
  //ctx.body = html_text({csrf:ctx.csrf});
  ctx.body = html_text({});
}
// https://github.com/koajs/koa/issues/719
// https://www.npmjs.com/package/koa-body
// https://nicedoc.io/koajs/csrf

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

async function post_login(ctx) {
  console.log("POST!");
  //console.log("ctx.csrf:",ctx.csrf);
  //ctx.request.body // your POST params
  console.log(ctx.request.body);
  //ctx.params // URL params, like :id
  //console.log(ctx.params);
  //ctx.body = 'POST Login';
  let {alias, passphrase}=ctx.request.body;
  if(isEmpty(alias)==true || isEmpty(passphrase)==true){
    //res.end('Not the Alias || passphrase');
    ctx.body='Not the Alias || passphrase';
    return;
  }
  // the used of Promise
  let data = await AuthSync(alias,passphrase);
  if(data){
    console.log(data);
    console.log('data.token');
    console.log(data.token);
    if(data.token){
      ctx.cookies.set('token',data.token,{
        signed:true
        //,maxAge:Date.now()
      });
    }
  }

  ctx.body=`<html><body>POST LOGIN [===] <a href='/'>Home</a></body></html>`;
}
// route definitions
//router.get('/', index)
router.get('/login',get_login);
router.post('/login',post_login);

module.exports = router;