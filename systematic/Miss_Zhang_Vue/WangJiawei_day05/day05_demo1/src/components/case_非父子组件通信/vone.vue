<template>
  <div>
    <h1>this is ONE</h1>
    <h2>{{infotwo}}</h2>
    <h2>{{infothree}}</h2>
    <vtwo></vtwo>
    <vthree></vthree>
  </div>
</template>
<script>
import vtwo from './vtwo'
import vthree from './vthree'
export default {
  components: {
    vtwo,
    vthree
  },
  data () {
    return {
      infotwo: '',
      infothree: ''
    }
  },
  mounted () {
    this.Event.$on('vtwoto', (d) => {
      this.infotwo = d
    })

    this.Event.$on('vthreeto', (d) => {
      this.infothree = d
    })
  }
}
</script>
<style scoped>

</style>
