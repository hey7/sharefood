<!--头部-->
<template>
  <div class="header">
    <div class="context">
      <router-link to="/index" tag="span">ShareFood管理系统</router-link>
    </div>

    <div v-if="!isLogin">
      <div class="login">
        <router-link to="/login" tag="span">登录</router-link>
      </div>
    </div>

    <div v-if="isLogin">
      <div class="user">
        <img :src="photo" alt>
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
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["user"]),
    isLogin() {
      //是否登录
      if (this.user) {
        return true;
      } else {
        return false;
      }
    },
    photo() {
      //照片
      return "/api" + this.user.photo;
    }
  },
  methods: {
    logout() {
      //退出
      this.$store.dispatch("setUser", ""); //存入vuex
      this.$router.push("/login");
    }
  }
};
</script>
<style lang="less" scoped>
.header {
  width: 100%;
  height: 40px;
  background-color: #333333;
  position: sticky;
  left: 0;
  top: 0px;
  z-index: 100;
  .context {
    font-size: 20px;
    color: #cccccc;
    position: absolute;
    left: 100px;
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
  .login,
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
