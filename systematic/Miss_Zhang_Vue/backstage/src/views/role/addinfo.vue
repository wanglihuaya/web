<template>
  <div>
    <el-button plain type="primary" @click="addInfo.dialogFormVisible = true">
      添加
    </el-button>

    <el-dialog
      :title="addInfo.dialogEditVisible ? '添加角色' : '编辑角色'"
      :visible.sync="addInfo.dialogFormVisible"
      center
    >
      <el-form :model="role" :rules="rules" ref="ruleForm">
        <el-form-item
          label="角色名称："
          prop="rolename"
          :label-width="formLabelWidth"
        >
          <el-input v-model="role.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限：" :label-width="formLabelWidth">
          <el-tree
            :data="getMenuList"
            show-checkbox
            node-key="id"
            default-expand-all
            :props="{
              children: 'children',
              label: 'title',
            }"
            ref="tree"
            check-strictly
          >
          </el-tree>
        </el-form-item>

        <el-form-item label="状态：" :label-width="formLabelWidth">
          <el-switch
            v-model="role.status"
            active-color="teal"
            inactive-color="tomato"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="
            addInfo.dialogFormVisible = false;
            reset();
          "
          >取 消</el-button
        >
        <el-button
          v-if="addInfo.dialogEditVisible"
          type="primary"
          @click="add('ruleForm')"
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
import { addRole, editRole, roleInfo } from '../../tools/axios'
/* 引入路由配置项 */
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      value: '100',
      role: {
        rolename: '',//角色名称
        menus: '',//角色权限，菜单权限，存放菜单编号，用逗号隔开'[1,2,3]'
        status: 1,//1 正常 || 2 禁用
      },
      formLabelWidth: '120px',
      rules: {
        rolename: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  props: ['addInfo'],
  methods: {
    ...mapActions({
      'getMenuListAction': 'menu/getMenuListAction',
      'getRoleListAction': 'role/getRoleListAction'
    }),
    /* 封装重置函数 */
    reset () {
      this.menu = {
        rolename: '',//角色名称
        menus: '',//角色权限，菜单权限，存放菜单编号，用逗号隔开'[1,2,3]'
        status: 1,//1 正常 || 2 禁用
      }
      this.$refs.tree.setCheckedKeys([])
    },
    /* 添加 */
    add (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.role.menus = this.$refs.tree.getCheckedKeys().join(',')
          addRole(this.role)
            .then((res) => {
              if (res.data.code === 200) {
                this.$message.success(res.data.msg)
                this.addInfo.dialogFormVisible = false;
                this.reset()
                this.getRoleListAction()
              } else {
                this.$message.error(res.data.msg)
              }
            })
        } else {
          console.log('提交失败！！');
          return false;
        }
      })
    },
    /* 查询一条数据 */
    lookInfo (id) {
      roleInfo({ id }).then(res => {
        console.log('查询角色一条数据的结果', res);
        if (res.data.code === 200) {
          this.role = res.data.list
          this.$refs.tree.setCheckedKeys(this.role.menus.split(','))
          this.role.id = id
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    /* 封装一个修改事件 */
    update (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.role.menus = this.$refs.tree.getCheckedKeys().join(',')
          editRole(this.role)
            .then((res) => {
              if (res.data.code === 200) {
                this.$message.success(res.data.msg)
                this.addInfo.dialogFormVisible = false
                this.reset()
                this.getRoleListAction()
              } else {
                this.$message.error(res.data.msg)
              }
            })
        } else {
          console.log('提交失败！！！')
          return false
        }
      })
    },
  },
  mounted () {
    this.getMenuListAction()
  },
  computed: {
    ...mapGetters({
      'getMenuList': 'menu/getMenuList'
    })
  }
}
</script>
<style scoped>
.el-button {
  margin: 20px 0;
}
.el-button {
  margin-right: 10px;
}
</style>