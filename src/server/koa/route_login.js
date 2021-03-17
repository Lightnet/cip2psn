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

  let data = await user.loginAliasSync({
    alias:alias
    ,passphrase:passphrase
  });

  if(data){
    //request.session.token=data;
    ctx.cookies.set('token',data,{
      signed:true
      //,maxAge:Date.now()
    });
    //reply.redirect('/');
    ctx.body=`<html><body> LOGIN [ Pass ] <a href='/'>Home</a></body></html>`;
  }else{
    ctx.body=`<html><body> LOGIN [ Fail ] <a href='/'>Home</a></body></html>`;
  }
}
// route definitions
//router.get('/', index)
router.get('/login',get_login);
router.post('/login',post_login);

module.exports = router;