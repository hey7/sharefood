<!--菜谱详情页-->
<template>
  <div class="detailMenuComp">
    <div class="info-cont">
      <div class="info-item">
        <p class="i-name">菜谱id：</p>
        <p class="i-val">{{menu.menu_id}}</p>
      </div>
      <div class="info-item">
        <p class="i-name">菜谱名称：</p>
        <p class="i-val">{{menu.menuname}}</p>
      </div>
      <div class="info-item">
        <p class="i-name">用户id：</p>
        <p class="i-val">{{menu.user_id}}</p>
      </div>
      <div class="info-item">
        <p class="i-name">用户名：</p>
        <p class="i-val">{{menu.username}}</p>
      </div>
      <div class="info-item">
        <p class="i-name">状态：</p>
        <p class="i-val" v-if="menu.state==1">待审核</p>
        <p class="i-val" v-if="menu.state==2||menu.state==3">退稿</p>
        <p class="i-val" v-if="menu.state==4||menu.state==5">已发布</p>
      </div>
      <div class="info-item">
        <p class="i-name">原创：</p>
        <p class="i-val" v-if="menu.iscreate==0">原创</p>
        <p class="i-val" v-else>非原创</p>
      </div>

      <div class="info-item">
        <p class="i-name">创建时间：</p>
        <p class="i-val">{{dateFormat(menu.create_time,0)}}</p>
      </div>
      <div class="info-item">
        <p class="i-name">修改时间：</p>
        <p class="i-val">{{dateFormat(menu.modified_time,0)}}</p>
      </div>
      <!-- <div class="info-item-depict">
          <p class="i-name"></p>
          <p class="i-val" ></p>
      </div>-->
    </div>

    <div class="depict">
      <el-row class="depict-item" v-if="menu.state==4||menu.state==5">
        <el-col :span="2">
          <div class="name">菜谱分类：</div>
        </el-col>
        <el-col :span="22">
          <div class="val">
            <el-tag v-for="tag in tags" :key="tag.value" :type="tag.type">{{tag.label}}</el-tag>
          </div>
        </el-col>
      </el-row>

      <el-row class="depict-item">
        <el-col :span="2">
          <div class="name">成品图：</div>
        </el-col>
        <el-col :span="22">
          <div class="val">
            <el-row>
              <el-col :span="8" v-for="(item, index) in chengpintu">
                <div class="chengpintu">
                  <div class="recipeStep_num">{{index+1}}</div>
                  <img :src="'/api'+item.url" alt>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
      <el-row class="depict-item">
        <el-col :span="2">
          <div class="name">描述：</div>
        </el-col>
        <el-col :span="22">
          <div v-html="menu.descript" class="val"></div>
        </el-col>
      </el-row>
      <el-row class="depict-item">
        <el-col :span="2">
          <div class="name">食材：</div>
        </el-col>
        <el-col :span="22">
          <div class="val" v-if="groups.length!==0">
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
          </div>
        </el-col>
      </el-row>
      <el-row class="depict-item">
        <el-col :span="2">
          <div class="name">分类：</div>
        </el-col>
        <el-col :span="22">
          <div class="val" v-if="type!=={}">
            <div class="type">
              <el-row>
                <el-col :span="4" v-for="(item3, index3) in type" :key="'3-'+index3">
                  <div class="item">
                    <div class="name">
                      <span v-for="(item4, index4) in item3" :key="'4-'+index4">{{item4.name}}</span>
                    </div>
                    <div class="typee">{{item3[0].type}}</div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row class="depict-item">
        <el-col :span="2">
          <div class="name">步骤：</div>
        </el-col>
        <el-col :span="22">
          <div class="val">
            <div class="steps" v-for="(item5, index5) in steps" :key="'5-'+index5">
              <el-row type="flex" justify="space-between">
                <el-col :span="4">
                  <img :src="'/api'+item5.path" alt width="100%" v-if="item5.path!==''">
                </el-col>
                <el-col :span="19">
                  <div class="recipeStep_num">{{index5+1}}</div>
                  <div class="amount">{{item5.descript}}</div>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row class="depict-item">
        <el-col :span="2">
          <div class="name">窍门：</div>
        </el-col>
        <el-col :span="22">
          <div v-html="menu.trick" class="val"></div>
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
      menu: "",
      chengpintu: [],
      type: {},
      groups: {},
      steps: [],
      tags: []
    };
  },
  created() {
    var data = this.qs.stringify({
      menu_id: this.$route.query.menu_id
    });
    this.axios.post("/api/menu/searchMenu", data).then(res => {
      if (res.data.code == 999) {
        var data = res.data.data;
        this.menu = data.menu;
        this.chengpintu = data.chengpintu;
        this.groups = data.groups;
        this.type = data.type;
        this.steps = data.steps;
        this.tags = data.tags;
      }
    });
  },
  methods: {
    dateFormat
  }
};
</script>
<style lang="less" scoped>
.detailMenuComp {
  position: relative;
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
  .chengpintu {
    height: 150px;
    width: 350px;
    position: relative;
    .recipeStep_num {
      border: 1px solid #ddd;
      border-radius: 50%;
      font-size: 18px;
      width: 34px;
      height: 34px;
      line-height: 34px;
      text-align: center;
      float: left;
      margin-right: 10px;
    }
    img {
      height: 100px;
      float: left;
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
      margin-bottom: 10px;
    }
    img {
      width: 180px;
      height: 150px;
    }
  }
}
.el-tag {
  margin-left: 10px;
}
</style>