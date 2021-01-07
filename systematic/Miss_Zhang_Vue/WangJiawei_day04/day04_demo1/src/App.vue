<template>
  <div id="app">
    <super_header></super_header>
    <container></container>
    <super_footer></super_footer>
  </div>
</template>
<template id="super_header">
  <div>
    <h1>{{ message }}</h1>
    <input type="text" v-model="msg" />
    {{ msg }}
  </div>
</template>
<template id="container">
  <div>
    <h1>{{ message }}</h1>
    <con_left></con_left>
    <con_right></con_right>
  </div>
</template>
<template id="con_left">
  <div>
    <h2>{{ message }}</h2>
  </div>
</template>
<template id="con_right">
  <div>
    <h2>{{ message }}</h2>
  </div>
</template>
<template id="super_footer">
  <div>
    <h1>{{ message }}</h1>
  </div>
</template>
<script>
export default {}

const con_left = {
  template: '#con_left',
  data () {
    return {
      message: '我来组成身体左！'
    }
  }
}
const con_right = {
  template: '#con_right',
  data () {
    return {
      message: '我来组成身体右！'
    }
  }
}
const super_header = {
  template: '#super_header',
  data () {
    return {
      message: '我来组成头部！',
      msg: ''
    }
  }
}
const container = {
  template: '#container',
  data () {
    return {
      message: '我来组成身体！'
    }
  },
  components: {
    con_left,
    con_right
  }
}
const super_footer = {
  template: '#super_footer',
  data () {
    return {
      message: '我来组成脚部！'
    }
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
