/*
 * @Author: zhangyufeng 
 * @Date: 2018-06-08 11:01:02 
 * @Last Modified by: zhangyufeng
 * @Last Modified time: 2018-06-08 11:25:52
 */

//  import引入的内容可以提前使用 但是开发的时候写import 必须写在最上面

console.log(this)
// module 是ES6的，自带严格模式

export let a = '珠峰';
export let b = 'zfpx'; // 可以导出多个，但是是一个对象的形式  {a:'珠峰',b:'zfpx'}
export let c = 'zfpx'; // 可以导出多个，但是是一个对象的形式  {a:'珠峰',b:'zfpx'}