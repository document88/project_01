let myName = 'Jeff'
module.exports.hisName = 'Hahaha'
//module.exports = {} 將會指向新地址 在這之前給的參數不會顯示
module.exports = {
    myName: myName,
    sayHello: () => {
        console.log('Hello!');
    }
}
//相同的參數會覆蓋沒有重複的會新增
module.exports.myName = 'Keven'
module.exports.yourName = 'Emma'