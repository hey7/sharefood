<template>
  <div class="createMenu">
    <!-- 菜谱名称 -->
      菜谱名称<span class="xing">*</span>：
      <el-input v-model="menuname" placeholder="请输入菜谱名称" size="small" style="width:400px"></el-input><br>
    
    <!-- 成品图片 -->
      成品图片（最多3张）<span class="xing">*</span>:
      <el-upload
        :action="config.SREVER_HTTP + '/menu/imgUpload'"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-exceed="onExceed"
        :limit=3
        :on-success="onSuccess"
      >
      <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    
    <!-- 菜谱描述 -->
      <el-input
        type="textarea"
        :rows="4"
        placeholder="请输入菜谱描述，最多输入200字"
        v-model="descript"
        style="width:600px">
      </el-input><br>
    
    <!-- 基本参数（难度、口味、工艺、耗时、厨具） -->
      基本参数<span class="xing">*</span>:<br>
    <el-select v-model="type.nandu" placeholder="难度" size="mini">
      <el-option
        v-for="item in dectionary"
        :key="item.dictionary_id"
        :label="item.name"
        :value="item.dictionary_id">
      </el-option>
    </el-select>

    <el-select v-model="type.kouwei" placeholder="口味" size="mini">
      <el-option
        v-for="item in dectionary"
        :key="item.dictionary_id"
        :label="item.name"
        :value="item.dictionary_id">
      </el-option>
    </el-select>

    <el-select v-model="type.gongyi" placeholder="工艺" size="mini">
      <el-option
        v-for="item in dectionary"
        :key="item.dictionary_id"
        :label="item.name"
        :value="item.dictionary_id">
      </el-option>
    </el-select>

    <el-select v-model="type.haoshi" placeholder="耗时" size="mini">
      <el-option
        v-for="item in dectionary"
        :key="item.dictionary_id"
        :label="item.name"
        :value="item.dictionary_id">
      </el-option>
    </el-select>

    <el-select v-model="type.chujv" multiple placeholder="厨具" size="mini">
      <el-option
        v-for="item in dectionary"
        :key="item.dictionary_id"
          :label="item.name"
          :value="item.dictionary_id">
      </el-option>
    </el-select><br>

    <!-- 食材明细 -->
    食材明细<span class="xing">*</span>:
    <el-button type="primary" size="mini" @click="dialogVisible1 = true">添加分组</el-button><br>

    <div v-for="(item1, index1) in groups" :key="index1">
      <span>{{item1.group}}</span>
      <el-button type="primary" size="mini" @click="addIngredient(index1)">添加食材</el-button>
      <el-button type="primary" size="mini" @click="delGroup(index1)">删除分组</el-button>

      <div v-for="(item2, index2) in item1.ingredient" :key="index2">
        <el-input v-model="item2.name" placeholder="食材名" size="small" style="width:300px"></el-input>
        <el-input v-model="item2.amount" placeholder="用量" size="small" style="width:150px"></el-input>
        <el-button type="primary" size="mini" @click="delIngredient(index1,index2)">删除食材</el-button>
      </div>
    </div>

    <!-- 做法步骤 -->
    做法步骤<span class="xing">*</span>:
    <el-button type="primary" size="mini" @click="addSteps()">添加步骤</el-button>
    <div v-for="(item3, index3) in steps" style="height: 148px;width:600px; position: relative;">
      <el-upload
        class="avatar-uploader"
        :action="config.SREVER_HTTP + '/menu/imgUpload'"
        :show-file-list="false"
        :on-success="((i)=>{handleAvatarSuccess(i,index3)})">
        <img v-if="item3.path" :src="config.SREVER_HTTP +item3.path" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>

      <el-input
        type="textarea"
        :rows="4"
        :placeholder="(index3+1)+'、请输入做法说明菜谱描述，最多输入200字'"
        v-model="item3.explain"
        style="width:400px;position: absolute;right:0;top:0;">
      </el-input>
      <el-button type="primary" size="mini" @click="delIngredient(index1,index2)">删除食材</el-button>
    </div>

    <!-- 小窍门 -->
    小窍门<span class="xing">*</span>:<br>
    <el-input
        type="textarea"
        :rows="4"
        placeholder="最多输入200字"
        v-model="trick"
        style="width:600px">
    </el-input><br>

    原创<span class="xing">*</span>:<br>
    <el-radio-group v-model="iscreate" size="small">
      <el-radio label="0" border>原创</el-radio>
      <el-radio label="1" border>非原创</el-radio>
    </el-radio-group>


    <!--食材明细（添加分组的弹窗）-->
    <el-dialog
      title="编辑组名"
      :visible.sync="dialogVisible1"
      width="30%">
      <span>食材组名：</span>
      <el-input v-model="shicaizuming" placeholder="请输入内容" size="small" style="width:200px"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="addGroup">确 定</el-button>
      </span>
    </el-dialog>
    
    <el-button type="primary" @click="addMenu1">发布菜谱</el-button>
    <el-button type="primary" @click="addMenu2">存为草稿</el-button>

  </div>
