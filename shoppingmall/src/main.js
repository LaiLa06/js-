// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 导入vant全部样式
// import Vant from "vant"
// import 'vant/lib/vant-css/index.css';

// 使用babel-plugin-import按需导入
import { Tabbar, TabbarItem,Icon,Lazyload,Search,Row, Col,Button,Cell, CellGroup} from 'vant';
// 需要哪个模块就use哪个模块  每次use只能放一个
Vue.use(Icon).use(Tabbar).use(TabbarItem).use(Lazyload).use(Search).use(Row).use(Col).use(Button).use(Cell).use(CellGroup);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  render: (h) => h(App)  // 定义入口文件，一进来就加载
});

let w = document.documentElement.clientWidth || document.body.clientWidth;
document.documentElement.style.fontSize =  w/640*100+"px";
