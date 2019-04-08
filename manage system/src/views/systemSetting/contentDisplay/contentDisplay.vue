<!--内容展示页-->
<template>
  <div class="contentDisplay">
    <div class="title">
      <span>轮播图展示</span>
      <el-button size="mini" type="primary" @click="editCarousel" class="el-icon-edit"></el-button>
    </div>

    <el-row>
      <el-col :span="8" v-for="(item, index) in carousel">
        <div class="carousel">
          <div class="recipeStep_num">{{index+1}}</div>
          <img :src="'/api'+item.url" alt>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      carousel: [] //轮播图
    };
  },
  created() {
    this.axios.post("/api/exhibition/getAllCarousel", "").then(res => {
      if (res.data.code == 999) {
        this.carousel = res.data.data;
      }
    });
  },
  methods: {
    editCarousel() {
      this.$router.push("/systemSetting/contentDisplay/editContentDisplay");
    }
  }
};
</script>
<style lang="less" scoped>
.el-col {
  margin-bottom: 15px;
  &:last-child {
    margin-bottom: 0;
  }
}
.contentDisplay {
  position: relative;
  .title {
    padding: 15px 10px 10px 0;
    margin-bottom: 15px;
    span {
      font-size: 18px;
      font-weight: bolder;
      padding-right: 20px;
    }
  }
  .carousel {
    height: 150px;
    width: 350px;
    position: relative;
    margin-bottom: 10px;
    .recipeStep_num {
      border: 1px solid #ddd;
      border-radius: 50%;
      font-size: 18px;
      width: 34px;
      height: 34px;
      line-height: 34px;
      text-align: center;
      float: left;
      margin-right: 10px;
    }
    img {
      width: 290px;
      height: 100px;
      float: left;
    }
  }
}
</style>