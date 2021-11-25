<template>
  <div class="center-card">
    <div class="favicon">
      Short<span class="suffix">ln</span>
      <transition name="el-fade-in-linear">
        <div v-if="status === 'LOGIN'" class="status" v-text="status"/>
      </transition>
      <transition name="el-fade-in-linear">
        <div v-if="status === 'REGISTER'" class="status" v-text="status"/>
      </transition>
    </div>
    <transition name="el-fade-in-linear">
      <div v-if="status === 'REGISTER'" class="register">
        <div class="input-w username">
          <div class="label">用户名</div>
          <el-input v-model="newAccount.username"/>
        </div>
        <div class="input-w username">
          <div class="label">昵称</div>
          <el-input v-model="newAccount.nickname"/>
        </div>
        <div class="input-w password">
          <div class="label">密码</div>
          <el-input v-model="newAccount.password" show-password/>
        </div>
        <div class="input-w confirm-password">
          <div class="label">确认密码</div>
          <el-input v-model="newAccount.confirmPassword" show-password/>
        </div>
        <el-button type="primary" @click="register" v-text="'注册'"/>
        <span
          class="login"
          @click="status = 'LOGIN'">已经有账号了？直接登陆</span>
      </div>
    </transition>
    <transition name="el-fade-in-linear">
      <div v-if="status === 'LOGIN'" class="login">
        <div class="input-w username">
          <div class="label">用户名</div>
          <el-input v-model="account.username"/>
        </div>
        <div class="input-w password">
          <div class="label">密码</div>
          <el-input v-model="account.password" show-password/>
        </div>
        <el-button type="primary" @click="login" v-text="'登陆'"/>
        <span
          class="register"
          @click="status = 'REGISTER'">还没有账号？注册一个吧</span>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import accountApis from '../apis/accountApis'

type Status = 'LOGIN' | 'REGISTER'

interface Account {
  username: string
  nickname?: string
  password: string
}

const
  account = reactive<Account>({
    username: '',
    password: ''
  }),
  newAccount = reactive<Account & {
    confirmPassword: string
  }>({
    username: '',
    nickname: '',
    password: '',
    confirmPassword: ''
  }),
  status = ref<Status>('LOGIN'),
  register = async () => {
  },
  login = async () => {
    try {
      if (!account.username || !account.password) {
        throw new Error('用户名与密码不得为空')
      }
      if (account.username.length <= 2) {
        throw new Error('用户名错误')
      }
      if (account.password.length <= 3) {
        throw new Error('密码错误')
      }
      console.log(
        await accountApis.login(account.username, account.password)
      )
    } catch (e) {
      if (e instanceof Error)
        ElMessage.warning(e.message)
    }
  }
</script>

<style lang="scss" scoped>
div.center-card {
  $p: 75px;
  $w: 600px;
  $h: 500px;

  position: fixed;
  top: calc(50vh - #{$h} / 2 - #{$p});
  left: calc(50% - #{$w} / 2 - #{$p});
  padding: calc(#{$p} * 2) $p 0 $p;
  width: $w;
  height: $h;
  overflow: hidden;
  background-color: var(--bg-color-primary);
  border-radius: 4px;
  box-shadow: 0 0 16px var(--color-shandow);
  > div.favicon {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 10px;
    width: 100%;
    height: 150px;
    color: #fff;
    font-size: 50px;
    font-weight: bold;
    text-decoration: none;
    background-color: var(--color-primary);
    user-select: none;
    > span.suffix {
      padding: 2px 10px;
      color: var(--color-primary);
      background-color: #fff;
      border-radius: 4px;
    }
    > div.status {
      position: absolute;
      right: 10px;
      bottom: 10px;
      font-size: 16px;
      filter: drop-shadow(2px 2px 3px #000);
    }
  }
  > div.login, > div.register {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    height: calc(100% - 40px);
    row-gap: 20px;
    > * { width: 100%; }
    > div.input-w {
      display: flex;
      flex-direction: column;
      row-gap: 10px;
    }
    > span.register, > span.login {
      font-size: 14px;
      text-align: center;
      cursor: pointer;
      transition: 0.1s;
      user-select: none;
      &:hover {
        color: var(--color-primary);
      }
    }
  }
}
</style>
