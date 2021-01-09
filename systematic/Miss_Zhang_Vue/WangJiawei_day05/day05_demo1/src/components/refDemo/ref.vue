<template>
  <div>
    <h1>组件嵌套中的ref</h1>
    <son ref="sonInfo"></son>
    <button @click="toChange">点我修改数据</button>
  </div>
</template>
<script>
import son from './son'
export default {
  components: {
    son
  },
  methods: {
    toChange () {
      this.$refs.sonInfo.changeFood()
    }
  },
  mounted () {
    console.log(this.$refs.sonInfo)
    console.log(this.$refs.sonInfo.goods)
  }
}
</script>
<style scoped>

</style>
