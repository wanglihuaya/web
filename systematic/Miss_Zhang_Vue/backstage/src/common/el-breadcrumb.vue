<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="#">{{ $route.name }}</a>
      </el-breadcrumb-item>
    </el-breadcrumb>
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

    }
  },
  methods: {

  },
  mounted () {
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
</style>