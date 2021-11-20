<template>
  <top-bar/>
  <router-view/>
</template>

<script lang="ts" setup>
import TopBar from './components/TopBar.vue'
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
html, body { margin: 0; }
</style>
