<template>
  <div class="center">
    <div class="left-panel">
      <div class="opts">
        <el-tooltip content="添加新分组">
          <el-button :icon="Plus"/>
        </el-tooltip>
      </div>
      <template v-for="linksGroup in linksGroups" :key="linksGroup.id">
        <div
          class="title"
          :class="{
            active: activeGid !== -1 && activeGid === linksGroup.id
          }">
          <el-icon
            class="prepend"
            @click="activeGid = linksGroup.id">
            <arrow-right/>
          </el-icon>
          <span class="name">{{ linksGroup.name }}</span>
          <span class="opts">
            <el-icon class="opt"><plus/></el-icon>
          </span>
        </div>
        <el-scrollbar
          :ref="`scrollbar${linksGroup.id}`"
          class="children"
          :class="{
            active: activeGid !== -1 && activeGid === linksGroup.id
          }"
          height="210px">
          <div
            v-for="link in linksGroup.links" :key="link.id"
            class="child"
            :class="{
              active: activeId === link.id
            }">
            <span class="name" @click="
              activeId = link.id;
              $router.push(`/links/${link.id}/detail`)
            ">
              <el-icon class="prepend"><ln/></el-icon>{{ link.title }}
            </span>
            <span class="opts">
              <el-icon class="opt"><setting/></el-icon>
            </span>
          </div>
        </el-scrollbar>
      </template>
    </div>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ArrowRight, Link as Ln, Plus, Setting } from '@element-plus/icons'
import { getCurrentInstance, nextTick, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { ElScrollbar } from 'element-plus'

interface Link {
  id: number
  title: string
}

interface LinksGroup {
  id: number
  name: string
  links: Link[]
}

const
  ctx = getCurrentInstance(),
  route = useRoute(),
  linksGroups = ref<LinksGroup[]>([]),
  activeId = ref(-1),
  activeGid = ref(-1)

watch(linksGroups, lgs => {
  if (route.name === 'link-detail') {
    const { modelValue } = route.params
    const id = +modelValue
    lgs.forEach(lg => lg.links.forEach((ln, index) => {
      if (id === ln.id) {
        activeId.value = ln.id
        activeGid.value = lg.id
        // wait ref render
        nextTick(() => {
          const scrollbarRef = ctx?.refs[`scrollbar${lg.id}`] as InstanceType<typeof ElScrollbar>
          scrollbarRef.setScrollTop(42 * index)
        })
      }
    }))
  }
})

onMounted(() => {
  linksGroups.value = [{
    id: 1,
    name: '默认分组',
    links: [...new Array(10).keys()].map(id => ({
      id, title: `随便的第 ${id} 个短链接`
    }))
  }, {
    id: 2,
    name: '频道',
    links: [...new Array(4).keys()].map(id => id + 10).map(id => ({
      id, title: `QQ 频道 ${id}`
    }))
  }]
})
</script>

<style lang="scss" scoped>
@mixin __ {
  color: var(--color-primary);
  border: 1px solid var(--color-primary);
}
div.center {
  $mar-between: 100px;

  display: flex;
  margin: 20px #{$mar-between};
  width: calc(100% - #{$mar-between * 2});
  > div.left-panel {
    padding: 0 20px;
    width: 300px;
    > div.opts {
      display: flex;
      align-items: center;
      padding: 5px;
    }
    > div.title {
      display: flex;
      padding: 5px;
      justify-content: space-between;
      align-items: center;
      font-size: 18px;
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
      > i.el-icon.prepend { transition: 0.3s; }
      > span.opts {
        display: flex;
        align-items: center;
      }
      > i.el-icon.prepend, > span.opts > i.el-icon.opt {
        cursor: pointer;
      }
    }
    > div.children {
      max-height: 0;
      transition: 0.3s;
      &.active {
        max-height: 210px;
      }
      div.child {
        display: flex;
        padding: 5px;
        margin: 10px 10px 0 40px;
        justify-content: space-between;
        align-items: center;
        font-size: 15px;
        border: 1px solid #0000;
        border-radius: 4px;
        transition: 0.3s;
        &:hover {
          @include __;

          box-shadow: 0 0 16px var(--color-shandow);
        }
        &.active {
          @include __;
        }
        > span.name {
          display: flex;
          align-items: center;
          > i.el-icon.prepend { margin-right: 5px; }
        }
        > span.name, > span.opts > i.el-icon.opt {
          cursor: pointer;
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
