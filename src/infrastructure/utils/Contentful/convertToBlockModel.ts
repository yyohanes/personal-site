import { Entry } from 'contentful'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'

import { convertToImageModel } from '.'
import { Block } from 'app/infrastructure/models/Block'

export function convertToBlockModel (entry: Entry<any>): Block {
  return {
    slug: entry.fields.slug || '',
    title: entry.fields.title || '',
    body: entry.fields.body ? documentToHtmlString(entry.fields.body) : '',
    image: entry.fields.image ? convertToImageModel(entry.fields.image) : null,
    metadata: entry.fields.metadata,
  }
}
