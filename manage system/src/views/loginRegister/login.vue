<!-- 登录 -->
<template>
  <div class="login" v-loading="loading">
    <div class="content">
      <div class="title">ShareFood</div>
      <div class="main">
        <div class="tips">请使用管理员账号登录</div>
        <div class="item">
          <el-input v-model="login.username" placeholder="请输入账号" class="input"></el-input>
        </div>
        <div class="item">
          <el-input
            v-model="login.password"
            placeholder="请输入密码"
            class="input"
            type="password"
            @keydown.native.enter="loginClick"
          ></el-input>
        </div>
        <el-button type="primary" class="button" @click="loginClick">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      login: { username: "", password: "" },
      loading: false // loading。。。
    };
  },
  methods: {
    // 登录
    loginClick() {
      //判空
      if (this.login.username.split(" ").join("").length == 0) {
        this.$message.error("请输入用户名");
        return;
      }
      if (this.login.password.split(" ").join("").length == 0) {
        this.$message.error("请输入密码");
        return;
      }

      this.loading = true; // loading打开
      var data = this.qs.stringify({
        username: this.login.username,
        password: this.login.password
      });
      this.axios.post("/api/user/login", data).then(res => {
        this.loading = false; // loading关闭
        if (res.data.code == 103) {
          //用户不存在
          this.$message.error(res.data.msg);
        }
        if (res.data.code == 104) {
          //用户名或密码有误
          this.$message.error(res.data.msg);
        }
        if (res.data.code == 106) {
          //用户名或密码有误
          this.$message.error(res.data.msg);
        }
        if (res.data.code == 999) {
          //登录成功
          this.$message.success(res.data.msg);
          this.$store.dispatch("setUser", res.data.data); //存入vuex
          this.$router.push({
            path: this.$route.query.redirect || "/index"
          });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: #d3d3d3;
  .content {
    width: 400px;
    height: 500px;
    .title {
      box-sizing: border-box;
      height: 80px;
      width: 400px;
      font-size: 30px;
      letter-spacing: 10px;
      padding-left: 30px;
      text-align: center;
      line-height: 80px;
      font-weight: bolder;
    }
    .main {
      box-sizing: border-box;
      width: 400px;
      height: 280px;
      border: solid #000000 1px;
      background-color: #ffffff;
      border-radius: 15px;
      .tips {
        height: 55px;
        font-size: 18px;
        margin-top: 35px;
        text-align: center;
      }
      .item {
        width: 350px;
        height: 40px;
        position: relative;
        margin: 0 auto 20px;
      }
      .button {
        margin-left: 25px;
      }
    }
  }
}
</style>
