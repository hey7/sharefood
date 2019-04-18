<!--个人中心-->
<template>
  <div class="personalCenter">
    <!--头-->
    <c-header></c-header>

    <!--折叠操作-->
    <div :class="{operation:true,operation1:isCollapse}" @click="isCollapse=!isCollapse">
      <i class="el-icon-d-arrow-right" v-if="isCollapse"></i>
      <i class="el-icon-d-arrow-left" v-else></i>
    </div>

    <!--导航菜单-->
    <div class="content">
      <div class="nav">
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
          :collapse-transition="false"
          router
        >
          <el-menu-item index="/dashbord">
            <i class="el-icon-menu"></i>
            <span slot="title">概览</span>
          </el-menu-item>
          <el-menu-item index="/userSettng">
            <i class="el-icon-menu"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>
          <el-menu-item index="/ingredientSetting">
            <i class="el-icon-menu"></i>
            <span slot="title">食材管理</span>
          </el-menu-item>
          <el-menu-item index="/menuSetting">
            <i class="el-icon-menu"></i>
            <span slot="title">菜谱管理</span>
          </el-menu-item>
          <el-menu-item index="/communitySetting">
            <i class="el-icon-menu"></i>
            <span slot="title">社区管理</span>
          </el-menu-item>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>系统设置</span>
            </template>
            <el-menu-item index="/systemSetting/contentDisplay">
              <span slot="title">内容展示</span>
            </el-menu-item>
            <el-menu-item index="/systemSetting/dictionary">
              <span slot="title">字典</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </div>

      <!--内容-->
      <div :class="{show:true,show1:isCollapse}">
        <router-view class="view"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../header/Header";

export default {
  data() {
    return {
      isCollapse: true
    };
  },
  components: {
    "c-header": Header //头
  },
  methods: {}
};
</script>
<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.personalCenter {
  width: 100%;
  position: relative;
  .operation {
    width: 20px;
    height: 100px;
    border: #cccccc solid 1px;
    box-shadow: 1px 0 2px gray;
    border-radius: 0px 10px 10px 0;
    border-left: 0px;
    position: fixed;
    top: 200px;
    left: 200px;
    z-index: 1000;
    text-align: center;
    line-height: 100px;
  }
  .operation1 {
    left: 64px;
  }
  .content {
    height: 100%;
    position: relative;
    .nav {
      position: fixed;
      top: 40px;
      bottom: 0;
      overflow: auto;
    }
    .show {
      position: fixed;
      top: 40px;
      left: 230px;
      right: 0;
      bottom: 0;
      overflow: auto;
    }
    .show1 {
      left: 94px;
    }
    .view {
      min-width: 1070px;
      position: absolute;
      top: 0;
      left: 10px;
      right: 20px;
    }
  }
}
.el-menu {
  height: 100%;
}
</style>
