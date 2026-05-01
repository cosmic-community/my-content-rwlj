import Link from 'next/link';
import { getAllPages } from '@/lib/cosmic';

export const metadata = {
  title: 'Pages | My Content',
  description: 'Browse all pages',
};

export default async function PagesIndexPage() {
  const pages = await getAllPages();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="max-w-3xl mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          Pages
        </h1>
        <p className="text-xl text-gray-600">
          Browse our collection of pages and resources.
        </p>
      </div>

      {pages.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">No pages available yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pages.map((page) => (
            <Link
              key={page.id}
              href={`/pages/${page.slug}`}
              className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100"
            >
              {page.metadata?.hero_image && (
                <div className="aspect-[16/9] overflow-hidden bg-gray-100">
                  <img
                    src={`${page.metadata.hero_image.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
                    alt={page.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-brand-600 transition-colors">
                  {page.metadata?.headline || page.title}
                </h2>
                {page.metadata?.subheadline && (
                  <p className="text-gray-600 line-clamp-3">
                    {page.metadata.subheadline}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}