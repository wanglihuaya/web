var chineseLunar = require('chinese-lunar');

var lunar = chineseLunar.solarToLunar(new Date(2020, 11, 18));
console.log(chineseLunar.format(lunar, "YMD"));