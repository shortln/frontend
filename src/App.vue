<template>
  <top-bar :style="{ position }"/>
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
  position = ref<'fixed' | 'relative'>('relative'),
  route = useRoute()

watch(() => route.name, v => {
  if (v === 'home')
    position.value = 'fixed'
  else
    position.value = 'relative'
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
  z-index: 1000;
}
</style>
