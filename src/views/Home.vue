<template>
  <div class="welcome">
    <h1>Short <span class="suffix">ln</span></h1>
    <div class="desc">开源好用的短链接平台，采用 Vue 3 + Element plus 开发。还在使用长链接分享数据吗？快来试试 shortln 吧~</div>
    <el-empty description="这里应该有一张图片"/>
    <div class="next">
      <div class="l"/><div class="r"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
</script>

<style lang="scss" scoped>
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
div.welcome {
  position: relative;
  width: 100%;
  height: calc(100vh - 72px);
  background-color: var(--bg-color-primary);
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
</style>
