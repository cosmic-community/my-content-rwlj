export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

export interface CosmicImage {
  url: string;
  imgix_url: string;
}

export interface Page extends CosmicObject {
  type: 'pages';
  metadata: {
    headline?: string;
    subheadline?: string;
    hero_image?: CosmicImage;
    content?: string;
    seo_title?: string;
    seo_description?: string;
  };
}

export interface BlogPost extends CosmicObject {
  type: 'blog-posts';
  metadata: {
    excerpt?: string;
    featured_image?: CosmicImage;
    content?: string;
    author_name?: string;
    author_avatar?: CosmicImage;
    published_date?: string;
    category?: string;
    tags?: string[] | string;
  };
}

export interface SiteSettings extends CosmicObject {
  type: 'site-settings';
  metadata: {
    site_name?: string;
    site_tagline?: string;
    logo?: CosmicImage;
    favicon?: CosmicImage;
    contact_email?: string;
    contact_phone?: string;
    address?: string;
    social_links?: Record<string, string>;
    footer_text?: string;
  };
}

export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}