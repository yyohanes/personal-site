import { Entry } from 'contentful'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'

import { StaticPage } from 'app/infrastructure/models/StaticPage'

export function convertToStaticPageModel (entry: Entry<any>): StaticPage {
  return {
    slug: entry.fields.slug || '',
    title: entry.fields.title || '',
    body: entry.fields.body ? documentToHtmlString(entry.fields.body) : '',
    metaTitle: entry.fields.metaTitle || '',
    metaDescription: entry.fields.metaDescription || '',
    metadata: entry.fields.metadata,
  }
}
