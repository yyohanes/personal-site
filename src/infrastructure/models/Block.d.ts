import { Image } from 'app/infrastructure/models/Image'

export interface Block {
  slug: string;
  title: string;
  body: string;
  image: Image | null;
  metadata?: Record<string, any> | null;
}
