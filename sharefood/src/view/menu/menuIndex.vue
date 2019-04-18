<!--菜谱首页-->
<template>
  <div class="menuIndex">
    <c-header></c-header>
    <div class="content">
      <div class="search">
        <el-row :gutter="2">
          <el-col :span="2">
            <div class="name">难度：</div>
          </el-col>
          <el-col :span="22">
            <span class="val" :class="{classred:''===current0}" @click="addClass('',0)">全部</span>
            <span
              v-for="(item, index) in dectionary0"
              :key="'0-'+index"
              class="val"
              :class="{classred:item.dictionary_id===current0}"
              @click="addClass(item.dictionary_id,0)"
            >{{item.name}}</span>
          </el-col>
        </el-row>
        <el-row :gutter="2">
          <el-col :span="2">
            <div class="name">口味：</div>
          </el-col>
          <el-col :span="22">
            <span class="val" :class="{classred:''===current1}" @click="addClass('',1)">全部</span>
            <span
              v-for="(item, index) in dectionary1"
              :key="'1-'+index"
              class="val"
              :class="{classred:item.dictionary_id===current1}"
              @click="addClass(item.dictionary_id,1)"
            >{{item.name}}</span>
          </el-col>
        </el-row>
        <el-row :gutter="2">
          <el-col :span="2">
            <div class="name">工艺：</div>
          </el-col>
          <el-col :span="22">
            <span class="val" :class="{classred:''===current2}" @click="addClass('',2)">全部</span>
            <span
              v-for="(item, index) in dectionary2"
              :key="'2-'+index"
              class="val"
              :class="{classred:item.dictionary_id===current2}"
              @click="addClass(item.dictionary_id,2)"
            >{{item.name}}</span>
          </el-col>
        </el-row>
        <el-row :gutter="2">
          <el-col :span="2">
            <div class="name">耗时：</div>
          </el-col>
          <el-col :span="22">
            <span class="val" :class="{classred:''===current3}" @click="addClass('',3)">全部</span>
            <span
              v-for="(item, index) in dectionary3"
              :key="'3-'+index"
              class="val"
              :class="{classred:item.dictionary_id===current3}"
              @click="addClass(item.dictionary_id,3)"
            >{{item.name}}</span>
          </el-col>
        </el-row>
        <el-row :gutter="2">
          <el-col :span="2">
            <div class="name">厨具：</div>
          </el-col>
          <el-col :span="22">
            <span class="val" :class="{classred:''===current4}" @click="addClass('',4)">全部</span>
            <span
              v-for="(item, index) in dectionary4"
              :key="'4-'+index"
              class="val"
              :class="{classred:item.dictionary_id===current4}"
              @click="addClass(item.dictionary_id,4)"
            >{{item.name}}</span>
          </el-col>
        </el-row>
        <el-row :gutter="2">
          <el-col :span="2">
            <div class="name">菜谱分类：</div>
          </el-col>
          <el-col :span="22">
            <span class="val" :class="{classred:''===current5}" @click="addClass('',5)">全部</span>

            <el-popover
              placement="top-start"
              trigger="hover"
              width="400"
              v-for="(item, index) in dectionary5"
              :key="'5-'+index"
            >
              <span
                v-for="(item1, index1) in item.children"
                :class="{classred:item1.value ===current5}"
                class="val"
                @click="addClass(item1.value,5)"
              >{{item1.label}}</span>
              <span slot="reference" class="val">{{item.label}}</span>
            </el-popover>
          </el-col>
        </el-row>
      </div>
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
      dectionary0: [],
      dectionary1: [],
      dectionary2: [],
      dectionary3: [],
      dectionary4: [],
      dectionary5: [],

      //选的dictionary_id
      current0: "",
      current1: "",
      current2: "",
      current3: "",
      current4: "",
      current5: "",
      //数据
      menus: []
    };
  },
  methods: {
    addClass(dictionary_id, i) {
      this["current" + i] = dictionary_id; //换样式

      var arr = []; //存储所有包含的type
      for (let index = 0; index < 6; index++) {
        var val = this["current" + index];
        if (val === "") {
          //全部的不存
        } else arr.push(this["current" + index]);
      }

      var data = this.qs.stringify({
        type: JSON.stringify(arr)
      });
      this.axios.post("/api/menu/getAllMenuByType", data).then(res => {
        this.menus = res.data.data;
      });
    }
  },
  created() {
    //加载字典
    var data = this.qs.stringify(
      {
        nameArr: ["难度", "口味", "工艺", "耗时", "厨具"]
      },
      { arrayFormat: "brackets" }
    );
    this.axios
      .post("/api/dictionary/getAlldictionaryByName", data)
      .then(res => {
        this.dectionary0 = res.data.data["难度"];
        this.dectionary1 = res.data.data["口味"];
        this.dectionary2 = res.data.data["工艺"];
        this.dectionary3 = res.data.data["耗时"];
        this.dectionary4 = res.data.data["厨具"];
      });
    //加载菜谱字典
    var data = this.qs.stringify({
      name: "菜谱分类"
    });
    this.axios
      .post("/api/dictionary/getChildsByDictionaryName", data)
      .then(res => {
        if (res.data.code == 999) {
          this.dectionary5 = res.data.data;
        }
      });
    this.addClass();
  }
};
</script>
<style lang="less" scoped>
.menuIndex {
  min-width: 1200px;
  width: 100%;
  .content {
    width: 1170px;
    margin: 10px auto 100px;
    .search {
      .el-row {
        line-height: 20px;
        margin: 10px 0;
      }
      padding: 5px;
      border-radius: 10px;
      border: 1px solid #ddd;
      margin-bottom: 10px;
      font-size: 16px;
      .name {
        text-align: right;
        padding-right: 5px;
      }
    }
    .show-menu {
      width: 1170px;
      margin-bottom: 20px;
      .show-menu-item {
        width: 235px;
        height: 280px;
        margin: 10px auto 0;
        &:hover {
          -moz-box-shadow: 0 0 10px #ff6767;
          -webkit-box-shadow: 0 0 10px #ff6767;
          box-shadow: 0 0 10px #ff6767;
        }
        img {
          width: 235px;
          height: 235px;
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
    }
  }
}
.classred {
  color: #ff6767;
}
.val {
  margin-right: 30px;
  cursor: pointer;
  &:hover {
    color: #ff6767;
  }
}
</style>    