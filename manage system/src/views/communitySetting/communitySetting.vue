<!--社区管理页-->
<template>
  <div class="communitySetting">
    <div class="title">
      <span>评论举报处理</span>
    </div>
    <!-- 条件：start -->
    <div class="condition">
      <el-row type="flex">
        <el-col :span="7">
          <el-row>
            <el-col :span="8">
              <div class="tal">评论id：</div>
            </el-col>
            <el-col :span="16">
              <el-input v-model="any_id" placeholder="请输入" size="mini"></el-input>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="7">
          <el-row>
            <el-col :span="8">
              <div class="tal">评论种类：</div>
            </el-col>
            <el-col :span="16">
              <el-select placeholder="请选择" size="mini" v-model="commentState">
                <el-option :label="'全部'" :value="''"></el-option>
                <el-option :label="'菜谱评论'" :value="0"></el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-col>

        <el-col :span="7">
          <el-row>
            <el-col :span="8">
              <div class="tal">状态：</div>
            </el-col>
            <el-col :span="16">
              <el-select placeholder="请选择" size="mini" v-model="deal">
                <el-option :label="'全部'" :value="''"></el-option>
                <el-option :label="'未处理'" :value="0"></el-option>
                <el-option :label="'已处理（正常）'" :value="1"></el-option>
                <el-option :label="'已处理（禁用）'" :value="2"></el-option>
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
            <el-col :span="9">
              <div class="tal">被举报人id：</div>
            </el-col>
            <el-col :span="15">
              <el-input v-model="buser_id" placeholder="请输入" size="mini"></el-input>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="7">
          <el-row>
            <el-col :span="9">
              <div class="tal">被举报人名：</div>
            </el-col>
            <el-col :span="15">
              <el-input v-model="busername" placeholder="请输入" size="mini"></el-input>
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
        style="width: 100%"
        :row-key="getRowKeys"
        :expand-row-keys="expands"
        @expand-change="expandSelect"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="状态：">
                <span v-if="props.row.deal==0">未处理</span>
                <span v-if="props.row.deal==1">已处理（正常）</span>
                <span v-if="props.row.deal==2">已处理（禁用）</span>
              </el-form-item>
              <el-form-item label="创建时间：">
                <span>{{ props.row.create_time }}</span>
              </el-form-item>
              <el-form-item label="被举报人id：">
                <span>{{ props.row.buser_id }}</span>
              </el-form-item>
              <el-form-item label="被举报人名：">
                <span>{{ props.row.busername }}</span>
              </el-form-item>

              <el-form-item label="举报目标id：">
                <span>{{ props.row.any_id }}</span>
              </el-form-item>
              <el-form-item label="评论种类：">
                <span v-if="props.row.commentState==0">菜谱评论</span>
              </el-form-item>
            </el-form>
            <div class="item">
              <div class="name">举报内容：</div>
              <div class="val">{{ props.row.content }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="评论种类" width="100px">
          <template slot-scope="scope">
            <div v-if="scope.row.commentState==0">菜谱评论</div>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="200px">
          <template slot-scope="scope">
            <div v-if="scope.row.deal==0">
              <i class="point normal"></i>未处理
            </div>
            <div v-if="scope.row.deal==1">
              <i class="point success"></i>已处理（正常）
            </div>
            <div v-if="scope.row.deal==2">
              <i class="point error"></i>已处理（禁用）
            </div>
          </template>
        </el-table-column>
        <el-table-column label="举报次数" prop="reportsCount"></el-table-column>
        <el-table-column label="被举报人id" prop="buser_id"></el-table-column>
        <el-table-column label="创建时间" width="150px">
          <template slot-scope="scope">{{dateFormat(scope.row.create_time,0)}}</template>
        </el-table-column>
        <el-table-column label="操作" width="150px">
          <template slot-scope="scope">
            <div v-if="scope.row.deal==0"> 
              <el-button size="small" type="success" @click="toDeal(scope.row.any_id,1)">正常</el-button>
              <el-button size="small" type="danger" @click="toDeal(scope.row.any_id,2)">被禁</el-button>
            </div>
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
  </div>
</template>

<script>
import dateFormat from "@/util/dateFormat";
export default {
  data() {
    return {
      //搜索条件
      any_id: "",
      commentState: "",
      deal: "",
      buser_id: "",
      busername: "",

      //表格数据
      tableData: [],
      //分页
      total: 0,
      mParam: {
        pageSize: 5,
        pageNum: 1
      },

      //每次只展开一行，数值的元素是row的key值
      expands: [],
      getRowKeys(row) {
        return row.reports_id;
      }
    };
  },
  created() {
    this.getReportsData();
  },
  methods: {
    dateFormat,
    search() {
      //搜索
      this.mParam.pageNum = 1;
      this.getReportsData();
    },
    getReportsData() {
      var data = this.qs.stringify({
        any_id: this.any_id,
        commentState: this.commentState,
        deal: this.deal,
        buser_id: this.buser_id,
        busername: this.busername,
        mParam: JSON.stringify(this.mParam)
      });
      this.axios
        .post("/api/reports/searchReportsBycondition", data)
        .then(res => {
          if (res.data.code == 999) {
            this.tableData = res.data.data;
            this.total = res.data.total;
          }
        });
    },
    handleCurrentChange(val) {
      //分页
      this.mParam.pageNum = val;
      this.getReportsData();
    },
    expandSelect(row, expandedRows) {
      //每次只展开一行
      var that = this;
      if (expandedRows.length) {
        that.expands = [];
        if (row) {
          that.expands.push(row.reports_id);
        }
      } else {
        that.expands = [];
      }
    },
    toDeal(any_id, deal) {
      var data = this.qs.stringify({
        any_id: any_id,
        deal: deal
      });
      this.axios.post("/api/reports/toDeal", data).then(res => {
        if (res.data.code == 999) {
          this.$message.success(res.data.msg);
          this.getReportsData();
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
.communitySetting {
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
    .item {
      margin-top: 10px;
      color: #f56c6c;
      .val {
        margin: 10px 0;
      }
    }
  }
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
