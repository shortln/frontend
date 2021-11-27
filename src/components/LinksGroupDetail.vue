<template>
  <el-form class="links-group-detail" label-position="top">
    <el-form-item label="ID">
      <el-input :model-value="lg.id" disabled/>
    </el-form-item>
    <el-form-item label="名称">
      <el-input v-model="lg.name"/>
    </el-form-item>
  </el-form>
  <el-button type="success" plain v-text="'确认修改'"/>
  <div class="title">危险操作</div>
  <div class="danger-area">
    <div class="operate">
      <div class="desc">
        <div class="label">删除该分组</div>
        一旦被删除，它将无法恢复。请确定。
      </div>
      <el-button type="danger" plain @click="
        linkApis.deleteLinksGroup(lg.id).then(() => {
          $emit('delete', lg.id)
          // $message.success('删除成功。')
        }).catch(err => {
          $message.error('删除失败。')
        })
      " v-text="'确认删除'"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Ref, ref, watch } from 'vue'
import linkApis, { LinksGroupOut } from '../apis/linkApis'

type LinksGroup = LinksGroupOut

defineEmits<{
  (e: 'delete', id: number): void
}>()
const props = defineProps<{
  modelValue: LinksGroup
}>()
const lg = ref<LinksGroup>() as Ref<LinksGroup>

watch(() => props.modelValue, () => {
  lg.value = JSON.parse(JSON.stringify(props.modelValue))
}, { immediate: true })
</script>

<style lang="scss" scoped>
//form.links-group-detail {
//}
div.title {
  margin: 20px 0;
  color: var(--el-color-danger);
  font-size: 26px;
  font-weight: bold;
}
div.danger-area {
  border: 2px solid var(--el-color-danger);
  border-radius: 4px;
  > div.operate {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    &:not(:last-child) {
      border-bottom: 1px solid var(--el-border-color-base);
    }
    > div.desc {
      flex-grow: 1;
      > div.label {
        margin-bottom: 5px;
        font-size: 18px;
        font-weight: bold;
      }
    }
  }
}
</style>
