<!--内容展示页-->
<template>
  <div class="contentDisplay">
    轮播图展示
    <el-button type="primary" size="mini" @click="addCarousel()">添加步骤</el-button>

    <el-row>
      <el-col :span="8" v-for="(item, index) in carousel">
        <div class="carousel">
          <el-upload
            class="avatar-uploader"
            :action="'/api/exhibition/imgUpload'"
            :show-file-list="false"
            :on-success="((i)=>{handleAvatarSuccess(i,index)})"
          >
            <img v-if="item.url" :src="'/api' +item.url" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <el-button size="mini" @click="delCarousel(index)" class="carousel-button">x</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: "",
      carousel: [{ url: ""}] //轮播图
    };
  },
  methods: {
    handleAvatarSuccess(res, index) {
      this.carousel[index].url = res.data.uploadPath;
      console.log("this.carousel", this.carousel);
    },
    addCarousel() {
      this.carousel.push({ url: "" });
    },
    delCarousel(index) {
      this.carousel.splice(index, 1);
    }
  }
};
</script>
<style lang="less" scoped>
.el-col {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.contentDisplay {
  position: relative;
  .carousel {
    height: 150px;
    width: 330px;
    position: relative;
    margin-bottom: 10px;
    .carousel-button {
      position: absolute;
      right: 0px;
      top: 0px;
    }
  }
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 290px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  border: 1px dashed #c0ccda;
  border-radius: 6px;
}
.avatar-uploader-icon:hover {
  border: 1px dashed #409eff;
}
.avatar {
  width: 290px;
  height: 100px;
  display: block;
}
</style>