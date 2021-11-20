<template>
  <div class="top-bar">
    <div class="favicon">Short <span class="suffix">ln</span></div>
    <el-input
      v-model="newShortln.url"
      class="new-shortln"
      style="--el-input-focus-border: var(--color-border);">
      <template #prepend>
        <el-select v-model="newShortln.schema" style="width: 100px;">
          <el-option label="https://" value="https"/>
          <el-option label="http://" value="http"/>
        </el-select>
      </template>
      <template #append>
        <el-button :icon="DocumentAdd"/>
      </template>
    </el-input>
    <div class="icons">
      <el-icon
        v-if="isDark"
        class="sunny"
        @click="isDark = false">
        <sunny/>
      </el-icon>
      <el-icon
        v-else
        class="moon"
        @click="isDark = true">
        <moon/>
      </el-icon>
      <el-icon class="navigation">
        <more-filled/>
      </el-icon>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { DocumentAdd, MoreFilled, Moon, Sunny } from '@element-plus/icons'

type Schema = 'http' | 'https'

const isDark = ref(false)
const newShortln = reactive({
  schema: 'https' as Schema,
  url: ''
})
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
  box-shadow: 0 0 16px gray;
  > *:not(:last-child) {
    margin-right: 100px;
  }
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
  > div.el-input.new-shortln {
    width: auto;
    flex-grow: 1;
    transition: 0.3s;
    &:hover {
      box-shadow: 0 0 10px var(--color-border);
    }
  }
  > div.icons {
    display: flex;
    align-items: center;
    justify-content: center;
    > i.el-icon {
      --font-size: 25px;

      padding: 5px;
      color: #ccc;
      cursor: pointer;
      transition: 0.3s;
      &.moon:hover {
        color: yellow;
        filter: drop-shadow(0 0 4px yellow);
      }
      &.sunny:hover {
        color: orange;
        filter: drop-shadow(0 0 4px orange);
      }
      &.navigation:hover { color: #fff; }
    }
  }
}
</style>
