<template>
  <div class="wrap-car">
    <div class="home-search">
      <form action="/">
        <van-search
          v-model="value"
          placeholder="请输入商品名称"
          show-action
          @search="onSearch"
          @cancel="onCancel"
        />
      </form>
    </div>
    <div class="home-swipe">
      <swipe :result="slides"></swipe>
    </div>
    <tabBar :active="0"></tabBar>
  </div>
</template>

<script>
  import tabBar from "../base/tabBar"
  import swipe from "../base/swipe"
  import {getSlidesDate} from "../../api"

  export default {
    name: "Home",
    data(){
      return{
        slides:[],
        value:"酸奶"
      }
    },
    async created(){
      let data = await getSlidesDate();
      this.slides = data.slides;
    },
    methods: {
      onSearch() {

      },
      onCancel(){

      }
    },
    components: {
      tabBar,   // "tabBar":tabbar
      swipe
    }
  }
</script>

<style scoped lang="less">
 .van-swipe{
   max-height:3.6rem;
 }
</style>
