<template id="conRight">
  <div class="conRight">
    <h1>{{ message }}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "我来组成右部身体！"
    };
  }
};
</script>
<style lang="">
.conRight {
  margin: 10px 200px;
  background-color: lightblue;
}
</style>
