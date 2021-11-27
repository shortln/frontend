import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import accountApis, { AccountOut } from './apis/accountApis'

export type Account = AccountOut

export default createStore({
  plugins: [createPersistedState()],
  state: {
    account: {
      id: -1
    } as Account
  },
  getters: {
    isLogin: state => state.account.id !== -1
  },
  mutations: {
    setCurU: (state, account: Account) => {
      state.account = account
    }
  },
  actions: {
    logout: async ({ getters, commit, state }) => {
      if (!getters.isLogin || !state.account.username) {
        throw new Error('用户未登陆。')
      }
      await accountApis.logout(state.account.username)
      commit('setCurU', { id: -1 })
    }
  }
})
