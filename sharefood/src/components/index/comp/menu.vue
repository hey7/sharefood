<template>
    <div class="menu">
        <div class="content">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item index="1" class="font">新秀</el-menu-item>
                <el-menu-item index="2" class="font">一周热门</el-menu-item> 
                <el-menu-item index="3" class="font">最受欢迎</el-menu-item>     
            </el-menu>
            <div class="right">菜谱首页</div>
            <div class="show-menu">
                <div class="show-menu-item" v-for="(item,index) in menu" :key="index">
                    <div class="img"><img :src="item.pic" alt=""></div>
                    <div class="title">{{item.name}}</div>
                    <div class="username">{{item.username}}</div>
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
      menu:[
      {pic:'static/images/index/shiwu.jpg',name:'西红柿炒鸡蛋',username:'heyi'},
      {pic:'static/images/index/shiwu.jpg',name:'西红柿炒鸡蛋',username:'heyi'},
      {pic:'static/images/index/shiwu.jpg',name:'西红柿炒鸡蛋',username:'heyi'},
      {pic:'static/images/index/shiwu.jpg',name:'西红柿炒鸡蛋',username:'heyi'},
      {pic:'static/images/index/shiwu.jpg',name:'西红柿炒鸡蛋',username:'heyi'},
      {pic:'static/images/index/shiwu.jpg',name:'西红柿炒鸡蛋',username:'heyi'},
      {pic:'static/images/index/shiwu.jpg',name:'西红柿炒鸡蛋',username:'heyi'},
      {pic:'static/images/index/shiwu.jpg',name:'西红柿炒鸡蛋',username:'heyi'}
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
.menu {
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
    .show-menu {
      width: 1170px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      margin-bottom: 20px;
      .show-menu-item {
        width: 235px;
        height: 280px;
        margin: 10px 0;
        &:hover {
          -moz-box-shadow: 0 0 10px #06c;
          -webkit-box-shadow: 0 0 10px #06c;
          box-shadow: 0 0 10px #06c;
        }
        img {
          width: 235px;
          height: 235px;
        }
        .title{
            text-align: center;
            font-size: 18px;
            cursor: pointer;
            &:hover{
               color: #ff6767;
            }
        }
        .username{
            margin-top: 5px;
            text-align: center;
            font-size: 15px;
            cursor: pointer;
            &:hover{
               color: #ff6767;
            }
        }
      }
    }
  }
}
.font{
    font-size: 16px !important; 
    font-weight: bolder !important; 
}
</style>