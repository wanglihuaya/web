<template>
  <div>
    <el-container>
      <el-header>后台管理系统</el-header>
      <el-container>
        <el-aside width="200px">
          <div is="v-Nav"></div>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import vNav from '../components/vNav'
export default {
  components: {
    vNav
  }
}
</script>
<style scoped>
.el-header {
  background-color: tomato;
  font-size: 30px;
  color: #eee;
  line-height: 60px;
  letter-spacing: 10px;
  text-shadow: 3px -3px 3px teal;
}
.el-main {
  background-color: #efefef;
  height: calc(100vh - 60px);
}
</style>