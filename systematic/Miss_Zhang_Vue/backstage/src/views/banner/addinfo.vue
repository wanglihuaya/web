<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加轮播图' : '编辑轮播图'"
      :visible.sync="addInfo.isShow"
      center
      :before-close="cancel"
    >
      <el-form :model="bannerForm" :rules="rules" ref="ruleForm">
        <el-form-item
          label="轮播图标题："
          prop="title"
          :label-width="formLabelWidth"
        >
          <el-input v-model="bannerForm.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片：" :label-width="formLabelWidth">
          <el-upload
            action="#"
            list-type="picture-card"
            :auto-upload="false"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-change="onChange"
            :file-list="fileList"
            :limit="1"
            :on-exceed="handleExceed"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-form-item>

        <el-form-item label="状态：" :label-width="formLabelWidth">
          <el-switch
            v-model="bannerForm.status"
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
        <el-button v-if="addInfo.isAdd" @click="add('ruleForm')" type="primary"
          >确 定</el-button
        >
        <el-button v-else @click="update('ruleForm')" type="primary"
          >编辑</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { getBannerInfo, getBannerAdd, getBannerEdit } from "../../tools/axios";
export default {
  data() {
    return {
      bannerForm: {
        title: "", //商品轮播图名称
        img: "", //图片
        status: 1 //状态1正常2禁用
      },
      fileList: [],
      dialogImageUrl: "",
      dialogVisible: false,
      imgUrl: "", //文件图片的配置对象
      rules: {
        title: [
          {
            required: true,
            message: "请输入轮播图名称",
            trigger: "blur"
          },
          {
            min: 2,
            max: 8,
            message: "长度在 2 到 8 个字符",
            rigger: "blur"
          }
        ]
      },
      formLabelWidth: "120px"
    };
  },
  props: ["addInfo"],
  mounted() {},
  computed: {
    ...mapGetters({
      getBannerList: "banner/getBannerList"
    })
  },
  methods: {
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    onChange(file) {
      this.imgUrl = file.raw;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 关闭弹框
    cancel() {
      this.$emit("cancel", {
        isShow: false,
        isAdd: this.addInfo.isAdd
      });
      this.reset();
    },
    // 重置内容
    reset() {
      this.bannerForm = {
        title: "", //商品轮播图名称
        img: "", //图片
        status: 1 //状态1正常2禁用
      };
    },
    ...mapActions({
      getBannerListAction: "banner/getBannerListAction"
    }),
    lookUp(id) {
      getBannerInfo({ id }).then(res => {
        this.bannerForm = res.data.list;
        this.bannerForm.id = id;
        this.fileList = this.bannerForm.img
          ? [{ url: this.$imgUrl + this.bannerForm.img }]
          : "";
      });
    },
    update(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.bannerForm.img = this.imgUrl ? this.imgUrl : this.bannerForm.img;
          let file = new FormData();
          // 循环添加对象c
          for (let i in this.bannerForm) {
            file.append(i, this.bannerForm[i]);
          }
          getBannerEdit(file).then(res => {
            if (res.data.code === 200) {
              this.$message.success(res.data.msg);
              this.cancel();
              this.getBannerListAction();
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
    add(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.bannerForm.img = this.imgUrl;
          console.log(this.bannerForm);
          let file = new FormData();
          // 循环添加对象
          for (let i in this.bannerForm) {
            file.append(i, this.bannerForm[i]);
          }
          getBannerAdd(file).then(res => {
            if (res.data.code === 200) {
              this.$message.success(res.data.msg);
              this.cancel();
              this.getBannerListAction();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="" scoped>
.img {
  width: 120px;
  height: 120px;
}
</style>
