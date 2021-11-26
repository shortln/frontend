import AbsApis, { Api, Pagination, Query } from './index'
import * as queryString from 'querystring'

export interface LinkOut {
  id: number
  title: string
}

export interface LinksGroupOut {
  id: number
  name: string
  links: LinkOut[]
}

export default new class LinkApis extends AbsApis implements Api {
  moduleName = 'links'

  createLinksGroup = (name: string) => this.$h
    .post<any, LinksGroupOut>('/groups', { name })
    .then(lg => {
      if (!lg.links) lg.links = []
      return lg
    })

  getLinksGroups = (q: Query) => this.$h.get<any, Pagination<LinksGroupOut>>(`/groups?${queryString.stringify(q)}`)
}
