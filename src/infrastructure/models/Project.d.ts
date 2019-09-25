import { Client } from './Client'
import { Image } from './Image'

export interface Project {
  name: string;
  client: Client | null;
  shortDescription: string;
  detail: string | null;
  featured: boolean;
  thumbnail: Image | null;
}
