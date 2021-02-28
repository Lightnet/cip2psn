const router = require('@koa/router')();
function text_html(data){
  var html_user=`
  <!doctype html>
  <html lang="en">
    <head>
    </head>
    <body>
      ${data.alias}
    </body>
  </html>
  `;
  return html_user;
}

async function get_user(ctx) {
  //ctx.body = 'GET Login';
  //ctx.params // URL params, like :id
  console.log(ctx.params);
  console.log("USER:",ctx.params.user);
  ctx.body = text_html({alias:"test"});
}

// https://github.com/koajs/koa/issues/719
// https://www.npmjs.com/package/koa-body
/*
async function post_user(ctx) {
  console.log("POST!");
  //ctx.request.body // your POST params
  console.log(ctx.request.body );
  //ctx.params // URL params, like :id
  ctx.body = 'POST Login';
}
*/

// route definitions
//router.get('/', index)
router.get('/:user',get_user);
//router.post('/user',post_login);

module.exports = router;