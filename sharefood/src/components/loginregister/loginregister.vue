<template>
 <div class="loginRegister">
     <!-- 背景 -->
     <img :src="imgSrc" :height="screenHeight" :width="screenWidth">
     <!-- 大标题 -->
     <div class="title">ShareFood</div>

      <!-- 白框 -->
     <div class="content">
       
       <!-- Element标签页 -->
      <el-tabs v-model="activeName" @tab-click="handleClick" :stretch="true" class="el-tabs">
        <el-tab-pane label="登录" name="first">
            <div class="error">{{login.error}}</div>
            <div class="item item1">
              <img src="static/images/loginregister/username.png" alt="" class="image">
              <el-input v-model="login.username" placeholder="请输入用户名" class="input"></el-input>
            </div>
            <div class="item item1">
              <img src="static/images/loginregister/password.png" alt="" class="image">
              <el-input v-model="login.password" placeholder="请输入密码" class="input" type="password"></el-input>
            </div>
            <el-button type="primary" class="button" @click="loginClick">登录</el-button>
        </el-tab-pane>

        <el-tab-pane label="注册" name="second">
          <div class="error">{{register.error}}</div>
            <div class="item item2">
              <img src="static/images/loginregister/username.png" alt="" class="image">
              <el-input v-model="register.username" placeholder="请输入用户名" class="input"></el-input>
            </div>
            <div class="item item2">
              <img src="static/images/loginregister/password.png" alt="" class="image">
              <el-input v-model="register.password" placeholder="请输入密码" class="input" type="password"></el-input>
            </div>
            <div class="item item2">
              <el-input v-model="register.confirmPassword" placeholder="请输入确认密码" class="input" type="password"></el-input>
            </div>
            <el-button type="primary" class="button" @click="registerClick">注册</el-button>
        </el-tab-pane>
      </el-tabs>
    </div> 

 </div>
</template>

<script>
export default {
  data() {
    return {
      //图片随窗口变化自适应
      screenWidth: document.documentElement.clientWidth, //屏幕宽度
      screenHeight: document.documentElement.clientHeight, //屏幕高度

      //图片切换
      imgSrcArray: [
        "static/images/loginregister/background1.jpg",
        "static/images/loginregister/background2.jpg",
        "static/images/loginregister/background3.jpg"
      ],
      imgSrc: "static/images/loginregister/background1.jpg",
      i: 0,

      //Tabs 标签页 选中哪个
      activeName: "first",

      //业务数据
      login: { username: "", password: "", error: "" },
      register: { username: "", password: "", confirmPassword: "", error: "" }
    };
  },
  mounted() {
    // 定义窗口大小变更通知事件
    (window.onresize = () => {
      this.screenWidth = document.documentElement.clientWidth; //屏幕宽度
      this.screenHeight = document.documentElement.clientHeight; //屏幕高度
    }),
      //背景图片切换
      setInterval(() => {
        if (this.i > this.imgSrcArray.length - 1) {
          this.i = 0;
        }
        this.imgSrc = this.imgSrcArray[this.i];
        this.i++;
      }, "4000");

    //点击登录，显示登录；点击注册，显示注册
    if (this.$route.path == "/login") {
      this.activeName = "first";
    }
    if (this.$route.path == "/register") {
      this.activeName = "second";
    }
  },

  methods: {
    //Tabs 标签页 切换，清空错误提示
    handleClick(tab, event) {
      this.login.error = "";
      this.register.error = "";
    },

    //登录按钮
    loginClick() {
      //判空
      if (this.login.username.split(" ").join("").length == 0) {
        this.login.error = "请输入用户名";
        return;
      }
      if (this.login.password.split(" ").join("").length == 0) {
        this.login.error = "请输入密码";
        return;
      }
      this.login.error = "";

      //登录
      var data = this.qs.stringify({
        username: this.login.username,
        password: this.login.password
      });
      this.axios
        .post(this.config.SREVER_HTTP + "/user/login", data)
        .then(res => {
          if (res.data.code == 103) { //用户不存在
            this.login.error = res.data.msg;
          }
          if (res.data.code == 104) {//用户名或密码有误
            this.login.error = res.data.msg;
          }
          if (res.data.code == 105) {//登录成功

            this.$store.dispatch('getUser',res.data.data.username);  //存入vuex
            
            this.$router.replace("index"); //跳转(无历史)
          }

        });
    },

    //注册按钮
    registerClick() {
      //判空
      if (this.register.username.split(" ").join("").length == 0) {
        this.register.error = "请输入用户名";
        return;
      }
      if (this.register.password.split(" ").join("").length == 0) {
        this.register.error = "请输入密码";
        return;
      }
      if (this.register.confirmPassword.split(" ").join("").length == 0) {
        this.register.error = "请输入确认密码";
        return;
      }
      if (this.register.password != this.register.confirmPassword) {
        this.register.error = "密码不一致";
        return;
      }

      this.register.error = "";

      //注册
      var data = this.qs.stringify({
        username: this.register.username,
        password: this.register.password
      });
      this.axios
        .post(this.config.SREVER_HTTP + "/user/register", data)
        .then(res => {
          if (res.data.code == 101) {
            //用户名已存在
            this.register.error = res.data.msg;
          }
          if (res.data.code == 102) {
            //注册成功，请登录
            this.register.error = res.data.msg;
          }
        });
    }
  }
};
</script>
<style lang="less" scoped>
.loginRegister {
  position: relative;
  .title {
    width: 400px;
    height: 100px;
    text-align: center;
    font-size: 60px;
    color: #ffffff;
    text-shadow: 0.1em 0.1em 0.05em #333;
    letter-spacing: 10px;
    font-weight: bolder;
    position: absolute;
    left: 0;
    right: 0;
    top: -360px;
    bottom: 0;
    margin: auto;
  }
  .content {
    width: 400px;
    height: 320px;
    background-color: rgba(255, 255, 255, 0.9);
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    border-radius: 20px;
    .error {
      font-size: 16px;
      height: 25px;
      width: 350px;
      margin: 0 auto 10px;
      color: red;
      text-align: center;
    }
    .item {
      width: 350px;
      height: 40px;
      position: relative;
      margin: 0 auto 10px;
      .image {
        width: 32px;
        height: 32px;
      }
      .input {
        width: 300px;
        position: absolute;
        left: 50px;
      }
    }
    .button {
      width: 350px;
      margin: 10px 25px;
    }
  }
}
</style>
