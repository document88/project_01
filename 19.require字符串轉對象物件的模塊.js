const express = require('express')
const server = express()
const querystringify = require('./18.querystringify') //導入18模塊

server.use(querystringify) //使用轉譯

server.post('/post', (req, res) => {
    res.send('post完成')
    console.log(req.body); //若沒有解析則req.body===undefined
})

server.listen(8080, () => {
    console.log('http://127.0.0.1:8080');
})