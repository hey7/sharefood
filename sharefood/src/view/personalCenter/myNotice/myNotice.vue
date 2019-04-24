<!--通知-->
<template>
  <div class="myNotice">
    <div class="nav">
      <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" router>
        <el-menu-item index="/personalCenter/myNotice/checked">审核</el-menu-item>
        <el-menu-item index="/personalCenter/myNotice/reports">举报</el-menu-item>
      </el-menu>
    </div>
    <div class="show">
      <router-view class="view"></router-view>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {},
  methods: {}
};
</script>
<style lang="less" scoped>
.myNotice {
  .nav {
    margin: 0 10px;
  }
  .show {
    margin: 10px;
  }
}
</style>