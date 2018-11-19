<template>
<div class="menu">

  <div class="title">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="我的菜谱" name="first">我的菜谱</el-tab-pane>
      <el-tab-pane label="待审核" name="second">待审核</el-tab-pane>
      <el-tab-pane label="退稿箱" name="third">退稿箱</el-tab-pane>
      <el-tab-pane label="草稿箱" name="fourth">草稿箱</el-tab-pane>
    </el-tabs>
     <div class="button"><el-button type="primary" size="small" @click="toCreateMenu">发布新菜谱</el-button></div>
    
  </div>

  

</div>
</template>
<script>
  export default {
    data() {
      return {
        //Tabs 标签页 选中哪个
        activeName: 'first'
      };
    },
    methods: {
       //Tabs 标签页 切换，清空错误提示
      handleClick(tab, event) {
        //console.log(tab, event);
      },
      toCreateMenu(){
       //this.router.push({path:'/personalCenter/createMenu'})
       this.$router.push({path:'/personalCenter/createMenu'})
      }

    }
  };
</script>
<style lang="less" scoped>
.menu{
  margin-left: 10px;
  position: relative;
  .button{
    position: absolute;
    right: 10px;
    top: 5px;
  }
}
</style>
