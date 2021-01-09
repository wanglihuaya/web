<template id="conLeft">
  <div class="conLeft">
    <h1>{{ message }}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "我来组成左部身体！"
    };
  }
};
</script>
<style lang="">
  .conLeft{
    margin: 10px 200px;
    background-color: lightblue;
  }
</style>
