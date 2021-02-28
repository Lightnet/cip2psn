/**
https://www.youtube.com/watch?v=RymFCytTWz8

51:00 finish

Note: not to used it
*/

const http = require('http');

const { Client: HyperspaceClient } = require('hyperspace');
const huperdrive = require('hyperdrive');

//36.16

async function main(keyStr){
  const key = Buffer.from(keyStr,'hex');

  const client = new HyperspaceClient();
  
  const drive= huperdrive(client.corestore(), key);
   
  //await drive.promises.ready();
  //console.log(await drive.promises.readdir('/'));
  //console.log(drive.key);

  http.createServer(async (req,res)=>{
    // control for favicon
    if (req.url === '/favicon.ico') {
      res.writeHead(200, {'Content-Type': 'image/x-icon'} );
      res.end();
      console.log('favicon requested');
      return;
    }

    //res.writeHead(200).end('hello world!');
    const path = req.url;

    const st = await drive.promises.stat(path);
    console.log('file?',st.isFile());
    console.log('directory?',st.isDirectory());
    if(st.isDirectory()){
      // directory response
      if(!path.endsWith('/')){
        return res.writeHead(303,{Location:path+'/'}).end();
      }

      const files = await drive.promises.readdir(path);
      const html =`
      <html>
        <body>
          ${path!=='/' ? `
            <div><a href="..">..</a></div>
          `:''}
          ${files.map(file=>{
            return `<div> <a href="${file}">${file}</a></div>`
          }).join('')}
        </body>
      </html>
      `;
      res.writeHead(200,{'Content-Type':'text/html'}).end(html);
    }else{
      //file response
      //res.writeHead(200).end('todo');
      res.writeHead(200);
      drive.createReadStream(path).pipe(res);
      //const content = await drive.promises.readFile(path);
      //res.end(content);
    }
    
    //const files = await drive.promises.readdir('/');
    //res.writeHead(200).end(files.join('\n'));
  }).listen(8080);


  //await new Promise(r=>r());
}

main('770b9f85046ed6b65edd02939b56f6827caa48f56ba581a381f06dcd4194e573');