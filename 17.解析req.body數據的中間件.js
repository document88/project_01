const express = require('express')
const server = express()

server.use(express.json()) //使用json解析中間件
server.use(express.urlencoded({extended: false})) //使用URL-encoded解析中間件
server.post('/post', (req, res) => {
    res.send('post完成')
    console.log(req.body); //若沒有解析則req.body===undefined
})

server.listen(8080, () => {
    console.log('http://127.0.0.1:8080');
})