<template>
  <div class="menu">
    <div class="content">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="新秀" name="first">
          <div class="show-menu">
            <el-row>
              <el-col :span="6" v-for="(item,index) in menu1" :key="'0_'+index">
                <div class="show-menu-item" @click="detailMenu(item.menu_id)">
                  <div class="img">
                    <img :src="'/api'+item.path" alt>
                  </div>
                  <div class="title">{{item.menuname}}</div>
                  <div class="username">{{item.username}}</div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
        <el-tab-pane label="一周热门" name="second">
          <div class="show-menu">
            <el-row>
              <el-col :span="6" v-for="(item,index) in menu2" :key="'0_'+index">
                <div class="show-menu-item" @click="detailMenu(item.menu_id)">
                  <div class="img">
                    <img :src="'/api'+item.path" alt>
                  </div>
                  <div class="title">{{item.menuname}}</div>
                  <div class="username">{{item.username}}</div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
        <el-tab-pane label="最受欢迎" name="third">
          <div class="show-menu">
            <el-row>
              <el-col :span="6" v-for="(item,index) in menu3" :key="'0_'+index">
                <div class="show-menu-item" @click="detailMenu(item.menu_id)">
                  <div class="img">
                    <img :src="'/api'+item.path" alt>
                  </div>
                  <div class="title">{{item.menuname}}</div>
                  <div class="username">{{item.username}}</div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
      </el-tabs>

      <div class="right">菜谱首页</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //NavMenu 导航菜单 默认页
      activeName: "first",

      //展示的数据
      menu1: [],
      menu2: [],
      menu3: []
    };
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    detailMenu(menu_id){
       this.$router.push({
        path: "/detailMenu",
        query: { menu_id: menu_id }
      });
    }
  },
  created() {
    this.axios.post("/api/menu/getMenuIndexShow", "").then(res => {
      this.menu1 = res.data.data.menu1;
      this.menu2 = res.data.data.menu2;
      this.menu3 = res.data.data.menu3;
    });
  }
};
</script>
<style lang="less" scoped>
.menu {
  width: 100%;
  min-width: 1170px;
  .content {
    width: 1170px;
    position: relative;
    margin-top: 10px;
    margin: 0 auto;
    .right {
      position: absolute;
      right: 20px;
      top: 15px;
      font-size: 16px;
      &:hover {
        color: #ff6767;
        cursor: pointer;
      }
    }
    .show-menu {
      width: 1170px;
      margin-bottom: 20px;
      .show-menu-item {
        width: 235px;
        height: 280px;
        margin:10px auto 0;
        &:hover {
          -moz-box-shadow: 0 0 10px #ff6767;
          -webkit-box-shadow: 0 0 10px #ff6767;
          box-shadow: 0 0 10px #ff6767;
        }
        img {
          width: 235px;
          height: 235px;
        }
        .title {
          text-align: center;
          font-size: 18px;
          cursor: pointer;
          &:hover {
            color: #ff6767;
          }
        }
        .username {
          margin-top: 5px;
          text-align: center;
          color: #999;
          font-size: 12px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          cursor: pointer;
          &:hover {
            color: #ff6767;
          }
        }
      }
    }
  }
}
</style>

<style>
.menu .el-tabs__item {
  font-size: 16px !important;
  font-weight: bolder !important;
}
</style>