const fs = require('fs'); //調用fs
const path = require('path'); //調用path
const regStyle = /<style>([\s\S]*)<\/style>/; //正則篩選style
const regScript = /<script>([\s\S]*)<\/script>/; //正則篩選script

//讀取原始文件 再用正則篩選CSS,JS,HTML
fs.readFile(path.join(__dirname, '/files/時鐘.html'), 'utf8', function (err, dataStr) {
    if (err) return console.log('讀取失敗');
    resolveCSS(dataStr)
    resolveJS(dataStr)
    resolveHTML(dataStr)
})

//正則篩選Style 並寫入新的CSS文檔
function resolveCSS(htmlStr) {
    let r1 = regStyle.exec(htmlStr)
    let clockCSS = r1[1] //在篩選條件裡()中匹配的字串會放在[1], 包含前後匹配條件的全字串則放在[0]
    fs.writeFile(path.join(__dirname, './files/newClock/index.css'), clockCSS, 'utf8', function (err) {
        if (!err) {
            console.log('寫入CSS成功 ');
        } else {
            console.log('寫入CSS失敗 ' + err);
        }
    })
}

//正則篩選Script 並寫入新的JS文檔
function resolveJS(htmlStr) {
    let r1 = regScript.exec(htmlStr)
    let clockJS = r1[1] //在篩選條件裡()中匹配的字串會放在[1], 包含前後匹配條件的全字串則放在[0]
    fs.writeFile(path.join(__dirname, './files/newClock/index.js'), clockJS, 'utf8', function (err) {
        if (!err) {
            console.log('寫入JS成功 ');
        } else {
            console.log('寫入JS失敗 ' + err);
        }
    })
}

//修改HTML移除CSS和JS改為外部連結
function resolveHTML(htmlStr) {
    let clockHTML = htmlStr.replace(regStyle, '<link rel="stylesheet" href="/index.css"/>').replace(regScript, '<script src="/index.js"></script>')
    fs.writeFile(path.join(__dirname, '/files/newClock/index.html'), clockHTML, 'utf8', function (err) {
        if (!err) {
            console.log('寫入HTML成功 ');
        } else {
            console.log('寫入HTML失敗 ' + err);
        }
    })
}
