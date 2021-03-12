var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const user=require('../model/user');

function isEmpty(str) {
  return (typeof str === 'string' && 0 === str.length);
}
//HTML LOGIN PAGE
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
//LOGIN GET PAGE
router.get('/', function (req, res) {
  res.send(signUpPage());
});
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
// POST /login gets urlencoded bodies
//LOGIN POST PAGE
router.post('/', urlencodedParser,async function (req, res) {
  //res.send('welcome, ' + req.body.alias);
  let {alias, passphrase1, passphrase2} = req.body;

  if(isEmpty(alias)==true || isEmpty(passphrase1)==true || isEmpty(passphrase2)==true || passphrase1!=passphrase2){
    res.end('Not the Alias || passphrase');
    return;
  }
  let isExist = await user.checkAliasExistSync(alias);
  if(isExist){
    //reply.send('Alias Exist!');
    res.end(`<html><body>SIGNUP [ EXIST ] <a href='/'>Home</a></body></html>`);
    return;
  }

  let isDone = await user.createAliasSync({alias:alias,passphrase:passphrase1 });
  if(isDone){
    res.end(`<html><body>POST SIGNUP [ CREATE ] <a href='/'>Home</a></body></html>`);
  }else{
    res.end('Alias Error!');
  }
});
//EXPORT
module.exports = router
