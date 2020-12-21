let http = require('http');
let fs = require('fs');

//Create a http server
let server = http.createServer((request, response) => {
  //set MIME
  console.log(request.url);
  if (request.url == "/1.css") {

    response.setHeader('Set-Cookie', ['type=ninja', 'language=javascript']);
    fs.readFile('./url_path_querystring.js', (err, data) => {
      response.end(data);
    })
  } else if (request.url == "/home") {

    response.end("this is home");
  } else if (request.url == "/game") {

    response.setHeader('Content-Type', 'png;charset=utf8');
    fs.readFile('./1.png', (err, data) => {
      response.end(data);
    })
  } else if (/\/student\/(\d){5}/.test(request.url)) {

    response.end("this is student information!");
  } else {
    
    response.end("sorry can't find");
  }
})

//start the server
server.listen(3000, () => {
  //  console.log("address: http://localhost:3000");
})