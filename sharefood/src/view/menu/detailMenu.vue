<!--菜谱详情页-->
<template>
  <div class="detailMenu">
    <c-header></c-header>
    <div class="content">
      <!--详情-->
      <detailMenuComp></detailMenuComp>
      <!--操作-->
      <div class="todo">
        <el-row type="flex" justify="center">
          <el-col :span="3">
            <span :class="{operation:true,love:!alreadyLoveShow,alreadyLove:alreadyLoveShow}">
              <i @click="loveClick"></i>
              {{loveNum}}人点赞
            </span>
          </el-col>

          <el-col :span="3">
            <span
              :class="{operation:true,collection:!alreadyCollectionShow,alreadyCollection:alreadyCollectionShow}"
            >
              <i @click="collectionClick"></i>
              {{collectionNum}}人收藏
            </span>
          </el-col>

          <el-col :span="3">
            <span :class="{operation:true,comment:true}">
              <i @click="dialogVisible1 = true"></i>
              {{commentNum}}条评论
            </span>
          </el-col>
        </el-row>
      </div>
      <!--评论-->
      <div class="commentTitle">最新评论</div>

      <div v-for="(item1, index1) in commentALL" :key="'1-'+index1">
        <div class="mainComment">
          <img :src="'/api' + item1.photo" alt>
          <div class="text">
            <span class="user" v-if="item1.user_id_from ==user_id">作者</span>
            <span class="user" v-else>{{item1.user_id_from1}}</span>
            <span class="date">{{dateFormat(item1.create_time, 0)}}</span>
            <span class="comm">{{item1.content}}</span>
            <div class="operation">
              <span
                v-if="user.user_id === item1.user_id_from"
                @click="delComment(item1.comment_id)"
              >删除</span>
              <span v-if="user.user_id !== item1.user_id_from" @click="reports(item1.comment_id)">举报</span>
              <!-- <span v-else @click="responseComment(item1.user_id_from1)">回复</span> -->
              <span
                v-if="user.user_id !== item1.user_id_from"
                @click="dialogVisible2 = true,user_id_to = item1.user_id_from,top_id=item1.comment_id"
              >回复</span>
            </div>
          </div>
        </div>

        <div v-if="item1.children.length!=0">
          <div class="mainComment" v-for="(item2, index2) in item1.children" :key="'2-'+index2">
            <div class="text">
              <span class="user" v-if="item2.user_id_from ==user_id">作者</span>
              <span class="user" v-else>{{item2.user_id_from1}}</span>
              <span class="huifu">回复</span>
              <span class="user" v-if="item2.user_id_to ==user_id">作者</span>
              <span class="user" v-else>{{item2.user_id_to1}}</span>
              <span class="date">{{dateFormat(item2.create_time, 0)}}</span>
              <span class="comm">{{item2.content}}</span>
              <div class="operation">
                <span
                  v-if="user.user_id === item2.user_id_from"
                  @click="delComment(item2.comment_id)"
                >删除</span>
                <span
                  v-if="user.user_id !== item2.user_id_from"
                  @click="reports(item2.comment_id)"
                >举报</span>
                <span
                  v-if="user.user_id !== item2.user_id_from"
                  @click="dialogVisible2 = true,user_id_to = item2.user_id_from,top_id=item2.top_id"
                >回复</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--评论弹窗-->
    <el-dialog
      title="发表评论"
      :visible.sync="dialogVisible1"
      width="40%"
      :modal-append-to-body="false"
    >
      <el-input
        type="textarea"
        :rows="6"
        v-model="comment"
        placeholder="请输入内容（500字以内）"
        size="small"
        maxlength="20"
      ></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="commentClick">确 定</el-button>
      </span>
    </el-dialog>

    <!--回复弹窗-->
    <el-dialog
      title="回复评论"
      :visible.sync="dialogVisible2"
      width="40%"
      :modal-append-to-body="false"
    >
      <el-input
        type="textarea"
        :rows="6"
        v-model="resComment"
        placeholder="请输入内容（500字以内）"
        size="small"
        maxlength="20"
      ></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="responseComment">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Header from "@/view/header/header";
