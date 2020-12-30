let express = require("express");
let router = express.Router();
let db = require("../tools/db");
let to = require("../tools/to");

/* GET Single product details */

/* 
{
  goods_name:"",
  goods_price:288,
  goods_images:[{},{},{}],
  goods_eval:[{},{}],
  goods_style:[{},{},{}],
}
*/

router.get("/detail/:goods_id", async (req, res) => {
  let goods_id = req.params.goods_id || "";
  //Get Product information
  let sql1 =
    "select goods_name,image_url,goods_price from goods_list where goods_id=?";
  //GET Product banner
  let sql2 = "select * from goods_image where goods_id=?";
  //GET Comment
  let sql3 = "select * from goods_eval where goods_id=?";
  //GET Product specifications
  let sql4 = "select * from goods_eval where goods_id=?";

  //多个异步操作都成功才执行下一步，适合Promise.all()
  Promise.all([
    db.query(sql1, [goods_id]),
    db.query(sql2, [goods_id]),
    db.query(sql3, [goods_id]),
    db.query(sql4, [goods_id]),
  ])
    .then((data) => {
      console.log(data);
      let [goods_info, goods_images, goods_eval, goods_style] = data;
      console.log(goods_info[0]);

      goods_info[0]["goods_images"] = goods_images;
      goods_info[0]["goods_style"] = goods_style;
      goods_info[0]["goods_eval"] = goods_eval;
      res.json({
        code: 200,
        data: goods_info[0],
        message: "Get Product specifications successfully",
      });
      return;
    })
    .catch((err) => {
      res.json({
        code: 201,
        data: null,
        message: "GET Product Specifications failed",
      });
      return;
    });
});

module.exports = router;
