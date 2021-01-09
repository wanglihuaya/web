<template>
  <div id="app">
    <super-header></super-header>
    <container></container>
    <super-footer></super-footer>
  </div>
</template>

<script>
import superHeader from "./components/header";
import container from "./components/container";
import superFooter from "./components/footer";
export default {
  components: {
    superHeader,
    container,
    superFooter
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>
