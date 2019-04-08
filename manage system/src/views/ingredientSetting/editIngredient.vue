<!--食材编辑页-->
<template>
  <div class="editIngredient">
    <div class="title">
      <span>食材编辑</span>
    </div>

    <div class="infoimg">
      <el-upload
        class="avatar-uploader"
        :action="'/api/ingredient/imgUpload'"
        :show-file-list="false"
        :on-success="((i)=>{handleAvatarSuccess(i)})"
      >
        <img v-if="ingredient.path" :src="'/api'+ingredient.path" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>

    <div class="info-cont">
      <el-row :gutter="30">
        <el-col :span="2">
          <p class="i-name">食材名称：</p>
        </el-col>
        <el-col :span="6">
          <p class="i-val">
            <el-input
              v-model="ingredient.ingredientname"
              placeholder="请输入食材名称"
              size="small"
              maxlength="20"
            ></el-input>
          </p>
        </el-col>
        <el-col :span="2">
          <p class="i-name">食材时节：</p>
        </el-col>
        <el-col :span="6">
          <p class="i-val">
            <el-input
              v-model="ingredient.season"
              placeholder="请输入食材时节（用、隔开）"
              size="small"
              maxlength="50"
            ></el-input>
          </p>
        </el-col>
      </el-row>

      <el-row type="flex">
        <el-col :span="2">
          <p class="i-name">食材简介：</p>
        </el-col>
        <el-col :span="6">
          <p class="i-val">
            <el-input
              type="textarea"
              :rows="4"
              placeholder="最多输入200字"
              v-model="ingredient.introduction"
              style="width:600px"
              maxlength="200"
            ></el-input>
          </p>
        </el-col>
      </el-row>

      <el-row type="flex">
        <el-col :span="2">
          <p class="i-name">营养价值：</p>
        </el-col>
        <el-col :span="6">
          <p class="i-val">
            <el-input
              type="textarea"
              :rows="4"
              placeholder="最多输入200字"
              v-model="ingredient.nutrition"
              style="width:600px"
              maxlength="200"
            ></el-input>
          </p>
        </el-col>
      </el-row>

      <el-row type="flex">
        <el-col :span="2">
          <p class="i-name">食用功效：</p>
        </el-col>
        <el-col :span="6">
          <p class="i-val">
            <el-input
              type="textarea"
              :rows="4"
              placeholder="最多输入200字"
              v-model="ingredient.effect"
              style="width:600px"
              maxlength="200"
            ></el-input>
          </p>
        </el-col>
      </el-row>

      <el-row type="flex">
        <el-col :span="2">
          <p class="i-name">适用人群：</p>
        </el-col>
        <el-col :span="6">
          <p class="i-val">
            <el-input
              type="textarea"
              :rows="4"
              placeholder="最多输入200字"
              v-model="ingredient.apply"
              style="width:600px"
              maxlength="200"
            ></el-input>
          </p>
        </el-col>
      </el-row>

      <el-row type="flex">
        <el-col :span="2">
          <p class="i-name">禁忌人群：</p>
        </el-col>
        <el-col :span="6">
          <p class="i-val">
            <el-input
              type="textarea"
              :rows="4"
              placeholder="最多输入200字"
              v-model="ingredient.taboo"
              style="width:600px"
              maxlength="200"
            ></el-input>
          </p>
        </el-col>
      </el-row>
    </div>

    <div class="button">
      <el-row type="flex" justify="center">
        <el-col :span="2" v-if="ingredient.state==0">
          <el-button type="primary" @click="addIngredient1">保存</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="addIngredient2">发布</el-button>
        </el-col>
        <el-col :span="2">
          <el-button @click="$router.go(-1)">返回</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import dateFormat from "@/util/dateFormat";
export default {
  data() {
    return {
      ingredient: ""
    };
  },
  created() {
    var data = this.qs.stringify({
      ingredient_id: this.$route.query.ingredient_id
    });
    this.axios.post("/api/ingredient/searchIngredient", data).then(res => {
      if (res.data.code == 999) {
        this.ingredient = res.data.data;
      }
    });
  },
  methods: {
    dateFormat,
    handleAvatarSuccess(res) {
      //上传图片成功
      this.ingredient.path = res.data.uploadPath;
    },
    addIngredient() {
      if (
        this.ingredient.path == "" ||
        this.ingredient.ingredientname == "" ||
        this.ingredient.season == "" ||
        this.ingredient.introduction == "" ||
        this.ingredient.nutrition == "" ||
        this.ingredient.effect == "" ||
        this.ingredient.apply == "" ||
        this.ingredient.taboo == ""
      ) {
        this.$message.error("请输入完整食材");
        return false;
      }
      var data = this.qs.stringify({
        ingredient: JSON.stringify(this.ingredient)
      });

      this.axios.post("/api/ingredient/editIngredient", data).then(res => {
        if (res.data.code == 999) {
          this.$message.success(res.data.msg);
        } else {
          this.$message.error("请输入完整食材");
        }
      });
    },
    addIngredient1() {
      this.ingredient.state = 0;
      this.addIngredient();
    },
    addIngredient2() {
      this.ingredient.state = 1;
      this.addIngredient();
    }
  }
};
</script>
<style lang="less" scoped>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.editIngredient {
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
  .infoimg {
    margin-bottom: 20px;
  }
  .info-cont {
    font-size: 14px;
    margin-bottom: 30px;

    .i-name {
      line-height: 30px;
      display: inline-block;
      color: #808080;
    }
  }
  .button{
    margin-bottom: 30px;
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
  width: 148px;
  height: 148px;
  line-height: 148px;
  text-align: center;
  border: 1px dashed #c0ccda;
  border-radius: 6px;
}
.avatar-uploader-icon:hover {
  border: 1px dashed #409eff;
}
.avatar {
  width: 148px;
  height: 148px;
  display: block;
}
</style>