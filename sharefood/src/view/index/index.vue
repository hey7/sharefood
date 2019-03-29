<!--首页-->
<template>
  <div class="index">
    <c-header></c-header>
    <search></search>
    <carousel></carousel>
    <c-menu></c-menu>
    <ingredient></ingredient>
    <community></community>
  </div>
</template>

<script>
import Header from "../header/header";
import Search from "./comp/search";
import Carousel from "./comp/carousel";
import Menu from "./comp/menu";
import Ingredient from "./comp/ingredient";
import Community from "./comp/community";

export default {
  components: {
    "c-header": Header, //头
    search: Search, //导航
    carousel: Carousel, //轮播图
    "c-menu": Menu, //菜谱
    ingredient: Ingredient, //食材
    community: Community //社区
  }
};
</script>

<style>
.index {
  min-width: 1200px;
}
</style>
