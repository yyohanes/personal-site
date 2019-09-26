import { create } from 'apisauce'
import queryString from 'query-string'

import { contentfulConfig } from 'app/config/contentful'

// define the api
const api = create({
  baseURL: process.env.REACT_BASE_URL,
  headers: {
    Accept: 'application/json',
    timeout: __DEBUG__ ? 20000 : 10000,
  },
})

const getContentfulEntryByField = (type: string, field: string, id: string) =>
  api.get(`${contentfulConfig.proxyPath}/${type}/${field}/${id}?test`)

const getContentfulEntries = (type: string, page = 1, order?: string) =>
  api.get(`${contentfulConfig.proxyPath}/${type}?${queryString.stringify({
    page,
    order,
  })}`)

export default {
  getContentfulEntryByField,
  getContentfulEntries,
}
