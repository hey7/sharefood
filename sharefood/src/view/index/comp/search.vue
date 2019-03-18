<template>
    <div class="search">
   <div class="img"><img src="static/images/index/logo.jpg" alt=""></div>
   <div class="navigation">
       <ul>
           <li><router-link to="/login" tag="div" style="color:#ff6767">首页</router-link></li>
           <li><router-link to="/index" tag="div">菜谱</router-link></li>
           <li><router-link to="/index" tag="div">食材</router-link></li>
           <li><router-link to="/index" tag="div">健康</router-link></li>
           <li><router-link to="/index" tag="div">社区</router-link></li>
       </ul>
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
    height: 25px;
    width: 500px;
    background-color: white;
    overflow: hidden;
    li {
      float: left;
      text-align: center;
      width: 100px;
      cursor: pointer;
      font-size: 20px;
      line-height: 25px;
      &:hover{
          color: #ff6767;
      }
    }
  }
}
</style>
