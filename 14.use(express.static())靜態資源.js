const express = require('express')
const server = express()
//外部連結該目錄底下的資源
server.use(express.static('./files/newClock'))

server.listen(8080, () => {
    console.log('go to the http://127.0.0.1:8080')
})