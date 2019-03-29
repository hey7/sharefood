<!--菜谱详情-->
<template>
  <div class="detailMenu">
    <detailMenuComp></detailMenuComp>
    <div class="button">
      <el-button @click="$router.back(-1)">关闭</el-button>
    </div> 
  </div>
</template>

<script>
import detailMenuComp from "@/component/detailMenuComp"
export default {
  components: {
    "detailMenuComp": detailMenuComp
  }
};
</script>

<style lang="less" scoped>
.detailMenu {
  margin: 10px 0 0 20px;
  .button {
    text-align: center;
    margin-bottom: 50px;
  }
}

</style>
