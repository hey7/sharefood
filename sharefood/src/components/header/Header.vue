<template>
    <div class="header">
        <div class="context">ShareFood</div>
        <div v-if="">
          <div class="login">
            <router-link to="/login">登录</router-link>
          </div>
          <div class="register">
            <router-link to="/register">注册</router-link>
          </div>
        </div>
    </div>
</template>
<script>
export default {};
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
  }
  .register {
    font-size: 14px;
    color: #cccccc;
    position: absolute;
    right: 100px;
    line-height: 40px;
  }
}
</style>
