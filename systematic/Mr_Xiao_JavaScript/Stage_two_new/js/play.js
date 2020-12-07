//ajax
//ajax地址不能使用".."
ajax("./data/play.json", "get", function (res) {
  res = JSON.parse(res);
  console.log(res);

  /*  
   ** 相关直播列表的Js
   */
  var liveVideo = document.querySelector(".videoV iframe")
  var live = document.querySelector(".live .bottom");
  var html1 = template("videoList",res);
  live.innerHTML += html1;
  var liveLi = live.querySelectorAll("li");
  // console.log(liveVideo.src);
  // console.log(liveLi);
  // console.log(res.video[0].src);
  
  for (var i = 0; i < liveLi.length; i++) {
    liveLi[i].idx = i
    liveLi[i].onclick = function () {
      liveVideo.src = res.video[this.idx].src;
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


  /*
   **评论里的JS
   */
  var outs = document.querySelector(".outs");

  var obj = [];
  obj.comment = [];
  for (var j = 0; j < 3; j++) {
    obj.comment.push(res.comment[j]);
  }

  var html2 = template("commentBox", obj);
  outs.innerHTML += html2;

  var commentNum = document.querySelector(".h span");
  commentNum.innerHTML = res.comment.length;

  var commentPage = document.querySelector(".click i");
  commentPage.innerHTML = Math.floor(res.comment.length / 3);

  //切换
  var previous = document.querySelector(".click .previous");
  var next = document.querySelector(".click .next");
  var inputNum = document.querySelector(".click input")
  var inputBtn = document.querySelector(".click button");
  var n = 0;

  function nextT() {
    n++;
    if (n > Math.floor(res.comment.length / 3) - 1) {
      n = Math.floor(res.comment.length / 3) - 1;
      return false;
    }
    if (n < 0) {
      n = 0;
      return false;
    }
    obj.comment = []; //格式化
    for (var i = n * 3; i < (n + 1) * 3; i++) {
      if (res.comment[i] === undefined) {
        break;
      } else {
        obj.comment.push(res.comment[i]);
      }
    }
    var html2 = template("commentBox", obj);
    outs.innerHTML = html2;
    inputNum.value = n + 1;
  }
  next.onclick = function () {
    nextT();
  };
  previous.onclick = function () {
    n -= 2;
    nextT();
  }
  inputBtn.onclick = function () {
    var inputNum1 = inputNum.value * 1;
    if (inputNum1 != NaN) {
      n = inputNum1 - 2;
      nextT();
    }
  }

})