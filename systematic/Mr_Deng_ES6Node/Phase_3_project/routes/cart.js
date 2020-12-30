let express = require("express");
let router = express.Router();
let db = require("../tools/db");
let to = require("../tools/to");
let jwt = require("../tools/jwt");

/* ------------------------------------------------------ */

/* GET add_cart page.*/
router.put("/add", async (req, res) => {
  let { token } = req.headers;
  let { goods_id, style_obj, goods_num } = req.body;
  let [, payload] = token.split(".");
  let json = jwt.Base64toJson(payload);
  let { uid } = json;
  let sql =
    "INSERT INTO shopcar(uid,goods_id,style_obj,goods_num) values(?,?,?,?)";
  let [err, result] = await to(
    db.query(sql, [uid, goods_id, style_obj, goods_num])
  );
  if (!err) {
    res.json({ code: 200, data: null, message: "add_cart successfully!" });
    return;
  } else {
    res.json({ code: 207, data: err, message: "add_cart failed!" });
    return;
  }
});
/* ------------------------------------------------------ */

/* show cart */
router.get("/show", async (req, res) => {
  //从请求头中解析出 uid
  let { token } = req.headers;
  let [, payload] = token.split(".");
  let json = jwt.Base64toJson(payload);
  let { uid } = json;
  let sql = `SELECT 
    shopcar.id,
    shopcar.goods_num,
    goods_list.goods_name,
    goods_list.image_url,
    goods_list.goods_price
    From
      shopcar
    inner join goods_list on shopcar.goods_id = goods_list.goods_id
    WHERE
      shopcar.uid=?`;
  let [err, result] = await to(db.query(sql, [uid]));
  if (!err) {
    if (result.length > 0) {
      res.json({ code: 200, data: result, message: "show_cart successfully!" });
      return;
    } else {
      res.json({ code: 202, data: null, message: "Shopping cart is empty" });
      return;
    }
  } else {
    res.json({ code: 207, data: err, message: "operation failed!" });
  }
});
/* ------------------------------------------------------ */

/* del cart */
router.delete("/del", async (req, res) => {
  let { id } = req.body;

  let sql = `DELETE 
    From
      shopcar
    WHERE
      shopcar.id=?`;
  let [err, result] = await to(db.query(sql, [id]));

  if (!err) {
    if (result.affectedRows > 0) {
      res.json({
        code: 200,
        data: result,
        message: "delete_cart successfully!",
      });
      return;
    } else {
      res.json({
        code: 201,
        data: result,
        message: "Shopping cart is empty!",
      });
      return;
    }
  } else {
    res.json({ code: 207, data: err, message: "operation failed!" });
    return;
  }
});

/* ------------------------------------------------------ */

/* update cart */
router.post("/update", async (req, res) => {
  let { goods_num, id } = req.body;

  let sql = "UPDATE shopcar SET goods_num=? WHERE id=?";
  let [err, result] = await to(db.query(sql, [goods_num, id]));
  if (!err) {
    if (result.affectedRows > 0) {
      res.json({ code: 200, data: null, message: "update_cart successfully!" });
      return;
    } else {
      res.json({ code: 201, data: null, message: "update_cart failed!" });
      return;
    }
  } else {
    res.json({ code: 207, data: err, message: "update_cart failed!" });
    return;
  }
});
module.exports = router;
