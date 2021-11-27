<template>
  <div class="center">
    <el-dialog
      ref="linksGroupsDetail"
      v-model="show.linksGroupsDetail"
      :title="`${ curLinkGroup?.name } 分组设置`">
      <links-group-detail v-model="curLinkGroup" @delete="id => {
        show.linksGroupsDetail = false
        curLinkGroupIndex = -1
        refresh()
      }"/>
    </el-dialog>
    <div v-loading="isLoading" class="left-panel">
      <div class="opts">
        <el-tooltip content="添加新分组">
          <el-button :icon="FolderAdd" @click="createLinksGroup"/>
        </el-tooltip>
        <el-tooltip content="刷新">
          <el-button :icon="Refresh" @click="refresh"/>
        </el-tooltip>
      </div>
      <transition-group name="empty-to-full">
        <el-empty
          v-if="linksGroups.length === 0"
          key="empty"
          class="empty-to-full-item"
          description="还没有短链接分组哦~创建一个吧"/>
        <div
          v-for="(lg, index) in linksGroups" :key="lg.id"
          class="links-group empty-to-full-item"
          :class="{ active: isActive(lg) }">
          <div class="title">
            <el-icon
              class="prepend"
              @click="activeGid = lg.id">
              <arrow-right/>
            </el-icon>
            <span class="name">{{ lg.name }}</span>
            <span class="opts">
              <el-icon class="opt"><document-add/></el-icon>
              <el-icon class="opt" @click="() => {
                curLinkGroupIndex = index
                show.linksGroupsDetail = true
              }"><setting/></el-icon>
            </span>
          </div>
          <el-scrollbar
            :ref="`scrollbar${lg.id}`"
            class="children"
            :style="{
              height: `${ (isActive(lg) ? lg.links.length : 0) * 42 }px`
            }"
            :height="`${ lg.links.length * 42 }px`">
            <div
              v-for="link in lg.links" :key="link.id"
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
        </div>
      </transition-group>
    </div>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ArrowRight, Link as Ln, FolderAdd, DocumentAdd, Refresh, Setting } from '@element-plus/icons'
import { computed, getCurrentInstance, nextTick, onMounted, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage, ElMessageBox, ElScrollbar } from 'element-plus'
import linkApis, { LinksGroupOut } from '../apis/linkApis'
import useLoading from '../hooks/useLoading'
import LinksGroupDetail from '../components/LinksGroupDetail.vue'

type LinksGroup = LinksGroupOut

const
  ctx = getCurrentInstance(),
  route = useRoute(),
  show = reactive({
    linksGroupsDetail: false
  }),
  linksGroups = ref<LinksGroup[]>([]),
  activeId = ref(-1),
  activeGid = ref(-1),
  curLinkGroupIndex = ref(-1),
  curLinkGroup = computed({
    get() {
      return linksGroups.value[curLinkGroupIndex.value] ?? {
        id: -1, name: '未选择'
      }
    },
    set(v: LinksGroup) {
      linksGroups.value[curLinkGroupIndex.value] = v
    }
  }),
  isActive = (lg: LinksGroup) => activeGid.value !== -1 && activeGid.value === lg.id,
  { isLoading, nAsyncFun: refresh } = useLoading(async () => {
    linksGroups.value = await linkApis.getLinksGroups({ str: '' })
      .then(p => p.items)
  }),
  createLinksGroup = () => ElMessageBox.prompt('请输入新短链接分组名称', '创建新短链接分组', {
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  }).then(
    mbData => linkApis.createLinksGroup(mbData.value)
  ).then(
    lg => linksGroups.value.push(lg)
  ).then(
    () => ElMessage.success('添加短链接分组成功。')
  )

watch(() => route.name, () => {
  if (route.name !== 'link-detail') {
    activeId.value = -1
    activeGid.value = -1
  }
})

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

onMounted(async () => {
  await refresh()
})
</script>

<style lang="scss" scoped>
@mixin __ {
  color: var(--color-primary);
  border: 1px solid var(--color-primary);
}
.empty-to-full {
  &-item {
    transition: all 0.3s ease;
    &.el-empty {
      position: absolute;
      top: 50px;
      width: 100%;
    }
  }
  &-enter {
    &-to {
      opacity: 1;
      &.links-group {
        transform: translateX(0);
      }
    }
    &-active {
      opacity: 0;
      &.links-group {
        transform: translateX(100%);
      }
    }
  }
  &-leave {
    &-to {
      opacity: 0;
      &.links-group {
        transform: translateX(100%);
      }
    }
    &-active {
      opacity: 1;
      &.links-group {
        transform: translateX(0);
      }
    }
  }
}
div.center {
  $mar-between: 100px;

  display: flex;
  margin: 20px #{$mar-between};
  width: calc(100% - #{$mar-between * 2});
  > div.left-panel {
    position: relative;
    display: flex;
    flex-direction: column;
    row-gap: 5px;
    margin: 0 20px;
    width: 300px;
    overflow: hidden;
    > div.opts {
      display: flex;
      align-items: center;
      padding: 5px;
    }
    > div.links-group {
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
        > i.el-icon.prepend { transition: 0.3s; }
        > span.opts {
          display: flex;
          align-items: center;
          column-gap: 5px;
        }
        > i.el-icon.prepend, > span.opts > i.el-icon.opt {
          cursor: pointer;
        }
      }
      &.active > div.title {
        border: 1px solid var(--color-primary);
        > i.prepend.el-icon {
          transform: rotate(90deg);
        }
      }
      > div.children {
        transition: 0.3s;
        div.child {
          display: flex;
          padding: 5px;
          margin: 10px 10px 0 40px;
          height: 20px;
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
    > div.el-empty {
      height: 100%;
    }
  }
}
</style>
