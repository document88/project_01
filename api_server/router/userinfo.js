// 導入express
const express = require('express')
// 創建路由對象
const router = express.Router()

//導入被分離的處理函式
const userinfo_handler = require('../router_handler/userinfo')

// 导入验证数据合法性的中间件
const expressJoi = require('@escook/express-joi')
// 导入需要的验证规则对象
const { update_userinfo_schema, update_password_schema, update_avatar_schema} = require('../schema/user')

// 獲取用戶的基本訊息 使用導入的處理函式
router.get('/userinfo', userinfo_handler.getUserInfo)
// 修改用戶訊息 需要驗證用戶所輸入的訊息是否合法
router.post('/userinfo', expressJoi(update_userinfo_schema), userinfo_handler.updateUserInfo)
// 重置密码的路由 需驗證新舊密碼的正確性
router.post('/updatepwd', expressJoi(update_password_schema), userinfo_handler.updatePassword)
// 更新用户头像的路由 須符合驗證規則
router.post('/update/avatar', expressJoi(update_avatar_schema), userinfo_handler.updateAvatar)

// 向外共享路由
module.exports = router