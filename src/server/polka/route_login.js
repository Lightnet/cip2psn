
const polka = require('polka');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

function loginPage() {
  return '<html>' +
    '<head><title>Login</title></head>' +
    '<body>' +
    '<h1>Login</h1>' +
    '<form action="/login" method="post">' +
    '<label>Alias</label>' +
    '<input type="text" name="alias" value="testalias">' +
    '<label>Passphrase</label>' +
    '<input type="passphrase" name="passphrase" value="testpass">' +
    '<br><br><button type="submit">Login</button>' +
    '</form>' +
    '</body>' +
    '</html>'
}
const app = polka();
app.get('/', (req, res) => {
  //res.end('Hello there !');
  res.end(loginPage());
});

app.post('/', urlencodedParser, (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  let json = JSON.stringify(req.body);
  console.log(json);
  res.end(json);
});

module.exports=app;