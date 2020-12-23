const express = require("express");
const app = express();
const port = 3000;
let route = require("./routes/index");

app.use(express.static("./public/public"));
app.get("/", (req, res) => {
  //send()设置响应头的MIME，向浏览器发送响应
  //send() set Response header MIME,Send a response to the browser
  res.send("<h1>welcome</h1>");
});
// app.use("/music", route);

// app.use("/second", route);

app.get("/:name", (req, res, next) => {
  if (req.params.name == "admin") {
    next();
  } else {
    res.send(`°(°ˊДˋ°) °：${req.params.name}`);
  }
});

app.get("/admin", (req, res) => {
  res.send("this is admin");
});

app.use((req, res) => {
  res.status(404);
  res.send("sorry,I'm broken. :(");
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
//TODO index.js 引入