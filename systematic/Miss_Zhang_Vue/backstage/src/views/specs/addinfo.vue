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
    >
      <el-form :model="specsForm" :rules="rules" ref="ruleForm">
        <el-form-item
          prop="username"
          label="规格名称"
          :label-width="formLabelWidth"
        >
          <el-input v-model="specsForm.specsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          v-for="(item, index) in attrArr"
          :key="index"
          label="规格属性"
          :label-width="formLabelWidth"
        >
          <el-input
            class="inpClass"
            v-model="item.value"
            autocomplete="off"
          ></el-input>
          <el-button v-if="index === 0" @click="addAttr" type="primary"
            >新增规格属性</el-button
          >
          <el-button @click="delAttr(item)" v-else type="danger"
            >删除</el-button
          >
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="specsForm.status"
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
        <el-button v-if="addInfo.dialogEditVisible" @click="add('ruleForm')" type="primary"
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
import { mapActions } from "vuex";
import { getSpecsAdd, getSpecsEdit, getSpecsInfo } from "../../tools/axios";
export default {
  data() {
    return {
      //动态表单项
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
  methods: {
    //封装一个动态添加表单项
    addAttr() {
      //最多只能添加6次
      if (this.attrArr.length <= 6) {
        //给attrArr 动态添加数据
        this.attrArr.push({
          value: ""
        });
      } else {
        this.$message.warning("最多只能添加6个输入框");
      }
    },
    //删除动态表单项
    delAttr(item) {
      var index = this.attrArr.indexOf(item);
      if (index !== -1) {
        this.attrArr.splice(index, 1);
      }
    },
    ...mapActions({
      getSpecsListAction: "specs/getSpecsListAction",
      getCountAction: "specs/getCountAction"
    }),
    //封装一个取消事件
    cancel() {
      this.$emit("cancel", {
        dialogFormVisible: false,
        dialogEditVisible: this.addInfo.dialogEditVisible
      });
      //调用重置事件
      this.reset();
    },
    //封装一个重置事件
    reset() {
      this.specsForm = {
        specsname: "", //规格名称
        attrs: "", //商品规格属性值
        status: 1 //1是正常2禁用
      };
      //重置规则验证
      this.$refs["ruleForm"].resetFields();
      this.attrArr = [
        {
          value: ""
        }
      ];
    },
    //封装一个添加事件
    add(formName) {
      //添加方法执行，触发validate验证器
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.specsForm.attrs = this.attrArr.map(item => item.value).join(",");
          getSpecsAdd(this.specsForm).then(res => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //关闭弹框并重置
              this.cancel();
              //重新获取列表
              this.getSpecsListAction();
              //重新调取下总数（当你添加成功，分页也要跟着变化，只有总数变化之后，分页才能跟着变化）
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
    //封装一个查询一条数据事件
    lookInfo(id) {
      //调取查询接口
      getSpecsInfo({ id }).then(res => {
        console.log(res, "查询规格一条数据结果");
        if (res.data.code === 200) {
          this.specsForm = res.data.list[0];
          this.specsForm.id = id;
          this.specsForm.attrs.map((item, index) => {
            if (index == 0) {
              this.attrArr[0].value = item
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
    //封装一个修改事件
    update(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          getSpecsEdit(this.specsForm).then(res => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.cancel();             
              this.getManagerListAction();             
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
