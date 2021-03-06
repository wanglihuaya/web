let express = require("express");
let app = express();
let port = 3000;
let routerIndex = require("./routers/index");
let cookieParser = require("cookie-parser");
let session = require("express-session");
let captcha = require("svg-captcha");
let ejs = require("ejs")

//----------------------------------------

//set cookie-parser
app.use(cookieParser("commands.top"));
//set express-session
let options = {
  secret: "commands.top",
  resave: false,
  saveUninitialized: true,
  cookie: { path: "/", httpOnly: true, secure: false, maxAge: null },
  rolling: false,
};
app.use(session(options));
//----------------------------------------

//set ejs
app.set("views engine", ejs);
// app.set("views","/templates")
//----------------------------------------

//introduce static
app.use(express.static("./public"),{index:"form.html"});

//----------------------------------------
//router
app.use("/", routerIndex);

//----------------------------------------
//404
app.use((request, response) => {
  response.status(404);
  response.send("对不起，找不到您要的资源");
});
app.listen(port, (err) => {
  if (err) throw err;
  console.log(
    "The server runs successfully on port " +
      port +
      ":" +
      "http://localhost:" +
      port
  );
  console.log("*************************************************************");
});
