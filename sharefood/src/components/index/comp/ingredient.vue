<template>
    <div class="ingredient">
        <div class="content">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" active-text-color="#ff6767">
                <el-menu-item index="1" class="font">时令食材</el-menu-item>
            </el-menu>
            <div class="right">食材首页</div>
            <div class="show-ingredient">
                <div class="show-ingredient-item" v-for="(item,index) in ingredient" :key="index">
                    <div class="img"><img :src="item.pic" alt=""></div>
                    <div class="name">{{item.name}}</div>
                    <div class="title">{{item.title}}</div>
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
        {pic:'static/images/index/shicai.jpg',name:'大萝卜',title:'heyi'},
        {pic:'static/images/index/shicai.jpg',name:'大萝卜',title:'heyi'},
        {pic:'static/images/index/shicai.jpg',name:'大萝卜',title:'heyi'},
        {pic:'static/images/index/shicai.jpg',name:'大萝卜',title:'heyi'},
        {pic:'static/images/index/shicai.jpg',name:'大萝卜',title:'heyi'},
        {pic:'static/images/index/shicai.jpg',name:'大萝卜',title:'heyi'},
        {pic:'static/images/index/shicai.jpg',name:'大萝卜',title:'heyi'},
        {pic:'static/images/index/shicai.jpg',name:'大萝卜',title:'heyi'},
        {pic:'static/images/index/shicai.jpg',name:'大萝卜',title:'heyi'},
        {pic:'static/images/index/shicai.jpg',name:'大萝卜',title:'heyi'},
        {pic:'static/images/index/shicai.jpg',name:'大萝卜',title:'heyi'},
        {pic:'static/images/index/shicai.jpg',name:'大萝卜',title:'heyi'},
        {pic:'static/images/index/shicai.jpg',name:'大萝卜',title:'heyi'},
        {pic:'static/images/index/shicai.jpg',name:'大萝卜',title:'heyi'}
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
.ingredient {
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
    .show-ingredient {
      width: 1170px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      margin-bottom: 20px;
      .show-ingredient-item {
        width: 160px;
        height: 210px;
        margin: 10px 0;
        cursor: pointer;
        &:hover {
          color: #ff6767;
        }
        img {
          width: 160px;
          height: 160px;
        }
        .name {
          text-align: center;
          font-size: 18px;
        }
        .title {
          margin-top: 5px;
          text-align: center;
          font-size: 15px;
          color: black;
        }
      }
    }
  }
}
.font {
  font-size: 16px !important;
  font-weight: bolder !important;
}
</style>
