<!--个人中心-->
<template>
  <div class="personalCenter">
    <c-header></c-header>
    <div class="content">
      <div class="nav">
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          router
          @select="select"
        >
          <el-menu-item index="/personalCenter/menu">
            <span slot="title">菜谱</span>
          </el-menu-item>
          <el-menu-item index="/personalCenter/myCollection">
            <span slot="title">收藏</span>
          </el-menu-item>
          <el-menu-item index="/personalCenter/myPrivateLetter">
            <span slot="title">私信</span>
            <el-badge class="mark num" :value="privateLetterNum"/>
          </el-menu-item>
          <el-submenu index="1">
            <template slot="title">
              <span>通知</span>
              <el-badge class="mark num" :value="noticeNum"/>
            </template>
            <el-menu-item index="/personalCenter/myNotice/checked">
              <span slot="title">审核</span>
              <el-badge class="mark num" :value="checkedNum"/>
            </el-menu-item>
            <el-menu-item index="/personalCenter/myNotice/reports">
              <span slot="title">举报</span>
              <el-badge class="mark num" :value="reportsNum"/>
            </el-menu-item>
          </el-submenu>
          <el-menu-item index="/personalCenter/mySetting">
            <span slot="title">账户设置</span>
          </el-menu-item>
        </el-menu>
      </div>

      <div class="show">
        <router-view class="view"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../header/header";

export default {
  data() {
    return {
      privateLetterNum: "",
      noticeNum: "",
      checkedNum: "",
      reportsNum: ""
    };
  },
  components: {
    "c-header": Header //头
  },
  created() {
    //查询未读评论数
    this.axios.post("/api/comment/searchPrivateLetterNum", "").then(res => {
      if (res.data.code == 999) {
        this.privateLetterNum = res.data.data.count;
      }
    });
    //查询未读通知数
    this.axios.post("/api/comment/searchNoticeNum", "").then(res => {
      if (res.data.code == 999) {
        this.noticeNum = res.data.data.checkedNum + res.data.data.reportsNum;
        this.checkedNum = res.data.data.checkedNum;
        this.reportsNum = res.data.data.reportsNum;
      }
    });
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    select(index, indexPath) {
      if (index === "/personalCenter/myPrivateLetter") {
        //已查阅所有评论
        if (this.privateLetterNum !== 0) {
          this.axios.post("/api/comment/privateLetterChecked", "").then(res => {
            if (res.data.code == 999) {
              this.privateLetterNum = 0;
            }
          });
        }
      }
      if (index === "/personalCenter/myNotice/checked") {
        //已查阅所有审核的菜谱（退稿、已发布）
        if (this.checkedNum !== 0) {
          this.axios.post("/api/comment/checkedChecked", "").then(res => {
            if (res.data.code == 999) {
              this.noticeNum = this.noticeNum - this.checkedNum;
              this.checkedNum = 0;
            }
          });
        }
      }
      if (index === "/personalCenter/myNotice/reports") {
        //已查阅所有评论被禁
        if (this.reportsNum !== 0) {
          this.axios.post("/api/comment/reportsChecked", "").then(res => {
            if (res.data.code == 999) {
              this.noticeNum = this.noticeNum - this.reportsNum;
              this.reportsNum = 0;
            }
          });
        }
      }
    }
  }
};
</script>
<style lang="less" scoped>
.personalCenter {
  width: 100%;
  position: relative;
  .content {
    .nav {
      width: 210px;
      position: fixed;
      top: 40px;
      bottom: 0;
      overflow: auto;
      .num {
        float: right;
        margin-right: 25px;
      }
    }
    .show {
      position: fixed;
      top: 40px;
      left: 210px;
      right: 0;
      bottom: 0;
      overflow: auto;
      .view {
        width: 100%;
        min-width: 1070px;
        position: absolute;
        top: 0;
        left: 0;
        right: 100px;
      }
    }
  }
}
.el-menu {
  height: 100%;
}
</style>
