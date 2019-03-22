<!--账户设置-->
<template>
  <div class="mySetting">
    <div class="title">
      <el-tabs v-model="activeName" @tab-click="handleClick" class="tab">
        <el-tab-pane label="个人资料" name="first">
          <div class="content">
            <div class="heading">头像</div>
            <el-upload
              class="avatar-uploader"
              :action="'/api/user/imgUpload'"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
            >
              <img v-if="photo" :src="'/api' + photo" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>

            <div class="heading">性别</div>
            <el-radio-group v-model="sex" size="small">
              <el-radio label="0" border>男</el-radio>
              <el-radio label="1" border>女</el-radio>
              <el-radio label="2" border>保密</el-radio>
            </el-radio-group>

            <div class="heading">手机号</div>
            <el-input v-model="phone" placeholder="请输入内容" class="phone-input"></el-input>

            <div class="heading">个性签名</div>
            <el-input
              type="textarea"
              :rows="4"
              maxlength="200"
              placeholder="最多输入200字"
              v-model="signature"
              style="width:600px"
            ></el-input>

            <el-row type="flex" justify="center">
              <el-col :span="3">
                <el-button type="primary" @click="saveClick1">保存修改</el-button>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
        <el-tab-pane label="修改密码" name="second">
          <div class="content">
            <el-row type="flex" justify="center">
              <el-col :span="3">
                <span class="heading">当前密码</span>
              </el-col>
              <el-col :span="5">
                <el-input
                  v-model="currentPassword"
                  placeholder="请输入内容"
                  class="phone-input"
                  maxlength="20"
                  type="password"
                ></el-input>
              </el-col>
            </el-row>
            <el-row type="flex" justify="center">
              <el-col :span="3">
                <span class="heading">新密码</span>
              </el-col>
              <el-col :span="5">
                <el-input
                  v-model="password"
                  placeholder="请输入内容"
                  class="phone-input"
                  maxlength="20"
                  type="password"
                ></el-input>
              </el-col>
            </el-row>
            <el-row type="flex" justify="center">
              <el-col :span="3">
                <span class="heading">确认密码</span>
              </el-col>
              <el-col :span="5">
                <el-input
                  v-model="confirmPassword"
                  placeholder="请输入内容"
                  class="phone-input"
                  maxlength="20"
                  type="password"
                ></el-input>
              </el-col>
            </el-row>

            <el-row type="flex" justify="center">
              <el-col :span="3">
                <el-button type="primary" @click="saveClick2">保存修改</el-button>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      //Tabs 标签页 选中哪个
      activeName: "first",

      //数据
      photo: "",
      sex: "",
      phone: "",
      signature: "",
      currentPassword: "",
      password: "",
      confirmPassword: ""
    };
  },
  computed: { ...mapGetters(["user"]) },
  created() {
    this.photo = this.user.photo;
    if (this.user.sex!==null) {
      this.sex = this.user.sex.toString();
    }
    this.phone = this.user.phone;
    this.signature = this.user.signature;
  },
  methods: {
    //Tabs 标签页 切换，清空错误提示
    handleClick(tab, event) {
      this.clear2();
      this.userInfo();
    },
    handleAvatarSuccess(res, file) {
      this.photo = res.data.uploadPath;
    },
    userInfo() {
      this.photo = this.user.photo;
      this.sex = this.user.sex.toString();
      this.phone = this.user.phone;
      this.signature = this.user.signature;
    },
    saveClick1() {
      var data = this.qs.stringify({
        photo: this.photo,
        sex: this.sex,
        phone: this.phone,
        signature: this.signature
      });
      this.axios.post("/api/user/editUser", data).then(res => {
        if (res.data.code == 999) {
          this.$message.success(res.data.msg);
          this.$store.dispatch("setUser", res.data.data); //存入vuex
        }
      });
    },
    saveClick2() {
      //判空
      if (this.currentPassword.split(" ").join("").length == 0) {
        this.$message.error("请输入当前密码");
        return;
      }
      if (this.password.split(" ").join("").length == 0) {
        this.$message.error("请输入新密码");
        return;
      }
      if (this.confirmPassword.split(" ").join("").length == 0) {
        this.$message.error("请输入确认密码");
        return;
      }
      if (this.password != this.confirmPassword) {
        this.$message.error("密码不一致");
        return;
      }
      var data = this.qs.stringify({
        currentPassword: this.currentPassword,
        password: this.password
      });
      this.axios.post("/api/user/updataPassword", data).then(res => {
        if (res.data.code == 999) {
          this.$message.success(res.data.msg);
          this.$store.dispatch("setUser", res.data.data); //存入vuex
          this.clear2();
        }
        if (res.data.code == 105) {
          this.$message.error(res.data.msg);
        }
      });
    },
    clear2() {
      (this.currentPassword = ""),
        (this.password = ""),
        (this.confirmPassword = "");
    }
  }
};
</script>
<style lang="less" scoped>
.el-row {
  line-height: 40px;
  margin: 10px 0;
  &:last-child {
    margin-bottom: 0;
  }
}

.mySetting {
  .tab {
    margin: 0 10px;
  }
  .content {
    position: relative;
    .heading {
      color: #778899;
      font-size: 16px;
      line-height: 25px;
      margin-top: 5px;
    }
    .phone-input {
      width: 200px;
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
  width: 148px;
  height: 148px;
  line-height: 148px;
  text-align: center;
  border: 1px dashed #c0ccda;
  border-radius: 6px;
}
.avatar-uploader-icon:hover {
  border: 1px dashed #f56c6c;
}
.avatar {
  width: 148px;
  height: 148px;
  display: block;
}
</style>
