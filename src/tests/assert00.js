/**
  Project Name: cip2psn

  LICENSE: MIT

  Created By: Lightnet

 */

// https://www.npmjs.com/package/assert
// https://www.javatpoint.com/nodejs-assertion-testing
"use strict";

//Run the code and change the values of x and y (to equal 42) to test the assert module.
//const x = 18;
const x = 22;
const y = 20;

const assert = require('assert').strict;

//assert(5 > 7);
//Calculates the anser to life (42)
var life = function(a,b){
  return a + b;
};

//Overwrite the variable of result to equal the return.
//var result = life(x,y);
var result = life(x,y);

//Change the comments below to see the difference between the two values
assert.deepEqual(result, 42, "My message goes here");
//assert.fail(result, 42, "", '<');