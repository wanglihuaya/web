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
      center
      :before-close="cancel"
      :title="addInfo.dialogEditVisible ? '添加规格' : '编辑规格'"
      :visible.sync="addInfo.dialogFormVisible"
      @opened="createEditor"
    >
      <el-form :model="specsForm" :rules="rules" ref="ruleForm">
        <el-form-item
          prop="username"
          label="规格名称"
          :label-width="formLabelWidth"
        >
          <el-input v-model="specsForm.specsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品描述" :label-width="formLabelWidth">
          <div id="editor"></div>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="specsForm.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
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
        <el-button v-else type="primary" @click="update('ruleForm')"
          >编 辑</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import E from "wangeditor";
import { mapActions } from "vuex";
import { getSpecsAdd, getSpecsEdit, getSpecsInfo } from "../../tools/axios";
export default {
  data () {
    return {
      editor: null,
      des: '',//商品描述
      attrArr: [
        {
          value: ""
        }
      ],
      specsForm: {
        specsname: "", //规格名称
        attrs: "", //商品规格属性值
        status: 1 //1是正常2禁用
      },
      rules: {
        specsname: [
          { required: true, message: "请输入规格名称", trigger: "blur" },
          { min: 2, max: 15, message: "长度在 2到 15 个字符", trigger: "blur" }
        ]
      },
      formLabelWidth: "120px"
    };
  },
  props: ["addInfo"],
  mounted () { },
  methods: {
    createEditor () {
      console.log(new E("#editor"), "插件的配置项");
      this.editor = new E("#editor");
      this.editor.create();
      this.editor.txt.html(this.des)
    },
    addAttr () {
      if (this.attrArr.length <= 6) {
        this.attrArr.push({
          value: ""
        });
      } else {
        this.$message.warning("最多只能添加6个输入框");
      }
    },
    delAttr (item) {
      var index = this.attrArr.indexOf(item);
      if (index !== -1) {
        this.attrArr.splice(index, 1);
      }
    },
    ...mapActions({
      getSpecsListAction: "specs/getSpecsListAction",
      getCountAction: "specs/getCountAction"
    }),
    cancel () {
      this.$emit("cancel", {
        isShow: false,
        isAdd: this.addInfo.isAdd
      });
      this.reset();
    },
    reset () {
      this.specsForm = {
        specsname: "", //规格名称
        attrs: "", //商品规格属性值
        status: 1 //1是正常2禁用
      };
      this.$refs["ruleForm"].resetFields();
      this.attrArr = [
        {
          value: ""
        }
      ];
    },
    add (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.specsForm.attrs = this.attrArr.map(item => item.value).join(",");
          console.log(this.specsForm, "规则对象");
          getSpecsAdd(this.specsForm).then(res => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.cancel();
              this.getSpecsListAction();
              this.getCountAction();
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
      getSpecsInfo({ id }).then(res => {
        console.log(res, "查询规格一条数据结果");
        if (res.data.code === 200) {
          this.specsForm = res.data.list[0];
          this.specsForm.id = id;
          this.specsForm.attrs.map((item, index) => {
            if (index == 0) {
              this.attrArr[0].value = item;
            } else {
              this.attrArr.push({
                value: item
              });
            }
          });
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    update (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          editManger(this.specsForm).then(res => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.cancel();
              this.getMangerListAction();
              this.getCountAction();
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
.inpClass {
  width: 75%;
}
.el-button {
  margin: 20px 0;
}
</style>
