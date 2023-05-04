const express = require('express')
const server = express()
//獲取router外部路由模塊
const router = require('./15.express.Router()')
//使用中間件
const mw = function (req, res, next) {
    req.newTime = new Date() //創建任意req對象,res對象時 其他中間件或路由皆生效
    console.log('觸發全局中間件' + req.newTime);
    next()
}
const mw2 = function (req, res, next) {
    console.log('觸發區域中間件2' + req.newTime);
    next()
}
//使用解決跨域中間件
server.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", " GET, POST, PUT, DELETE, OPTIONS") //允許額外的接口方式
    next();
});
server.use(mw) //全局使用中間件
server.get('/apple', mw2, (req, res) => { //局部使用中間件
    res.send('蘋果是紅色的')
})
//使用路由
server.use(router)
server.listen(8080, () => {
    console.log('http://127.0.0.1:8080');
})