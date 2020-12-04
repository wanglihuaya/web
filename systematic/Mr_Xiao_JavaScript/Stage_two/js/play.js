//ajax
//ajax地址不能使用".."
ajax("./data/play.json", "get", function (res) {
  res = JSON.parse(res);
  console.log(res);

  /*  
   ** 相关直播列表的Js
   */
  var live = document.querySelector(".live .bottom");
  var html1 = template("videoList", res);
  live.innerHTML += html1;
  var liveLi = live.querySelectorAll("li");
  var lives = document.querySelector("video");
  console.log(lives.src);

  for (let i = 0; i < liveLi.length; i++) {
    liveLi[i].onclick = function () {
      lives.src = res.video[i].src;
    }
  }

  /*
   ** 相关课程里的JS 
   */
  //获取 相关课程 里的元素
  var courseBox = document.querySelector(".courseBox");
  //获取JSON关于 相关课程 的内容
  var html = template("courseBox", res);
  courseBox.innerHTML += html;
})