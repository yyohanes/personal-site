import { Entry } from 'contentful'

import { Image } from 'app/infrastructure/models/Image'

export function convertToImageModel (entry: Entry<any>): Image {
  return {
    title: entry.fields.title || '',
    url: entry.fields.file.url || '',
  }
}
