let express = require("express");
let captcha = require("svg-captcha");
const router = express.Router();

router.get("/", (req, res) => {
  let uName = req.signedCookies.uName || "";
  let sex = req.cookies.sex || "";
  if (!uName) {
    res.send("please log in");
  } else {
    if (sex == "man") {
      res.send(
        "<h1>welcome</h1>" +
          "Mr" +
          "  " +
          uName +
          "  " +
          "age:" +
          req.session["age"]
      );
    } else {
      res.send(
        "<h1>welcome</h1>" +
          "Miss" +
          "  " +
          uName +
          "  " +
          "age:" +
          req.session["age"]
      );
    }
  }
});
router.get("/hello", (req, res) => {
  res.write("<h1>Hello world</h1>");
});

router.get("/log", (req, res) => {
  res.cookie("uName", "lihua", {
    maxAge: 1000 * 60 * 60 * 24 * 10,
    path: "/",
    signed: true,
  });
  res.cookie("sex", "man", { maxAge: 1000 * 60 * 60 * 24 * 10, path: "/" });
  req.session.age = 20;
  //{expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365 * 1000)}
  res.send("cookie set completed");
});

router.get("/vcode", (req, res) => {
  let option = {
    size: 4,
    width: 200,
    height: 100,
    background: "#cccccc",
    noise: 3,
    fontSize: 62,
    ignoreChars: "0o1iO", //排除字符
    color: true,
  };
  let svgCaptcha = captcha.create(option);
  console.log(svgCaptcha.text);
  console.log(svgCaptcha.data);
  res.type("svg");
  req.session.vCode = svgCaptcha.text;
  res.send(svgCaptcha.data);
});

router.get("/home", (req, res) => {
  let data = {
    title: "ejs template home",
    students: [
      {
        name: "Alex",
        sex: "male",
        age: 22,
      },
      {
        name: "Rosie",
        sex: "female",
        age: 21,
      },
      {
        name: "Jack",
        sex: "male",
        age: 23,
      },
    ],
  };
  //Render Json using EJS template
  res.render("home.ejs", data);
});

module.exports = router;
