//創建express架構服務器
const express = require('express')
const app = express()

//依照客戶端請求發送響應的內容
app.get('/user', (req, res) => {
    console.log(req.query.name); //獲取查詢參數
    res.send({name: '楊文豪', age: 20})
})
app.get('/user/:name', (req, res) => {
    console.log(req.params.name); //獲取動態參數
    res.send({name: '楊文豪', age: 20})
})
app.post('/user', (req, res) => {
    res.send('post請求成功')
})

//啟動express架構服務器
app.listen(8080, () => {
    console.log('http://127.0.0.1:8080');
})