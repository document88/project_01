//調用fs
const fs = require('fs');

//調用readFile()讀取文件內容 路徑 方式 回調函式
//失敗 dataStr === undefined
//成功 err === null 
fs.readFile('./files/成績單.txt', 'utf8', function (err, dataStr) {
    if (dataStr) {
        console.log('讀取成功 ' + dataStr);
        let string1 = dataStr.replaceAll('=', ':')
        let string2 = string1.replaceAll(' ', '\n')
        console.log(string2);   
    } else {
        console.log('讀取失敗 ' + err);
    }
})