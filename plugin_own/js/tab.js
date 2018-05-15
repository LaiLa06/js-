
let hasClass = function (ele,str) {
   return ele.className.trim().split(/ +/).indexOf(str)>=0
};
let addClass = function (ele,str) {
  if(hasClass(ele,str)) return;
  ele.className += ` ${str}`;
};
let removeClass = function (ele,str) {
  if(!hasClass(ele,str)) return;
  ele.className = ele.className.trim().split(/ +/).filter(item=>{
      return item!==str
  }).join(" ");
};

let tabBox = document.getElementById("tabBox"),
    childAry = tabBox.children,   // 获取所有的元素子元素
    option = null,
    conList = null,
    optionList = null;

option = [...childAry].filter(item=>hasClass(item,'option'));
option = option.length > 0?option[0]:null;
optionList = [...option.children].filter(item=>item.tagName==='LI');
conList = [...childAry].filter(item=>hasClass(item,'con'));

let lastIndex = 0;
optionList.forEach((item,index)=>{
  item.onmousemove = function () {
    if(lastIndex === index) return;
    addClass(this,'active');
    removeClass(optionList[lastIndex],'active');

    addClass(conList[index],'active');
    removeClass(conList[lastIndex],'active');

    lastIndex = index;
  }
});
