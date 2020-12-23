let express = require("express");
let path = require("path");
let router = express.Router();
const fs = require("fs");
const formidable = require("formidable");

router.post("/signUp", (req, res) => {
  const form = formidable({ multiples: true });
  form.uploadDir = "./upload"; //相对路径
  // console.log(typeof dressDir);

  form.parse(req, (err, fields, files) => {
    if (err) throw err;
    res.set("Content-Type", "application/json;charset=utf8");
    // res.send(JSON.stringify({ fields, files }));
    console.log(JSON.stringify({ fields, files }));
    let { uName, sex } = fields;
    // let extName = path.extname(name);
    let oldFile = files.hPhoto.path;
    // let newFile = oldFile + extName;
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
          res.send("sign up success");
        }
      );
    });
  });
});

module.exports = router;
