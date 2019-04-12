<!--食材管理页-->
<template>
  <div class="ingredientSetting">
    <div class="title">
      <span>食材管理</span>
    </div>
    <!-- 条件：start -->
    <div class="condition">
      <el-row type="flex">
        <el-col :span="7">
          <el-row>
            <el-col :span="8">
              <div class="tal">食材id：</div>
            </el-col>
            <el-col :span="16">
              <el-input v-model="ingredient_id" placeholder="请输入" size="mini"></el-input>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="7">
          <el-row>
            <el-col :span="8">
              <div class="tal">食材名称：</div>
            </el-col>
            <el-col :span="16">
              <el-input v-model="ingredientname" placeholder="请输入" size="mini"></el-input>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="7">
          <el-row>
            <el-col :span="8">
              <div class="tal">食材状态：</div>
            </el-col>
            <el-col :span="16">
              <el-select placeholder="请选择" size="mini" v-model="state">
                <el-option :label="'全部'" :value="''"></el-option>
                <el-option :label="'未维护'" :value="0"></el-option>
                <el-option :label="'已发布'" :value="1"></el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-col>

        <el-col :span="3">
          <el-button type="primary" icon="el-icon-search" size="mini" @click="search">搜索</el-button>
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
        <el-table-column prop="ingredient_id" label="食材id"></el-table-column>
        <el-table-column prop="ingredientname" label="食材名称"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <div v-if="scope.row.state==0">
              <i class="point error"></i>未维护
            </div>
            <div v-if="scope.row.state==1">
              <i class="point success"></i>已发布
            </div>
          </template>
        </el-table-column>

        <el-table-column label="创建时间">
          <template slot-scope="scope">{{dateFormat(scope.row.create_time,0)}}</template>
        </el-table-column>
        <el-table-column label="修改时间">
          <template slot-scope="scope">{{dateFormat(scope.row.modified_time,0)}}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="detail(scope.row.ingredient_id)">详情</el-button>
            <el-button type="text" size="small" @click="edit(scope.row.ingredient_id)">编辑</el-button>
            <el-button
              v-if="scope.row.state == 0"
              type="text"
              size="small"
              @click="del(scope.row.ingredient_id)"
            >删除</el-button>
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
      ingredient_id: "",
      ingredientname: "",
      state: "",
      //表格数据
      tableData: [],
      //分页
      total: 0,
      mParam: {
        pageSize: 5,
        pageNum: 1
      }
    };
  },
  created() {
    this.getIngredientData();
  },
  methods: {
    dateFormat,
    search() {
      //搜索
      this.mParam.pageNum = 1;
      this.getIngredientData();
    },
    getIngredientData() {
      var data = this.qs.stringify({
        ingredient_id: this.ingredient_id,
        ingredientname: this.ingredientname,
        state: this.state,
        mParam: JSON.stringify(this.mParam)
      });
      this.axios
        .post("/api/ingredient/searchIngredientBycondition", data)
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
      this.getIngredientData();
    },
    detail(ingredient_id) {
      this.$router.push({
        path: "/ingredientSetting/detailIngredient",
        query: { ingredient_id: ingredient_id }
      });
    },
    edit(ingredient_id) {
      this.$router.push({
        path: "/ingredientSetting/editIngredient",
        query: { ingredient_id: ingredient_id }
      });
    },
    del(ingredient_id) {  //删除
      var data = this.qs.stringify({
        ingredient_id: ingredient_id
      });
      this.axios
        .post("/api/ingredient/deleteIngredient", data)
        .then(res => {
          if (res.data.code == 999) {
             this.$message.success(res.data.msg);
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
.ingredientSetting {
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
  }
  .page {
    text-align: right;
    margin-right: 100px;
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