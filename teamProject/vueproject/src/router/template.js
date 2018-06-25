export default [{
  path: '/',
  meta: {
    title: '入口'
  },
  component: resolve => require(['@/views/template/index'], resolve),
},]
