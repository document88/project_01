//格式化時間
function dateFormat(newTime) {
    const dt = new Date(newTime)
    var day = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    let getday = day[dt.getDay()]; //星期幾
    let year = dt.getFullYear(); //年
    let month = addZero(dt.getMonth() + 1); //月//月份是0~11所以須加1
    let date = addZero(dt.getDate()); //日   
    let hours = amPm(dt.getHours()); //點
    let minutes = addZero(dt.getMinutes()); //分
    let seconds = addZero(dt.getSeconds()); //秒
    return `${year}年${month}月${date}日 ${getday} ${hours}:${minutes}:${seconds}`
}
//數字小於9補0
function addZero(n) {
    return n > 9 ? n : '0' + n
}
//小於12就上午大於12就下午
function amPm(n) {
    if (n < 12) {
        return n = '上午 ' + addZero(n)
    } else if (n > 12) {
        return n = '下午 ' + addZero(n - 12)
    }
}

//向外共享
module.exports = {
    dateFormat
}
