import AbsApis, { Api } from './index'

export default new class AccountApis extends AbsApis implements Api {
  moduleName = 'accounts'

  login = (username: string, password: string) => {
    return this.$h.post(
      `/${username}/login`, { password })
  }
}
