<!--通知-举报-->
<template>
  <div class="reports">
    <div class="content" v-for="(item1, index1) in commentAllBan" :key="'1-'+index1">
      <div class="neirong">
        <div class="text">
          <span class="date">
            评论
            <span>{{item1.user_id1}}</span>
            的{{item1.menuname}}
          </span>
          <span class="date">{{dateFormat(item1.create_time, 0)}}</span>
          <span class="date">
            <i class="point error"></i>已被禁
          </span>
          <span class="comm">{{item1.content}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import dateFormat from "@/util/dateFormat";
export default {
  data() {
    return {
      commentAllBan: []
    };
  },
  created() {
    //加载评论的内容（from自己的状态为2、3）
    this.axios.post("/api/comment/searchFromMyByReports", "").then(res => {
      if (res.data.code == 999) {
        this.commentAllBan = res.data.data;
      }
    });
  },
  methods: {
    dateFormat
  }
};
</script>
<style lang="less" scoped>
.reports {
  position: relative;
  .content {
    border: 1px solid #e4e7ed;
    border-radius: 10px;
    overflow: hidden;
    align-items: center;
    margin: 10px;
    position: relative;
    min-height: 50px;
    &:hover {
      background-color: #f5f0f0;
    }
    .neirong {
      margin: 10px;
      .text {
        margin-left: 10px;
        .date {
          padding-right: 20px;
          color: #666;
          font-size: 15px;
        }
        .comm {
          word-wrap: break-word;
          margin: 10px 0 20px;
          display: block;
        }
        .point {
          //圆点
          width: 10px;
          height: 10px;
          border-radius: 50%;
          display: inline-block;
          margin-right: 5px;
        }

        .error {
          background-color: #f56c6c;
        }
      }
    }
  }
}
</style>