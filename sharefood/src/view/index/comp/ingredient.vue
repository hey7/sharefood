<template>
  <div class="ingredient">
    <div class="content">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="1" class="font">时令食材</el-menu-item>
      </el-menu>
      <div class="right">食材首页</div>
      <div class="show-ingredient">
        <el-row>
          <el-col :span="4" v-for="(item,index) in ingredient" :key="index">
            <div class="show-ingredient-item" @click="detailIngredient(item.ingredient_id)">
              <div class="img">
                <img :src="'/api'+item.path" alt>
              </div>
              <div class="name">{{item.ingredientname}}</div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //NavMenu 导航菜单 默认页
      activeIndex: "1",

      //展示的数据
      ingredient: []
    };
  },
  created() {
    this.axios.post("/api/ingredient/getIngredientIndexShow", "").then(res => {
      this.ingredient = res.data.data;
    });
  },
  methods: {
    handleSelect(key, keyPath) {
      //   console.log(key, keyPath);
    },
    detailIngredient(ingredient_id) {
      this.$router.push({
        path: "/detailIngredient",
        query: { ingredient_id: ingredient_id }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.ingredient {
  width: 100%;
  min-width: 1170px;
  .content {
    width: 1170px;
    position: relative;
    margin-top: 10px;
    margin: 0 auto;
    .right {
      position: absolute;
      right: 20px;
      top: 25px;
      font-size: 16px;
      &:hover {
        color: #ff6767;
        cursor: pointer;
      }
    }
    .show-ingredient {
      width: 1170px;
      margin-bottom: 20px;
      .show-ingredient-item {
        width: 160px;
        height: 210px;
        margin: 10px auto 0;
        cursor: pointer;
        &:hover {
          color: #ff6767;
        }
        img {
          width: 160px;
          height: 160px;
        }
        .name {
          text-align: center;
          font-size: 18px;
        }
      }
    }
  }
}
.font {
  font-size: 16px !important;
  font-weight: bolder !important;
}
</style>
