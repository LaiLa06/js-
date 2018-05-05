/*
 * @Author: zhangyufeng 
 * @Date: 2018-04-09 12:31:20 
 * @Last Modified by: zhangyufeng
 * @Last Modified time: 2018-04-17 10:57:15
 * 文件注释：快捷键 ctrl+Alt+i
 */

    /**
     * 方法注释：ctrl+alt+D 点击两次
     * 
     * @param {any} curEle 
     * @returns 
     */
    function next(curEle){
      var nextEle = curEle.nextSibling;
      while(nextEle && nextEle.nodeType!==1){
        nextEle = nextEle.nextSibling;
      }
      return nextEle;
    }

    function sibling(curEle){
      var prev = curEle.parentNode.childNodes,
          result = [];
      for(var i=0;i< prev.length;i++){
        if(prev[i].nodeType===1 && prev[i]!==curEle){
          result.push(prev[i]);
        }
    }
      return result
    }
  // 3. 获取所有的哥哥元素节点
  function prevAll(curEle){
    var prev = curEle.previousSibling,
          result = [];
    while (prev) {
      if(prev.nodeType === 1){
        result.push(prev);
      } 
      prev = prev.previousSibling;
    }
    return result;
  }
  // 4.获取所有的弟弟元素节点
  function nextAll(curEle){
    var next = curEle.nextSibling,
          result = [];
    while (next) {
      if(next.nodeType === 1){
        result.push(next);
      } 
      next = next.nextSibling;
    }
    return result;
  }
  
  // 5.获取当前的索引
  function index(curEle){
    var prev = curEle.previousSibling,
          result = [],
          index = null;
    while (prev) {
      if(prev.nodeType === 1){
        result.push(prev);
      } 
      prev = prev.previousSibling;
    }
    index = result.length;
    return index;
  }
  
//   6.获取当前元素的所有元素子节点
function children(curEle){
  // 获取当前元素下所有的子节点，然后遍历这些节点，筛选出元素的 nodeType==1，然后把结构存储起来
  var nodeList = curEle.childNotes,
      result = [];
   for(var i=0 ; i< nodeList;i++){
    var item = nodeList[i];
    if(item.nodeType===1){
      result.push(item);
    }
   }
  return result
}
// 7. 获取当前元素的上一个哥哥元素节点
function prev(curEle){
  // 先找当前元素的哥哥节点，看是否为元素节点，如果不是，基于哥哥找哥哥的哥哥...,一直到找到为止，或者找不到，自己是老大，则结束查找.(不知道查找几次，所有用while判断)
  var prev = curEle.previousSibling;
  while(prev && prev.noteType!==1){
    prev = prev.previousSibling;
  }
  return prev
}
