//先写ajax
ajax("./data/index.json", "get", function (res) {

  res = JSON.parse(res);

  //轮播图

  var bannerContent = template("banner", res)
  banner.innerHTML += bannerContent;
  var bgImg = banner.querySelectorAll("img");
  var dots = document.querySelectorAll(".bg ul li div");
  var n = 0;
  //图片自动轮播
  function autoMove() {
    n++;
    if (n > 5) {
      n = 0;
    }
    if (n < 0) {
      n = 5;
    }
    for (var i = 0; i < bgImg.length; i++) {
      bufferMove(bgImg[i], {
        opacity: 0
      });
    }
    bufferMove(bgImg[n], {
      opacity: 1
    });
    //dots变色
    for (var j = 0; j < dots.length; j++) {
      dots[j].style.backgroundColor = "#fff";
    }
    dots[n].style.backgroundColor = "tomato";
  }

  var timer = setInterval(autoMove, 2000);
  //移入停止
  banner.onmouseover = function () {
    clearInterval(timer);
  }
  banner.onmouseout = function () {
    timer = setInterval(autoMove, 2000);
  }
  //点击箭头
  bannerRight.onclick = function () {
    autoMove();
  }
  bannerLeft.onclick = function () {
    n -= 2;
    autoMove();
  }
  //序号轮播
  for (var k = 0; k < dots.length; k++) {
    dots[k].idx = k;
    dots[k].onclick = function () {
      for (var l = 0; l < dots.length; l++) {
        dots[l].style.backgroundColor = "#fff";
      }
      this.style.backgroundColor = "tomato";

      for (var j = 0; j < dots.length; j++) {
        bufferMove(bgImg[j], {
          opacity: 0
        });
      }
      bufferMove(bgImg[this.idx], {
        opacity: 1
      });
      n = this.idx;
    }
  }


  //热门直播部分的js
  // --------------------------------
  //获取live里的元素
  var liveR = document.querySelector(".liveR");
  var liveL = document.querySelector(".liveL");
  //动态渲染页面
  var hot = res.hot;
  //使用数据动态渲染页面  使用模板引擎
  //3.初始化模板
  var html = template("sele", hot);
  //hot  { content:[]   selector:[{},{}]}
  //将初始化好的html字符串 渲染进页面
  liveR.innerHTML = html;

  var html1 = template("con", hot);
  liveL.innerHTML = html1;

  //添加选项卡效果  给每一个选项li 添加鼠标移入事件  移入谁 就让下标相同的内容li显示出来 其他li隐藏
  var selectorLi = liveR.querySelectorAll("li");
  var contentLi = liveL.querySelectorAll("li");
  for (var i = 0; i < selectorLi.length; i++) {
    selectorLi[i].idx = i;
    selectorLi[i].onmouseover = function () {
      for (var j = 0; j < contentLi.length; j++) {
        contentLi[j].style.display = "none";
      }
      contentLi[this.idx].style.display = "block";
    }
  }




  //video部分里的js
  // --------------------------------
  //获取video里的元素
  var videoSel1 = document.querySelector(".videoSel1");
  var videoCon1 = document.querySelector(".videoCon1");

  //动态渲染页面
  var video = res.video;


  var html2 = template("videoSel1", video);

  var html3 = template("videoCon1", video);

  videoSel1.innerHTML += html2;
  videoCon1.innerHTML += html3;

  var videoSelLi = videoSel1.querySelectorAll("li");
  var videoConUl = videoCon1.querySelectorAll("ul");

  for (var i = 0; i < videoSelLi.length; i++) {
    videoSelLi[i].idx = i;
    videoSelLi[i].onmouseover = function () {
      for (var j = 0; j < videoConUl.length; j++) {
        videoConUl[j].style.display = "none";
      }
      videoConUl[this.idx].style.display = "flex";
    }
  }
})
var banner = document.querySelector(".bg");
var bannerLeft = document.querySelector(".banner_left");
var bannerRight = document.querySelector(".banner_right");