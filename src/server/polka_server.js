





const polka = require('polka');
const { json } = require('body-parser');
const session = require('express-session');
//POST BODY PARAMS
//const bodyParser = require('body-parser');
//const urlencodedParser = bodyParser.urlencoded({ extended: false });

const app = polka();
var PORT=3000;

//const sleep = ms => new Promise(r => setTimeout(r, ms));

app.use(json());
app.use(
  session({
    secret: 'SECRET_KEY',
    resave: true,
    saveUninitialized: true,
  })
)
async function authenticate(req, res, next) {
  //let token = req.getHeader('authorization');
  //if (!token) return app.send(res, 401);
  //req.user = await Users.find(token); // <== fake
  //console.log(req.session);
  //console.log("auth...");
  next(); // done, woot!
}
app.use(authenticate);

app.get('/', (req, res) => {
  res.end('Hello there !');
});

const login = require('./polka/route_login');
app.use('/login', login);

app.listen(PORT, err =>{
  if (err) throw err;
  console.log(`> Running on localhost:${PORT}`);
});