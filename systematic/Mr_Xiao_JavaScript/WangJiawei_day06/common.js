/* Create By LX  in  Beijing  at  Nov 2020 */

//这是一个用来获取元素样式的方法


function getStyle(ele, style) {
	//var ele; var style;
	
	//2.写入主要代码  获取div的宽度
	//currentStyle  在标准浏览器中 值为undefined   而在ie8及以下浏览器中  值为对象
	//判断 如果当前currentStyle值为undefined  证明我们在标准浏览器中
	if (ele.currentStyle === undefined) {
		//在标准浏览器中  应该使用  getComputedStyle获取非行内样式
		//如果想解析style这个变量 需要使用[]
		return getComputedStyle(ele)[style];
	} else {
		//在IE8及以下浏览器中   应该使用currentStyle获取样式
		return ele.currentStyle[style];
	}
	//3.分析主要代码中  不确定的值  并提取为形参    不确定的值：元素  和  样式
	//4.将形参 带入到 主要代码中
}