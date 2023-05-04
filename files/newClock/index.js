
        let newSeconds = null;
        window.setInterval(function () {
            // 時間相關 new Date() = Thu Aug 25 2022 11:04:22 GMT+0800 (台北標準時間)
            var day = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
            let getday = day[new Date().getDay()]; //星期幾
            let year = new Date().getFullYear(); //年
            let month = new Date().getMonth() + 1; //月//月份是0~11所以須加1
            let date = new Date().getDate(); //日   
            let hours = new Date().getHours(); //點
            let minutes = new Date().getMinutes(); //分
            let seconds = new Date().getSeconds(); //秒
            hours = hours < 10 ? '0' + hours : hours
            minutes = minutes < 10 ? '0' + minutes : minutes
            seconds = seconds < 10 ? '0' + seconds : seconds
            if (newSeconds !== seconds) {
                let time1 = document.querySelector('.timeBox .time');
                let time2 = document.querySelector('.timeBox2 .time2');
                time1.innerHTML = `${year}年${month}月${date}號 ${getday} ${hours}:${minutes}:${seconds}`;
                time2.innerHTML = `${year}年${month}月${date}號 ${getday} ${hours}:${minutes}:${seconds}`;
            }
            newSeconds = seconds;
        }, 200)
    