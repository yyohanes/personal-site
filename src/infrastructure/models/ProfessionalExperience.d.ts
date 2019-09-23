import { Client } from './Client'

export interface ProfessionalExperience {
  role: string;
  shortDescription: string;
  detail: string;
  employer: Client;
  dateFrom: number;
  dateTo: number | null;
}
