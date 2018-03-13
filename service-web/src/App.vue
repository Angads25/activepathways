<template>
  <div id="app">
    <Header></Header>
    <router-view/>
    <modal></modal>
  </div>
</template>

<script>
import Header from '@/components/header/header.vue'
import modal from '@/components/modal/modal.vue'
export default {
  name: 'App',
  components: {Header, modal}
}
</script>
<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    background-color: #fff;
  }
</style>
