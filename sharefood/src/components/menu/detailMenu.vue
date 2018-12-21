<template>
  <div class="detailMenu">
    detailMenu
  </div>
</template>

<script>
export default {
  data() {
    return {
        menuname:'',   //菜谱名称
        chengpintu:[],   //成品图
        descript: '',   //描述
        type:{
            nandu:'',       //难度
            kouwei:'',      //口味
            gongyi:'',      //工艺
            haoshi:'',      //耗时
            chujv:[],       //厨具
        },
        groups:[        //食材组
            {groupname:'主料',ingredient:[{ingredientname:'',amount:''}]}
        ],
        steps:[       //步骤
            {path:'',descript:''}
        ],
        trick:'', //小窍门
        iscreate:'', //是否原创
        state:'' //菜谱状态
    }
  },
  created(){
    var data = this.qs.stringify({
        menu_id: this.$route.params.menu_id
    });
    this.axios
        .post(this.config.SREVER_HTTP + "/menu/getdetailMenu", data)
        .then(res => {
          console.log('res',res.data.data)
        });
  }
}

</script>

<style lang="less" scoped>

</style>
