<template>
  <div>
    <h1>this is TWO</h1>
    <h2>{{msg}}</h2>
    <button @click='sendA'>发送数组给one</button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      msg: '有一次在XXX高速，碰到前女友在那做收费员，她认出我后没收钱就把闸给开了，说道：快走！别让领导看见！此刻车上刚好放着刘欢的好汉歌。那一瞬间我眼角的泪水随着一脚油门流了下来，内心一阵内疚和懊悔，她还喜欢我！ ！后来我上了高速公路黑名单 。'
    }
  },
  methods: {
    sendA () {
      this.Event.$emit('vtwoto', this.msg)
    }
  }
}
</script>
<style scoped>

</style>
