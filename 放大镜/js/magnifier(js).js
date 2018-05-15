let smallBox = document.querySelector(".smallBox"),
    mark = null,
    bigBox = document.querySelector(".bigBox"),
    bigImg = bigBox.querySelector("img");
// 鼠标滑入：创建mark
smallBox.onmouseenter = function () {
    if(mark){
        mark.style.display = 'block';
        // 这里如果是移除removeChild的方法，这个是DOM的移除，但是mark是变量，并没有移除，
        // 如果要移除，可以让mark = null
        return
    }
    mark = document.createElement("div");
    mark.className = 'mark';
    this.appendChild(mark);
    mark.style.display = 'block';
};

// 鼠标移动，让mark也跟着移动
smallBox.onmousemove = function (ev) {
    let curL = ev.pageX - mark.offsetWidth / 2 - this.offsetLeft,
        curT = ev.pageY - mark.offsetHeight / 2 - this.offsetTop;
    let minL = 0,
        minT = 0,
        maxL = this.offsetWidth - mark.offsetWidth,
        maxT = this.offsetHeight - mark.offsetHeight;
    curL = curL < minL ? minL : (curL > maxL ? maxL : curL);
    curT = curT < minT ? minT : (curT > maxT ? maxT : curT);

    mark.style.left = curL + 'px';
    mark.style.top = curT + 'px';

    bigImg.style.left = -curL*3+'px';
    bigImg.style.top = -curT*3 +'px';
};

smallBox.onmouseleave = function () {
  mark.style.display = 'none';
};


//在大盒子嵌套小盒子的时候，因为事件冒泡机制，我们是不建议使用onmouseover很onmouseleaver
