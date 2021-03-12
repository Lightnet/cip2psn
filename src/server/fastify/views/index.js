
//var { isEmpty }=require('../model/utilities');
//const jsdom = require("jsdom");
//const { JSDOM } = jsdom;
//const { window } = new JSDOM(`...`);
//const { document } = (new JSDOM(`...`)).window;
///console.log(document);
//console.log(document.createElement("script"));

//var dom = new JSDOM("<!DOCTYPE html>hello");
//var window = dom.window;
//const document = window.document;
//const {el,mount}=require('redom');

//var script = document.createElement("script");
//script.src="test.js"
//document.head.appendChild(script);

//const hello = el("h1", "Hello world!");
//mount(document.body, hello);
//console.log(dom);

//console.log(dom.serialize());

// INDEX PAGE
function html_index(){
  return `
<!DOCTYPE html>
<html>
  <head>
    <title>Fastify</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body>
    <a href="/login">Login</a>
    <a href="/signup">Sign Up</a>
    <a href="/forgot">Forgot</a>
    <br> <label> Weclome Guest! [Fastify]</label>
  </body>
</html>
`;
};
exports.html_index=html_index;
// ACCESS PAGE when user login
function html_main(){
  return `
<!DOCTYPE html>
<html>
  <head>
    <title>Home</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body>
    <a href="/account">Account</a>
    <a href="/logout">Logout</a>
    <br> <label> Weclome Guest! </label>
  </body>
</html>
`;
};
exports.html_main=html_main;

//export {
  //html_index,
  //html_main
//};