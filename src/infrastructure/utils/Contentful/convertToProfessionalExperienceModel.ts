import { Entry } from 'contentful'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'

import { ProfessionalExperience } from 'app/infrastructure/models/ProfessionalExperience'
import { convertToClientModel } from '.'

export function convertToProfessionalExperienceModel (entry: Entry<any>): ProfessionalExperience {
  return {
    role: entry.fields.role || '',
    shortDescription: documentToHtmlString(entry.fields.shortDescription) || '',
    employer: convertToClientModel(entry.fields.employer),
    detail: documentToHtmlString(entry.fields.detail) || '',
    dateFrom: Date.parse(entry.fields.dateFrom),
    dateTo: entry.fields.dateTo ? Date.parse(entry.fields.dateTo) : null,
  }
}
