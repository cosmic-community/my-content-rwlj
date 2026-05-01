import Link from 'next/link';
import { getAllBlogPosts, getAllPages, getSiteSettings } from '@/lib/cosmic';
import BlogCard from '@/components/BlogCard';

export default async function HomePage() {
  const [posts, pages, settings] = await Promise.all([
    getAllBlogPosts(),
    getAllPages(),
    getSiteSettings(),
  ]);

  const recentPosts = posts.slice(0, 6);
  const siteName = settings?.metadata?.site_name || 'My Content';
  const tagline = settings?.metadata?.site_tagline || 'Stories, ideas, and inspiration';

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              {siteName}
            </h1>
            <p className="text-xl sm:text-2xl text-brand-100 mb-8 leading-relaxed">
              {tagline}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/blog"
                className="inline-flex items-center px-6 py-3 bg-white text-brand-700 font-semibold rounded-lg hover:bg-brand-50 transition-colors"
              >
                Read the Blog
              </Link>
              {pages.length > 0 && (
                <Link
                  href="/pages"
                  className="inline-flex items-center px-6 py-3 bg-brand-800 text-white font-semibold rounded-lg hover:bg-brand-900 transition-colors border border-brand-500"
                >
                  Explore Pages
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
                Latest Articles
              </h2>
              <p className="text-lg text-gray-600">
                Fresh perspectives and insights
              </p>
            </div>
            <Link
              href="/blog"
              className="hidden sm:inline-flex items-center text-brand-600 hover:text-brand-700 font-semibold"
            >
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* Pages Section */}
      {pages.length > 0 && (
        <section className="bg-gray-50 py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12 text-center">
              Explore More
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {pages.slice(0, 6).map((page) => (
                <Link
                  key={page.id}
                  href={`/pages/${page.slug}`}
                  className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all border border-gray-100"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-brand-600 transition-colors">
                    {page.title}
                  </h3>
                  {page.metadata?.subheadline && (
                    <p className="text-gray-600 line-clamp-2">
                      {page.metadata.subheadline}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}