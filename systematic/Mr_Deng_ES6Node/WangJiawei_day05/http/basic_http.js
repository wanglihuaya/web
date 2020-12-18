let http = require('http');
let fs = require('fs');

let server = http.createServer((request, response) => {
  fs.readFile('./index.html', (err, data) => {
    response.end(data.toString());
  })
})

//start http server
server.listen(3001, (err) => {
  console.log("http already started at port 3001.");
})

