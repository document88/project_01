//路由模塊化
const express = require('express')
const router = express.Router()
const querystringify = require('./18.querystringify') //導入18轉譯模塊

router.use(querystringify) //使用18轉譯模塊
//get請求
router.get('/get', (req, res) => {
    const query = req.query
    res.send({
        status: 0, 
        msg: 'get成功', 
        data: query
    })
})
//post請求
router.post('/post', (req, res) => {
    const body = req.body
    res.send({
        status: 0, 
        msg: 'post成功', 
        data: body
    })
})
//delete請求
router.delete('/delete', (req, res) => {
    res.send({
        status: 0, 
        msg: 'delete成功', 
        data: req.query
    })
})
//jsonp的get請求
router.get('/jsonp', (req, res) => {
    const funcName = req.query.callback //從客戶端得到的函式名稱
    const dataJsonp = {name: 'jsonp', from: '服務器'} //要給客戶端的數據
    const scriptStr = `${funcName}(${JSON.stringify(dataJsonp)})` //拼接要調用的函式
    res.send(scriptStr) //傳送給客戶端
})



module.exports = router