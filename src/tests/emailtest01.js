/**
  Project Name: cip2psn

  LICENSE: MIT

  Created By: Lightnet

 */

// https://github.com/nodemailer/nodemailer/issues/504
// https://www.reddit.com/r/node/comments/cypwb0/nodemailer_isnt_sending_mail_but_saying_that_it/

// https://dev.to/alakazam03/sending-emails-in-nodejs-with-nodemailer-1jn1
// https://nodemailer.com/smtp/
// https://gist.github.com/cmawhorter/a5018950e17f4df5b2924657b0e632ef

// Use at least Nodemailer v4.1.0
"use strict";
const nodemailer = require("nodemailer");
//var email='@.';

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo " <foo@example.com>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    //from: email , // sender address
    //to: email , // list of receivers
    subject: "Hello s", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);