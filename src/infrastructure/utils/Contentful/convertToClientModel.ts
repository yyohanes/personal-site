import { Entry } from 'contentful'

import { convertToImageModel } from '.'
import { Client } from 'app/infrastructure/models/Client'

export function convertToClientModel (entry: Entry<any>): Client {
  return {
    name: entry.fields.name || '',
    description: entry.fields.description || '',
    logo: convertToImageModel(entry.fields.logo),
  }
}
