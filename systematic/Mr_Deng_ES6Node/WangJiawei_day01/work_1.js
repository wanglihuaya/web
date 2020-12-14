    function getData({
      type = "get",
      url = "",
      data = "null",
      dataType = "json"
    }) {
      $.ajax({
        type,
        url,
        data,
        dataType,
        beforeSend: function () {
          //ajax发送前
        },
        success: function (response) {
          //ajax成功后
          let pic = response;
          let {
            banners: [{
              photo: {
                thumb: a
              }
            }, {
              photo: {
                thumb: b
              }
            }]
          } = pic;
          console.log(a);
        },
        error: function (err) {
          //ajax失败后
        }
      });
    }
    getData({
      type: "post",
      url: "http://api.shenzhou888.com.cn/v2/ecapi.banner.list"
    });