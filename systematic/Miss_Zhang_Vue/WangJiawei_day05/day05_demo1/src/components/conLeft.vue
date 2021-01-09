<template id="conLeft">
  <div class="conLeft">
    <h1>{{ message }}</h1>
    <button @click="toBody">clice me</button>
    <h1>{{ mss }}</h1>
    <ul>
      <li v-for="(item, index) in list" :key='item.id'>
        <con-tem :index="index" @del="del" :list="item"></con-tem>
      </li>
    </ul>
  </div>
</template>

<script>
import conTem from './conTem'
export default {
  data () {
    return {
      wordsL: '我要给身体',
      message: '我来组成左部身体！',
      list: [
        {
          id: 1,
          name: 'a',
          img: 'imga'
        },
        {
          id: 2,
          name: 'b',
          img: 'imgb'
        },
        {
          id: 3,
          name: 'c',
          img: 'imgc'
        },
        {
          id: 4,
          name: 'd',
          img: 'imgd'
        }
      ]
    }
  },
  props: ['mss'],
  components: {
    conTem
  },
  methods: {
    toBody () {
      console.log('To the body')
      this.$emit('toBody', this.wordsL)
    },
    del (e) {
      this.list.splice(e, 1)
    }
  }
}
</script>
<style lang="">
  .conLeft{
    margin: 10px 200px;
    background-color: lightblue;
  }
</style>
