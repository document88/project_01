const mysql2 = require('mysql2')
//初始化
const db = mysql2.createPool({
    host: '127.0.0.1', //IP地址
    user: 'root', //帳號
    password: 's20818308sTK', //密碼
    database: 'my_schema_01', //數據庫名稱
    port: '3307' //端口號
})

//測試SQL運作是否正常
// db.query('select 1', (err, results) => {
//     if(err) return console.log(err.message)
//     console.log(results);
// })

//讀取數據庫
const sqlstr = 'select * from users where status=0'
db.query(sqlstr, (err, results) => {
    if(err) return console.log(err.message)
    console.log(results);
})

//插入數據
// const newUser = {username: 'pig', password: 'pigpass'}
// //用?佔位符
// const insertSqlstr = 'insert into users (username, password) values (?, ?)'
// //[]陣列中的元素取代?佔位符
// db.query(insertSqlstr, [newUser.username, newUser.password], (err, results) => {
//     if(err){
//         console.log(err.message);
//     } else if(results.affectedRows === 1){
//         console.log('插入數據成功');
//     }
// })

//修改數據
// const upUser = {id: 6, username: 'pig2', password: 'pigpass2'}
// //用?佔位符
// const updateSqlstr = 'update users set username=?, password=? where id=?'
// //[]陣列中的元素取代?佔位符
// db.query(updateSqlstr, [upUser.username, upUser.password, upUser.id], (err, results) => {
//     if(err){
//         console.log(err.message);
//     } else if(results.affectedRows === 1){
//         console.log('修改數據成功');
//     }
// })

//修改數據狀態取代刪除數據
// db.query('update users set status=1 where id=?', 6, (err, results) => {
//     if(err){
//         console.log(err.message);
//     } else if(results.affectedRows === 1){
//         console.log('刪除數據成功');
//     }
// })

