<!--菜谱详情页-->
<template>
  <div class="checkMenu">
    <div class="title">
      <span>审核菜谱</span>
    </div>
    <detailMenuComp></detailMenuComp>

    <div class="check">
      <el-radio-group v-model="check" class="jiange">
        <el-radio :label="false">退稿</el-radio>
        <el-radio :label="true">通过</el-radio>
      </el-radio-group>

      <div v-if="check">
        <div class="cascader">
          <el-cascader :options="menuTypeDictionary" v-model="menuType" ref="cascader"></el-cascader>
          <el-button type="primary" size="small" @click="addType" style="margin-left: 20px;">添加分类</el-button>
        </div>

        <div class="depict">
          <el-row>
            <el-col :span="2">
              <div class="name">所属分类：</div>
            </el-col>
            <el-col :span="22">
              <div v-if="tags.length!==0">
                <el-tag
                  v-for="tag in tags"
                  :key="tag.value"
                  closable
                  :type="tag.type"
                  @close="handleClose(tag)"
                >{{tag.label}}</el-tag>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>

    <div class="button">
      <el-row type="flex" justify="center">
        <el-col :span="2">
          <el-button type="primary" @click="submit">提交</el-button>
        </el-col>
        <el-col :span="2">
          <el-button @click="$router.go(-1)">返回</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import detailMenuComp from "@/components/detailMenuComp";
export default {
  data() {
    return {
      //是否审核通过
      check: "",
      //菜谱字典
      menuTypeDictionary: [],
      menuType: [],
      //分类标签
      tags: []
    };
  },
  components: {
    detailMenuComp: detailMenuComp //菜谱描述
  },
  created() {
    //加载菜谱字典
    var data = this.qs.stringify({
      name: "菜谱分类"
    });
    this.axios
      .post("/api/dictionary/getChildsByDictionaryName", data)
      .then(res => {
        if (res.data.code == 999) {
          this.menuTypeDictionary = res.data.data;
        }
      });
  },
  methods: {
    addType() {
      //添加分类
      this.tags.push({
        value: this.menuType[this.menuType.length - 1],
        label: this.$refs["cascader"].currentLabels[
          this.$refs["cascader"].currentLabels.length - 1
        ],
        type: ""
      });
      this.menuType = [];
    },
    handleClose(tag) {
      //删除标签
      this.tags.splice(this.tags.indexOf(tag), 1);
    },
    submit() {
      if (this.check == "") {
        this.$message.error("请审核后提交");
        return;
      }
      if (this.check) {
        if (this.tags.length == 0) {
          this.$message.error("请选择菜谱分类");
          return;
        }
        var data = this.qs.stringify({
          menu_id: this.$route.query.menu_id,
          state: "4",
          tags: JSON.stringify(this.tags)
        });
      } else {
        var data = this.qs.stringify({
          menu_id: this.$route.query.menu_id,
          state: "2",
          tags: JSON.stringify("")
        });
      }
      this.axios.post("/api/menu/checkMenu", data).then(res => {
        if (res.data.code == 999) {
          this.$message.success(res.data.msg);
          this.$router.push({
            path: "/menuSetting"
          });
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.jiange {
  margin-bottom: 20px;
}
.checkMenu {
  position: relative;
  .title {
    padding: 15px 10px 10px 0;
    margin-bottom: 15px;
    span {
      font-size: 18px;
      font-weight: bolder;
      padding-right: 20px;
    }
  }
  .check {
    margin-bottom: 30px;
    .cascader {
      margin-bottom: 30px;
    }
    .depict {
      margin-bottom: 20px;
      .name {
        font-size: 14px;
        color: #808080;
      }
    }
  }

  .button {
    margin-bottom: 30px;
  }
}
.el-tag {
  margin-left: 10px;
}
</style>