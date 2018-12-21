<template>
  <div id="app">
  <router-view/>
  </div>
</template>

<script>
export default {
  created(){
    if(localStorage.getItem("user") != null){
      console.log('读取localStorage')
      this.$store.state.user = JSON.parse(localStorage.getItem("user"))
    }
    this.$router.replace("/index"); //跳转(无历史)
  }
 
 
  
};
</script>

<style>
</style>
