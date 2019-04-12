<!--用户管理页-->
<template>
  <div class="userSettng">
    <div class="title">
      <span>用户管理</span>
    </div>
    <!-- 条件：start -->
    <div class="condition">
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
        <el-col :span="7">
          <el-row>
            <el-col :span="8">
              <div class="tal">用户状态：</div>
            </el-col>
            <el-col :span="16">
              <el-select placeholder="请选择" size="mini" v-model="ban">
                <el-option :label="'全部'" :value="''"></el-option>
                <el-option :label="'正常'" :value="0"></el-option>
                <el-option :label="'禁用'" :value="1"></el-option>
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
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="头像：">
                <span>
                  <img :src="'/api'+props.row.photo" alt height="100px">
                </span>
              </el-form-item>
              <el-form-item label="用户id：">
                <span>{{ props.row.user_id }}</span>
              </el-form-item>
              <el-form-item label="用户名：">
                <span>{{ props.row.username }}</span>
              </el-form-item>
              <el-form-item label="联系方式：">
                <span>{{ props.row.phone }}</span>
              </el-form-item>

              <el-form-item label="性别：">
                <span>{{ props.row.sex==0?'男':props.row.sex==1?'女':'保密' }}</span>
              </el-form-item>
              <el-form-item label="状态：">
                <div v-if="props.row.ban==0">
                  <i class="point success"></i>正常
                </div>
                <div v-if="props.row.ban==1">
                  <i class="point error"></i>禁用
                </div>
              </el-form-item>
              <el-form-item label="个性签名：">
                <span>{{ props.row.signature }}</span>
              </el-form-item>
              <el-form-item label="创建时间：">
                <span>{{dateFormat(props.row.create_time,0)}}</span>
              </el-form-item>
              <el-form-item label="修改时间：">
                <span>{{dateFormat(props.row.modified_time,0)}}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>

        <el-table-column prop="user_id" label="用户id"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column label="用户密码">
          <template slot-scope="scope">
            <el-button type="text" @click="restPassWord(scope.row.user_id)">重置密码</el-button>
          </template>
        </el-table-column>
        <el-table-column label="联系方式">
          <template slot-scope="scope">
            <div v-if="scope.row.phone">{{scope.row.phone,0}}</div>
            <div v-else>————</div>
          </template>
        </el-table-column>
        <el-table-column label="创建时间">
          <template slot-scope="scope">{{dateFormat(scope.row.create_time,0)}}</template>
        </el-table-column>
        <el-table-column label="修改时间">
          <template slot-scope="scope">{{dateFormat(scope.row.modified_time,0)}}</template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.ban"
              :active-value="0"
              :inactive-value="1"
              active-text="正常"
              inactive-text="禁用"
              @change="changeSwitch(scope.row.user_id,$event)"
            ></el-switch>
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
      user_id: "",
      username: "",
      ban: "",
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
    this.getUserData();
  },
  methods: {
    dateFormat,
    changeSwitch(user_id, ban) {
      //更改禁用
      var data = this.qs.stringify({
        user_id: user_id,
        ban: ban
      });
      this.axios.post("/api/user/updateUserBan", data).then(res => {
        if (res.data.code == 999) {
          this.$message.success(res.data.msg);
          this.getUserData();
        }
      });
    },
    search() {
      //搜索
      this.mParam.pageNum = 1;
      this.getUserData();
    },
    getUserData() {
      var data = this.qs.stringify({
        user_id: this.user_id,
        username: this.username,
        ban: this.ban,
        mParam: JSON.stringify(this.mParam)
      });
      this.axios.post("/api/user/searchUserBycondition", data).then(res => {
        if (res.data.code == 999) {
          this.tableData = res.data.data;
          this.total = res.data.total;
        }
      });
    },
    handleCurrentChange(val) {
      //分页
      this.mParam.pageNum = val;
      this.getUserData();
    },
    restPassWord(user_id) {
      //重置密码
      var data = this.qs.stringify({
        user_id: user_id
      });
      this.axios.post("/api/user/restPassWord", data).then(res => {
        if (res.data.code == 999) {
          this.$message.success(res.data.msg);
          this.getUserData();
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
.userSettng {
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