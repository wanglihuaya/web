<template>
  <div>
    <el-button plain type="primary" @click="addInfo.dialogFormVisible = true">
      添加
    </el-button>
    <el-dialog
      :title="addInfo.dialogEditVisible ? '添加用户' : '编辑用户'"
      :visible.sync="addInfo.dialogFormVisible"
      center
    >
      <el-form :model="manager" :rules="rules" ref="ruleForm">
        <el-form-item
          label="所属角色："
          prop="roleid"
          :label-width="formLabelWidth"
        >
          <el-select v-model="manager.roleid" placeholder="请选择">
            <el-option
              v-for="item in getRoleList"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          prop="username"
          label="用户名称"
          :label-width="formLabelWidth"
        >
          <el-input v-model="manager.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="manager.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="manager.status"
            active-color="teal"
            inactive-color="tomato"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addInfo.dialogFormVisible = true">取 消</el-button>
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
import { addManager, editManager, managerInfo } from '../../tools/axios'
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      manager: {
        roleid: "", //角色编号
        username: "", //管理员名称
        password: "", //密码
        status: 1 //1是正常2禁用
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          { min: 2, max: 15, message: "长度在 2到 15 个字符", trigger: "blur" }
        ],
        roleid: [
          { required: true, message: "请选择所属角色", trigger: "change" }
        ]
      },
      formLabelWidth: "120px"
    };
  },
  computed: {
    ...mapGetters({
      getRoleList: "role/getRoleList"
    })
  },
  mounted () {
    //用户列表一触发就调用角色列表
    this.getRoleListAction()
  },
  props: ["addInfo"],
  methods: {
    ...mapActions({
      getRoleListAction: "role/getRoleListAction",
      getManagerListAction: "manager/getManagerListAction",
      getCountAction: "manager/getCountAction"
    }),

    reset () {
      this.manager = {
        roleid: "",
        username: "",
        password: "",
        status: 1
      }
    },
    //封装一个添加事件
    add (formName) {
      //添加方法执行，触发validate验证器
      this.$refs[formName].validate(valid => {
        if (valid) {
          addManager(this.manager).then(res => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.addInfo.dialogFormVisible = false;
              this.reset()
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
    },
    lookInfo (id) {
      managerInfo({ uid: id }).then(res => {
        console.log(res, "查询用户一条数据结果");
        if (res.data.code === 200) {
          this.manager = res.data.list;
          this.manager.uid = id;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    update (formName) {
      //当前密码如果修改就是重新赋值即可，如果为空就是上一次的密码
      //修改方法执行，触发validate验证器
      this.$refs[formName].validate(valid => {
        if (valid) {
          editManager(this.manager).then(res => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.addInfo.dialogFormVisible = false;
              this.reset()
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
<style scoped>
.el-button {
  margin: 20px 0;
}
.el-button {
  margin-right: 10px;
}
</style>