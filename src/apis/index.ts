import axios, { AxiosInstance, AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios'

interface ErrorResponseData {
  message: string
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
      }, (error: AxiosError<ErrorResponseData>) => {
        return Promise.reject(error)
      })
    }

    return this._h
  }
}
