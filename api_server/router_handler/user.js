//這裡負責處理從router中抽離的處理函式

//導入數據庫
const db = require('../db/index')
//導入密碼加密包 需安裝npm i bcryptjs@2.4.3
const bcrypt = require('bcryptjs')
//導入用戶訊息加密包 需安裝npm i jsonwebtoken@8.5.1
const jwt = require('jsonwebtoken')
//導入密鑰配置文件
const config = require('../config')

//用戶註冊的處理函式
exports.regUser = (req, res) => {
    //接收用戶表單數據
    const userinfo = req.body
    //使用第三方模塊在路由插入局部中間件確認數據是否合法 所以這裡不用再確認
    // if (!userinfo.username || !userinfo.password) {
    //     res.send({ status: 1, message: '用戶名或密碼不得為空' })
    // } else {
        //如果數據合法則查詢數據庫確認用戶名是否重複
        const sql_select = 'select * from ev_users where username=?'
        db.query(sql_select, userinfo.username, (err, results) => {
            if (err) {
                //使用封裝簡化res.send({ status: 1, message: err.message})
                res.cc(err)
            } else if (results.length > 0) {
                //使用封裝簡化res.send({ status: 1, message: '用戶名已被使用'})
                res.cc('用戶名已被使用')
            } else {
                console.log(userinfo);
                //對明文密碼加密
                userinfo.password = bcrypt.hashSync(userinfo.password, 10)
                console.log(userinfo);
                //獲取用戶輸入的數據並存入數據庫
                const sql_insert = 'insert into ev_users set ?'
                db.query(sql_insert, {username: userinfo.username, password: userinfo.password}, (err, results) => {
                    if (err) {
                        //使用封裝簡化res.send({ status: 1, message: err.message})
                        res.cc(err)
                    } else if (results.affectedRows !== 1) {
                        //使用封裝簡化res.send({ status: 1, message: '註冊失敗,請稍後再試'})
                        res.cc('註冊失敗,請稍後再試')
                    } else {
                        //使用封裝簡化res.send({ status: 0, message: '註冊成功' })
                        res.cc('註冊成功', 0)
                    }
                })
            }
        })
    // }
}
//用戶登入的處理函式
exports.login = (req, res) => {
    //接收用戶表單數據
    const userinfo = req.body
    //查詢用戶所輸入的username是否存在於數據庫中
    const sql_select = `select * from ev_users where username=?`
    db.query(sql_select, userinfo.username, (err, results) => {
        if (err) {
            res.cc(err)
        } else if (results.length !== 1) {
            res.cc('登入失敗！')
        } else {
            //调用 bcrypt.compareSync(用户提交的密码, 数据库中的密码) 用來對比用戶提交的明碼與數據庫中被加密的密碼
            const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
            // 如果对比的结果等于 false, 则证明用户输入的密码错误
            if (!compareResult) {
                res.cc('密碼錯誤,登录失败！')
            } else {
                // 獲取用戶訊息並除去name與pic
                const user = {...results[0], username: '', user_pic: ''}
                // 生成 Token 字符串 使用導入的密鑰配置文件
                const tokenStr = jwt.sign(user, config.jwtSecretKey, {
                    expiresIn: config.expiresIn,
                })
                // 
                res.send({
                    status: 0,
                    message: '登入成功!',
                    token: 'Bearer ' + tokenStr
                })
            }
        }
    })
}