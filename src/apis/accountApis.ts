import AbsApis, { Api } from './index'

export interface AccountOut {
  id: number
  username?: string
  nickname?: string
}

export default new class AccountApis extends AbsApis implements Api {
  moduleName = 'accounts'

  login = (username: string, password: string) => this.$h.post<any, AccountOut>(
    `/${username}/login`, { password })
}
