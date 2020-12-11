<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <SecretSantaList />
  </div>
</template>

<script>
import SecretSantaList from './components/SecretSantaList.vue'

export default {
  name: 'App',
  components: {
    SecretSantaList
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
