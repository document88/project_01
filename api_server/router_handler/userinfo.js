//導入數據庫模塊
const db = require('../db/index')
//導入密碼加密包 需安裝npm i bcryptjs@2.4.3
const bcrypt = require('bcryptjs')
//導入用戶訊息加密包 需安裝npm i jsonwebtoken@8.5.1
const jwt = require('jsonwebtoken')
//導入密鑰配置文件
const config = require('../config')

//獲取用戶基本訊息的處理函式
exports.getUserInfo = (req, res) => {
    // 根据用户的 id，查询用户的基本信息
    // 注意：为了防止用户的密码泄露，需要排除 password 字段
    const sql = `select id, username, nickname, email, user_pic from ev_users where id=?`
    // 注意：req 对象上的 user 属性，是 Token 解析成功，express-jwt 中间件帮我们挂载上去的
    // 注意:express-jwt解析token後舊版本的用戶id存在req.user.id 新版本在req.auth.id
    db.query(sql, req.user.id, (err, results) => {
        // 1. 执行 SQL 语句失败
        if (err) {
            res.cc(err)
        // 2. 执行 SQL 语句成功，但是查询到的数据条数不等于 1
        } else if (results.length !== 1) {
            res.cc('获取用户信息失败！')
        // 3. 将用户信息响应给客户端
        } else {
            res.send({
                status: 0,
                message: '获取用户基本信息成功！',
                data: results[0],
            })
        }
    })
}

//修改用戶訊息處理函式
exports.updateUserInfo = (req, res) => {
    // 定义待执行的 SQL 语句
    const sql = `update ev_users set ? where id=?`
    // 執行
    db.query(sql, [req.body, req.user.id], (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
      
        // 执行 SQL 语句成功，但影响行数不为 1
        if (results.affectedRows !== 1) return res.cc('修改用户基本信息失败！')
      
        // 修改用户信息成功 status的預設為1 但此處為成功的訊息提示 所以須設置值為0
        return res.cc('修改用户基本信息成功！', 0)
      })
}

// 重置密码的处理函数
exports.updatePassword = (req, res) => {
    // 定义根据 id 查询用户数据的 SQL 语句
    const sql = `select * from ev_users where id=?`
    // 执行 SQL 语句查询用户是否存在
    db.query(sql, req.user.id, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
        // 检查指定 id 的用户是否存在
        if (results.length !== 1) return res.cc('用户不存在！')
        // 判断提交的旧密码是否正确
        const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password)
        if (!compareResult) return res.cc('原密码错误！')

        // 定义更新用户密码的 SQL 语句
        const sql = `update ev_users set password=? where id=?`
        // 对新密码进行 bcrypt 加密处理
        const newPwd = bcrypt.hashSync(req.body.newPwd, 10)
        // 执行 SQL 语句，根据 id 更新用户的密码
        db.query(sql, [newPwd, req.user.id], (err, results) => {
            // SQL 语句执行失败
            if (err) return res.cc(err)
            // SQL 语句执行成功，但是影响行数不等于 1
            if (results.affectedRows !== 1) return res.cc('更新密码失败！')
            // 更新密码成功
            res.cc('更新密码成功！', 0)
        })
    })
  }

// 更新用户头像的处理函数
exports.updateAvatar = (req, res) => {
    //定义更新用户头像的 SQL 语句
    const sql = 'update ev_users set user_pic=? where id=?'
    //调用 db.query() 执行 SQL 语句，更新对应用户的头像
    db.query(sql, [req.body.avatar, req.user.id], (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)    
        // 执行 SQL 语句成功，但是影响行数不等于 1
        if (results.affectedRows !== 1) return res.cc('更新头像失败！')   
        // 更新用户头像成功
        return res.cc('更新头像成功！', 0)
    })
}