<template>
  <div v-loading="isLoading" class="link-detail">
    <div class="head">
      <div class="title"><el-icon class="prepend"><ln/></el-icon>{{ lnDetail?.title ?? '未设置标题' }}</div>
      <div class="opts">
        <el-button class="opt" :icon="Setting"/>
        <el-button class="opt" :icon="DataAnalysis"/>
        <el-tooltip content="保存修改">
          <el-button class="opt" :icon="DocumentChecked" type="success" plain/>
        </el-tooltip>
      </div>
    </div>
    <div class="content">
      <div class="statistical">
        <el-empty description="暂时还无统计数据"/>
        <el-empty description="暂时还无统计数据"/>
        <el-empty description="暂时还无统计数据"/>
      </div>
      <el-form
        v-if="!!lnDetail" :model="lnDetail"
        label-position="top">
        <el-form-item label="标题">
          <el-input v-model="(/**@type {Ln}*/ lnDetail).title"/>
        </el-form-item>
        <el-form-item label="跳转链接">
          <el-input v-model="(/**@type {Ln}*/ lnDetail).jumpUrl"/>
        </el-form-item>
        <el-form-item label="过期时间" class="expire">
          <el-radio-group v-model="(/**@type {Ln}*/ lnDetail).expire.type">
            <el-radio label="forever">永不过期</el-radio>
            <el-radio label="limited">自定义</el-radio>
          </el-radio-group>
          <el-date-picker
            v-if="(/**@type {Ln}*/ lnDetail).expire.type === 'limited'"
            v-model="(/**@type {Ln}*/ lnDetail).expire.datetime"
            type="datetime"/>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { Link as Ln, DocumentChecked, Setting, DataAnalysis } from '@element-plus/icons'
import linkApis, { Expire, LinkOut } from '../apis/linkApis'
import useLoading from '../hooks/useLoading'

type Link = LinkOut

const props = withDefaults(defineProps<{
  modelValue: string
}>(), {
})
const
  lnDetail = ref<Link | undefined>(undefined),
  { isLoading, nAsyncFun: refresh } = useLoading(async () => {
    lnDetail.value = await linkApis.getLink(+props.modelValue)
  })

watch(() => lnDetail?.value?.expire.type, nv => {
  if (!lnDetail.value) return
  if (nv === 'limited') {
    const expire = lnDetail.value.expire as Expire<'limited'>
    if (!expire.datetime)
      expire.datetime = new Date()
  }
})

watch(() => props.modelValue, refresh, { immediate: true })
</script>

<style lang="scss" scoped>
div.link-detail {
  > div.head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    > div.title {
      display: flex;
      align-items: center;
      column-gap: 5px;
      height: 40px;
      line-height: 40px;
      &, & > i.el-icon.prepend {
        font-size: 24px;
        font-weight: bold;
      }
    }
  }
  > div.content {
    > div.statistical {
      display: flex;
      height: 300px;
      align-items: center;
      justify-content: space-around;
    }
    > form.el-form {
      > div.expire.el-form-item > :deep(.el-form-item__content) {
        display: flex;
        flex-direction: column;
      }
    }
  }
}
</style>
