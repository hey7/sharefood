<!--食材详情页-->
<template>
  <div class="detailIngredient">
    <div class="title">
      <span>食材详情页</span>
    </div>
    <div class="infoimg">
      <img :src="'/api'+ingredient.path" alt height="100px" v-if="ingredient.path">
    </div>
    <div class="content">
      <div class="info-cont">
        <div class="info-item">
          <p class="i-name">食材id：</p>
          <p class="i-val">{{ingredient.ingredient_id}}</p>
        </div>
        <div class="info-item">
          <p class="i-name">食材名称：</p>
          <p class="i-val">{{ingredient.ingredientname}}</p>
        </div>
        <div class="info-item">
          <p class="i-name">食材时节：</p>
          <p class="i-val">{{ingredient.season}}月</p>
        </div>

        <div class="info-item">
          <p class="i-name">状态：</p>
          <p class="i-val">{{ingredient.state}}</p>
        </div>
        <div class="info-item">
          <p class="i-name">创建时间：</p>
          <p class="i-val">{{dateFormat(ingredient.create_time,0)}}</p>
        </div>
        <div class="info-item">
          <p class="i-name">修改时间：</p>
          <p class="i-val">{{dateFormat(ingredient.modified_time,0)}}</p>
        </div>
        <!-- <div class="info-item-depict">
          <p class="i-name"></p>
          <p class="i-val" ></p>
        </div>-->
      </div>

      <div class="depict">
        <el-row class="depict-item">
          <el-col :span="2">
            <div class="name">食材简介：</div>
          </el-col>
          <el-col :span="22">
            <div v-html="ingredient.introduction" class="val"></div>
          </el-col>
        </el-row>
        <el-row class="depict-item">
          <el-col :span="2">
            <div class="name">营养价值：</div>
          </el-col>
          <el-col :span="22">
            <div v-html="ingredient.nutrition" class="val"></div>
          </el-col>
        </el-row>
        <el-row class="depict-item">
          <el-col :span="2">
            <div class="name">食用功效：</div>
          </el-col>
          <el-col :span="22">
            <div v-html="ingredient.effect"></div>
          </el-col>
        </el-row>
        <el-row class="depict-item">
          <el-col :span="2">
            <div class="name">适用人群：</div>
          </el-col>
          <el-col :span="22">
            <div v-html="ingredient.apply"></div>
          </el-col>
        </el-row>
        <el-row class="depict-item">
          <el-col :span="2">
            <div class="name">禁忌人群：</div>
          </el-col>
          <el-col :span="22">
            <div v-html="ingredient.taboo"></div>
          </el-col>
        </el-row>
      </div>
      <el-row type="flex" justify="center">
        <el-col :span="2">
          <el-button @click="$router.go(-1)">返回</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import dateFormat from "@/util/dateFormat";
export default {
  data() {
    return {
      ingredient: ""
    };
  },
  created() {
    var data = this.qs.stringify({
      ingredient_id: this.$route.query.ingredient_id
    });
    this.axios.post("/api/ingredient/searchIngredient", data).then(res => {
      if (res.data.code == 999) {
        this.ingredient = res.data.data;
      }
    });
  },
  methods: {
    dateFormat
  }
};
</script>
<style lang="less" scoped>

.jiange {
  margin-bottom: 10px;
}
.detailIngredient {
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
  .content {
    font-size: 14px;
    .info-cont {
      margin-bottom: 10px;
      flex-wrap: wrap;
      display: flex;
      .info-item {
        flex: 0 1 33%;
        height: 42px;
        line-height: 42px;
      }
      .info-item-depict {
        flex: 0 1 100%;
        min-height: 42px;
      }
      .i-name {
        display: inline-block;
        flex: 0 0 auto;
        color: #808080;
      }
      .i-val {
        display: inline-block;
        flex: 1;
      }
    }
    .depict {
      .depict-item {
        margin-bottom: 25px;
      }
      .name {
        color: #808080;
      }
    }
  }
}
</style>