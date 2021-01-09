<template id="conRight">
  <div class="conRight">
    <h1>{{ message }}</h1>
    <ul>
      <li v-for="(item,index) in list" :key='item.id'>
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
      message: '我来组成右部身体！',
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
  components: {
    conTem
  },
  methods: {
    del (e) {
      this.list.splice(e, 1)
    }
  }
}
</script>
<style lang="">
.conRight {
  margin: 10px 200px;
  background-color: lightblue;
}
</style>
