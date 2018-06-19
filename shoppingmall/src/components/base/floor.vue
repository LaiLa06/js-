<template>
  <div class="floor">
    <div class="floor-1">
      <div class="floor-left"><img :src="floor[0].image" alt="" width="100%"></div>
      <div class="floor right">
        <div><img :src="floor[1].image" alt="" width="100%"></div>
        <div><img :src="floor[2].image" alt="" width="100%"></div>
      </div>
    </div>
    <div class="floor-2">
      <div v-for="item in floor.slice(3)">
        <img :src="item.image" alt="" width="100%">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "floor",
    props:{
      floor:{
        type:Array,
        default:[]
      }
    }
  }
</script>

<style scoped lang="less">
  .floor{
    .floor-1{
      display:flex;flex-direction:row;flex-wrap: nowrap;height:200px;background-color:#fff;
      .floor-left{width:8rem;img{height:200px}}
      .floor-right{}
    }
    .floor-2{
      display:flex;flex-direction:row;flex-wrap:wrap;
      div{
        width:50%;box-sizing:border-box;
        &:nth-child(2n-1){
          border-right:1px solid #EBEBEB;
        }
      }
    }
  }
</style>
