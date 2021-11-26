<template>
  <top-bar :class="{ fixed }"/>
  <router-view v-slot="{ Component }">
    <transition name="el-fade-in-linear">
      <component :is="Component"/>
    </transition>
  </router-view>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import TopBar from './components/TopBar.vue'
import { useRoute } from 'vue-router'

const
  fixed = ref(false),
  route = useRoute()

watch(() => route.name, v => {
  fixed.value = v === 'home'
})
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
div.top-bar {
  z-index: 10;
  &.fixed {
    position: fixed;
    top: 0;
  }
}
</style>
