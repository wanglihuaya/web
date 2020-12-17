    function getData({
      type = "get",
      url = "",
      data = "null",
      dataType = "json"
    }, callback) {
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
          callback(response);
        },
        error: function (err) {
          //ajax失败后
        }
      });
    }
    