<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive&&isRouterAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive&&isRouterAlive"></router-view>
    <scroll-top></scroll-top>
  </div>
</template>

<script>
import ScrollTop from "./component/scrollTop";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      isRouterAlive: true
    };
  },
  computed: {
    ...mapGetters(["user"])
  },
  sockets: {
    connect: function() {
      //与socket.io连接后回调（不能改）

      if (this.user) {
        console.log("socket connected=", this.$socket.id);
        this.$socket.emit("new user", this.user.user_id); //socket
      }
    },
    notification: function(data) {
      //这里是监听connect事件
      this.$notify({
        title: "您收到了来自" + data.from + "的一条评论",
        message: data.msg,
        type: "info"
      });
    }
  },
  // mounted() {
  //   this.$socket.emit("click1", 1); //在这里触发connect事件
  // },
  provide() {
    return {
      reload: this.reload
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    }
  },

  components: {
    "scroll-top": ScrollTop
  }
};
</script>

<style>
#app {
  width: 100%;
  height: 100%;
}
</style>
