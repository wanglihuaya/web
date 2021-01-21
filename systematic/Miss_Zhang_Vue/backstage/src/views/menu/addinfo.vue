<template>
  <div>
    <el-button plain type="primary" @click="addInfo.dialogFormVisible = true">
      添加
    </el-button>
    <el-dialog
      :title="addInfo.dialogEditVisible ? '添加菜单' : '编辑菜单'"
      :rules="rules"
      :visible.sync="addInfo.dialogFormVisible"
      center
    >
      <el-form :model="menu" :rules="rules" ref="ruleForm">
        <el-form-item
          label="菜单名称："
          prop="title"
          :label-width="formLabelWidth"
        >
          <el-input v-model="menu.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="上级菜单："
          prop="pid"
          :label-width="formLabelWidth"
        >
          <el-select v-model="menu.pid" placeholder="请选择上级菜单">
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              v-for="item in menuList"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型：" :label-width="formLabelWidth">
          <el-radio v-model="menu.type" :label="1">目录</el-radio>
          <el-radio v-model="menu.type" :label="2">菜单</el-radio>
        </el-form-item>
        <el-form-item
          v-if="menu.type == 1"
          label="菜单图标："
          :label-width="formLabelWidth"
        >
          <el-select v-model="menu.icon" placeholder="请选择">
            <el-option
              v-for="item in iconList"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-else label="菜单地址：" :label-width="formLabelWidth">
          <el-select v-model="menu.url" placeholder="请选择">
            <el-option
              v-for="item in indexRoutes"
              :key="item.path"
              :label="item.name"
              :value="item.path"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态：" :label-width="formLabelWidth">
          <el-tooltip :content="'Switch value: ' + value" placement="top">
            <el-switch
              v-model="menu.status"
              active-color="teal"
              inactive-color="tomato"
              :active-value="1"
              :inactive-value="2"
            >
            </el-switch>
          </el-tooltip>
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
import { addMenu, menuInfo, menuEdit } from '../../tools/axios'
import { indexRoutes } from '../../router'
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      value: '100',
      dialogFormVisible: false,
      menu: {
        pid: 0,
        title: '',
        icon: '',
        type: 1,
        url: '',
        status: 1,
      },
      formLabelWidth: '120px',
      iconList: ['el-icon-s-tools', 'el-icon-setting', 'el-icon-s-goods', 'el-icon-goods'],
      indexRoutes: indexRoutes,
      rules: {
        title: [
          { required: true, message: '请输入菜单名称', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        ],
        pid: [
          {
            required: true, message: '请选择上级菜单', trigger: 'change'
          }
        ]
      }
    }
  },
  props: ['addInfo'],
  methods: {
    ...mapActions({
      'getMenuList': 'menu/getMenuListAction'
    }),
    /* 封装重置函数 */
    reset () {
      this.menu = {
        pid: 0,
        title: '',
        icon: '',
        type: 1,
        url: '',
        status: 1,
      }
    },
    add (formName) {
      console.log(this.menu);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addMenu(this.menu)
            .then((res) => {
              if (res.data.code === 200) {
                this.$message.success(res.data.msg)
                this.addInfo.dialogFormVisible = false;
                this.reset()
                this.getMenuList()
              } else {
                this.$message.error(res.data.msg)
              }
            })
        } else {
          console.log('提交失败！！');
          return false;
        }
      })
    },//封装一个查看一条数据事件
    lookUp (id) {
      //调取查看一条数据接口
      menuInfo({
        id
      })
        .then(res => {
          if (res.data.code == 200) {
            this.menu = res.data.list
            this.menu.id = id
          }
        })
    },
    //封装修改菜单事件
    update (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          menuEdit(this.menu).then(res => {
            if (res.data.code === 200) {
              this.$message.success(res.data.msg);
              //成功之后关闭弹框以及重置
              this.addInfo.dialogFormVisible = false;
              this.reset()
              //重新调取接口列表
              this.getMenuList()
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
  },

  computed: {
    ...mapGetters({
      'menuList': 'menu/getMenuList'
    })
  },
  filters: {

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