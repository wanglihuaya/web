<template>
  <div id="app">
    <super-header></super-header>
    <container></container>
    <super-footer></super-footer>
    <father></father>
    <v-ref></v-ref>
    <vone></vone>
  </div>
</template>

<script>
import superHeader from './components/header'
import container from './components/container'
import superFooter from './components/footer'
import Father from './components/caseProps/father'
import vRef from './components/refDemo/ref'
import vone from './components/case_非父子组件通信/vone'

export default {
  components: {
    superHeader,
    container,
    superFooter,
    Father,
    vRef,
    vone
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>
