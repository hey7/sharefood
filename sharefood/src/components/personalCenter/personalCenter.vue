<template>
  <div class="personalCenter">
  <c-header></c-header>
  
  <div class="nav">
      <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose">
      <el-menu-item index="/personalCenter/menu">
        <span slot="title"><router-link to="/personalCenter/menu" tag="div">菜谱</router-link></span>
      </el-menu-item>
      <el-menu-item index="/personalCenter/aa">
        <span slot="title"><router-link to="/personalCenter/aa" tag="div">aa</router-link></span>
      </el-menu-item>
    </el-menu>

    <router-view class="show"></router-view>
  </div>

  </div>
</template>

<script>
import Header from '../header/header';

export default {
  data(){
    return{
    }
  },
  components: {
    'c-header': Header, //头
  },
   methods: {
      handleOpen(key, keyPath) {
        // console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        // console.log(key, keyPath);
      }
    },
};

</script>

<style>
.nav{
    width: 200px;
    position: relative;
}
.show{
    position: absolute;
    left:200px;
    top: 0;
}
</style>
