<!--发布菜谱-->
<template>
  <div class="createMenu">
    <!-- 菜谱名称 -->
    菜谱名称
    <span class="xing">*</span>：
    <el-input v-model="menuname" placeholder="请输入菜谱名称" size="small" class="caipu-input" maxlength="20"></el-input>
    <br>
    <div class="jiange"></div>
    <!-- 成品图片 -->
    成品图片（最多3张）
    <span class="xing">*</span>:
    <div class="jiange"></div>
    <el-upload
      :action="'/api/menu/imgUpload'"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-exceed="onExceed"
      :limit="3"
      :on-success="onSuccess"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt>
    </el-dialog>
    <div class="jiange"></div>
    <!-- 菜谱描述 -->
    <el-input
      type="textarea"
      :rows="4"
      placeholder="请输入菜谱描述，最多输入200字"
      v-model="descript"
      maxlength="200"
      class="caipumiaoshu-input"
    ></el-input>
    <br>
    <div class="jiange"></div>
    <!-- 基本参数（难度、口味、工艺、耗时、厨具） -->
    基本参数
    <span class="xing">*</span>:
    <br>
    <div class="jiange"></div>
    <el-select v-model="type.nandu" placeholder="难度" size="mini">
      <el-option
        v-for="item in dectionary"
        :key="item.dictionary_id"
        :label="item.name"
        :value="item.dictionary_id"
      ></el-option>
    </el-select>

    <el-select v-model="type.kouwei" placeholder="口味" size="mini">
      <el-option
        v-for="item in dectionary1"
        :key="item.dictionary_id"
        :label="item.name"
        :value="item.dictionary_id"
      ></el-option>
    </el-select>

    <el-select v-model="type.gongyi" placeholder="工艺" size="mini">
      <el-option
        v-for="item in dectionary2"
        :key="item.dictionary_id"
        :label="item.name"
        :value="item.dictionary_id"
      ></el-option>
    </el-select>
    <br>
    <div class="jiange"></div>

    <el-select v-model="type.haoshi" placeholder="耗时" size="mini">
      <el-option
        v-for="item in dectionary3"
        :key="item.dictionary_id"
        :label="item.name"
        :value="item.dictionary_id"
      ></el-option>
    </el-select>

    <el-select v-model="type.chujv" multiple placeholder="厨具" size="mini">
      <el-option
        v-for="item in dectionary4"
        :key="item.dictionary_id"
        :label="item.name"
        :value="item.dictionary_id"
      ></el-option>
    </el-select>
    <br>
    <div class="jiange"></div>

    <!-- 食材明细 -->
    食材明细
    <span class="xing">*</span>:
    <el-button type="primary" size="mini" @click="dialogVisible1 = true">添加分组</el-button>
    <div class="jiange"></div>

    <div v-for="(item1, index1) in groups" :key="index1" class="biankuang">
      <span>{{item1.groupname}}</span>
      <el-button type="primary" size="mini" @click="delGroup(index1)" class="shanchufenzu-button">x</el-button>
      <div class="jiange"></div>
      <div v-for="(item2, index2) in item1.ingredient" :key="index2">
        <el-input
          v-model="item2.ingredientname"
          placeholder="食材名"
          size="small"
          class="shicaiming-input"
          maxlength="20"
        ></el-input>
        <el-input v-model="item2.amount" placeholder="用量" size="small" class="yongliang-input" maxlength="20"></el-input>
        <el-button size="mini" @click="delIngredient(index1,index2)">x</el-button>
        <el-button size="mini" @click="addIngredient(index1,index2)">+</el-button>
        <div class="jiange"></div>
      </div>
      <div class="jiange"></div>
    </div>

    <!-- 做法步骤 -->
    做法步骤
    <span class="xing">*</span>:
    <el-button type="primary" size="mini" @click="addSteps()">添加步骤</el-button>
    <div class="jiange"></div>

    <div v-for="(item3, index3) in steps" class="buzhou">
      <el-upload
        class="avatar-uploader"
        :action="'/api/menu/imgUpload'"
        :show-file-list="false"
        :on-success="((i)=>{handleAvatarSuccess(i,index3)})"
      >
        <img v-if="item3.path" :src="'/api' +item3.path" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>

      <el-input
        type="textarea"
        :rows="4"
        :placeholder="(index3+1)+'、请输入做法说明菜谱描述，最多输入200字'"
        v-model="item3.descript"
        maxlength="200"
        class="buzhou-input"
      ></el-input>
      <el-button size="mini" @click="delSteps(index3)" class="buzhou-button">x</el-button>
    </div>
    <div class="jiange"></div>

    <!-- 小窍门 -->
    小窍门:
    <br>
    <div class="jiange"></div>

    <el-input type="textarea" :rows="4" placeholder="最多输入200字" v-model="trick" style="width:600px" maxlength="200"></el-input>
    <br>
    <div class="jiange"></div>

    <div class="youbian">
      <div class="jiange">
        原创
        <span class="xing">*</span>:
        <br>
      </div>

      <el-radio-group v-model="iscreate" size="small">
        <el-radio label="0" border>原创</el-radio>
        <el-radio label="1" border>非原创</el-radio>
      </el-radio-group>
      <br>
      <div class="jiange"></div>
      <el-button type="primary" @click="addMenu1">发布菜谱</el-button>
      <el-button type="primary" @click="addMenu2">存为草稿</el-button>
    </div>

    <!--食材明细（添加分组的弹窗）-->
    <el-dialog
      title="编辑组名"
      :visible.sync="dialogVisible1"
      width="30%"
      :modal-append-to-body="false"
    >
      <span>食材组名：</span>
      <el-input v-model="shicaizuming" placeholder="请输入内容" size="small" style="width:200px" maxlength="20"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="addGroup">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //成品图
      dialogImageUrl: "",
      dialogVisible: false,

      //基本参数
      dectionary: [],
      dectionary1: [],
      dectionary2: [],
      dectionary3: [],
      dectionary4: [],

      //添加分组(弹窗)
      dialogVisible1: false,
      shicaizuming: "",

      //数据
      menuname: "", //菜谱名称
      chengpintu: [], //成品图
      descript: "", //描述
      type: {
        nandu: "", //难度
        kouwei: "", //口味
        gongyi: "", //工艺
        haoshi: "", //耗时
        chujv: [] //厨具
      },
      groups: [
        //食材组
        { groupname: "主料", ingredient: [{ ingredientname: "", amount: "" }] }
      ],
      steps: [
        //步骤
        { path: "", descript: "" }
      ],
      trick: "", //小窍门
      iscreate: "", //是否原创
      state: "" //菜谱状态
    };
  },
  created() {
    var data = this.qs.stringify({
      nameArr: ["难度", "口味", "工艺", "耗时", "厨具"]
    },{arrayFormat: 'brackets'});
    this.axios
      .post("/api/dictionary/getAlldictionaryByName", data)
      .then(res => {
       this.dectionary = res.data.data['难度']
       this.dectionary1 = res.data.data['口味']
       this.dectionary2 = res.data.data['工艺']
       this.dectionary3 = res.data.data['耗时']
       this.dectionary4 = res.data.data['厨具']
      });
  },
  methods: {
    //成品图片
    handleRemove(file, fileList) {
      var arr=[]
      for(let item of fileList){
        arr.push({url: item.response.data.uploadPath})
      }
      this.chengpintu = arr
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    onExceed() {
      //上传图片超出上限，弹框提示
      this.$alert("成品图片最多上传3张", "提示", {
        confirmButtonText: "确定"
      });
    },
    onSuccess(response, file, fileList) {
      //上传成功
      this.chengpintu.push({ url :file.response.data.uploadPath});
    },

    //食材明细
    addGroup() {
      //添加食材组
      if(this.shicaizuming.split(" ").join("").length==0){
        this.$message.error('请输入食材组名称')
        this.shicaizuming = ""; //清空数据
      }else{
        this.dialogVisible1 = false; //关闭弹窗
        this.groups.push({
          groupname: this.shicaizuming,
          ingredient: [{ ingredientname: "", amount: "" }]
        }); //添加食材组名
        this.shicaizuming = ""; //清空数据
      }
    },
    delGroup(index1) {
      //删除食材组
      this.groups.splice(index1, 1);
    },
    addIngredient(index1, index2) {
      //添加食材
      this.groups[index1].ingredient.splice(index2 + 1, 0, {
        ingredientname: "",
        amount: ""
      });
    },
    delIngredient(index1, index2) {
      //删除食材
      this.groups[index1].ingredient.splice(index2, 1);
    },

    //做法步骤
    handleAvatarSuccess(res, index3) {
      //上传图片成功
      this.steps[index3].path = res.data.uploadPath;
    },
    addSteps() {
      //  添加步骤
      this.steps.push({ path: "", descript: "" });
    },
    delSteps(index3) {
      //删除步骤
      this.steps.splice(index3, 1);
    },

    addMenu() {
      if(this.menuname.split(" ").join("").length == 0
      ||this.chengpintu.length==0
      ||this.type.nandu==''
      ||this.type.kouwei==''
      ||this.type.gongyi==''
      ||this.type.haoshi==''
      ||this.type.chujv.length==0
      ||this.groups[0].ingredient[0].ingredientname.split(" ").join("").length== 0
      ||this.steps[0].descript.split(" ").join("").length== 0
      ||this.iscreate == ''
      ){
        this.$message.error('请输入完整菜谱');
        return false
      }
      var data = this.qs.stringify({
        menuname: this.menuname,
        chengpintu: JSON.stringify(this.chengpintu),
        descript: this.descript,
        type: JSON.stringify(this.type),
        groups: JSON.stringify(this.groups),
        steps: JSON.stringify(this.steps),
        trick: this.trick,
        iscreate: this.iscreate,
        state: this.state
      });

      this.axios.post("/api/menu/createMenu", data).then(res => {
        if (res.data.code == 999) {
          this.$message.success(res.data.msg);
          this.$router.push("/personalCenter/menu");
        }
        else{
          this.$message.error('请输入完整菜谱');
        }
      });
    },

    //发布菜谱
    addMenu1() {
      this.state = "1";
      this.addMenu();
    },
    //存为草稿
    addMenu2() {
      this.state = "0";
      this.addMenu();
    }
  }
};
</script>

