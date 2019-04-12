<!--菜谱详情页-->
<template>
  <div class="detailMenu">
    <div class="title">
      <span>菜谱详情</span>
    </div>
    <detailMenuComp></detailMenuComp>
    <div class="button">
      <el-row type="flex" justify="center">
        <el-col :span="2">
          <el-button @click="$router.go(-1)">返回</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import detailMenuComp from "@/components/detailMenuComp";
export default {
  data() {
    return {};
  },
  components: {
    detailMenuComp: detailMenuComp //菜谱描述
  },
  created() {},
  methods: {}
};
</script>
<style lang="less" scoped>
.detailMenu {
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
  .button {
    margin-bottom: 30px;
  }
}
</style>