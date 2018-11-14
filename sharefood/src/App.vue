<template>
  <div id="app">
  <router-view/>
  </div>
</template>

<script>
export default {
  created(){
    this.$router.replace("index"); //跳转(无历史)
  }
};
</script>

<style>
</style>
