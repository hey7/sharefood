<template>
  <div class="createMenu">
      菜谱名称<span>*</span>：
      <el-input v-model="name" placeholder="请输入内容" size="small" style="width:400px"></el-input><br>
     
      成品图片（最多3张）<span>*</span>:
      <el-upload
        action="http://127.0.0.1:3000/menu/imgUpload"
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

      <el-input
        type="textarea"
        :rows="4"
        placeholder="请输入菜谱描述，最多输入200字"
        v-model="describe"
        style="width:600px">
      </el-input><br>

      基本参数<span>*</span>:<br>
    <el-select v-model="nandu" placeholder="难度" size="mini">
      <el-option
        v-for="item in dectionary"
        :key="item.dictionary_id"
        :label="item.name"
        :value="item.dictionary_id">
        <span style="float: left;with">{{ item.name }}</span>
      </el-option>
    </el-select>

    <el-select v-model="nandu" placeholder="口味" size="mini">
      <el-option
        v-for="item in dectionary"
        :key="item.dictionary_id"
        :label="item.name"
        :value="item.dictionary_id">
        <span style="float: left">{{ item.name }}</span>
      </el-option>
    </el-select>

    <el-select v-model="nandu" placeholder="工艺" size="mini">
      <el-option
        v-for="item in dectionary"
        :key="item.dictionary_id"
        :label="item.name"
        :value="item.dictionary_id"
        class="aa">
      </el-option>
    </el-select>

    <select name="" id="">
    </select>



  </div>
</template>

<script>
export default {
  data() {
    return {
      name:'',   //菜谱名称
      dialogImageUrl: '',
      dialogVisible: false,
      chengpintu:[],   //成品图
      describe: '',   //描述
      nandu:'',       //难度
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
      
      };
    },
    methods: {
      //成品图操作
      handleRemove(file, fileList) {    //删除
        this.chengpintu = fileList;
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      onExceed(){       //上传图片超出上限
        this.$alert('成品图片最多上传3张', '提示', {
          confirmButtonText: '确定'
        });
      },
      onSuccess(response, file, fileList){  //上传成功
        this.chengpintu = fileList;
        console.log(this.nandu)
      }
    }
  }

</script>

<style lang="less" scoped>
.createMenu{
  margin: 10px 0 0 10px;
  position: relative;
  span{
    color: red;
  }
}
</style>
