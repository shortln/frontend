import axios, { AxiosInstance, AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

interface ErrorResponseData {
  message: string
}

export type Query = {
  str: string
  page?: number
  size?: number
}

export interface Pagination<T> {
  count: number
  items: T[]
}

export interface Api {
  moduleName: string
}

export default class AbsApis {
  _h?: AxiosInstance = undefined

  get $h(): AxiosInstance {
    if (!this._h) {
      // @ts-ignore
      this._h = axios.create({ baseURL: '/api/' + this.moduleName })
      this._h.interceptors.request.use(
        (config: AxiosRequestConfig) => config,
        (error: any) => Promise.reject(error)
      )
      this._h.interceptors.response.use((response: AxiosResponse) => {
        if (response.status === 202) {
          return new Promise(resolve => setTimeout(
            () => resolve(this.$h.request(response.config)), response.config?.params.nextTimeout || 3000
          ))
        }
        return response.data
      }, async (error: AxiosError<ErrorResponseData>) => {
        const router = useRouter()
        const response = error?.response
        const message = response?.data?.message

        switch (response?.status) {
          case 401:
          case 403:
            const msgs = {
              401: '登陆过期',
              403: '权限不足'
            }
            ElMessage.error(message ?? msgs[response?.status])
            await router.push({
              path: '/box',
              query: {
                redirect: location.href
                  .replace(`${location.protocol}//${location.host}`, '')
              }
            })
            break
        }
        throw error
      })
    }

    return this._h
  }
}
