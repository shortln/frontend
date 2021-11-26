<template>
  <div class="top-bar">
    <router-link class="favicon" to="/">
      Short <span class="suffix">ln</span>
    </router-link>
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
        :class="isDark ? 'sunny' : 'moon'"
        @click="isDark = !isDark">
        <component :is="isDark ? Sunny : Moon"/>
      </el-icon>
      <el-dropdown trigger="click"
                   placement="bottom-end"
                   @command="handleCmd">
        <el-icon class="navigation">
          <more-filled/>
        </el-icon>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="links" :disabled="!isLogin">
              链接管理
            </el-dropdown-item>
            <el-dropdown-item v-if="isLogin" command="logout" divided>
              退出登陆
            </el-dropdown-item>
            <el-dropdown-item v-else command="login" divided>
              登陆注册
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import { DocumentAdd, MoreFilled, Moon, Sunny } from '@element-plus/icons'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

type Schema = 'http' | 'https'

const
  store = useStore(),
  router = useRouter(),
  isDark = ref(false),
  newShortln = reactive({
    schema: 'https' as Schema,
    url: ''
  }),
  isLogin = computed(() => store.getters.isLogin),
  handleCmd = async (c: 'links' | 'login' | 'logout') => {
    try {
      switch (c) {
        case 'logout':
          await store.dispatch('logout')
          await router.push('home')
          ElMessage.success('退出登陆成功。')
          break
        default:
          await router.push(`/${c}`)
      }
    } catch (e) {
      if (e instanceof Error) {
        ElMessage.warning(e.message)
      } else {
        throw e
      }
    }
  }
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
  > a.favicon {
    color: #fff;
    font-size: 30px;
    font-weight: bold;
    text-decoration: none;
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
    i.el-icon {
      --font-size: 25px;

      padding: 5px;
      color: #ccc;
      cursor: pointer;
      transition: 0.3s;
      user-select: none;
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
