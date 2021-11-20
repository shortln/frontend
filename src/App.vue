<template>
  <top-bar/>
  <div class="center">
    <div class="left-panel">
    </div>
    <div class="container">
    </div>
  </div>
</template>

<script setup lang="ts">
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

<style lang="scss" scoped>
div.center {
  $mar-between: 100px;

  display: flex;
  margin: 20px #{$mar-between};
  width: calc(100% - #{$mar-between * 2});
  > div.left-panel {
    padding: 0 10px;
    width: 300px;
    background-color: var(--color-primary);
  }
  > div.container {
    padding: 10px;
    flex-grow: 1;
    background-color: var(--color-primary);
  }
}
</style>
