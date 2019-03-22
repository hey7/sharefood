<template>
  <div class="search">
    <div class="img">
      <img src="static/images/index/logo.jpg" alt>
    </div>
    <div class="navigation">
      <el-row  type="flex" justify="center">
        <el-col :span="4">
          <div><router-link to="/index" tag="li" style="color:#ff6767">首页</router-link></div>
        </el-col>
        <el-col :span="4">
          <div><router-link to="/index" tag="li">菜谱</router-link></div>
        </el-col>
        <el-col :span="4">
          <div><router-link to="/index" tag="li">食材</router-link></div>
        </el-col>
         <el-col :span="4">
          <div><router-link to="/index" tag="li">社区</router-link></div>
        </el-col>
         <el-col :span="4">
          <div><router-link to="/index" tag="li">个人中心</router-link></div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
.search {
  width: 100%;
  height: 90px;
  min-width: 1170px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  .img {
    position: absolute;
    left: 120px;
    height: 60px;
    top: 15px;
    img {
      height: 60px;
    }
  }
  .navigation {
    // height: 25px;
    width: 600px;
    text-align: center;
    active:hover {
        color: #ff6767;
      }
    // overflow: hidden;
    li {
      cursor: pointer;
      font-size: 20px;
      &:hover {
        color: #ff6767;
      }
    }
  }
}
</style>
