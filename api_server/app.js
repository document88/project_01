// 導入express以http為基礎的伺服器架構 需在終端機安裝npm i express@4.17.1
const express = require('express')
// 創建伺服器實例對象
const app = express()
// 導入cors中間件來處理跨域問題 需在終端機安裝npm i cors@2.8.5
const cors = require('cors')
// 全局使用cors中間件
app.use(cors())
// 使用express內建中間件來解析表單數據
app.use(express.urlencoded({ extended: false}))

// 使用第三方中間件用來驗證表單是否合法
const joi = require('joi')
// 導入密鑰配置文件
const config = require('./config')
// 導入解析 token 的中间件 需安裝npm i express-jwt@5.3.3 注意:這裡解析後舊版本的用戶id存在req.user.id 新版本在req.auth.id
const expressJWT = require('express-jwt')

// 在路由前封裝res.cc優化res.send()的訊息代碼
app.use((req, res, next) => {
    // 需提示錯誤的情況比較多所以status預設為1使用函式時如果試題是錯誤的話輸入err的值就好
    res.cc = function (err, status = 1) {
        res.send({
            // 這裡對象中的屬性名與屬性值的變量名相同時可省略只寫一個
            status,
            // 判斷err的狀態列別 是Error則傳送err.message 否則傳送err
            message: err instanceof Error ? err.message : err
        })
    }
    // 中間件需記得使用next()用來銜接下一個中間件或路由
    next()
})

// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 JWT 的身份认证
// 也就是除了在api進行登入或註冊不要鑰密鑰 其他的接口操作時需要密鑰
// 客戶端需輸入密鑰Headers.authorization = Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiIiLCJwYXNzd29yZCI6IiQyYSQxMCQuVE9BaXIvb3ByQXN6MkRlcC9US2RPREpnWVR1QnV2S0FtWkRhbUc4blFocmR2Zm55NjlaYSIsIm5pY2tuYW1lIjoicmVkcGluZWFwcGxlMyIsImVtYWlsIjoiYXBwbGUzQGdtYWlsLmNvbSIsInVzZXJfcGljIjoiIiwiaWF0IjoxNjgxNzE0MDU2LCJleHAiOjE2ODE3NTAwNTZ9.OtyDDCx4PP6AoRMPgazzZRwxq4-3PerGI285DrGtnuY
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] }))

// 導入路由模塊 登入註冊
const userRouter = require('./router/user')
// 使用路由模塊並指定使用路由時的前綴
app.use('/api', userRouter)

// 導入路由模塊 個人訊息
const userinfoRouter = require('./router/userinfo')
// 注意：以 /my 开头的接口，都是有权限的接口，需要进行 Token 身份认证
// headers.authorization = 密鑰(在登入時獲取)
app.use('/my', userinfoRouter)

// 导入并使用文章分类路由模块
const artCateRouter = require('./router/artcate')
// 为文章分类的路由挂载统一的访问前缀 /my/article
app.use('/my/article', artCateRouter)

// 错误中间件
app.use(function (err, req, res, next) {
    // 数据验证失败
    if (err instanceof joi.ValidationError) return res.cc(err)
    // 使用JWT身分認證失敗
    if (err.name === 'UnauthorizedError') return res.cc('身分認證失敗！')
    // 未知错误
    res.cc(err)
})

// 用.listen指定端口號並啟動伺服器
app.listen(3007, () => {
    console.log('api server running at http://127.0.0.1:3007');
})

