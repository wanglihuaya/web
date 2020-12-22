let http = require("http");
let fs = require("fs");
let path = require("path");
let url = require("url");


let MIME = {
  ".html": "text/html;charset = utf-8",
  ".htm": "text/html;charset = utf-8",
  ".jpg": "image/jpg;base64",
  ".png": "image/png;base64",
  ".gif": "image/gif;base64",
  ".css": "text/css",
  ".js": "text/javascript",
  ".ico": "image/x-icon;base64",
  ".mp3": "audio/mpeg",
};

let server = http.createServer((request, response) => {
  console.log(request.url);
  console.log(request.method);

  // get extname in request.url
  let urlObj = url.parse(request.url);
  let { pathname } = urlObj;
  let extName = path.extname(pathname);
  console.log(extName);
  //judge extname does it exist
  if (MIME.hasOwnProperty(extName)) {
    response.setHeader("Content-Type", MIME[extName]);
  }

  if (request.url === "/") {
    // response.setHeader("Content-Type", "text/html;charset= utf-8");
    fs.readFile("./index.html", (err, data) => {
      response.end(data.toString());
    });
  } else if (extName === ".css") {
    // response.setHeader("Content-Type", "text/css");
    fs.readFile(path.join("public", request.url), (err, data) => {
      response.end(data.toString());
    });
  } else if (extName === ".jpg" || extName === ".gif" || extName === ".png") {
    // response.setHeader("Content-Type", "image/png");
    fs.readFile(path.join("public", request.url), (err, data) => {
      response.end(data);
    });
  } else if (extName === ".js") {
    // response.setHeader("Content-Type", "application/javascript");
    fs.readFile(path.join("public", request.url), (err, data) => {
      response.end(data.toString());
    });
  } else if (extName === ".mp3") {
    fs.readFile(path.join("public", request.url), (err, data) => {
      response.end(data);
    });
  } else if (extName === ".html") {
    fs.readFile(path.join("public", request.url), (err, data) => {
      response.end(data);
    });
  } else {
    response.end("Sorry,can't connect to server");
  }
});

server.listen(3000, () => {
  console.log('Server listening on port :"3000"');
});
