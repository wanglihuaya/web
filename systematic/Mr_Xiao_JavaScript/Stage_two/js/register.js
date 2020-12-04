let phoneReg = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/;
let pwdReg = /(?!^[a-zA-Z]{5,10}$|^[0-9]{5,10}$)^[a-zA-Z0-9]{5,10}$/;
let vcodeReg = /^\d+$/;
let pcodeReg = /^\d+$/;

let phoneValue = document.querySelector("#phone").value;
let pwdValue = document.querySelector("#pwd").value;
let pwdaValue = document.querySelector("#pwda").value;
let vcodeValue = document.querySelector("#vcode").value;
let pcodeValue = document.querySelector("#pcode").value;
console.log(phoneValue);

