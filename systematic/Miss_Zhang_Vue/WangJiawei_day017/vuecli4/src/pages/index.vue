<template>
  <div>
    <h1>我是首页</h1>
    <h1>{{ name }}</h1>
    <div>
      <button @click="getInfo">点击我</button>
    </div>
    <h1>计算属性：{{ AllPrice }}</h1>
  </div>
</template>
<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  @Component({})
  export default class Index extends Vue {
    name: String

    constructor() {
      super()
      this.name = 'OKKKKK'
    }
    getInfo() {
      console.log('触发这个方法')
      return '这是一个方法'
    }
    get AllPrice(): Number {
      return 10000
    }
    created() {
      console.log('创建完成')
    }
    mounted() {
      console.log('挂载')
    }
  }
</script>
