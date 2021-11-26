<template>
  <div ref="carouselWrap" class="carousel-wrap">
    <div class="carousel">
      <div :id="pageIds[0]" class="page">
        <h1>Short <span class="suffix">ln</span></h1>
        <div class="desc">开源好用的短链接平台，采用 Vue 3 + Element plus 开发。还在使用长链接分享数据吗？快来试试 shortln 吧~</div>
        <el-empty description="这里应该有一张图片"/>
        <div class="next" @click="activeIndex++">
          <div class="l"/><div class="r"/>
        </div>
      </div>
      <div :id="pageIds[1]" class="page">
        <el-empty description="这里应该有一张图片"/>
      </div>
      <div class="nav">
        <span
          v-for="(pageId, index) in pageIds" :key="pageId"
          class="item" :class="{
            active: index === activeIndex
          }"
          @click="activeIndex = index"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import debounce from 'lodash.debounce'
import { onMounted, onUnmounted, reactive, ref, watch } from 'vue'

const
  carouselWrap = ref<HTMLDivElement | null>(null),
  activeIndex = ref(0),
  pageIds = reactive([
    'welcome', 'howToUse'
  ]),
  bindActive = () => {
    const hashV = location.hash.slice(1)
    const i = pageIds.indexOf(hashV)
    if (i === -1)
      activeIndex.value = 0
    else
      activeIndex.value = i
    const ele = document.getElementById(pageIds[activeIndex.value])
    ele && ele.scrollIntoView()
  },
  onScroll = debounce(() => {
    const anchors = document.querySelectorAll<HTMLDivElement>(pageIds.map(id => `#${id}`).join(','))

    const scrollTop = carouselWrap.value?.scrollTop ?? 0

    for (let i = 0; i < anchors.length; i++) {
      const anchor = anchors[i]
      if (scrollTop === anchor.offsetTop) {
        activeIndex.value = i
        return
      }
    }
  }, 500)

watch(activeIndex, nv => {
  location.hash = `#${pageIds[nv]}`
})
onMounted(() => {
  bindActive()
  window.addEventListener('hashchange', bindActive)
  carouselWrap.value?.addEventListener('scroll', onScroll)
})
onUnmounted(() => {
  window.removeEventListener('hashchange', bindActive)
  carouselWrap.value?.removeEventListener('scroll', onScroll)
})
</script>

<style lang="scss" scoped>
$top-bar-h: 72px;

@keyframes up-and-down {
  0% {
    bottom: 50px;
  }
  50% {
    bottom: 30px;
  }
  100% {
    bottom: 50px;
  }
}
div.carousel-wrap {
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  scroll-behavior: smooth;
  scroll-snap-type: y mandatory;
  &::-webkit-scrollbar {
    display: none;
  }
  > div.carousel {
    > div.page {
      scroll-snap-align: center;
      position: relative;
      padding-top: $top-bar-h;
      width: 100%;
      height: calc(100vh - #{$top-bar-h});
      background-color: var(--bg-color-primary);
    }
    #welcome {
      > h1 {
        padding-top: 200px;
        margin: 0;
        text-align: center;
        user-select: none;
        > span.suffix {
          padding: 0 10px;
          color: #fff;
          background-color: var(--color-primary);
          border-radius: 4px;
        }
      }
      > div.desc {
        position: relative;
        left: calc(50% - 200px);
        padding-top: 20px;
        width: 400px;
        color: var(--color-primary);
        font-size: 14px;
        text-align: center;
      }
      > div.next {
        $size: 48px;

        position: absolute;
        bottom: 50px;
        left: calc(50% - #{$size} / 2);
        width: $size;
        height: $size;
        cursor: pointer;
        animation: up-and-down 1s ease infinite;
        > div.l, > div.r {
          position: absolute;
          bottom: calc(#{$size} / 2 - 15px);
          width: 6px;
          height: 30px;
          border-radius: 3px;
        }
        > div.l {
          left: calc(#{$size} / 3.2 - 3px);
          background-color: #fff;
          transform: rotate(135deg);
        }
        > div.r {
          right: calc(#{$size} / 3.2 - 3px);
          background-color: var(--color-primary);
          transform: rotate(-135deg);
        }
      }
    }
    > div.nav {
      position: fixed;
      top: $top-bar-h;
      right: 10px;
      display: flex;
      width: 10px;
      height: calc(100vh - #{$top-bar-h});
      flex-direction: column;
      justify-content: center;
      row-gap: 10px;
      > span.item {
        $s: 10px;

        width: $s;
        height: $s;
        cursor: pointer;
        background-color: #0005;
        border-radius: calc(#{$s} / 2);
        transition: 0.3s;
        &:hover {
          background-color: var(--color-primary);
        }
        &.active {
          height: calc(#{$s} * 3);
          background-color: var(--color-primary);
        }
      }
    }
  }
}
</style>
