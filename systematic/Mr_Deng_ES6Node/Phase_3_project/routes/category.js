let express = require("express");
let router = express.Router();
let db = require("../tools/db");
let to = require("../tools/to");

/* GET categories page.*/

/* GET category_first */
router.get("/first", async (req, res) => {
  let sql = "SELECT * FROM category_first";
  let [err, result] = await to(db.query(sql, []));
  if (!err) {
    if (result.length > 0) {
      res.json({
        code: 200,
        data: result,
        message: "Get category_first data successfully",
      });
    } else {
      res.json({
        code: 202,
        data: result,
        message: "Get category_first data failed",
      });
    }
  } else {
    res.json({ code: 201, data: null, message: "Failed to get data!!" });
  }
});

/* GET category_second page.*/
router.get("/second/:first_id", async (req, res) => {
  let first_id = req.params.first_id || "";
  let sql = "SELECT * FROM category_second where first_id=?";
  let [err, result] = await to(db.query(sql, [first_id]));
  if (!err) {
    if (result.length > 0) {
      res.json({
        code: 200,
        data: result,
        message: "Get category_second data successfully",
      });
      return;
    } else {
      res.json({
        code: 202,
        data: result,
        message: "Get category_second data failed",
      });
      return;
    }
  } else {
    res.json({ code: 201, data: null, message: "Failed to get data!!" });
    return;
  }
});

/* GET category_third page.*/
router.get("/third/:second_id", async (req, res) => {
  let second_id = req.params.second_id || "";
  let sql = "SELECT * FROM category_third where second_id=?";
  let [err, result] = await to(db.query(sql, [second_id]));
  if (!err) {
    if (result.length > 0) {
      res.json({
        code: 200,
        data: result,
        message: "Get category_third data successfully",
      });
      return;
    } else {
      res.json({
        code: 202,
        data: result,
        message: "Get category_third data failed",
      });
      return;
    }
  } else {
    res.json({ code: 201, data: null, message: "Failed to get data!!" });
    return;
  }
});

/* Get product details according to the category_third_id */
router.get("/goods", async (req, res) => {
  console.log(req.query);
  let { thired_id, order, page, pagesize } = req.query;
  //todo: 总结获取get post 数据 冒号 问号获取方式
  let orderParams = parseInt(order) ? "DESC" : "ASC";
  //Pagination
  let pageNum = (page - 1) * pagesize;
  let sql = `SELECT
	  goods_id,
	  goods_name,
	  image_url,
	  goods_price 
  FROM
	  goods_list 
  WHERE
	  goods_list.thired_id = ?
  ORDER BY
	  goods_price ${orderParams} 
	  LIMIT ?,?`;
  let [err, result] = await to(
    db.query(sql, [thired_id, pageNum, parseInt(pagesize)])
  );
  if (!err) {
    if (result.length > 0) {
      res.json({
        code: 200,
        data: result,
        message: "Get Product details data successfully",
      });
      return;
    } else {
      res.json({
        code: 202,
        data: result,
        message: "Get Product details data failed",
      });
      return;
    }
  } else {
    res.json({ code: 201, data: null, message: "Failed to get data!!" });
    return;
  }
});
module.exports = router;
