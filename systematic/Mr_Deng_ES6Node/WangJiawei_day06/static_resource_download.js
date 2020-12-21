let http = require("http");
let fs = require("fs");
let path = require("path");

let server = http.createServer((request, response) => {
  if (request.url === "/") {

    response.setHeader("Content-Type", "text/html;charset= utf-8");
    fs.readFile("./index.html", (err, data) => {
      response.end(data.toString());
    });
  } else if (request.url === "/css/1.css") {

    response.setHeader("Content-Type", "text/css");
    fs.readFile(path.join("public", request.url), (err, data) => {
      response.end(data.toString());
    });
  } else if (request.url === "/image/1.png") {

    response.setHeader("Content-Type", "image/png");
    fs.readFile(path.join("public", request.url), (err, data) => {
      response.end(data);
    });
  } else if (request.url === "/js/script.js") {

    response.setHeader("Content-Type", "application/javascript");
    fs.readFile(path.join("public", request.url), (err, data) => {
      response.end(data.toString());
    });
  } else {

    response.end("Sorry,can't connect to server");
  }
});

server.listen(3000, () => {
  console.log('Server listening on port :"3000"');
});