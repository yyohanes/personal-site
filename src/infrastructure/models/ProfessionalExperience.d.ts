import { Client } from './Client'
import { Project } from './Project'

export interface ProfessionalExperience {
  role: string;
  shortDescription: string;
  detail: string;
  employer: Client;
  dateFrom: number;
  dateTo: number | null;
  projects: Project[];
}
