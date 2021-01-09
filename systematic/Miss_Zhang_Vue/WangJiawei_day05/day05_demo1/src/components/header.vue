<template id="superHeader">
  <div class="superHeader">
    <h1>{{ message }}</h1>
    <input type="text" v-model="msg" />
    {{ msg }}
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: '',
      message: '我来组成头部！'
    }
  }
}
</script>
<style lang="">
.superHeader {
  text-align: center;
  background-color: teal;
  color: tomato;
  height: 10vh;
}
</style>
