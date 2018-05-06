

// 一个优秀的插件尽可能支持更多的配置项
// 大部分配置项都是有默认值的

new Banner({
    ele: '#container',      // 操作哪个容器
    //data:[],      // 需要绑定的数据
    url:'' ,     // 数据地址(插件内部帮我们获取数据)
    isArrow:true,    // 是否有左右按钮
    isFocus:true,    // 是否焦点切换
    isAuto:true,     // 是否自动轮播
    defaultIndex:0,   // 起始索引
    interval:3000,     // 切换间隔时间
    speed:200,          // 切换速度
    moveEnd:()=>{},     // 切换结束做什么
});

// 支持拓展

Banner.fn.expand({
    xxx:()=>{}
});