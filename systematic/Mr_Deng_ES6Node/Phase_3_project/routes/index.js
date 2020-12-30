let express = require("express");
let router = express.Router();
let db = require("../tools/db");
let to = require("../tools/to");

/* ------------------------------------------------------ */

/* GET Popular Goods page. */
router.get("/popular", async (req, res) => {
  let sql =
    "SELECT b.goods_name,b.image_url,a.goods_id,SUM( a.eval_start ) AS starNum,count( a.goods_id )  FROM goods_eval AS a INNER JOIN goods_list AS b ON a.goods_id = b.goods_id GROUP BY a.goods_id ,b.goods_id ORDER BY starNum DESC LIMIT 0,8";
  //descending order
  let [err, result] = await to(db.query(sql, []));
  if (!err) {
    if (result.length > 0) {
      res.json({
        code: 200,
        data: result,
        message: "Get Popular Goods successfully",
      });
    } else {
      res.json({
        code: 202,
        data: result,
        message: "Get Popular Goods failed",
      });
    }
  } else {
    res.json({ code: 201, data: null, message: "Failed to get data!!" });
  }
});
/* ------------------------------------------------------ */

/* GET home_banner page.*/
router.get("/banner", async (req, res) => {
  let sql = "SELECT * FROM banner";
  let [err, result] = await to(db.query(sql, []));
  if (!err) {
    if (result.length > 0) {
      res.json({
        code: 200,
        data: result,
        message: "Get banner data successfully",
      });
    } else {
      res.json({ code: 202, data: result, message: "Get banner data failed" });
    }
  } else {
    res.json({ code: 201, data: null, message: "Failed to get data!!" });
  }
});
/* ------------------------------------------------------ */

/* GET Hot search keywords */
router.get("/hot", async (req, res) => {
  let sql = "SELECT search_text,count FROM search ORDER BY count DESC";
  //descending order
  let [err, result] = await to(db.query(sql, []));
  console.log(result);
  if (!err) {
    if (result.length > 0) {
      res.json({
        code: 200,
        data: result,
        message: "Get Hot search keywords successfully",
      });
    } else {
      res.json({
        code: 202,
        data: result,
        message: "Get Hot search keywords failed",
      });
    }
  } else {
    res.json({ code: 201, data: null, message: "Failed to get data!!" });
  }
});
/* ------------------------------------------------------ */

/* GET Flash page.*/
router.get("/flash", async (req, res) => {
  let sql = `SELECT
	b.id AS 秒杀场次,
	a.flash_id,
	a.goods_id, 
	c.goods_name,
	c.image_url,
	c.goods_price,
	c.assem_price
FROM
	flash_product AS a
	LEFT JOIN flash_sale AS b ON a.flash_id = b.flash_id
  LEFT JOIN goods_list  AS c ON a.goods_id = c.goods_id`;

  let [{ flashNum }] = await db.query(
    "SELECT count(*) AS flashNum from flash_sale",
    []
  );
  let [err, result] = await to(db.query(sql, []));
  let data = {};
  for (let i = 1; i <= flashNum; i++) {
    data["flash" + i] = [];
    for (let item of result) {
      if (item.秒杀场次 === 10) {
        data["flash" + i].push(item);
      }
    }
  }

  // let [err, result] = await to(db.query(sql, []));
  if (!err) {
    if (result.length > 0) {
      res.json({
        code: 200,
        data: result,
        message: "Get flash data successfully",
      });
      return;
    } else {
      res.json({ code: 202, data: result, message: "Get flash data failed" });
      return;
    }
  } else {
    res.json({ code: 201, data: null, message: "Failed to get data!!" });
    return;
  }
});
/* ------------------------------------------------------ */

/* you may also like */
router.get("/like", async (req, res) => {
  let sql =
    "select * from goods_list where id>=(select floor(rand() * (select max(id) from goods_list))) order by id limit 10";
  //descending order
  let [err, result] = await to(db.query(sql, []));
  if (!err) {
    if (result.length > 0) {
      res.json({
        code: 200,
        data: result,
        message: "Get you may also like successfully",
      });
    } else {
      res.json({
        code: 202,
        data: result,
        message: "Get you may also like failed",
      });
    }
  } else {
    res.json({ code: 201, data: null, message: "Failed to get data!!" });
  }
});
module.exports = router;
