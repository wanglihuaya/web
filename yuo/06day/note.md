# Day06

## switc 语句

```javascript
switch
  switch(expression) {
  case expression1 : word1;break;
  case expression2 : word2;break;
}
```

**method:**

    1. ()中的表达式是一个变量
    2. 常量表达式是一个常量，一般是一个具体的数值或某个字符
    3. 表达式和常见表达式之间的比较是`===`比较（数据类型一样，并且一样）
    4. 如果没有`break`，会出现穿透现象
    5. `default`一般在末尾
--------

`if`和`switch`是可以互换使用的，但是在开发中，一般`if`用于范围的判断，而`switch`用于具体点的判断
prompt() 输入对话框，可以用变量接受输入的值，按确定得到这个值，按取消得到`null`
  
```javascript
var num = prompt("please input a num!");
var num = Number(num);
switch(num) {
	case 0 : alert("Sunday");break;
	case 1 : alert("Monday");break;
	case 2 : alert("Tuesday");break;
	case 3 : alert("Wednesday");break;
	case 4 : alert("Tuesday");break;
	case 5 : alert("Friday");break;
	case 7 : alert("Saturday");break;
	default : alert("inpur errors,please re-enter!");
}
```
