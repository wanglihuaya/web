<template>
  <div>
    <h1>{{ getName }}</h1>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      getName: 'rank/getName'
    })
  },
  filters: {
  }
}
</script>
<style scoped>
</style>