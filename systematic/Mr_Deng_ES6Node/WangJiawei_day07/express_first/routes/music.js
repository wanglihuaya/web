let express = require("express");
let router = express.Router();
let path = require("path");

router.get("/", (req, res) => {
  res.send("this is music");
});
router.get("/1.mp3", (req, res) => {
  console.log(path.resolve("public/public/media", "./1.mp3"));
  res.sendFile(path.resolve("public/public/media", "./1.mp3"));
});

module.exports = router;
