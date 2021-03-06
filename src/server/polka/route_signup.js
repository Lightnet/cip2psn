/**
  Project Name: cip2psn

  LICENSE: MIT

  Created By: Lightnet

 */
const polka = require('polka');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const user=require('../model/user');

function isEmpty(str) {
  return (typeof str === 'string' && 0 === str.length);
}

function signUpPage () {
  return '<html>' +
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
    '</html>'
}
const app = polka();
app.get('/', (req, res) => {
  //res.end('Hello there !');
  res.end(signUpPage());
});

app.post('/', urlencodedParser, (req, res) => {
  //res.writeHead(200, { 'Content-Type': 'application/json' });
  res.writeHead(200, { 'Content-Type': 'text/html' });
  //console.log(req.body);
  //let json = JSON.stringify(req.body);
  //console.log(json);
  //res.end(json);
  let {alias, passphrase1, passphrase2} = req.body;

  if(isEmpty(alias)==true || isEmpty(passphrase1)==true || isEmpty(passphrase2)==true || passphrase1!=passphrase2){
    res.end('Not the Alias || passphrase');
    return;
  }

  //CHECK USER EXIST AND IF CREATE
  user.create(alias, passphrase1, passphrase2, (error, data) => {
    if(error){
      res.end('signup error!');
      return;
    }
    console.log(data);
    res.end(`<html><body>POST SIGNUP [${data.message}] <a href='/'>Home</a></body></html>`);
    return;
  });
  //res.end('POST SIGN UP');
});

module.exports=app;