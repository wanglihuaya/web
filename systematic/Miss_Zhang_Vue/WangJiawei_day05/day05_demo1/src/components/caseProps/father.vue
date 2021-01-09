<template>
  <div>
    <h1>父组件</h1>
    <son :msg='msg' :name='name' :info='info' :styAge=1 :str='str'></son>
  </div>
</template>
<script>
import son from './son'
export default {
  components: {
    son
  },
  data () {
    return {
      msg: 'aaaa',
      name: '阿巴巴巴',
      info: true,
      str: 'bbbb'
    }
  }
}
</script>
<style>
</style>
