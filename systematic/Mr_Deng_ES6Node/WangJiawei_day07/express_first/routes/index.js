var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/1.mp3", (req, res) => {
  console.log(path.resolve("public/public/media", "./1.mp3"));
  res.sendFile(path.resolve("public/public/media", "./1.mp3"));
});

router.get("/1", (req, res) => {
  res.send("this is 1");
});

module.exports = router;
//todo index 引入
