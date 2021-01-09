<template id="container">
  <div class="container">
    <h1>{{ message }}</h1>
    <con-left :mss="message" @toBody="toBody"></con-left>
    <h2>{{ wordsL }}</h2>
    <con-right></con-right>
  </div>
</template>

<script>
import conRight from './conRight'
import conLeft from './conLeft'
export default {
  components: {
    conRight,
    conLeft
  },
  data () {
    return {
      message: '我来组成身体！',
      wordsL: ''
    }
  },
  methods: {
    toBody (a) {
      console.log(a, 'From the conLeft')
      this.wordsL = a
    }
  }
}
</script>
<style lang="">
.container {
  text-align: center;
  height: 80vh;
  background-color: tomato;
  color: teal;
  display: flex;
  justify-content: center;
}
</style>
