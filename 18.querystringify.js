const qs = require('querystringify') //調用解析字符串為對象物件格式

const querystringify = (req, res, next) => {
    let str = '' //因為數據可能太大會分次 所以每次的data事件都要獲取chunk 最後全部放入宣告的str
    req.on('data', (chunk) => {
        str += chunk
    })
    req.on('end', () => { //獲取數據結束
        const body = qs.parse(str) //使用並解析string
        req.body = body //將解析好的數據放入req.body 
        next()
    })
}

module.exports = querystringify //有導入這個模塊就能用req.body得到解析好的數據

