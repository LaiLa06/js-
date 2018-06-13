<template>
  <div>
    <h1>list</h1>
    <tabBar :active="1"></tabBar>
  </div>

</template>

<script>
  import tabBar from "../base/tabBar.vue"

  export default {
    name: "list",
    components: {
      tabBar
    }
  }
</script>

<style scoped>

</style>
