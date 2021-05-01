<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加会员' : '修改会员'"
      :visible.sync="addInfo.isShow"
      :before-close="cancel"
      center
    >
      <el-form :model="form" :rules="rules" ref="rules">
        <el-form-item
          prop="phone"
          label="手机号:"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          prop="nickname"
          label="昵称:"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码:" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态:" :label-width="formLabelWidth">
          <el-switch
            v-model="form.status"
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
        <el-button @click="update" type="primary">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
//引入辅助性函数
import { mapGetters, mapActions } from "vuex";
import { getMemberInfo, getMemberEdit } from "../../tools/axios";
export default {
  data() {
    return {
      //表单对象
      form: {
        nickname: "", // 昵称
        phone: "", //手机号
        password: "", //密码
        status: 1 //状态1正常2禁用
      },
      //label宽度
      formLabelWidth: "120px",
      //规则验证
      rules: {
        nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        phone: [{ required: true, message: "请输入手机号", trigger: "blur" }]
      }
    };
  },
  computed: {},
  mounted() {},
  props: ["addInfo"],
  methods: {
    //封装重置事件
    reset() {
      this.form = {
        nickname: "", // 昵称
        phone: "", //手机号
        password: "", //密码
        status: 1 //状态1正常2禁用
      };
      this.$refs["rules"].resetFields();
    },
    cancel() {
      this.$emit("cancel", false);
      this.reset();
    },
    ...mapActions({
      getMemberList: "member/getMemberListAction"
    }),
    look(uid) {
      getMemberInfo({ uid }).then(res => {
        console.log(res, "获取一条数据");
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.uid = uid;
        }
      });
    },
    update() {
      getMemberEdit(this.form).then(res => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.getMemberList();
          this.cancel();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    }
  }
};
</script>

<style lang="" scoped></style>
