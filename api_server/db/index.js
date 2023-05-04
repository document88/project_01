//導入mysql 需先在終端機安裝npm i mysql@2.18.1
const mysql = require('mysql2')

// 創建數據庫連接對象
const db = mysql.createPool({
    host: '127.0.0.1', //IP地址
    user: 'root', //帳號
    password: 's20818308sTK', //密碼
    database: 'my_schema_01', //數據庫名稱
    port: '3307' //端口號
})

//讀取數據庫(測試)
// const sqlstr = 'select * from ev_users '
// db.query(sqlstr, (err, results) => {
//     if(err) return console.log(err.message)
//     console.log(results);
// })

// 向外共享數據庫對象
module.exports = db