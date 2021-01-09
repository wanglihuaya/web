<template>
  <div>
    <p class="name">{{list.name}}</p>
    <h2 class="img">{{list.img}}</h2>
    <button @click='del'>删除</button>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  props: ['list', 'index'],
  methods: {
    del () {
      console.log('who:::', this.index)
      this.$emit('del', this.index)
    }
  }
}
</script>
<style lang="" scoped></style>
