<template>
    <div class="community">
        <div class="content">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" active-text-color="#ff6767">
                <el-menu-item index="1" class="font">热门话题</el-menu-item>
                <el-menu-item index="2" class="font">精华日志</el-menu-item>
            </el-menu>
            <div class="right">社区首页</div>
            <div class="show-community">
                <div class="show-community-item">
                </div>
            </div>
        </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //NavMenu 导航菜单 默认页
      activeIndex: '1',

      //展示的数据
      ingredient:[
      ]
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      //   console.log(key, keyPath);
    }
  }
};
</script>
<style lang="less" scoped>
.community {
  width: 100%;
  min-width: 1170px;
  display: flex;
  justify-content: center;
  align-items: center;
  .content {
    width: 1170px;
    position: relative;
    .right {
      position: absolute;
      right: 20px;
      top: 25px;
      font-size: 16px;
      &:hover {
        color: #ff6767;
        cursor: pointer;
      }
    }
    .show-community {
      width: 1170px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      margin-bottom: 20px;
      .show-community-item {

      }
    }
  }
}
.font {
  font-size: 16px !important;
  font-weight: bolder !important;
}
</style>