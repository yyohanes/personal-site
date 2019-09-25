import { Entry } from 'contentful'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'

import { Project } from 'app/infrastructure/models/Project'
import { convertToClientModel, convertToImageModel } from '.'

export function convertToProjectModel (entry: Entry<any>): Project {
  return {
    name: entry.fields.name || '',
    shortDescription: documentToHtmlString(entry.fields.shortDescription) || '',
    client: entry.fields.client ? convertToClientModel(entry.fields.client) : null,
    detail: entry.fields.detail ? documentToHtmlString(entry.fields.detail) : '',
    featured: !!entry.fields.featured,
    thumbnail: entry.fields.thumbnail ? convertToImageModel(entry.fields.thumbnail) : null,
  }
}
