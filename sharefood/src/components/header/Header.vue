<template>
    <div class="header">
        <div class="context">ShareFood</div>
        <div v-if="!isLogin">
          <div class="login">
            <router-link to="/login" tag="span">登录</router-link>
          </div>
          <div class="register">
            <router-link to="/register" tag="span">注册</router-link>
          </div>
        </div>

        <div v-if="isLogin">
          <div class="user">
            <img :src="photo" alt="">
            <div>{{user.username}}</div>
          </div>
          <div class="logout">
            <div @click="logout">退出</div>
          </div>
        </div>

    </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data(){
    return{
    }
  },
  computed: {
    ...mapGetters(["user"]),
    isLogin() {   //是否登录
      if (this.$cookies.isKey("username") && this.$cookies.isKey("user_id")) {
        //没过时
        this.$store.dispatch("getUser", this.$cookies.get("username")); //存vuex
      } else {
        this.$store.dispatch("getUser", null); //过时清空
      }
      return this.$store.getters.islogin;
    },
    photo(){    //照片
      return this.config.SREVER_HTTP+this.$store.getters.user.photo}
    },
  methods:{
    logout(){
      this.$cookies.remove("username")
      this.$cookies.remove("user_id")
      this.$store.dispatch("getUser", null); //清空
    }
  }
};
</script>
<style lang="less" scoped>
.header {
  width: 100%;
  height: 40px;
  background-color: #333333;
  position: relative;
  .context {
    font-size: 20px;
    color: #ff6767;
    position: absolute;
    left: 100px;
    line-height: 40px;
  }
  .login {
    font-size: 14px;
    color: #cccccc;
    position: absolute;
    right: 150px;
    line-height: 40px;
    cursor: pointer;
  }
  .user {
    height: 40px;
    width: 150px;
    font-size: 14px;
    color: #cccccc;
    position: absolute;
    right: 150px;
    img {
      margin: 2.5px;
      width: 35px;
      height: 35px;
      display: inline-block;
    }
    div {
      display: inline-block;
      height: 40px;
      width: 100px;
      overflow: hidden;
      line-height: 40px;
      text-overflow: ellipsis;
      margin-left: 6px;
    }
  }
  .register,
  .logout {
    font-size: 14px;
    color: #cccccc;
    position: absolute;
    right: 100px;
    line-height: 40px;
    cursor: pointer;
  }
}
</style>
