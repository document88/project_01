const dates = require('./src/dateFormats')
const escapes = require('./src/htmlEscapes')

//向外共享
//加上...外部文件在使用時路徑可省略
module.exports = {
    ...dates,
    ...escapes
}