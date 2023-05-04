//使用自製包
//利用該目錄下的package.json 裡面的"main" 指向的路徑 進行讀取 或預設讀取index.js
const myBag = require('./myBag_tools')

//格式化時間
let myTime = myBag.dateFormat(new Date())
console.log(myTime);
console.log("----------");

//轉譯HTML
let oldHtml = '<h1 title="h1">這是&nbsp;h1&nbsp;標籤</h1>'
let myHtml = myBag.htmlEscape(oldHtml)
console.log(myHtml);
console.log("----------");

//還原HTML
let unMyHtml = myBag.htmlUnescape(myHtml)
console.log(unMyHtml);
