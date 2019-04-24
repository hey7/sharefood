<!--私信-->
<template>
  <div class="myPrivateLetter">
    <div
      v-for="(item1, index1) in commentALL"
      :key="'1-'+index1"
      class="content"
      @click="detailMenu(item1.any_id)"
    >
      <div class="neirong">
        <img :src="'/api' + item1.photo" alt>
        <div class="text">
          <span class="user" v-if="item1.user_id_from == user.user_id">我</span>
          <span class="user" v-else>{{item1.user_id_from1}}</span>
          <span class="date">{{dateFormat(item1.create_time, 0)}}</span>
          <span class="comm">{{item1.content}}</span>
          <span class="date">
            评论
            <span v-if="item1.user_id == user.user_id">我</span>
            <span v-else>{{item1.user_id1}}</span>
            的{{item1.menuname}}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import dateFormat from "@/util/dateFormat";
export default {
  data() {
    return {
      commentALL: []
    };
  },
  computed: {
    ...mapGetters(["user"])
  },
  created() {
    //加载评论的内容（to自己的状态为0、1）
    this.axios.post("/api/comment/searchCommentToMy", "").then(res => {
      if (res.data.code == 999) {
        this.commentALL = res.data.data;
      }
    });
  },
  methods: {
    dateFormat,
    detailMenu(menu_id) {
      this.$router.push({
        path: "/detailMenu",
        query: { menu_id: menu_id }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.myPrivateLetter {
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
      img {
        position: absolute;
        left: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      .text {
        margin-left: 100px;
        .user {
          color: #ff6767;
          font-size: 15px;
        }
        .huifu {
          color: #666;
        }
        .date {
          padding-left: 10px;
          color: #666;
          font-size: 15px;
        }
        .comm {
          word-wrap: break-word;
          margin: 10px 0 20px;
          display: block;
        }
      }
    }
  }
}
</style>
