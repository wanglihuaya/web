<template>
  <div>
    <h1>子组件</h1>
    <h1>I have a {{ goods }}</h1>
  </div>
</template>
<script>
export default {
  data () {
    return {
      goods: 'Apple'
    }
  },
  methods: {
    changeFood () {
      if (this.goods === 'Apple') {
        this.goods = 'Pen'
      } else {
        this.goods = 'Apple'
      }
    }
  }
}
</script>
<style scoped>

</style>
