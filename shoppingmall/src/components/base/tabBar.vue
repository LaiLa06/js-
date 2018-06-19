<template>
  <!--v-model 被选中标签的索引-->
  <van-tabbar v-model="index">
    <van-tabbar-item icon="home" to="/home">首页</van-tabbar-item>
    <van-tabbar-item icon="completed" to="/list">分类</van-tabbar-item>
    <van-tabbar-item icon="cart" to="/car">购物车</van-tabbar-item>
    <van-tabbar-item icon="contact" to="/personal">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>
    export default {
      name:"tabBar",
      props:['active'],
      data() {
        return {
        }
      },
      computed:{
        index:{
          get(){return this.active},
          set(){}   // 因为写在v-model是双向的，所以要setter
        }
      }
    }
</script>

<style scoped>
  .van-tabbar--fixed{z-index:66}
</style>
