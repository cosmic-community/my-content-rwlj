// app/pages/[slug]/page.tsx
import { getPageBySlug } from '@/lib/cosmic';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);
  if (!page) return { title: 'Page Not Found' };
  return {
    title: page.metadata?.seo_title || page.title,
    description: page.metadata?.seo_description || page.metadata?.subheadline || '',
  };
}

export default async function DynamicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page) {
    notFound();
  }

  return (
    <article>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-gray-900 to-brand-900 text-white overflow-hidden">
        {page.metadata?.hero_image && (
          <div className="absolute inset-0">
            <img
              src={`${page.metadata.hero_image.imgix_url}?w=2400&h=1200&fit=crop&auto=format,compress`}
              alt={page.title}
              className="w-full h-full object-cover opacity-40"
            />
          </div>
        )}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {page.metadata?.headline || page.title}
            </h1>
            {page.metadata?.subheadline && (
              <p className="text-xl sm:text-2xl text-gray-100 leading-relaxed">
                {page.metadata.subheadline}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      {page.metadata?.content && (
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-a:text-brand-600 prose-img:rounded-lg"
            dangerouslySetInnerHTML={{ __html: page.metadata.content }}
          />
        </section>
      )}

      {/* Back Link */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <Link
          href="/pages"
          className="inline-flex items-center text-brand-600 hover:text-brand-700 font-semibold"
        >
          ← Back to all pages
        </Link>
      </div>
    </article>
  );
}