/**
  Project Name: cip2psn

  LICENSE: MIT

  Created By: Lightnet

 */

// https://openclassrooms.com/en/courses/5614116-go-full-stack-with-node-js-express-and-mongodb/5656301-set-up-authentication-middleware
//const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
  //console.log(req.headers);
  //console.log(req.session);
  next();
  //try {
    //const token = req.headers.authorization.split(' ')[1];
    //const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    //const userId = decodedToken.userId;
    //if (req.body.userId && req.body.userId !== userId) {
      //throw 'Invalid user ID';
    //} else {
      //next();
    //}
  //} catch {
    //res.status(401).json({
      //error: new Error('Invalid request!')
    //});
  //}
};