<style lang="less" scoped>
.createMenu {
  margin: 10px 0 0 20px;
  position: relative;
  .caipu-input {
    width: 400px;
  }
  .caipumiaoshu-input {
    width: 500px;
  }
  .biankuang {
    border: 1px solid #b19595c5;
    width: 600px;
    border-radius: 10px;
    margin-bottom: 10px;
    padding: 10px;
    position: relative;
    .shanchufenzu-button {
      position: absolute;
      right: 10px;
      top: 5px;
    }
    .shicaiming-input {
      width: 300px;
    }
    .yongliang-input {
      width: 150px;
    }
  }
  .buzhou {
    height: 150px;
    width: 620px;
    position: relative;
    margin-bottom: 10px;
    .buzhou-input {
      width: 400px;
      position: absolute;
      right: 50px;
      top: 0;
    }
    .buzhou-button {
      position: absolute;
      right: 0px;
      top: 30px;
    }
  }
  .youbian {
    position: fixed;
    top: 50px;
    left: 1000px;
  }
}

.jiange {
  margin-bottom: 10px;
}
.xing {
  color: red;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 148px;
  height: 148px;
  line-height: 148px;
  text-align: center;
  border: 1px dashed #c0ccda;
  border-radius: 6px;
}
.avatar-uploader-icon:hover {
  border: 1px dashed #f56c6c;
}
.avatar {
  width: 148px;
  height: 148px;
  display: block;
}
</style>
