//使用外部獲取自製模塊的共享function
const date10 = require('./10.module.exports2GetTimeDate.js')
let nowTime = new Date()
console.log(date10.dateFormat(nowTime));

//使用外部獲取第3方模塊的共享function
const dayjs = require('dayjs')
console.log(dayjs().format('{YYYY} MM-DDTHH:mm:ss SSS [Z] A'));


