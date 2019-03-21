<template>
  <div class="mySetting">
    <div class="title">
      <el-tabs v-model="activeName" @tab-click="handleClick" class="tab">
        <el-tab-pane label="个人资料" name="first">
          <div class="content">
              aaa
          </div>
        </el-tab-pane>
        <el-tab-pane label="修改密码" name="second">
          <div class="content">
              bbbb
          </div>
        </el-tab-pane>
       
      </el-tabs>
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
    editMenu(menu_id){
      this.$router.push({
        path:"/personalCenter/editMenu",
        query: { menu_id: menu_id }
      })
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
.mySetting {
  position: relative;
  .tab {
    margin: 0 10px;
  }
  .content {

  }
}
</style>
