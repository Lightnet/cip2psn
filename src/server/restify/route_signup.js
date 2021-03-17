/**
  Project Name: cip2psn

  LICENSE: MIT

  Created By: Lightnet

*/

const user = require('../model/user');
const {isEmpty}=require('../model/utilities');

//===============================================
// HTML SIGNUP PAGE
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
module.exports = (server)=>{
  //===============================================
  // SIGNUP GET
  server.get('/signup', function(req, res, next) {
    //res.send('hello world!');
    var body = signUpPage();
    res.writeHead(200, {
      'Content-Length': Buffer.byteLength(body),
      'Content-Type': 'text/html'
    });
    res.write(body);
    res.end('test');
    return next();
  });
  //===============================================
  // SIGNUP POST
  server.post('/signup',async function(req, res, next) {
    //console.log("req login:");
    //console.log(req.body);
    let {alias, passphrase1, passphrase2 } = req.body;

    if(isEmpty(alias)==true || isEmpty(passphrase1)==true || isEmpty(passphrase2)==true || passphrase1!=passphrase2){
      res.send({error:'Either Empty Field Alias || passphrase'});
      return next(false);
    }
    let isExist = await user.checkAliasExistSync(alias);
    if(isExist){
      //res.writeHead(200, {
        //'Content-Length': Buffer.byteLength(body),
        //'Content-Type': 'text/html'
      //});

      res.end(`<html><body>POST SIGNUP [ Alias Exist! ] <a href='/'>Home</a></body></html>`);
      return next(false);
    }
    let isDone = await user.createAliasSync({alias:alias,passphrase:passphrase1 });
    if(isDone){
      res.end(`<html><body>SIGNUP [${isDone}] <a href='/'>Home</a></body></html>`);
    }else{
      res.end('Alias Error!');
    }
    return next(false);
    
    //res.send('POST LOGIN!');
    //return next();
  });
}