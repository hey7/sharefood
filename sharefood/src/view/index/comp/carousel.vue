<!--首页：轮播图-->
<template>
    <div class="carousel">
        <div class="block content">
            <el-carousel height="400px">
            <el-carousel-item v-for="item in lunbo" :key="item">
                <img :src="item" alt="">
            </el-carousel-item>
            </el-carousel>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      lunbo: [
        'static/images/index/lunbo1.jpg',
        'static/images/index/lunbo2.jpg',
        'static/images/index/lunbo3.jpg',
        'static/images/index/lunbo4.jpg'
      ]
    };
  }
};
</script>
<style lang="less" scoped>
.carousel {
  width: 100%;
  height: 400px;
  .content {
    width: 1170px;
    margin: 0 auto;
    img {
      height: 400px;
      width: 1170px;
    }
  }
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>