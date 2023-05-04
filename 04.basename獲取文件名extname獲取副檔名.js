const path = require('path')//調用path

const where = path.join(__dirname, '/files/1.txt') //拼接路徑(當前文件根目錄,'目錄下的路徑')
const ext = path.extname(where) //獲取文件的副檔名
const names = path.basename(where, ext) //獲取去除副檔名的文件的名稱
console.log(names);