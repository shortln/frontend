<template>
  <div class="top-bar">
    <div class="favicon">Short <span class="suffix">ln</span></div>
    <el-icon class="navigation" size="20px"><more-filled/></el-icon>
  </div>
</template>

<script lang="ts" setup>
import { MoreFilled } from '@element-plus/icons'
</script>

<style scoped lang="scss">
div.top-bar {
  $pad-between: 50px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 #{$pad-between};
  width: calc(100% - #{$pad-between * 2});
  height: 72px;
  background-color: var(--color-primary);

  > div.favicon {
    color: #fff;
    font-size: 30px;
    font-weight: bold;
    user-select: none;

    > span.suffix {
      padding: 2px 10px;
      color: var(--color-primary);
      background-color: #fff;
      border-radius: 4px;
    }
  }

  > i.el-icon.navigation {
    color: #fff;
    cursor: pointer;
    transition: .3s;

    &:hover { color: #ccc; }
  }
}
</style>
