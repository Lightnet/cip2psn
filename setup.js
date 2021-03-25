/**
  Project Name: cip2psn

  LICENSE: MIT

  Created By: Lightnet

  Information: This is just the test for access for database set up.
  Not yet build.

*/

// https://www.educative.io/edpresso/how-to-use-the-inquirer-node-package

// Set options as a parameter, environment variable, or rc file.
require = require("esm")(module/*, options*/);

//var args = process.argv.slice(2);
var args = process.argv;
//console.log(args);
//module.exports = require("./src/cli");
const { cli } = require("./src/cli");
//console.log(cli);
cli(args);