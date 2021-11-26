import { createStore } from 'vuex'
import { AccountOut } from './apis/accountApis'

export type Account = AccountOut

export default createStore({
  state: {
    account: {
      id: -1
    } as Account
  },
  mutations: {
    setCurU: (state, account: Account) => {
      state.account = account
    }
  }
})
