<template id="superFooter">
  <div class="superFooter">
    <h1>{{ message }}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "我来组成脚部！"
    };
  }
};
</script>
<style lang="">
.superFooter {
  text-align: center;
  background-color: teal;
  color: tomato;
  height: 10vh;
}
</style>
