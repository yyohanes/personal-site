import { Entry } from 'contentful'

import { Block } from 'app/infrastructure/models/Block'
import { Client } from 'app/infrastructure/models/Client'
import { ProfessionalExperience } from 'app/infrastructure/models/ProfessionalExperience'
import { StaticPage } from 'app/infrastructure/models/StaticPage'
import {
  convertToBlockModel,
  convertToClientModel,
  convertToProfessionalExperienceModel,
  convertToStaticPageModel,
} from '.'

type SupportedModel = Block | Client | ProfessionalExperience | StaticPage | null

export function convertToModel (entry: Entry<any>): SupportedModel {
  switch (entry.sys.contentType.sys.id) {
    case 'block':
      return convertToBlockModel(entry)
    case 'client':
      return convertToClientModel(entry)
    case 'professionalExperience':
      return convertToProfessionalExperienceModel(entry)
    case 'staticPage':
      return convertToStaticPageModel(entry)
    default:
      return null
  }
}
