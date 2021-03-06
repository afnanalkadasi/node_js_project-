const http = require('http');
const fs = require('fs');
const express = require('express');
const app = express();
var path = require('path');

const hostname = '127.0.0.1';
const port = 4000;


const server = http.createServer((req, res) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/html');

	const routeMap = {
		'': 'index.html',
		'menu': 'menu.html',
        'blog': 'blog.html',
        'contact': 'contact.html',
		'admin': 'login.html',
		'admin/?role=admin': 'hi.html'
	}

    render(res, routeMap[req.url.slice(1)]);
    // style();
});
//  function style(){
//     app.use(express.static(__dirname, '/public'));
//     app.get('/',function(req,res){
//     res.sendFile(path.join(__dirname,'/index.html'));
//     });
//  }
function render(res, htmlFile) {
  	fs.stat(`./${htmlFile}`,  (err, stats) => {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'text/html');

  		if(stats) {
		  	fs.createReadStream(htmlFile).pipe(res);
  		} else {
  			res.statusCode = 404;
  			res.end(' Sorry, page not found');
  		}
  	});
}

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
