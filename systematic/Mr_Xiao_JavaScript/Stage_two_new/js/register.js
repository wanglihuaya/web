let phoneReg = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/;
let pwdReg = /(?!^[a-zA-Z]{5,10}$|^[0-9]{5,10}$)^[a-zA-Z0-9]{5,10}$/;
let vcodeReg = /^\d{5}$/;
let pcodeReg = /^\d{5}$/;
//============================================================
let phone = document.querySelector("#phone");
let pwd = document.querySelector("#pwd");
let pwda = document.querySelector("#pwda");
let vcode = document.querySelector("#vcode");
let pcode = document.querySelector("#pcode");
let vcodeImg = vcode.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling;
let vcodeImgs = [{
    "src": "./img/yan1.png",
    "value": "97624"
  },
  {
    "src": "./img/yan2.png",
    "value": "25411"
  },
  {
    "src": "./img/yan3.png",
    "value": "00609"
  },
  {
    "src": "./img/yan4.png",
    "value": "94713"
  },
  {
    "src": "./img/yan5.png",
    "value": "43850"
  }
]


//只能输入数字
phone.addEventListener("keypress", (event) => {
  if (!/^\d$/.test(String.fromCharCode(event.charCode))) {
    event.preventDefault();
  }
});
vcode.addEventListener("keypress", (event) => {
  if (!/^\d$/.test(String.fromCharCode(event.charCode))) {
    event.preventDefault();
  }
});
pcode.addEventListener("keypress", (event) => {
  if (!/^\d$/.test(String.fromCharCode(event.charCode))) {
    event.preventDefault();
  }
});
console.log();
//============================================================

//验证手机号和密码 封装
function yan1(ele, eleReg) {
  ele.onfocus = function () {
    ele.style.backgroundColor = "lightyellow";
  }
  ele.onblur = function () {
    ele.style.backgroundColor = "";
    if (!ele.value) {
      ele.style.borderColor = "";
      ele.nextElementSibling.style.display = "none";
      ele.nextElementSibling.nextElementSibling.style.display = "inline-block";
    }
  }
  ele.oninput = function () {
    ele.nextElementSibling.nextElementSibling.style.display = "inline-block";
    if (eleReg.test(ele.value)) {
      ele.nextElementSibling.style.display = "none"
      ele.nextElementSibling.nextElementSibling.style.display = "none";
      ele.nextElementSibling.nextElementSibling.nextElementSibling.style.display = "inline-block";
      ele.style.borderColor = "green";
    } else {
      ele.nextElementSibling.nextElementSibling.nextElementSibling.style.display = "none";
      ele.nextElementSibling.nextElementSibling.style.display = "none";
      ele.nextElementSibling.style.display = "inline-block";
      ele.style.borderColor = "red";
    }
  }
}
//============================================================
//验证确认密码
pwda.onfocus = function () {
  pwda.onfocus = function () {
    pwda.style.backgroundColor = "lightyellow";
  }
  pwda.onblur = function () {
    pwda.style.backgroundColor = "";
    // pwda.style.borderColor = "";
    if (pwd.value && !pwda.value) {
      pwda.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.style.display = "none";
      pwda.nextElementSibling.nextElementSibling.nextElementSibling.style.display = "none";
      pwda.nextElementSibling.style.display = "none";
      pwda.nextElementSibling.nextElementSibling.style.display = "inline-block";
    }
  }
  pwda.oninput = function () {
    if (!pwd.value) {
      pwda.nextElementSibling.style.display = "none";
      pwda.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.style.display = "none";
      pwda.nextElementSibling.nextElementSibling.style.display = "none";
      pwda.nextElementSibling.nextElementSibling.nextElementSibling.style.display = "inline-block";
      pwda.style.borderColor = "red";
    } else if (pwda.value === pwd.value) {
      pwda.nextElementSibling.nextElementSibling.nextElementSibling.style.display = "none";
      pwda.nextElementSibling.nextElementSibling.style.display = "none";
      pwda.nextElementSibling.style.display = "none";
      pwda.style.borderColor = "green";
      pwda.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.style.display = "inline-block";
    } else {
      pwda.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.style.display = "none";
      pwda.nextElementSibling.nextElementSibling.nextElementSibling.style.display = "none";
      pwda.nextElementSibling.nextElementSibling.style.display = "none";
      pwda.style.borderColor = "red";
      pwda.nextElementSibling.style.display = "inline-block";
    }

  }
}