</template>

<script>
export default {
  data() {
    return {
      //成品图
      dialogImageUrl: '',
      dialogVisible: false,

      //基本参数
      dectionary: [{
          dictionary_id: '1',
          name: '简单'
        }, {
          dictionary_id: '2',
          name: '普通'
        }, {
          dictionary_id: '3',
          name: '高级'
        }, {
          dictionary_id: '4',
          name: '神级'
        }],

     
      //添加分组(弹窗)
      dialogVisible1: false,
      shicaizuming:'',

      //数据
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
        {group:'主料',ingredient:[{name:'',amount:''}]}
      ],
      steps:[       //步骤
        {path:'',explain:''},
        {path:'',explain:''}
      ],
      trick:'', //小窍门
      iscreate:'', //是否原创
      state:'' //菜谱状态
      
      };
    },
    methods: {
      //成品图片
      handleRemove(file, fileList) {    //删除
        // this.chengpintu = fileList;   //赋值
        this.chengpintu.remove(file.response.data.uploadPath);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      onExceed(){       //上传图片超出上限，弹框提示
        this.$alert('成品图片最多上传3张', '提示', {
          confirmButtonText: '确定'
        });
      },
      onSuccess(response, file, fileList){  //上传成功
       this.chengpintu.push(file.response.data.uploadPath)
      },

      //食材明细
      addGroup(){     //添加食材组
        this.dialogVisible1 = false   //关闭弹窗
        this.groups.push({group:this.shicaizuming,ingredient:[]})   //添加食材组名
        this.shicaizuming=''      //清空数据
      },
      delGroup(index1){    //删除食材组
        this.groups.splice(index1,1);
      },
      addIngredient(index1){  //添加食材
        this.groups[index1].ingredient.push({name:'',amount:''})
      },   
      delIngredient(index1,index2){ //删除食材
        this.groups[index1].ingredient.splice(index2,1);
      },


      //做法步骤
      handleAvatarSuccess(res,index3) {  //上传图片成功
          this.steps[index3].path = res.data.uploadPath
      },
      addSteps(){//  添加步骤
        this.steps.push({path:'',explain:''})
      }, 


      addMenu(){
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

        this.axios
        .post(this.config.SREVER_HTTP + "/menu/createMenu", data)
        .then(res => {
          console.log('res',res)
        });


      },
      //发布菜谱
      addMenu1(){
        this.state='1'
        this.addMenu()
      },
      //存为草稿
      addMenu2(){
        this.state='0'
        this.addMenu()
      }

      

    }
  }

</script>

<style lang="less" scoped>
.createMenu{
  margin: 10px 0 0 10px;
  position: relative;
  .xing{
    color: red;
  }
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
  .avatar-uploader-icon:hover{
    border: 1px dashed  #f56c6c;
  }
  .avatar {
    width: 148px;
    height: 148px;
    display: block;
  }
</style>
