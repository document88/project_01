const { sayHello } = require('./08.module.exportsToGetObj.js');
const get08 = require('./08.module.exportsToGetObj.js')
console.log(get08);
//使用該模塊對外共享的function
sayHello();
