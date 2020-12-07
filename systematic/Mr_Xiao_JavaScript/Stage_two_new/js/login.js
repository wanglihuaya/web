let phoneB = document.querySelector(".phone");
let phoneBp = phoneB.querySelector("span")
let pwdB = document.querySelector(".pwd");
let button = document.querySelector(".btn");

let phone = document.querySelector("#phone");
let pwd = document.querySelector("#pwd");

phone.addEventListener("keypress", (event) => {
  if (!/^\d$/.test(String.fromCharCode(event.charCode))) {
    event.preventDefault();
  }
});

//验证手机号和密码 封装


button.onclick = function () {
  if (!phone.value) {
    phoneBp.innerText = "请输入账号密码"
  } else {
    for (var i = 0; i < JSON.parse(localStorage.getItem('userData')).length; i++) {
      var userPhone = JSON.parse(localStorage.getItem('userData'))[i].phone;
      var userPhoneN;
      if (phone.value === userPhone) {
        userPhoneN = 1;
      } else {
        userPhoneN = 0;
      }
    }

    for (var j = 0; j < JSON.parse(localStorage.getItem('userData')).length; j++) {
      var userPwd = JSON.parse(localStorage.getItem('userData'))[j].pwd;
      var userPwdN;
      if (pwd.value === userPwd) {
        userPwdN = 1;
      } else {
        userPwdN = 0;
      }
    }

    if (userPhoneN === 0) {
      phoneBp.innerText = "账号未注册"
    } else if (userPhoneN === 1 && userPwdN === 1) {
      alert("登录成功！");
      location.reload();
    } else {
      alert("账号或密码错误！")
    }
  }
}