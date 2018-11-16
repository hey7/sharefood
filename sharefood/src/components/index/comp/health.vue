<template>
    <div class="health">
        <div class="content">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" active-text-color="#ff6767">
                <el-menu-item index="1" class="font">健康</el-menu-item>
            </el-menu>
            <div class="right">健康首页</div>
            <div class="show-health">
                
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
    }
  },
  methods: {
    handleSelect(key, keyPath) {
    //   console.log(key, keyPath);
    }
  }
};
</script>
<style lang="less" scoped>
.health {
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
      &:hover{
        color: #ff6767;
        cursor: pointer;
      }
    }
    .show-health {
      width: 1170px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      margin-bottom: 20px;
      .show-health-item {

      }
    }
  }
}
.font{
    font-size: 16px !important; 
    font-weight: bolder !important; 
}
</style>