"use strict";
class Zoom {
    constructor() {
        this.name = 'Zoommmmmm';
        console.log('父类中调用：', this.name);
    }
}
class Fine extends Zoom {
    constructor() {
        super();
        console.log('子类中调用：', this.name);
    }
}
/* 实例化子类 */
let fine = new Fine();
console.log('name::', fine.name);
console.log('子类：', fine);
/* ----静态类----- */
class staticDemo {
    static getNowTime(timer) {
        return `TIME: ${new Date(timer).toLocaleTimeString()}`;
    }
}
staticDemo.name1 = 'OKKKKK';
console.log('静态属性值：', staticDemo.name1);
console.log('静态方法：', staticDemo.getNowTime(1611631612194));
