<template>
  <div>
    <el-aside width="200px">
      <el-row class="tac">
        <el-col>
          <el-menu
            :default-active="defaultActive"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="teal"
            text-color="#fff"
            active-text-color="gold"
            unique-opened
            router
          >
            <el-menu-item index="/home">
              <i class="el-icon-menu"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-submenu
              :index="item.id.toString()"
              v-for="item in this.navList"
              :key="item.id"
            >
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{ item.title }}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item
                  :index="one.url"
                  v-for="one in item.children"
                  :key="one.id"
                  >{{ one.title }}</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-row>
    </el-aside>
  </div>
</template>
<script>
export default {
  name: '',
  props: {

  },
  components: {

  },
  data () {
    return {
      defaultActive: '/home',
      navList: []
    }
  },
  methods: {
    handleOpen (key, keyPath) {
    },
    handleClose (key, keyPath) {
    }
  },
  mounted () {
    this.defaultActive = this.$route.path
    if (sessionStorage.getItem('loginInfo')) {
      this.navList = JSON.parse(sessionStorage.getItem('loginInfo')).menus
    }
  },
  watch: {
  },
  computed: {
  },
  filters: {
  }
}
</script>
<style scoped>
.el-aside {
  background-color: #008080;
  height: calc(100vh - 60px);
}
.el-submenu__title i {
  color: #eee;
}
.el-menu-item i {
  color: #eee;
}
.el-menu-item:focus,
.el-menu-item:hover {
  background-color: tomato !important;
}
.el-submenu:hover {
  background-color: tomato !important;
}
</style>