var express = require("express");
var router = express.Router();
let db = require("../tools/db");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/del/:id", async (req, res) => {
  console.log(req.params.id);
  let result = await db.query("delete from 班级 where id = ?", [req.params.id]);
  if (result.affectedRows > 0) {
    console.log("successfully deleted!!!!!!!!!!!!!!!!");
    res.send("delete success!!!!!!");
  } else {
    console.log("delete failed!!!!!!!!");
    res.send("delete failed!!!!!!!!");
  }
  db.close();
});

module.exports = router;
