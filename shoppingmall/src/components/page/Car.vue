<template>
  <div>
    <h1>购物车</h1>
    <tabBar :active="2"></tabBar>
  </div>

</template>

<script>
  import tabBar from "../base/tabBar.vue"

  export default {
    name: "cart",
    components: {
      tabBar
    }
  }
</script>

<style scoped>

</style>
