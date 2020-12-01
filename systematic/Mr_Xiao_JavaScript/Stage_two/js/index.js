//先写ajax
ajax("./data/index.json", "get", function (res) {

  res = JSON.parse(res);
  console.log(res);
  //动态渲染页面
/*   for (var i = 0; i < res.banner.length; i++) {
    //创建li 和 span
    var li = document.createElement('li');
    var span = document.createElement("span");
    li.innerHTML = ' <img src="' + res.banner[i] + '" alt="">';
    ul.appendChild(li);
    p.appendChild(span);
  }
  var lis = ul.children;
  var spans = p.children;

  //透明度轮播效果
  //自动轮播
  var n = 0;

  function auto() {
    n++;
    if (n > 5) {
      n = 0;
    }
    if (n < 0) {
      n = 5
    }
    for (var j = 0; j < lis.length; j++) {
      bufferMove(lis[j], {
        opacity: 0
      });
    }
    bufferMove(lis[n], {
      opacity: 1
    });
    //序号变色
    for (var l = 0; l < spans.length; l++) {
      spans[l].style.backgroundColor = "#fff";
    }
    spans[n].style.backgroundColor = "red"
  }
  var timer = setInterval(auto, 2000)
  //鼠标移入父元素 停止自动轮播
  banner.onmouseover = function () {
    clearInterval(timer);
  }
  banner.onmouseout = function () {
    timer = setInterval(auto, 2000)
  }
  //箭头轮播
  rightArr.onclick = auto;
  leftArr.onclick = function () {
    n -= 2;
    auto()
  }
  //序号轮播
  for (var k = 0; k < spans.length; k++) {
    spans[k].idx = k;
    spans[k].onclick = function () {
      //点谁谁亮
      for (var l = 0; l < spans.length; l++) {
        spans[l].style.backgroundColor = "#fff";
      }
      this.style.backgroundColor = "red";
      //切换图片
      //点击序号 切换图片 其实就是点击哪一个序号 切换对应图片
      for (var j = 0; j < lis.length; j++) {
        bufferMove(lis[j], {
          opacity: 0
        });
      }
      bufferMove(lis[this.idx], {
        opacity: 1
      });
      //关联箭头和自动轮播
      n = this.idx;
    }
  }
 */



  //热门直播部分的js
  //动态渲染页面
  var hot = res.hot;
  console.log(hot);
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

})
//获取live里的元素
var liveR = document.querySelector(".liveR");
var liveL = document.querySelector(".liveL");