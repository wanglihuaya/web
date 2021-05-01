<template>
  <div>
    <el-button
      plain
      type="primary"
      @click="
        addInfo.dialogFormVisible = true;
        addInfo.dialogEditVisible = true;
      "
    >
      添加
    </el-button>
    <el-dialog
      :title="addInfo.dialogEditVisible ? '添加商品分类' : '编辑商品分类'"
      :visible.sync="addInfo.dialogFormVisible"
      center
      :before-close="cancel"
    >
      <el-form :model="sort" :rules="rules" ref="ruleForm">
        <el-form-item
          label="上级分类："
          prop="pid"
          :label-width="formLabelWidth"
        >
          <el-select v-model="sort.pid" placeholder="请选择">
            <el-option label="顶级分类" :value="0"></el-option>
            <el-option
              v-for="item in getSortList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          prop="catename"
          label="分类名称"
          :label-width="formLabelWidth"
        >
          <el-input v-model="sort.catename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          v-if="sort.pid != 0"
          label="图片"
          :label-width="formLabelWidth"
        >
          <el-upload
            action="#"
            :auto-upload="false"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-change="onChange"
            :file-list="fileList"
            :limit="1"
            :on-exceed="handleExceed"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <!-- 预览展示 -->
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="sort.status"
            active-color="teal"
            inactive-color="tomato"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button
          v-if="addInfo.dialogEditVisible"
          @click="add('ruleForm')"
          type="primary"
          >确 定</el-button
        >
        <el-button v-else type="primary" @click="update('ruleForm')"
          >编 辑</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getSortAdd, getSortInfo, getSortEdit } from '../../tools/axios'
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      sort: {
        pid: 0, //上级分类编号 int型
        catename: "", //商品分类名称
        img: "", //图片(文件，一般用于二级分类)
        status: 1 //状态1正常2禁用
      },
      rules: {
        catename: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" }
        ],
        pid: [
          { required: true, message: " 请选择上级分类", trigger: "change" }
        ]
      },
      formLabelWidth: "120px",
      dialogImageUrl: "", //预览图片地址
      dialogVisible: false, //预览的弹框默认是false
      imgUrl: "", //文件图片的配置对象
      fileList: [] //文件列表
    };
  },
  computed: {
    ...mapGetters({
      getSortList: "sort/getSortList"
    })
  },
  props: ["addInfo"],
  methods: {
    //文件上传的限制
    handleExceed (files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    //当文件改变时，触发的函数方法
    onChange (file) {
      console.log(file, "文件的属性配置");
      this.imgUrl = file.raw;
    },
    //预览时的删除
    handleRemove (file, fileList) {
      console.log(file, fileList);
    },
    //方法预览
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    ...mapActions({
      getSortListAction: "sort/getSortListAction",
    }),
    cancel () {
      this.addInfo.dialogFormVisible = false;
      this.addInfo.dialogEditVisible = this.addInfo.dialogEditVisible
      this.reset();
    },

    reset () {
      this.sort = {
        pid: 0, //上级分类编号 int型
        catename: "", //商品分类名称
        img: "", //图片(文件，一般用于二级分类)
        status: 1 //状态1正常2禁用
      }
    },
    //封装一个添加事件
    add (formName) {
      //添加方法执行，触发validate验证器
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.sort.img = this.imgUrl
          let file = new FormData()
          for (let i in this.sort) {
            file.append(i, this.sort[i])
          }
          file.append('img', this.imgUrl)
          getSortAdd(file).then(res => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.cancel()
              this.getSortListAction();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    lookInfo (id) {
      getSortInfo({ id }).then(res => {
        console.log(res, "查询规格一条数据结果");

        if (res.data.code === 200) {
          this.sort = res.data.list;
          this.sort.id = id;
          this.fileList = this.sort.img
            ? [{ url: this.$imgUrl + this.sort.img }]
            : [];
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    update (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.sort.img = this.imgUrl ? this.imgUrl : this.sort.img
          let file = new FormData()
          for (let i in this.sort) {
            file.append(i, this.sort[i])
          }

          getSortEdit(file).then(res => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.cancel()
              this.getSortListAction();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          console.log("error submit!!")
          return false;
        }
      });
    }
  }
}

</script>
<style scoped>
.el-button {
  margin: 20px 0;
}
</style>