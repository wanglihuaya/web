<template>
  <div>
    <h1>this is THREE</h1>
    <h2>{{msg}}</h2>
    <button @click='sendB'>发送数据给one</button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      msg: '老婆怀孕后，买了不少CD，有音乐，也有英语，说是给宝宝进行胎教，忙得不亦乐乎。我不理解，就劝道：“我看你还是好好休息吧！等宝宝长大后，再给他报兴趣班也不迟。”老婆连忙摆手说：“那不一样。”“怎么不一样？”我问道，老婆说：“最起码现在宝宝不能逃课！”我……'
    }
  },
  methods: {
    sendB () {
      this.Event.$emit('vthreeto', this.msg)
    }
  }
}
</script>
<style scoped>

</style>
