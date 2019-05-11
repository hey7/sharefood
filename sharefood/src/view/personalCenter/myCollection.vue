<!--我的收藏-->
<template>
  <div class="myCollection">
    <div class="search">
      <el-input placeholder="请输入菜谱名称" v-model="menuname" class="input-with-select" maxlength="20">
        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
      </el-input>
    </div>
    <div class="content">
      <el-row :gutter="30">
        <el-col :span="6" v-for="(item, index) in collection" :key="'0-'+index">
          <el-card :body-style="{ padding: '0px' }">
            <img :src="'/api'+item.path" class="image" width="100%" height="250px">
            <div style="padding: 0 10px;">
              <span
                style="font-size:20px ;font-weight: bold;cursor: pointer;"
                @click="detailMenu(item.any_id)"
              >{{item.menuname}}</span>
              <span style="margin-left:10px; color:#999">by {{item.username}}</span>
              <div class="bottom clearfix">
                <span class="time">{{dateFormat(item.create_time,0) }}</span>
                <el-button
                  type="text"
                  class="button"
                  @click="delCollection(item.collection_id,index)"
                >取消收藏</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import dateFormat from "@/util/dateFormat";
export default {
  data() {
    return {
      menuname: "",
      collection: []
    };
  },
  created() {
    this.search();
  },
  methods: {
    dateFormat,
    search() {
      var data = this.qs.stringify({
        menuname: this.menuname
      });
      this.axios.post("/api/collection/getMenuCollection", data).then(res => {
        this.collection = res.data.data;
      });
    },
    detailMenu(menu_id) {
      this.$router.push({
        path: "/detailMenu",
        query: { menu_id: menu_id }
      });
    },
    delCollection(collection_id, index) {
      var data = this.qs.stringify({
        collection_id: collection_id
      });
      this.axios.post("/api/collection/delCollection", data).then(res => {
        if (res.data.code == 999) {
          this.$message.success(res.data.msg);
          this.collection.splice(index, 1);
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.el-row {
  line-height: 40px;
  margin: 10px 0;
  &:last-child {
    margin-bottom: 0;
  }
}

.myCollection {
  position: relative;
  margin: 20px;

  .search {
    width: 500px;
    margin-bottom: 20px;
  }
  .button {
    float: right;
  }
  .content {
  }
}
</style>
