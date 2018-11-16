<template>
  <div class="index">
  <c-header></c-header>
  <search></search>
  <carousel></carousel>
  <c-menu></c-menu>
  <health></health>
  </div>
</template>

<script>
import Header from '../header/Header';
import Search from './comp/search';
import Carousel from './comp/carousel';
import Menu from './comp/menu';
import Health from './comp/health'
export default {
  components: {
    'c-header': Header, //头
    'search': Search, //导航
    'carousel': Carousel, //轮播图
    'c-menu':Menu,//菜谱
    'health':Health
  }
};
</script>

<style>
</style>
