<!--字典页-->
<template>
  <div class="dictionary">
    <div class="title">
      <span>字典</span>
    </div>
    <!-- 条件：start -->
    <div class="condition">
      <el-row type="flex">
        <el-col :span="7">
          <el-row>
            <el-col :span="8">
              <div class="tal">顶级分类：</div>
            </el-col>
            <el-col :span="16">
              <el-select placeholder="请选择" size="mini" v-model="top_id">
                <el-option
                  v-for="item in topDictionary"
                  :key="item.dictionary_id"
                  :label="item.name"
                  :value="item.dictionary_id"
                ></el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-button type="primary" icon="el-icon-search" size="mini" @click="searchTopid">搜索</el-button>
          <el-button
            type="primary"
            icon="el-icon-plus"
            size="mini"
            @click="dialogFormVisible = true,upper_id=top_id,name='',state=1"
            v-if="top_id!==''"
          >添加二级分类</el-button>
        </el-col>
      </el-row>
    </div>
    <!-- 条件：end -->

    <!-- 表格：start -->
    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      border
      row-key="dictionary_id"
      lazy
      :load="load"
    >
      <el-table-column type="index"></el-table-column>

      <el-table-column prop="name" label="名称" width="360"></el-table-column>
      <el-table-column label="状态" width="200">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.state"
            :active-value="0"
            :inactive-value="1"
            active-text="启用"
            inactive-text="禁用"
            @change="changeSwitch(scope.row.dictionary_id,$event,scope.row.upper_id)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="时间" width="200">
        <template slot-scope="scope">{{dateFormat(scope.row.modified_time,0)}}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            @click="editDictionary(scope.row.dictionary_id,scope.row.name)"
            type="text"
            size="small"
          >修改</el-button>
          <el-button
            v-if="scope.row.upper_id==scope.row.top_id"
            @click="dialogFormVisible = true,upper_id=scope.row.dictionary_id,name='',state=1"
            type="text"
            size="small"
          >添加分类</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 表格：end -->

    <!--添加字典（添加的弹窗）：start-->
    <el-dialog title="添加字典" :visible.sync="dialogFormVisible" :modal-append-to-body="false">
      <span>名称：</span>
      <el-input v-model="name" placeholder="请输入内容" size="small" style="width:300px" maxlength="20"></el-input>
      <div class="jiange"></div>
      <span>状态：</span>
      <el-switch
        v-model="state"
        active-text="启用"
        inactive-text="禁用"
        :active-value="0"
        :inactive-value="1"
      ></el-switch>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDictionary">确 定</el-button>
      </div>
    </el-dialog>
    <!--添加字典：end-->
  </div>
</template>

<script>
import dateFormat from "@/util/dateFormat";
export default {
  data() {
    return {
      //添加字典弹窗的数据
      dialogFormVisible: false,
      upper_id: "",
      name: "",
      state: "1",

      //显示数据
      topDictionary: [], //顶级字典
      tableData: [], //表格数据

      top_id: "" //查询的顶级id
    };
  },
  created() {
    this.axios.post("/api/dictionary/getAllTopDictionary", "").then(res => {
      if (res.data.code == 999) {
        this.topDictionary = res.data.data;
      }
    });
  },
  methods: {
    dateFormat,
    searchTopid() {
      //查询topid下的所有孩子
      var data = this.qs.stringify({
        upper_id: this.top_id
      });
      this.axios
        .post("/api/dictionary/getChildsByDictionaryid", data)
        .then(res => {
          if (res.data.code == 999) {
            this.tableData = res.data.data;
          }
        });
    },
    changeSwitch(dictionary_id, state, upper_id) {
      //改变禁用or启用
      var data = this.qs.stringify({
        dictionary_id: dictionary_id,
        state: state,
        upper_id: upper_id
      });
      this.axios
        .post("/api/dictionary/updateDictionaryState", data)
        .then(res => {
          if (res.data.code == 999) {
            this.$message.success(res.data.msg);
          } else {
            this.$message.error(res.data.msg);
          }
          this.searchTopid();
        });
    },
    editDictionary(dictionary_id, name) {
      this.$prompt("请输入修改的名称（20字）", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^.{1,20}$/,
        inputValue: name,
        inputErrorMessage: "格式不正确"
      })
        .then(({ value }) => {
          if (value !== name) {
            var data = this.qs.stringify({
              dictionary_id: dictionary_id,
              name: value
            });
            this.axios
              .post("/api/dictionary/updateDictionaryName", data)
              .then(res => {
                if (res.data.code == 999) {
                  this.$message.success(res.data.msg);
                  this.searchTopid();
                }
              });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    addDictionary() {
      // 添加字典
      var data = this.qs.stringify({
        upper_id: this.upper_id,
        top_id: this.top_id,
        name: this.name,
        state: this.state,
        isLeaf: 1
      });
      this.axios.post("/api/dictionary/addDictionary", data).then(res => {
        if (res.data.code == 999) {
          this.dialogFormVisible = false;
          this.$message.success(res.data.msg);
        } else {
          this.$message.error(res.data.msg);
        }
        this.searchTopid();
      });
    },
    load(tree, treeNode, resolve) {
      var data = this.qs.stringify({
        upper_id: tree.dictionary_id
      });
      this.axios
        .post("/api/dictionary/getChildsByDictionaryid", data)
        .then(res => {
          if (res.data.code == 999) {
            resolve(res.data.data);
          }
        });
    }
  }
};
</script>
<style lang="less" scoped>
.jiange {
  margin-bottom: 10px;
}
.dictionary {
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
  .condition {
    border: solid 1px #ebebeb;
    border-radius: 10px;
    margin: 15px 0 25px 0;
    padding: 10px;
    .tal {
      text-align: right;
      line-height: 28px;
    }
    .expand {
      cursor: pointer;
      color: #409eff;
    }
  }
}
</style>