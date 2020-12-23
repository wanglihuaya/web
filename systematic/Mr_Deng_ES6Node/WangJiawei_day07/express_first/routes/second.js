let express = require("express");
let router = express.Router();

router.get("/", (req, res) => {
  res.send("这是首页");
});
router.get("/1", (req, res) => {
  res.send("this is 1");
});

module.exports = router;
