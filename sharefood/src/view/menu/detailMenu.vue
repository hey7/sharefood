<template>
  <div class="detailMenu">
    <div class="name">
      <span class="menuname">{{menuname}}</span>
      <span v-if="state==0">
        <el-tag>原创</el-tag>
      </span>
      <span v-if="state==1">
        <el-tag>非原创</el-tag>
      </span>
    </div>

    <div class="carousel">
      <div class="block content">
        <el-carousel height="400px">
          <el-carousel-item v-for="item in chengpintu" :key="item">
            <img :src="'/api'+item" alt>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>

    <div class="descript">
      <span class="yin">“</span>
      <span class="content">{{descript}}</span>
      <span class="yin">”</span>
    </div>

    <div class="title">
      <img src="/static/images/menu/round.png" alt>
      <span>食材明细</span>
    </div>

    <div class="groups" v-for="(item1, index1) in groups" :key="'1-'+index1">
      <div class="legend">{{item1.groupname}}</div>
      <el-row>
        <el-col :span="4" v-for="(item2, index2) in item1.ingredient" :key="'2-'+index2">
          <div class="item">
            <div class="ingredientname">{{item2.ingredientname}}</div>
            <div class="amount">{{item2.amount}}</div>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="type">
      <el-row>
        <el-col :span="4" v-for="(item3, index3) in type" :key="'3-'+index3">
          <div class="item">
            <div class="name">
              <span v-for="(item4, index4) in item3" :key="'4-'+index4">{{item4.name}} </span>
            </div>
            <div class="typee">{{item3[0].type}}</div>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="title">
      <img src="/static/images/menu/round.png" alt>
      <span>做法步骤</span>
    </div>

    <div class="steps" v-for="(item5, index5) in steps" :key="'5-'+index5">
      <el-row type="flex" justify="space-between">
        <el-col :span="4">
          <img :src="'/api'+item5.path" alt width="100%">
        </el-col>
        <el-col :span="19">
          <div class="recipeStep_num">{{index5+1}}</div>
          <div class="amount">{{item5.descript}}</div>
        </el-col>
      </el-row>
    </div>

    <div class="title">
      <img src="/static/images/menu/round.png" alt>
      <span>小窍门</span>
    </div>

    <div class="trick">{{trick}}</div>

    <div class="button">
      <el-button @click="$router.back(-1)">关闭</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuname: "", //菜谱名称
      chengpintu: "", //成品图
      descript: "", //描述
      type: "",
      groups: "",
      steps: "",
      trick: "", //小窍门
      iscreate: "", //是否原创
      state: "" //菜谱状态
    };
  },
  created() {
    var data = this.qs.stringify({
      menu_id: this.$route.query.menu_id
    });
    this.axios
      .post("/api/menu/getdetailMenu", data)
      .then(res => {
        if (res.data.code == 999) {
          var data = res.data.data;
          this.menuname = data.menuname;
          this.iscreate = data.iscreate;
          this.chengpintu = data.chengpintu;
          this.descript = data.descript;
          this.groups = data.groups;
          this.type = data.type;
          this.steps = data.steps;
          this.trick = data.trick;
        }
      });
  }
};
</script>

<style lang="less" scoped>
.detailMenu {
  margin: 10px 0 0 20px;
  position: relative;
  .name {
    margin-bottom: 10px;
    .menuname {
      font-size: 32px;
      color: #333;
    }
    .el-tag {
      position: relative;
      top: -5px;
    }
  }

  .descript {
    margin-top: 10px;
    .yin {
      font-size: 40px;
      font-family: "宋体", "Hiragino Sans GB", "STHeiti", "微软雅黑",
        "Microsoft YaHei";
      color: rgb(191, 191, 191);
      height: 16px;
      line-height: 100%;
      width: 40px;
      display: inline-block;
      overflow: hidden;
    }
    .content {
      line-height: 25px;
    }
  }
  .title {
    color: #ff6767;
    font-size: 20px;
    line-height: 20px;
    margin: 20px 0;
    span {
      padding-left: 5px;
    }
  }
  .groups,
  .type {
    border-radius: 10px;
    border: 1px solid #ddd;
    margin: 0 0 15px 0;
    .legend {
      height: 20px;
      display: inline-block;
      position: relative;
      left: 35px;
      top: -7px;
      background: #ffffff;
      font-size: 16px;
      padding: 0 10px;
    }

    .item {
      text-align: center;
      height: 70px;
      .ingredientname,
      .name {
        font-size: 20px;
        height: 40px;
        line-height: 45px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        color: #666;
      }
      .amount,
      .typee {
        color: #999;
        font-size: 12px;
        line-height: 16px;
        overflow: hidden;
      }
    }
  }
  .steps {
    margin-bottom: 10px;
    .recipeStep_num {
      border: 1px solid #ddd;
      border-radius: 50%;
      font-size: 18px;
      height: 34px;
      line-height: 34px;
      text-align: center;
      width: 34px;
      margin-bottom: 5px;
    }
  }
  .trick {
    margin-bottom: 20px;
  }
  .button {
    text-align: center;
    margin-bottom: 50px;
  }
}

.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}

//轮播
.carousel {
  width: 100%;
  height: 400px;
  .content {
    width: 900px;
    margin: 0 auto;
    img {
      height: 400px;
    }
  }
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
}
.el-carousel__item {
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
