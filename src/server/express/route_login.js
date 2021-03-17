/**
  Project Name: cip2psn

  LICENSE: MIT

  Created By: Lightnet

*/

var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const user=require('../model/user');

function isEmpty(str) {
  return (typeof str === 'string' && 0 === str.length);
}

//HTML LOGIN PAGE
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
//LOGIN GET PAGE
router.get('/', function (req, res) {
  res.send(loginPage());
});
// create application/x-www-form-urlencoded parser

// POST /login gets urlencoded bodies
//LOGIN POST PAGE
router.post('/', urlencodedParser,async function (req, res) {
  //res.send('welcome, ' + req.body.alias);

  let {alias, passphrase} = req.body;

  if(isEmpty(alias)==true || isEmpty(passphrase)==true){
    res.end('Not the Alias || passphrase');
    return;
  }

  let data = await user.loginAliasSync({
    alias:alias
    ,passphrase:passphrase
  });

  if(data){
    req.session.token=data;
    res.end(`<html><body>POST LOGIN [ PASS ] <a href='/'>Home</a></body></html>`);
  }else{
    res.end(`<html><body>POST LOGIN [ FAIL ] <a href='/'>Home</a></body></html>`);
  }
});
//EXPORT
module.exports = router
