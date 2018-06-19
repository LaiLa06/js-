<template>
  <van-swipe :autoplay="3000">
    <van-swipe-item v-for="(item, index) in slides" :key="index">
      <img v-lazy="item.image" width="100%"/>
    </van-swipe-item>
  </van-swipe>
</template>

<script>
  import {Swipe, SwipeItem} from "vant"

  export default {
    name: "swipe",
    props:["slides"],
    components: {

      [Swipe.name]: Swipe,   // 等价 "van-swipe":Swipe  这点很重要，宝宝之前不会
      [SwipeItem.name]: SwipeItem
    }
  }
</script>

<style scoped>

</style>
