<template>
  <div>
    <h1>我是自组件</h1>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  @Component({})
  export default class Child extends Vue {}
</script>
<style lang="" scoped></style>
