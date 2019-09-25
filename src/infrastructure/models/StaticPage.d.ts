export interface StaticPage {
  slug: string;
  title: string;
  body: string;
  metaTitle: string;
  metaDescription: string;
  metadata?: Record<string, any> | null;
}
