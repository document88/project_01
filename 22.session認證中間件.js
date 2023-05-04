//npm install express-session 安裝

const session = require('express-session') //導入
app.use( //配置中間件
  session({
    secret: 'Bruce', // secret 的值为任意字符串
    resave: false,
    saveUninitalized: true,
  })
)