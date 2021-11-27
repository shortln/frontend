import AbsApis, { Api, Pagination, Query } from './index'
import * as queryString from 'querystring'

interface ExpireTypes {
  forever: {}
  limited: {
    datetime: Date
  }
}

export type Expire<T extends string> = { type: T } & (T extends keyof ExpireTypes ? ExpireTypes[T] : {})

export interface LinkOut<T extends string = any> {
  id: number
  title: string
  expire: T extends any
    ? Expire<'forever'> | Expire<'limited'>
    : Expire<T>
  jumpUrl: string
}

export interface LinksGroupOut {
  id: number
  name: string
  links: LinkOut[]
}

export default new class LinkApis extends AbsApis implements Api {
  moduleName = 'links'

  getLink = (id: number) => this.$h.get<any, LinkOut>(`/${id}`)

  createLinksGroup = (name: string) => this.$h
    .post<any, LinksGroupOut>('/groups', { name })
    .then(lg => {
      if (!lg.links) lg.links = []
      return lg
    })

  getLinksGroups = (q: Query) => this.$h.get<any, Pagination<LinksGroupOut>>(`/groups?${queryString.stringify(q)}`)
}