import detailMenuComp from "@/component/detailMenuComp";
import dateFormat from "@/util/dateFormat";
import { mapGetters } from "vuex";
export default {
  components: {
    "c-header": Header, //头
    detailMenuComp: detailMenuComp //菜谱描述
  },
  computed: {
    ...mapGetters(["user"])
  },
  data() {
    return {
      user_id: "", //作者的
      username: "", //作者的
      alreadyLoveShow: false, //是否点赞
      alreadyCollectionShow: false, //是否收藏
      loveNum: "", //点赞数量
      collectionNum: "", //收藏数量
      commentNum: "", //评论数量
      commentALL: {}, //所有评论

      //评论(弹窗)
      dialogVisible1: false,
      comment: "",

      //回复(弹窗)
      dialogVisible2: false,
      resComment: "",
      user_id_to: "", //向谁回复
      top_id: ""
    };
  },
  methods: {
    dateFormat,
    loveClick() {
      //点赞
      if (!this.alreadyLoveShow) {
        //未点赞
        var data = this.qs.stringify({
          any_id: this.$route.query.menu_id,
          state: 0
        });

        this.axios.post("/api/love/addLove", data).then(res => {
          if (res.data.code == 999) {
            this.$message.success(res.data.msg);
            this.loveNum++;
            this.alreadyLoveShow = true;
          }
        });
        this.alreadyLoveShow = true;
      } else {
        //已点赞
        return;
      }
    },
    collectionClick() {
      //点收藏
      if (!this.alreadyCollectionShow) {
        //未收藏
        var data = this.qs.stringify({
          any_id: this.$route.query.menu_id,
          state: 0
        });
        this.axios.post("/api/collection/addCollection", data).then(res => {
          if (res.data.code == 999) {
            this.$message.success(res.data.msg);
            this.collectionNum++;
            this.alreadyCollectionShow = true;
          }
        });
        this.alreadyCollectionShow = true;
      } else {
        //已收藏
        return;
      }
    },
    commentClick() {
      //提交评论
      var data = this.qs.stringify({
        any_id: this.$route.query.menu_id,
        content: this.comment,
        user_id: this.user_id,
        user_id_to: this.user_id,
        state: 0,
        top_id: 0
      });
      this.axios.post("/api/comment/addComment", data).then(res => {
        if (res.data.code == 999) {
          this.$socket.emit(
            "new comment",
            this.user.username,
            this.user_id,
            this.comment
          ); //socket
          this.$message.success(res.data.msg);
          this.dialogVisible1 = false;
          this.comment = "";
          this.searchComment();
        }
      });
    },
    searchComment() {
      //加载评论的内容
      var data1 = this.qs.stringify({
        any_id: this.$route.query.menu_id,
        state: 0
      });
      this.axios.post("/api/comment/searchComment", data1).then(res => {
        if (res.data.code == 999) {
          this.commentNum = res.data.data.commentNum;
          this.commentALL = res.data.data.comment;
        }
      });
    },
    reports(comment_id) {
      //举报
      var data1 = this.qs.stringify({
        any_id: comment_id,
        state: 0
      });
      this.axios.post("/api/reports/addreports", data1).then(res => {
        if (res.data.code == 999) {
          this.$message.success(res.data.msg);
        } else {
          this.$message.warning(res.data.msg);
        }
      });
    },
    delComment(comment_id) {
      //删除评论
      var data1 = this.qs.stringify({
        comment_id: comment_id
      });
      this.axios.post("/api/comment/delComment", data1).then(res => {
        if (res.data.code == 999) {
          this.$message.success(res.data.msg);
          this.searchComment();
        }
      });
    },
    responseComment() {
      //回复评论
      var data = this.qs.stringify({
        any_id: this.$route.query.menu_id,
        content: this.resComment,
        user_id: this.user_id,
        user_id_to: this.user_id_to,
        state: 0,
        top_id: this.top_id
      });
      this.axios.post("/api/comment/addComment", data).then(res => {
        if (res.data.code == 999) {
          this.$socket.emit(
            "new comment",
            this.user.username,
            this.user_id_to,
            this.resComment
          ); //socket
          this.$message.success(res.data.msg);
          this.dialogVisible2 = false;
          this.resComment = "";
          this.searchComment();
        }
      });
    }
  },
  created() {
    //加载是否点赞收藏，以及总共数量
    var data = this.qs.stringify({
      menu_id: this.$route.query.menu_id
    });
    this.axios.post("/api/menu/getInfoOfMenu", data).then(res => {
      if (res.data.code == 999) {
        this.alreadyLoveShow = res.data.data.alreadyLoveShow;
        this.alreadyCollectionShow = res.data.data.alreadyCollectionShow;
        this.loveNum = res.data.data.loveNum;
        this.collectionNum = res.data.data.collectionNum;
        this.user_id = res.data.data.user_id;
        this.username = res.data.data.username;
      }
    });
    this.searchComment();
  }
};
</script>
<style lang="less" scoped>
.detailMenu {
  min-width: 1170px;
  width: 100%;
  .content {
    width: 970px;
    margin: 10px auto 100px;
    .todo {
      .operation {
        width: 70px;
        height: 100px;
        display: block;
        overflow: hidden;
        margin: 0 auto;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 11px;
        text-align: center;
        color: #999;
        i {
          margin: 5px auto;
          display: block;
          background: url(/static/images/menu/icon.png) no-repeat;
          height: 30px;
          width: 30px;
          background-size: 300px 30px; //整体图的大小
        }
      }

      .love i {
        background-position: -210px 0; //右210px为左上角
        &:hover {
          background-position: -180px 0;
        }
      }

      .collection i {
        background-position: 0 0;
        &:hover {
          background-position: -30px 0;
        }
      }
      .comment i {
        background-position: -240px 0;
      }
      .alreadyLove i {
        background-position: -180px 0;
      }
      .alreadyCollection i {
        background-position: -30px 0;
      }
    }
    .commentTitle {
      overflow: hidden;
      height: 30px;
      border-left: 5px solid #ba2020;
      padding-left: 10px;
      line-height: 30px;
      font-size: 18px;
      margin-bottom: 15px;
    }
    .mainComment {
      position: relative;
      border-bottom: 1px dotted #e4e4e4;
      margin-bottom: 10px;
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
        .operation {
          position: absolute;
          right: 10px;
          top: 0;
          color: #666;
          font-size: 12px;
          cursor: pointer;
          :hover {
            color: #ff6767;
          }
          span {
            padding-left: 10px;
          }
        }
      }
    }
  }
}
</style>