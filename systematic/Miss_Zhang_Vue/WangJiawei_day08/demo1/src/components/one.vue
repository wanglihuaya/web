<template>
  <div class="box">
    <h1 @click="changeOh('OHHHHHHHHHHHHH')">ohhhhhhhhhhhhhhhhhhh</h1>
    <h2>{{ $store.state.name }}</h2>
    <h1>{{ $store.state.num }}</h1>
    <button @click="fork_data">加1</button>
    <h1>state.name(有缓存)::::{{ $store.getters.getName }}</h1>
  </div>
</template>
<script>
export default {
  name: '',
  props: {

  },
  components: {

  },
  data () {
    return {

    }
  },
  methods: {
    changeOh (n) {
      console.log('Store::::', this.$store)
      this.$store.commit('changeOh', n)
    },
    fork_data () {
      this.$store.commit('fork_data')
    }
  },
  mounted () {
  },
  watch: {
  },
  computed: {
  },
  filters: {
  }
}
</script>
<style scoped>
.box {
  background-color: tomato;
}
</style>
