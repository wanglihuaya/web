var express = require("express");
var router = express.Router();
let db = require("../tools/db");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});
//--------------------------------------------------------------
/* form input page. */
router.get("/class_input", (req, res) => {
  res.render("class_input.ejs");
});
/* submit,add database */
/*
 ** Express.urlencoded() url内置的中间件，用来代替formidable，实现简单表单数据的解析，不能实现文件上传
 ** 如果表单提交为GET，那么可以使用request.query;如果表单的提交为POST,使用request.body
 */
router.post("/class_add", async (req, res) => {
  let { class_name, class_president, head_teacher, classroom } = req.body;
  let sql = "insert into 班级(班号,班长,班主任,教室) values(?,?,?,?)";
  let result = await db.query(sql, [
    class_name,
    class_president,
    head_teacher,
    classroom,
  ]);
  // console.log(result.id);
  console.log("result::::", result[1].affectedRows);
  if (result[1].affectedRows > 0) {
    res.send(
      "<script>alert('Data saved successfully!!');location.assign('http://127.0.0.1:3000/class_input');</script>"
    );
  } else {
    res.send(
      "<script>alert('Data saved failed!!');location.assign('http://127.0.0.1:3000/class_input');</script>"
    );
  }
});

router.get("/class_list", async (req, res) => {
  let total = await db.query("SELECT COUNT(*) AS all_total FROM `班级`", []);
  let [, [{ all_total }]] = total;
  let pageSize = 6;
  let page = req.query.page || 1;
  let pageNum = page - 1;
  let sql = `SELECT * from 班级 LIMIT ${pageNum},${pageSize}`;
  let result = await db.query(sql, []);
  // console.log(result);
  res.render("class_list.ejs", { result, page, pageSize, all_total });
});
//--------------------------------------------------------------
router.get("/del/:id", async (req, res) => {
  console.log(req.params.id);
  let result = await db.query("delete from 班级 where id = ?", [req.params.id]);

  if (result[1].affectedRows > 0) {
    res.send(
      "<script>alert('Deleted successfully!!');location.assign('http://127.0.0.1:3000/class_list');</script>"
    );
  } else {
    res.send(
      "<script>alert('Delete failed!!');location.assign('http://127.0.0.1:3000/class_list');</script>"
    );
  }
  db.close();
});

module.exports = router;
