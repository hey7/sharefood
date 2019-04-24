<!--头部-->
<template>
  <div class="header">
    <div class="context">
      <router-link to="/index" tag="span">ShareFood</router-link>
    </div>

    <div v-if="!isLogin">
      <div class="login">
        <router-link to="/login" tag="span">登录</router-link>
      </div>
      <div class="register">
        <router-link to="/register" tag="span">注册</router-link>
      </div>
    </div>

    <div v-if="isLogin">
      <div class="user" @mouseover="isAlert = true" @mouseout="isAlert = false">
        <img :src="photo" alt>
        <div>{{user.username}}</div>
      </div>
      <div class="logout">
        <div @click="logout">退出</div>
      </div>
      <div class="alert" v-if="isAlert" @mouseover="isAlert = true" @mouseout="isAlert = false">
        <ul>
          <router-link to="/personalCenter/menu" tag="span">
            <li>个人中心</li>
          </router-link>
          <li>我的空间</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      isAlert: false //弹窗显示
    };
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
      this.$socket.emit("del user", this.user.user_id); //socket
      this.$store.dispatch("setUser", ""); //存入vuex
      this.$router.push("/index");
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
    color: #ff6767;
    position: absolute;
    left: 100px;
    line-height: 40px;
    cursor: pointer;
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
  .alert {
    width: 100px;
    position: absolute;
    right: 200px;
    top: 40px;
    box-shadow: 0 0 10px gray;
    border-radius: 0 0 5px 5px;
    font-size: 14px;
    background-color: white;
    li {
      height: 30px;
      width: 100px;
      text-align: center;
      line-height: 30px;
      cursor: pointer;
      &:hover {
        color: #ff6767;
      }
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
