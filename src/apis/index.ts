import axios, { AxiosInstance } from 'axios'

export interface Api {
  moduleName: string
}

export default class AbsApis implements Api {
  moduleName = ''
  readonly $h: AxiosInstance

  constructor() {
    this.$h = axios.create({ baseURL: '/api/' + this.moduleName })
  }
}
