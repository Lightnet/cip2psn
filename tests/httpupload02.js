// https://kongruksiamza.medium.com/nodejs-upload-file-df018aa455a8
// https://iq.opengenus.org/uploading-file-in-nodejs/
// https://developpaper.com/nodejs-prompt-cross-device-link-not-allowed-rename-error-solution/
// https://medium.com/js-dojo/how-to-upload-base64-images-in-vue-nodejs-4e89635daebc
// https://www.programmersought.com/article/3066337447/
function checkFile(filename) {
  if(filename.match(/\.(jpg|jpeg|png)$/i)){
    return form.uploadDir = path.join(__dirname, '../public/uploads/img');
  }else{
    return form.uploadDir = path.join(__dirname, '../public/uploads');
  }
}

var http = require('http');
var formidable = require('formidable');
var fs = require('fs');
//var util = require('util');

http.createServer(function (req, res) {
  if (req.url == '/upload') {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      // oldpath : temporary folder to which file is saved to
      var oldpath = files.filetoupload.path;
      console.log(oldpath);
      // copy the file to a new location
      var newpath = "uploads/"+ files.filetoupload.name;
      console.log(newpath);
      var readStream=fs.createReadStream(oldpath);
      var writeStream=fs.createWriteStream(newpath);
      readStream.pipe(writeStream);
      // Read and disply the file data on console
      readStream.on('data', function (chunk) {
        console.log(chunk.toString('base64'));
      });
      readStream.on('end',function(){
        fs.unlinkSync(oldpath);

        res.write('Upload Complete!');
        res.end();
      });

      //===================================================
      //  cross-device link not permitted, rename
      //fs.renameSync(oldpath, newpath);
      //===================================================
      //  cross-device link not permitted, rename
      //fs.rename(oldpath,newpath, function (err) {
        //if (err) throw err;
        //res.write('Upload Complete!');
        //res.end();
      //});
    });
  } else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(`<form action="upload" method="post" enctype="multipart/form-data">`);
    res.write(`<input type="file" name="filetoupload">`);
    res.write(`<input type="submit">`);
    res.write(`</form>`);
    return res.end();
  }
}).listen(3000,()=>{
  console.log('SERVER STARTED!');
});