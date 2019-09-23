import { Entry } from 'contentful'
import { Block } from 'app/infrastructure/models/Block'

import { convertToBlockModel } from './index'

type SupportedModel = Block | null

export function convertToModel (entry: Entry<any>): SupportedModel {
  switch (entry.sys.contentType.sys.id) {
    case 'Block':
      return convertToBlockModel(entry)
    default:
      return null
  }
}
