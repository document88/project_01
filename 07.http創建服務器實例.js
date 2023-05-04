const http = require('http');
const fs = require('fs');
const path = require('path');

//創建Web服務器
const server = http.createServer(); 
server.on('request', (req, res) => {
    const urls = req.url;
    let filePath = ''
    if (urls === '/' || urls === '/files/newClock/index.html' || urls === '/files/newclock/index.html') {
        filePath = path.join(__dirname, '/files/newClock/index.html')
    } else {
        filePath = path.join(__dirname, './files/newClock', urls)
    }
    fs.readFile(filePath, 'utf8', (err, dataStr) => {
        if (err) return res.end('<h1>404 Not found</h1>')
        res.end(dataStr)
    })
});
server.listen(8080, () => {
    console.log('server at http://127.0.0.1:8080');
});