<!--通知-审核-->
<template>
  <div class="checked">
    <div class="content" v-for="(menu, index) in menuChecked" :key="index">
      <img :src="'/api'+menu.path" alt class="menupic">
      <div class="menuname">{{menu.menuname}}</div>
      <div class="time">{{dateFormat(menu.modified_time, 0)}}</div>
      <div class="result">
        审核结果：
        <span v-if="menu.state==2||menu.state==3">
          <i class="point error"></i>未通过
        </span>
        <span v-if="menu.state==4||menu.state==5">
          <i class="point success"></i>已发布
        </span>
      </div>
      <el-button size="mini" class="detail" @click="detailMenu(menu.menu_id)">详情</el-button>
    </div>
  </div>
</template>
<script>
import dateFormat from "@/util/dateFormat";
export default {
  data() {
    return {
      menuChecked: []
    };
  },
  created() {
    this.axios.post("/api/menu/searchMenuBychecked", "").then(res => {
      if (res.data.code == 999) {
        this.menuChecked = res.data.data;
      }
    });
  },
  methods: {
    dateFormat,
    detailMenu(menu_id) {
      //详情
      this.$router.push({
        path: "/personalCenter/detailMenu",
        query: { menu_id: menu_id }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.checked {
  .content {
    height: 150px;
    border: 1px solid #e4e7ed;
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    align-items: center;
    margin: 10px;
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
    .time {
      margin-left: 25px;
      width: 200px;
      text-align: center;
    }
    .result {
      margin-left: 50px;
      width: 400px;
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

    .detail {
      position: absolute;
      right: 50px;
      top: 60px;
    }
  }
}
</style>