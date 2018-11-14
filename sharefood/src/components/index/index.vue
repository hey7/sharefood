<template>
  <div class="index">
  <c-header></c-header>
  
  <router-view/>
  </div>
</template>

<script>
import Header from "../header/Header";
export default {
  components: {
    "c-header": Header
  }
};
</script>

<style>
</style>
