let express = require("express");
let path = require("path");
let router = express.Router();
let fs = require("fs");
const formidable = require("formidable");
let captcha = require("svg-captcha");

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
//captcha
router.get("/vcode", (req, res) => {
  let option = {
    size: 4,
    width: 200,
    height: 60,
    background: "#999999",
    noise: 0,
    fontSize: 72,
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
    title: "EJS template home",
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
    result: ["spring", "summer", "autumn", "winter"],
  };
  //Render Json using EJS template
  res.render("home.ejs", data);
});

//add data and upload
router.post("/signUp", (req, res) => {
  const form = formidable({ multiples: true });
  form.uploadDir = "./upload"; //相对路径
  // console.log(typeof dressDir);

  form.parse(req, (err, fields, files) => {
    if (err) throw err;
    res.set("Content-Type", "application/json;charset=utf8");
    // res.send(JSON.stringify({ fields, files }));
    let { uName, sex } = fields;
    let oldFile = files.hPhoto.path;
    let newFile = "upload/" + files.hPhoto.name;
    fs.rename(oldFile, newFile, (err) => {
      if (err) throw err;
      console.log("rename success!");
      let words = { uName, sex, hPhoto: newFile };
      fs.appendFile(
        "./data/" + uName + ".txt",
        JSON.stringify(words),
        (err) => {
          if (err) throw err;
          console.log("sign up success!");
          res.send("sign up success!");
        }
      );
    });
  });
});
module.exports = router;
