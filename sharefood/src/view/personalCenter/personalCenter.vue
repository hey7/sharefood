<!--个人中心-->
<template>
  <div class="personalCenter">
    <c-header></c-header>
    <div class="content">
      <div class="nav">
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          router
        >
          <el-menu-item index="/personalCenter/menu">
            <span slot="title">菜谱</span>
          </el-menu-item>
          <el-menu-item index="/personalCenter/myCollection">
            <span slot="title">收藏</span>
          </el-menu-item>
          <el-menu-item index="/personalCenter/aa">
            <span slot="title">私信</span>
          </el-menu-item>
          <el-menu-item index="/personalCenter/aa">
            <span slot="title">通知</span>
          </el-menu-item>
          <el-menu-item index="/personalCenter/mySetting">
            <span slot="title">账户设置</span>
          </el-menu-item>
        </el-menu>
      </div>

      <div class="show">
        <router-view class="view"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../header/header";

export default {
  data() {
    return {};
  },
  components: {
    "c-header": Header //头
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    }
  }
};
</script>
<style lang="less" scoped>
.personalCenter {
  width: 100%;
  position: relative;
  .content {
    .nav {
      width: 210px;
      position: fixed;
      top: 40px;
      bottom: 0;
      overflow: auto;
    }
    .show {
      position: fixed;
      top: 40px;
      left: 210px;
      right: 0;
      bottom: 0;
      overflow: auto;
      .view {
        width: 100%;
        min-width: 1070px;
        position: absolute;
        top: 0;
        left: 0;
        right: 100px;
      }
    }
  }
}
.el-menu {
  height: 100%;
}
</style>
