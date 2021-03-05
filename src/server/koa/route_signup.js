/**
  Project Name: cip2psn

  LICENSE: MIT

  Created By: Lightnet

 */
const router = require('@koa/router')();

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
      <form action="/signup" method="post">
        <label>[Sign Up Access] </label>
        <br><label>Alias: </label>
        <br><input id="alias" name="alias" value="tester">
        <br><label>Passphrase: </label>
        <br><input id="passphrase" name="passphrase" value="tester">
        <br><input type="submit" value="Submit">
        <a href="/signup">Sign Up</a>
        <a href="/forgot">Forgot</a>
        <a href="/">Home</a>
      </form>
    </body>
</html>
`;

async function get_signup(ctx) {
  //ctx.body = 'GET Login';
  ctx.body = html_login;
}

// https://github.com/koajs/koa/issues/719
// https://www.npmjs.com/package/koa-body
async function post_signup(ctx) {
  console.log("POST!");

  //ctx.request.body // your POST params
  console.log(ctx.request.body );
  //ctx.params // URL params, like :id
  //console.log(ctx.params);
  ctx.body = 'POST Signup';
}

// route definitions
router.get('/signup',get_signup);
router.post('/signup',post_signup);

module.exports = router;