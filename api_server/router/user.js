// 導入express以http為基礎的伺服器架構
const express = require('express')
//創建路由對象
const router = express.Router()

//導入被抽離的處理函式
const userHandler = require('../router_handler/user')

// 1. 导入验证表单数据的中间件 需安裝npm i @escook/express-joi
const expressJoi = require('@escook/express-joi')
// 2. 导入需要的验证规则对象
const { reg_login_schema } = require('../schema/user')

//用戶註冊 插入局部中間件來驗證表單後 再執行加密和存入數據庫
router.post('/reguser', expressJoi(reg_login_schema), userHandler.regUser)
//用戶登入 插入局部中間件來驗證表單
router.post('/login', expressJoi(reg_login_schema), userHandler.login)

//導出路由對象
module.exports = router
