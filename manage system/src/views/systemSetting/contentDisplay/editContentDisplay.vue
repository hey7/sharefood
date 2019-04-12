<!--内容展示页-->
<template>
  <div class="editContentDisplay">
    <div class="title">
      <span>编辑轮播图</span>
    </div>

    <el-button type="primary" size="mini" @click="addCarousel()" class="addCarousel-button">添加轮播图</el-button>

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

    <el-row type="flex" justify="center">
      <el-col :span="2">
        <el-button @click="saveCarousel" type="primary">保存</el-button>
      </el-col>
      <el-col :span="2">
        <el-button @click="$router.go(-1)">取消</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: "",
      carousel: [{ url: "" }] //轮播图
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
    handleAvatarSuccess(res, index) {
      //上传图片成功
      this.carousel[index].url = res.data.uploadPath;
    },
    addCarousel() {
      //增加
      this.carousel.push({ url: "" });
    },
    delCarousel(index) {
      //删除
      this.carousel.splice(index, 1);
    },
    saveCarousel() {
      //保存
      var data = this.qs.stringify({
        carousel: JSON.stringify(this.carousel)
      });
      this.axios.post("/api/exhibition/updataCarousel", data).then(res => {
        if (res.data.code == 999) {
          this.$message.success(res.data.msg);
          this.$router.push("/systemSetting/contentDisplay");
        }
      });
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
.editContentDisplay {
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
  .addCarousel-button {
    margin-bottom: 10px;
  }
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