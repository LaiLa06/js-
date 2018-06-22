import React from 'react';
import ReactDOM, {render} from 'react-dom';
import PropTypes from 'prop-types';
import Banner from "./component/Banner";
// 公共的样式资源在index中导入（组件独有的在组件内部导入）,在react的JSX中，需要使用图片等资源的时候，资源的地址不能使用相对地址
// （因为经过webpack编译后，资源地址的路径已经改变了，原有的相对地址无法找到对应的资源），此时我们需要基于es6Module或者CommonJS等模块导入规范，把资源当做模块
// 导入进来（或者我们使用的图片地址是线上地址http://....）
import './static/css/reset.min.css'

let IMG_DATA = [];
for (let i = 1; i < 6; i++) {
    IMG_DATA.push({
        id:i,
        title:'',
        pic:require(`./static/images/${i}.jpg`)
    })
}

ReactDOM.render(<main>
    {/*
      data:轮播图需要绑定的数据 interval轮播间隔时间（默认3000ms）， step 默认展示图片的索引（前后各克隆了一张）（默认1）speed每张切换所需要的时间（默认300ms）
    */}
   <Banner data={IMG_DATA} interval={3000} step={1} speed={300}/>
   <Banner data={IMG_DATA.slice(1)} interval={5000} step={2}/>
</main>,root)