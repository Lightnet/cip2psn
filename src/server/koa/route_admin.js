/**
  Project Name: cip2psn

  LICENSE: MIT

  Created By: Lightnet

 */
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

async function get_admin(ctx) {
  //ctx.body = 'GET Login';
  //ctx.params // URL params, like :id
  console.log(ctx.params);
  console.log("USER:",ctx.params.user);
  ctx.body = text_html({alias:"admin"});
}

// https://github.com/koajs/koa/issues/719
// https://www.npmjs.com/package/koa-body

async function post_admin(ctx) {
  console.log("POST!");
  //ctx.request.body // your POST params
  console.log(ctx.request.body );
  //ctx.params // URL params, like :id
  ctx.body = 'POST Login';
}

// route definitions
router.get('/admin',get_admin);
router.post('/admin',post_admin);

module.exports = router;