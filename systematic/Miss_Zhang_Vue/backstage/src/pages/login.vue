<template>
  <div class="body">
    <el-form
      :model="loginList"
      label-width="100px"
      :rules="rules"
      ref="ruleForm"
    >
      <span>用户名：</span>
      <el-form-item prop="username">
        <el-input v-model="loginList.username" clearable></el-input>
      </el-form-item>
      <span>密 码：</span>
      <el-form-item prop="password">
        <el-input
          show-password
          clearable
          v-model="loginList.password"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login('ruleForm')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { userLogin } from '../tools/axios'
export default {
  data () {
    return {
      loginList: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在2-15个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 16, message: "长度在 6 到 16 个字符", trigger: "blur" }
        ]
      }
    }
  },
  methods: {
    login (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //正常调取登录接口
          userLogin(this.loginList)
            .then(res => {
              if (res.data.code === 200) {
                this.$message.success(res.data.msg)
                //把登录结果存储到会话存储中
                sessionStorage.setItem('loginInfo', JSON.stringify(res.data.list))
                //跳转到首页
                this.$router.push('/home')
              } else {
                this.$message.error(res.data.msg)
              }
            })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
}
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css?family=Rajdhani:300&display=swap");
.body {
  height: 100vh;
  margin: 0;
  padding: 0;
}

.body {
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("https://images.unsplash.com/photo-1482329833197-916d32bdae74?crop=entropy&cs=srgb&fm=jpg&ixid=MXwxNDY1OTN8MHwxfHNlYXJjaHwyfHxoYXBweSUyMG5ldyUyMHllYXJ8ZW58MHwwfHw&ixlib=rb-1.2.1&q=85&w=1920");
  background-size: cover;
  background-position: center;
  font-family: "Rajdhani", sans-serif;
}

.el-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: rgba(1, 1, 1, 0.3);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(6.5px);
  border-radius: 10px;
  width: 500px;
  height: 400px;
  position: relative;
}
.el-input {
  width: 300px;
}
.el-button {
  margin: 0 100px;
}
span:first-of-type {
  color: white;
  position: absolute;
  left: 28px;
  bottom: 265px;
}
span:last-of-type {
  color: white;
  position: absolute;
  left: 40px;
  bottom: 200px;
}
</style>