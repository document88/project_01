//導入fs
const fs = require('fs')

//調用writeFile()對指定文件寫入內容 路徑 字串 方法 回調函式
//成功 err === null
let newWrite = 'hi i am new 1.txt'
fs.writeFile('./files/1.txt', newWrite, 'utf8', function (err) {
    if (!err) {
        console.log('寫入成功 ' + newWrite);
    } else {
        console.log('寫入失敗 ' + err);
    }
})