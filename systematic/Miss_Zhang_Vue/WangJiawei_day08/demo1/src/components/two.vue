<template>
  <div>
    <h1 class="box">Goooooooooooooooooooooo</h1>
    <ul>
      <li v-for="item in $store.state.vlist" :key="item.id">
        {{ item.title }}
      </li>
    </ul>
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

  },
  mounted () {
    this.$store.dispatch('getvList1')
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
  background-color: teal;
}
</style>
