import { Image } from 'app/infrastructure/models/Image'

export interface Client {
  name: string;
  description: string;
  logo: Image | null;
  website: string | null;
}
