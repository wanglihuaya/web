<template>
  <div class="box">
    <h1>子组件</h1>
    <h1>接收到老父亲的数据--{{msg}}</h1>
    <h2>MingZi:::{{name}}</h2>
    <h2>info:::{{info}}</h2>
    <h2>StudentName:::{{stuName}}</h2>
    <h2>StudentAge:::{{stuAge}}</h2>
    <h2>String:::{{str}}</h2>
  </div>
</template>
<script>
export default {
  props: {
    msg: String,
    name: String,
    info: [String, Boolean],
    stuName: {
      type: String,
      default: 'Wang!!'
    },
    stuAge: {
      type: Number,
      default: 18
      // required: true
    },
    str: {
      type: String,
      validator (val) {
        console.log(val, '要验证的内容')
        if (val.length > 5) {
          return false
        } else {
          return true
        }
      }
    }
  }
}
</script>
<style>
</style>
