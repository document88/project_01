const http = require('http'); //導入http
//127.0.0.1對應域名localhost
//127.0.0.1:80 僅80端口號可被省略
const server = http.createServer(); //創建Web服務器
server.on('request', (req, res) => {
    res.setHeader('Content-Type', 'text/html;charset=utf-8');
    let message = `當前請求地址: ${req.url}, 當前請求類型: ${req.method}`;
    const urls = req.url;
    let htmls = '404';
    if (urls === '/' || urls === '/index.html') {
        htmls = '首頁';
    } else if (urls === '/about.html') {
        htmls = '<h1>關於網站</h1>'
    }
    console.log(message);
    res.end(htmls);
}); //服務器的request事件 監聽來自客戶端的請求
//req.url 客戶端的請求地址
//req.method 客戶端的請求類型
server.listen(8080, () => {
    console.log('服務器啟動中');
}); //啟動服務器