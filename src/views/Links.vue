<template>
  <div class="center">
    <div class="left-panel">
      <template v-for="linksGroup in linksGroups" :key="linksGroup.name">
        <div class="title active">
          <el-icon class="prepend"><arrow-right/></el-icon>
          <span class="name">{{ linksGroup.name }}</span>
          <span class="opts">
            <el-icon class="opt"><plus/></el-icon>
          </span>
        </div>
        <div class="children">
          <div v-for="link in linksGroup.links" :key="link.id" class="child">
            <span class="name" @click="$router.push(`/links/${link.id}/detail`)">
              <el-icon class="prepend"><ln/></el-icon>{{ link.title }}
            </span>
            <span class="opts">
              <el-icon class="opt"><setting/></el-icon>
            </span>
          </div>
        </div>
      </template>
    </div>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ArrowRight, Link as Ln, Plus, Setting } from '@element-plus/icons'

const linksGroups = [{
  name: '默认分组',
  links: [{
    id: 1,
    title: 'QQ 频道'
  }]
}]
</script>

<style lang="scss" scoped>
div.center {
  $mar-between: 100px;

  display: flex;
  margin: 20px #{$mar-between};
  width: calc(100% - #{$mar-between * 2});
  > div.left-panel {
    padding: 0 20px;
    width: 300px;
    > div.title {
      display: flex;
      padding: 5px;
      justify-content: space-between;
      align-items: center;
      font-size: 18px;
      cursor: pointer;
      border: 1px solid #0000;
      border-radius: 4px;
      box-sizing: border-box;
      transition: 0.3s;
      user-select: none;
      &:not(:first-child) {
        margin-top: 10px;
      }
      &:hover {
        border: 1px solid var(--color-primary);
        box-shadow: 0 0 16px var(--color-shandow);
      }
      &.active {
        border: 1px solid var(--color-primary);
        > i.prepend.el-icon {
          transform: rotate(90deg);
        }
      }
      > i.el-icon { transition: 0.3s; }
      > span.opts {
        display: flex;
        align-items: center;
      }
    }
    > div.children {
      > div.child {
        display: flex;
        padding: 5px;
        margin: 10px 0 0 40px;
        justify-content: space-between;
        align-items: center;
        font-size: 15px;
        border: 1px solid #0000;
        border-radius: 4px;
        transition: 0.3s;
        &:hover {
          color: var(--color-primary);
          border: 1px solid var(--color-primary);
          box-shadow: 0 0 16px var(--color-shandow);
        }
        > span.name {
          display: flex;
          align-items: center;
          &, > span.opts > i.el-icon.opt {
            cursor: pointer;
          }
        }
        > span.opts {
          display: flex;
          align-items: center;
        }
      }
    }
  }
  > div.container {
    padding: 10px;
    flex-grow: 1;
    border: 1px solid var(--color-border);
    border-radius: 4px;
    transition: 0.3s;
    &:hover {
      box-shadow: 0 0 16px var(--color-shandow);
    }
  }
}
</style>
