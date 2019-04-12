<!--菜谱管理页-->
<template>
  <div class="menuSetting">
    <div class="title">
      <span>菜谱管理</span>
    </div>
    <!-- 条件：start -->
    <div class="condition">
      <el-row type="flex">
        <el-col :span="7">
          <el-row>
            <el-col :span="8">
              <div class="tal">菜谱id：</div>
            </el-col>
            <el-col :span="16">
              <el-input v-model="menu_id" placeholder="请输入" size="mini"></el-input>
            </el-col>
          </el-row>
        </el-col>

        <el-col :span="7">
          <el-row>
            <el-col :span="8">
              <div class="tal">菜谱名称：</div>
            </el-col>
            <el-col :span="16">
              <el-input v-model="menuname" placeholder="请输入" size="mini"></el-input>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="7">
          <el-row>
            <el-col :span="8">
              <div class="tal">菜谱状态：</div>
            </el-col>
            <el-col :span="16">
              <el-select placeholder="请选择" size="mini" v-model="state">
                <el-option :label="'全部'" :value="''"></el-option>
                <el-option :label="'已发布'" :value="'4||5'"></el-option>
                <el-option :label="'待审核'" :value="1"></el-option>
                <el-option :label="'退稿'" :value="'2||3'"></el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" icon="el-icon-search" size="mini" @click="search">搜索</el-button>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="7">
          <el-row>
            <el-col :span="8">
              <div class="tal">用户id：</div>
            </el-col>
            <el-col :span="16">
              <el-input v-model="user_id" placeholder="请输入" size="mini"></el-input>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="7">
          <el-row>
            <el-col :span="8">
              <div class="tal">用户名：</div>
            </el-col>
            <el-col :span="16">
              <el-input v-model="username" placeholder="请输入" size="mini"></el-input>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <!-- 条件：end -->
    <!-- 表格：start -->
    <div class="table">
      <el-table
        :data="tableData"
        tooltip-effect="dark"
        :header-cell-style="{
            'background-color': '#fafafa'
        }"
      >
        <el-table-column prop="menu_id" label="菜谱id" width="80px"></el-table-column>
        <el-table-column prop="menuname" label="菜谱名称"></el-table-column>
        <el-table-column label="菜谱状态" width="100px">
          <template slot-scope="scope">
            <div v-if="scope.row.state==1">
              <i class="point normal"></i>待审核
            </div>
            <div v-if="scope.row.state==2||scope.row.state==3">
              <i class="point error"></i>退稿
            </div>
            <div v-if="scope.row.state==4||scope.row.state==5">
              <i class="point success"></i>已发布
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="user_id" label="用户id" width="80px"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column label="创建时间" width="150px">
          <template slot-scope="scope">{{dateFormat(scope.row.create_time,0)}}</template>
        </el-table-column>
        <el-table-column label="修改时间" width="150px">
          <template slot-scope="scope">{{dateFormat(scope.row.modified_time,0)}}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="detail(scope.row.menu_id)">详情</el-button>
            <el-button
              type="text"
              size="small"
              @click="check(scope.row.menu_id)"
              v-if="scope.row.state==1"
            >审核</el-button>
            <el-button
              type="text"
              size="small"
              @click="edit(scope.row.menu_id)"
              v-if="scope.row.state==4||scope.row.state==5"
            >修改分类</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 表格：end -->
    <!-- 分页：start -->
    <div class="page">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="mParam.pageNum"
        :page-size="mParam.pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <!-- 分页：end -->

    <!--修改分类弹窗：start-->
    <el-dialog
      :title="'修改菜谱id为'+editTypeMenuId+'的分类'"
      :visible.sync="dialogVisible"
      width="50%"
      :modal-append-to-body="false"
      :before-close="closeDialog"
    >
      <div class="check">
        <div class="cascader">
          <el-cascader :options="menuTypeDictionary" v-model="menuType" ref="cascader"></el-cascader>
          <el-button type="primary" size="small" @click="addType" style="margin-left: 20px;">添加分类</el-button>
        </div>

        <div class="depict">
          <el-row>
            <el-col :span="3">
              <div class="name">所属分类：</div>
            </el-col>
            <el-col :span="21">
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

      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="updataType">确 定</el-button>
      </span>
    </el-dialog>
    <!--修改分类弹窗：end-->
  </div>
</template>

<script>
import dateFormat from "@/util/dateFormat";
export default {
  data() {
    return {
      //搜索条件
      menu_id: "",
      menuname: "",
      username: "",
      user_id: "",
      state: "",
      //表格数据
      tableData: [],
      //分页
      total: 0,
      mParam: {
        pageSize: 5,
        pageNum: 1
      },

      //修改分类弹窗
      dialogVisible: false,
      editTypeMenuId: "",
      tags: [],
      menuTypeDictionary: [],
      menuType: []
    };
  },
  created() {
    //加载数剧
    this.getMenutData();
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
  beforeRouteLeave(to, from, next) {
    if (to.path === "/menuSetting/checkMenu") {
      //后退刷新数据
      from.meta.keepAlive = false;
    } else {
      from.meta.keepAlive = true;
    }
    next();
  },

  methods: {
    dateFormat,
    search() {
      //搜索
      this.mParam.pageNum = 1;
      this.getMenutData();
    },
    getMenutData() {
      var data = this.qs.stringify({
        menu_id: this.menu_id,
        menuname: this.menuname,
        user_id: this.user_id,
        username: this.username,
        state: this.state,
        mParam: JSON.stringify(this.mParam)
      });
      this.axios.post("/api/menu/searchMenuBycondition", data).then(res => {
        if (res.data.code == 999) {
          this.tableData = res.data.data;
          this.total = res.data.total;
        }
      });
    },
    handleCurrentChange(val) {
      //分页
      this.mParam.pageNum = val;
      this.getMenutData();
    },
    detail(menu_id) {
      //详情
      this.$router.push({
        path: "/menuSetting/detailMenu",
        query: { menu_id: menu_id }
      });
    },
    check(menu_id) {
      //审核
      this.$router.push({
        path: "/menuSetting/checkMenu",
        query: { menu_id: menu_id }
      });
    },
    edit(menu_id) {
      //修改分类
      var data = this.qs.stringify({
        menu_id: menu_id
      });
      this.axios.post("/api/menu/searchMenuType", data).then(res => {
        if (res.data.code == 999) {
          this.tags = res.data.data;
          this.editTypeMenuId = menu_id;
          this.dialogVisible = true;
        }
      });
    },
    //弹窗里的
    closeDialog() {
      //关闭弹窗
      this.menuType = [];
      this.dialogVisible = false;
    },
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
    updataType() {
      //更新分类
      if (this.tags.length == 0) {
        this.$message.error("请选择菜谱分类");
        return;
      }

      var data = this.qs.stringify({
        menu_id: this.editTypeMenuId,
        tags: JSON.stringify(this.tags)
      });
      this.axios.post("/api/menu/updataMenuType", data).then(res => {
        if (res.data.code == 999) {
          this.$message.success(res.data.msg);
          this.closeDialog();
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.menuSetting {
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
  .table {
    width: 100%;
    margin: 10px 0 20px 0;
    min-height: 5vh;
    .point {
      //圆点
      width: 10px;
      height: 10px;
      border-radius: 50%;
      display: inline-block;
      margin-right: 5px;
    }
    .success {
      background-color: #52c41a;
    }
    .error {
      background-color: #f56c6c;
    }
    .normal {
      background-color: #409eff;
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
    .el-tag {
      margin-left: 10px;
    }
  }
}
</style>
