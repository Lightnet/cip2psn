//https://nodejs.org/en/knowledge/advanced/streams/how-to-use-fs-create-read-stream/
// http nodejs upload file convert base64
// https://www.geeksforgeeks.org/node-js-fs-createreadstream-method/
// https://dustinpfister.github.io/2018/08/18/nodejs-filesystem-create-read-stream/
// https://stackoverflow.com/questions/14551608/list-of-encodings-that-node-js-supports
// https://medium.com/@wahidsaeed1/encoded-decoding-data-url-with-buffer-api-nodejs-41a28f435a1e
// 

var fs = require('fs');

//let filename='/test.txt';
const http = require('http');
const path = require('path')


http.createServer(function(req, res) {
  //console.log(req.url);
  //console.log(path.join(__dirname,"../"+req.url))
  try{
    //var filename = __dirname+"../"+req.url;
    var filename = path.join(__dirname,"../"+req.url);
    console.log("FILE: ",filename);

    var readStream = fs.createReadStream(filename);
    // This will wait until we know the readable stream is actually valid before piping
    readStream.on('open', function () {
      // This just pipes the read stream to the response object (which goes to the client)
      readStream.pipe(res);
    });

    // Read and disply the file data on console
    readStream.on('data', function (chunk) {
      console.log(chunk.toString('base64'));
    });

    // This catches any errors that happen while creating the readable stream (usually invalid names)
    readStream.on('error', function(err) {
      res.end(err);
    });
  }catch(error){
    res.end(error);
  }
}).listen(3000);