//============================================================
//验证验证码和手机验证码封装
function yan2(ele, yanCode) {

  ele.onfocus = function () {
    ele.style.backgroundColor = "lightyellow";
  }
  ele.onblur = function () {
    ele.style.backgroundColor = "";
    if (!ele.value) {
      ele.nextElementSibling.style.display = "none";
      ele.nextElementSibling.nextElementSibling.style.display = "inline-block";
    }
  }
  ele.oninput = function () {
    ele.nextElementSibling.nextElementSibling.style.display = "inline-block";
    if (ele.value == yanCode) {
      ele.nextElementSibling.style.display = "none"
      ele.nextElementSibling.nextElementSibling.style.display = "none";
      ele.nextElementSibling.nextElementSibling.nextElementSibling.style.display = "inline-block";
      ele.style.borderColor = "green";
    } else {
      ele.nextElementSibling.nextElementSibling.nextElementSibling.style.display = "none";
      ele.nextElementSibling.nextElementSibling.style.display = "none";
      ele.nextElementSibling.style.display = "inline-block";
      ele.style.borderColor = "red";
    }
  }
}
//验证验证码
//随机验证码图片
var ran = Math.floor(Math.random() * 5);
vcodeImg.src = vcodeImgs[ran].src;

vcodeImg.onclick = function () {
  ran = Math.floor(Math.random() * 5);
  vcodeImg.src = vcodeImgs[ran].src;
}
yan2(vcode, vcodeImgs[ran].value)
//============================================================
//获取手机验证码
var getCode = document.querySelector(".pcode em");
var str = "0123456789";
var content;
getCode.onclick = function () {
  content = "";
  for (var i = 0; i < 5; i++) {
    //获取随机下标
    var n = Math.floor(Math.random() * 9);
    var char = str.charAt(n);
    // console.log(char);
    content += char;
  }
  alert("您的验证码为：" + content + "（打死也不要告诉别人）");
}

yan2(pcode, content);
pcode.oninput = function () {
  pcode.nextElementSibling.nextElementSibling.style.display = "inline-block";
  if (pcode.value == content) {
    pcode.nextElementSibling.style.display = "none"
    pcode.nextElementSibling.nextElementSibling.style.display = "none";
    pcode.nextElementSibling.nextElementSibling.nextElementSibling.style.display = "inline-block";
    pcode.style.borderColor = "green";
  } else {
    pcode.nextElementSibling.nextElementSibling.nextElementSibling.style.display = "none";
    pcode.nextElementSibling.nextElementSibling.style.display = "none";
    pcode.nextElementSibling.style.display = "inline-block";
    pcode.style.borderColor = "red";
  }
}

//============================================================
yan1(phone, phoneReg);
yan1(pwd, pwdReg);
//============================================================
//注册
var svg = document.querySelectorAll("svg");
var submit = document.querySelector(".submit");
submit.onclick = function () {
  var flag = '可以';
  //获取所有的对勾

  for (var i = 0; i < svg.length; i++) {
    var svgs = svg[i].style.display
    if (svgs === "" || svgs === "none") {
      flag = "不能";
    }
  }
  if (flag == "可以") {
    var obj = {
      phone: phone.value,
      pwd: pwd.value,
    }
    //声明一个空数组  将用户信息对象存入 数组中
    //如果缓存中 没有userData 我们就声明一个新的空数组
    if (localStorage.getItem('userData') == undefined) {
      var arr = [];
    } else {
      for (var i = 0; i < JSON.parse(localStorage.getItem('userData')).length; i++) {
        var userPhone = JSON.parse(localStorage.getItem('userData'))[i].phone;
        // if (obj.phone === userPhone) {
        //   alert("此手机号已注册，换个人再来吧");
        //   break;
        // } else if (i === JSON.parse(localStorage.getItem('userData')).length - 1) {
        //   //如果缓存中 已经存在userData  我们就使用缓存中的userData 向其中追加新对象
        //   var arr = JSON.parse(localStorage.getItem("userData"));
        // }
        var userPhoneN;
        if (obj.phone === userPhone) {
          userPhoneN = 1;
        } else {
          userPhoneN = 0;
        }
      }
      if (userPhoneN === 1) {
        alert("此手机号已注册，换个人再来吧");
      } else {
        var arr = JSON.parse(localStorage.getItem("userData"));
      }
    }

    arr.push(obj);
    //处理一下数组
    arr = JSON.stringify(arr);
    //将数组存入缓存
    localStorage.setItem("userData", arr);
    // console.log(localStorage);
    alert("恭喜你，开启了新世界的大门。")
    location.reload();
  } else {
    alert("开玩笑呢，自己好好康康怎么注册😄👮‍♀️👮🏻‍♀️👮🏼‍♀️👮🏽‍♀️👮🏾‍♀️👮🏿‍♀")
  }
}
//清除缓存
// localStorage.clear()
//打印缓存
console.log(localStorage);