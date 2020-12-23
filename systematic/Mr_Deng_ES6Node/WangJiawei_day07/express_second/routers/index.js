let express = require("express");
let router = express.Router();
let path = require("path");
const formidable = require("formidable");
const fs = require("fs");

//Routes HTTP POST requests to the specified path with the specified callback functions.
router.post("/sign_up", (req, res) => {
  // res.send("login successful！");
  //set formidable
  const form = formidable({ multiples: true });
  //set Directory of uploaded files
  form.uploadDir = "./upload";
  //Parse form data
  form.parse(req, (err, fields, files) => {
    if (err) throw err;
    res.set("Content-Type", "application/json;charset=utf-8");
    // res.send(JSON.stringify({ fields, files }, null, 2));
    console.log(JSON.stringify({ fields, files }));
    let { uname, sex } = fields;
    let {
      Head_image: { name },
    } = files;
    let extName = path.extname(name);
    let oldFile = files.Head_image.path;
    let newFile = oldFile + extName;

    fs.rename(oldFile, newFile, (err) => {
      if (err) throw err;
      console.log("rename success！");
      let person = { uname, sex, Head_image: newFile };
      fs.appendFile(
        "./data/" + uname + ".txt",
        JSON.stringify(person),
        (err) => {
          if (err) throw err;
          res.send("sign up success！");
        }
      );
    });
  });
});

module.exports = router;
