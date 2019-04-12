<!--所有菜谱-->
<template>
  <div class="menu">
    <div class="title">
      <el-tabs v-model="activeName" @tab-click="handleClick" class="tab">
        <el-tab-pane label="我的菜谱" name="first">
          <div
            class="content"
            v-for="(menu, index) in menus"
            :key="index"
            v-if="menu.state==4||menu.state==5"
          >
            <img :src="'/api'+menu.path" alt class="menupic">
            <div class="menuname">{{menu.menuname}}</div>
            <div class="love">
              <img src="/static/images/menu/love.png" alt>
              {{menu.love}}
            </div>
            <div class="collection">
              <img src="/static/images/menu/collection.png" alt>
              {{menu.collection}}
            </div>
            <div class="time">{{dateFormat(menu.modified_time, 0)}}</div>
            <el-button size="mini" class="detail" @click="detailMenu(menu.menu_id)">详情</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="待审核" name="second">
          <div class="content" v-for="(menu, index) in menus" :key="index" v-if="menu.state==1">
            <img :src="'/api'+menu.path" alt class="menupic">
            <div class="menuname">{{menu.menuname}}</div>
            <div class="love">
              <img src="/static/images/menu/love.png" alt>
              {{menu.love}}
            </div>
            <div class="collection">
              <img src="/static/images/menu/collection.png" alt>
              {{menu.collection}}
            </div>
            <div class="time">{{dateFormat(menu.modified_time, 0)}}</div>
            <el-button size="mini" class="detail" @click="detailMenu(menu.menu_id)">详情</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="退稿箱" name="third">
          <div
            class="content"
            v-for="(menu, index) in menus"
            :key="index"
            v-if="menu.state==2||menu.state==3"
          >
            <img :src="'/api'+menu.path" alt class="menupic">
            <div class="menuname">{{menu.menuname}}</div>
            <div class="love">
              <img src="/static/images/menu/love.png" alt>
              {{menu.love}}
            </div>
            <div class="collection">
              <img src="/static/images/menu/collection.png" alt>
              {{menu.collection}}
            </div>
            <div class="time">{{dateFormat(menu.modified_time, 0)}}</div>
            <el-button size="mini" class="detail" @click="detailMenu(menu.menu_id)">详情</el-button>
            <el-button size="mini" class="update" @click="editMenu(menu.menu_id)">修改</el-button>
            <el-button size="mini" class="delete" @click="deleteMenu(menu.menu_id,index)">删除</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="草稿箱" name="fourth">
          <div class="content" v-for="(menu, index) in menus" :key="index" v-if="menu.state==0">
            <img :src="'/api'+menu.path" alt class="menupic">
            <div class="menuname">{{menu.menuname}}</div>
            <div class="love">
              <img src="/static/images/menu/love.png" alt>
              {{menu.love}}
            </div>
            <div class="collection">
              <img src="/static/images/menu/collection.png" alt>
              {{menu.collection}}
            </div>
            <div class="time">{{dateFormat(menu.modified_time, 0)}}</div>
            <el-button size="mini" class="detail" @click="detailMenu(menu.menu_id)">详情</el-button>
            <el-button size="mini" class="update" @click="editMenu(menu.menu_id)">修改</el-button>
            <el-button size="mini" class="delete" @click="deleteMenu(menu.menu_id,index)">删除</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="button">
      <el-button type="primary" size="small" @click="toCreateMenu">发布新菜谱</el-button>
    </div>
  </div>
</template>
<script>
import dateFormat from "@/util/dateFormat";
export default {
  data() {
    return {
      //Tabs 标签页 选中哪个
      activeName: "first",

      //数据
      menus: [] //获取到的该用户的所有menu
    };
  },
  methods: {
    dateFormat,
    //Tabs 标签页 切换，清空错误提示
    handleClick(tab, event) {
      //console.log(tab, event);
    },
    toCreateMenu() {
      //发布新菜谱
      this.$router.push({ path: "/personalCenter/createMenu" });
    },
    deleteMenu(menu_id, index) {
      //删除
      this.$confirm("此操作将永久删除该菜谱, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios
            .post("/api/menu/deleteMenu", "menu_id=" + menu_id)
            .then(res => {
              if (res.data.code == 999) {
                this.menus.splice(index, 1);
                this.$message({
                  type: "success",
                  message: res.data.msg
                });
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    detailMenu(menu_id) {
      //详情
      this.$router.push({
        path: "/personalCenter/detailMenu",
        query: { menu_id: menu_id }
      });
    },
    editMenu(menu_id) {
      this.$router.push({
        path: "/personalCenter/editMenu",
        query: { menu_id: menu_id }
      });
    }
  },
  created() {
    this.axios.post("/api/menu/getMenu", "").then(res => {
      this.menus = res.data.data;
    });
  }
};
</script>
<style lang="less" scoped>
.menu {
  position: relative;
  .tab {
    margin: 0 10px;
  }
  .button {
    position: absolute;
    right: 20px;
    top: 5px;
  }
  .content {
    height: 150px;
    border: 1px solid #e4e7ed;
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    position: relative;
    &:hover {
      background-color: #f5f0f0;
    }

    .menupic {
      height: 120px;
      width: 120px;
      margin-left: 15px;
    }
    .menuname {
      margin-left: 20px;
      width: 200px;
      text-align: center;
    }
    .love {
      margin-left: 20px;
      width: 100px;
      text-align: center;
      img {
        width: 25px;
        height: 25px;
      }
    }
    .collection {
      margin-left: 20px;
      width: 100px;
      text-align: center;
      img {
        width: 22px;
        height: 22px;
      }
    }
    .time {
      margin-left: 25px;
      width: 100px;
      text-align: center;
    }
    .detail {
      position: absolute;
      right: 15px;
      top: 60px;
    }
    .update {
      position: absolute;
      right: 85px;
      top: 60px;
    }
    .delete {
      position: absolute;
      right: 155px;
      top: 60px;
    }
  }
}
</style>
