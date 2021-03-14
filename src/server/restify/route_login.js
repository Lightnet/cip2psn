/**
  Project Name: cip2psn

  LICENSE: MIT

  Created By: Lightnet

*/

const user = require('../model/user');
const {isEmpty}=require('../model/utilities');

//===============================================
// HTML LOGIN PAGE
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

//export default(server) => {
module.exports = (server)=>{
  //===============================================
  // LOGIN GET
  server.get('/login', function(req, res, next) {
    //res.send('hello world!');
    var body = loginPage();
    res.writeHead(200, {
      'Content-Length': Buffer.byteLength(body),
      'Content-Type': 'text/html'
    });
    res.write(body);
    res.end();
    return next();
  });
  //===============================================
  // LOGIN POST
  server.post('/login',async function(req, res, next) {
    //console.log("req login:");
    //console.log(req.body);
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
      res.setCookie('token', data );
      //request.session.token=data;
      //reply.redirect('/');
      res.end(`<html><body>POST LOGIN [ PASS ] <a href='/'>Home</a></body></html>`);
    }else{
      res.end(`<html><body> LOGIN [ FAIL ] <a href='/'>Home</a></body></html>`);
      return next(false);
    }
    
    //res.send('POST LOGIN!');
    //return next();
  });
};