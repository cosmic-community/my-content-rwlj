// app/blog/[slug]/page.tsx
import { getBlogPostBySlug, getAllBlogPosts } from '@/lib/cosmic';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import BlogCard from '@/components/BlogCard';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: 'Post Not Found' };
  return {
    title: `${post.title} | Blog`,
    description: post.metadata?.excerpt || '',
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = await getAllBlogPosts();
  const relatedPosts = allPosts.filter((p) => p.id !== post.id).slice(0, 3);

  const publishedDate = post.metadata?.published_date
    ? new Date(post.metadata.published_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  const tagsValue = post.metadata?.tags;
  const tags: string[] = Array.isArray(tagsValue)
    ? tagsValue
    : typeof tagsValue === 'string'
    ? tagsValue.split(',').map((t) => t.trim()).filter(Boolean)
    : [];

  return (
    <article>
      {/* Hero */}
      {post.metadata?.featured_image && (
        <div className="w-full h-[400px] sm:h-[500px] relative overflow-hidden bg-gray-100">
          <img
            src={`${post.metadata.featured_image.imgix_url}?w=2400&h=1000&fit=crop&auto=format,compress`}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Category */}
        {post.metadata?.category && (
          <div className="mb-4">
            <span className="inline-block px-3 py-1 text-sm font-semibold bg-brand-100 text-brand-700 rounded-full">
              {post.metadata.category}
            </span>
          </div>
        )}

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          {post.title}
        </h1>

        {/* Excerpt */}
        {post.metadata?.excerpt && (
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            {post.metadata.excerpt}
          </p>
        )}

        {/* Author + Date */}
        <div className="flex items-center gap-4 pb-8 mb-8 border-b border-gray-200">
          {post.metadata?.author_avatar && (
            <img
              src={`${post.metadata.author_avatar.imgix_url}?w=120&h=120&fit=crop&auto=format,compress`}
              alt={post.metadata?.author_name || 'Author'}
              className="w-12 h-12 rounded-full object-cover"
            />
          )}
          <div>
            {post.metadata?.author_name && (
              <p className="font-semibold text-gray-900">{post.metadata.author_name}</p>
            )}
            {publishedDate && (
              <p className="text-sm text-gray-500">{publishedDate}</p>
            )}
          </div>
        </div>

        {/* Content */}
        {post.metadata?.content && (
          <div
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-a:text-brand-600 prose-img:rounded-lg"
            dangerouslySetInnerHTML={{ __html: post.metadata.content }}
          />
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Back Link */}
        <div className="mt-12">
          <Link
            href="/blog"
            className="inline-flex items-center text-brand-600 hover:text-brand-700 font-semibold"
          >
            ← Back to all posts
          </Link>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              You might also like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((p) => (
                <BlogCard key={p.id} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}