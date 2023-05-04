## 安裝

```

npm install itheima_myfirst_tools

```


## 導入

```js

const itheima = require('itheima_myfirst_tools')

```


## 格式化時間

```js

//調用dateFormat()
let oldTime = new Date()
let myTime = itheima.dateFormat(oldTime)
//範例: 2023年02月09日 星期四 下午 07:25:18
console.log(myTime);

```


## 轉譯HTML特殊字符

```js

//調用htmlEscape()
let oldHtml = '<h1 title="h1">這是&nbsp;h1&nbsp;標籤</h1>'
let myHtml = itheima.htmlEscape(oldHtml)
//範例: &lt;h1 title=&quot;h1&quot;&gt;這是&amp;nbsp;h1&amp;nbsp;標籤&lt;/h1&gt;
console.log(myHtml);

```


## 還原HTML特殊字符

```js

//調用htmlUnescape()
let unMyHtml = itheima.htmlUnescape(myHtml)
//範例: <h1 title="h1">這是&nbsp;h1&nbsp;標籤</h1>
console.log(unMyHtml);

```


## 開源協議

ISC