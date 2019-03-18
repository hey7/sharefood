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
      {pic:'static/images/index/shiwu.jpg',name:'鸡翅根卤蛋',username:'舌尖居士'},
      {pic:'static/images/index/shiwu1.jpg',name:'千层肉饼',username:'金凤栖梧'},
      {pic:'static/images/index/shiwu2.jpg',name:'干锅手撕包菜',username:'甜宝妈咪美食坊'},
      {pic:'static/images/index/shiwu3.jpg',name:'五花肉煲腐竹',username:'零下一度0511'},
      {pic:'static/images/index/shiwu4.jpg',name:'可乐鸡翅',username:'美食天下'},
      {pic:'static/images/index/shiwu5.jpg',name:'葱花蛋饼',username:'欣欣向荣2388'},
      {pic:'static/images/index/shiwu6.jpg',name:'金汤肥牛',username:'格蓝蓝'},
      {pic:'static/images/index/shiwu7.jpg',name:'南瓜小汤圆红豆汤',username:'斯佳丽WH'}
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
            color: #999;
            font-size: 12px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
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