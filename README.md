# My Content CMS

![App Preview](https://imgix.cosmicjs.com/bef6d2d0-44f1-11f1-9747-51b5996215f2-autopilot-photo-1497366811353-6870744d04b2-1777594050675.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A modern Next.js content management website powered by Cosmic CMS, featuring dynamic pages, a beautiful blog, and customizable site settings.

## Features

- 📄 Dynamic pages with hero sections and rich content
- ✍️ Full-featured blog with categories, tags, and authors
- ⚙️ Global site settings (logo, footer, social links)
- 🎨 Modern responsive design with Tailwind CSS
- 🚀 Built with Next.js 16 App Router
- 🖼️ Optimized images via imgix
- 📱 Mobile-first responsive design
- 🔍 SEO-friendly with meta tags

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=69f3ee6951b8b92bb812a2ff&clone_repository=69f3efea51b8b92bb812a32b)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for a headless CMS backend with pages, blog posts, and site settings. User instructions: Generate short video of me transitioning from a young man to adulthood"

### Code Generation Prompt

> Build a Next.js application for a content management system called "My Content". The content is managed in Cosmic CMS with the following object types: pages, blog-posts, site-settings. Create a beautiful, modern, responsive design with a homepage and pages for each content type. User instructions: Generate short video of me transitioning from a young man to adulthood

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Cosmic SDK** - Headless CMS integration
- **imgix** - Image optimization

## Getting Started

### Prerequisites
- Node.js 18+ or Bun
- A Cosmic account with the content model set up

### Installation

```bash
bun install
```

Configure environment variables:
```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

Run development server:
```bash
bun run dev
```

## Cosmic SDK Examples

### Fetching Blog Posts
```typescript
const response = await cosmic.objects
  .find({ type: 'blog-posts' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching a Single Page
```typescript
const response = await cosmic.objects
  .findOne({ type: 'pages', slug: 'about' })
  .depth(1)
```

## Cosmic CMS Integration

This application integrates with three content types:
- **Pages**: Dynamic pages with hero sections
- **Blog Posts**: Articles with categories and tags
- **Site Settings**: Global configuration

## Deployment Options

Deploy to Vercel, Netlify, or any platform supporting Next.js. Set environment variables in your hosting dashboard.

<!-- README_END -->