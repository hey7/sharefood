<!--食材详情页-->
<template>
  <div class="detailIngredient">
    <c-header></c-header>
    <div class="content">
      <div class="main">
        <img :src="ingredient.path" alt height="100px" width="100px" v-if="ingredient.state==1">
        <img src="" alt height="100px" width="100px" v-else>
        <div class="ingredientname">{{ingredient.ingredientname}}</div>
        <div class="text">为你介绍{{ingredient.ingredientname}}营养与选购，以及{{ingredient.ingredientname}}的{{menus.length}}种做法</div>
      </div>
      <div class="title">
        <el-tabs v-model="activeName" @tab-click="handleClick" class="tab">
          <el-tab-pane :label="ingredient.ingredientname+'的做法'" name="first">
            <div class="show-menu">
              <el-row>
                <el-col :span="6" v-for="(item,index) in menus" :key="'0_'+index">
                  <div class="show-menu-item" @click="detailMenu(item.menu_id)">
                    <div class="img">
                      <img :src="'/api'+item.path" alt>
                    </div>
                    <div class="title">{{item.menuname}}</div>
                    <div class="username">{{item.username}}</div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-tab-pane>
          <el-tab-pane label="认识选购" name="second">
            <div class="biaoti">{{ingredient.ingredientname}}的认识选购技巧</div>
            <div v-html="ingredient.introduction" class="neirong" v-if="ingredient.state==1"></div>
            <div class="neirong" v-else>无</div>
          </el-tab-pane>
          <el-tab-pane label="人群宜忌" name="third">
            <div class="biaoti">适用人群</div>
            <div v-html="ingredient.apply" class="neirong" v-if="ingredient.state==1"></div>
            <div class="neirong" v-else>无</div>
            <div class="biaoti">禁忌人群</div>
            <div v-html="ingredient.taboo" class="neirong" v-if="ingredient.state==1"></div>
            <div class="neirong" v-else>无</div>
          </el-tab-pane>
          <el-tab-pane label="营养功效" name="fourth">
            <div class="biaoti">营养价值</div>
            <div v-html="ingredient.nutrition" class="neirong" v-if="ingredient.state==1"></div>
            <div class="neirong" v-else>无</div>
            <div class="biaoti">食用功效</div>
            <div v-html="ingredient.effect" class="neirong" v-if="ingredient.state==1"></div>
            <div class="neirong" v-else>无</div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/view/header/header";
export default {
  components: {
    "c-header": Header //头
  },
  data() {
    return {
      //Tabs 标签页 选中哪个
      activeName: "first",
      //数据
      ingredient: "",
      menus: []
    };
  },
  created() {
    var data = this.qs.stringify({
      ingredient_id: this.$route.query.ingredient_id
    });
    this.axios.post("/api/ingredient/getdetailIngredient", data).then(res => {
      if (res.data.code == 999) {
        this.ingredient = res.data.data.ingredient;
        this.ingredient.path = "/api" + this.ingredient.path;
        this.menus = res.data.data.menus;
      }
    });
  },
  methods: {
    //Tabs 标签页 切换，清空错误提示
    handleClick(tab, event) {
      //console.log(tab, event);
    },
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
.detailIngredient {
  min-width: 1170px;
  width: 100%;
  .content {
    width: 970px;
    margin: 10px auto 100px;
    .main {
      position: relative;
      img {
        display: inline-block;
      }
      .ingredientname {
        position: absolute;
        top: 7px;
        left: 120px;
        font-size: 32px;
      }
      .text {
        position: absolute;
        top: 70px;
        left: 120px;
        font-size: 15px;
        color: #999;
      }
    }
    .tab {
      margin: 15px 0;
    }
    .show-menu-item {
      width: 200px;
      height: 250px;
      margin: 10px auto;
      &:hover {
        -moz-box-shadow: 0 0 10px #ff6767;
        -webkit-box-shadow: 0 0 10px #ff6767;
        box-shadow: 0 0 10px #ff6767;
      }
      img {
        width: 200px;
        height: 200px;
      }
      .title {
        text-align: center;
        font-size: 18px;
        cursor: pointer;
        &:hover {
          color: #ff6767;
        }
      }
      .username {
        margin-top: 8px;
        text-align: center;
        color: #999;
        font-size: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .biaoti {
      font-size: 22px;
      margin: 10px 0 15px;
    }
    .neirong {
      font-size: 16px;
      margin-bottom: 20px;
    }
  }
}
</style>
<style>
.detailIngredient .el-tabs__item {
  font-size: 16px !important;
  font-weight: bolder !important;
}
</style>