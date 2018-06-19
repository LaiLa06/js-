<template>
  <div class="container">
    <h1>{{$route.params.goodsId}}</h1>
  </div>

</template>

<script>
    export default {
        name: "Detail",
        watch:{
          $route:{
            handle(){
              console.log(this.$route.params);
            },
            immediate:true
          }
        }
    }
</script>

<style scoped lang="less">
  .container{
    h1{
      font-size:12px;
    }
  }
</style>
