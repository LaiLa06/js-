import Vue from 'vue'
import Router from 'vue-router'
import template from './template'   /*路由分为一个模块一个模块，最后都在index中合并为一个文件*/

Vue.use(Router);

const routes =[].concat(template);

const router = new Router({
  routes
});
export default router;
