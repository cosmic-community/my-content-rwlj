import Link from 'next/link';
import type { BlogPost } from '@/types';

export default function BlogCard({ post }: { post: BlogPost }) {
  const publishedDate = post.metadata?.published_date
    ? new Date(post.metadata.published_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : null;

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100"
    >
      {post.metadata?.featured_image ? (
        <div className="aspect-[16/9] overflow-hidden bg-gray-100">
          <img
            src={`${post.metadata.featured_image.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      ) : (
        <div className="aspect-[16/9] bg-gradient-to-br from-brand-400 to-brand-700" />
      )}

      <div className="flex flex-col flex-1 p-6">
        {post.metadata?.category && (
          <span className="inline-block self-start px-2.5 py-0.5 text-xs font-semibold bg-brand-100 text-brand-700 rounded-full mb-3">
            {post.metadata.category}
          </span>
        )}

        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-brand-600 transition-colors line-clamp-2">
          {post.title}
        </h3>

        {post.metadata?.excerpt && (
          <p className="text-gray-600 line-clamp-3 mb-4 flex-1">
            {post.metadata.excerpt}
          </p>
        )}

        <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-100">
          {post.metadata?.author_avatar && (
            <img
              src={`${post.metadata.author_avatar.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
              alt={post.metadata?.author_name || 'Author'}
              className="w-8 h-8 rounded-full object-cover"
            />
          )}
          <div className="text-sm">
            {post.metadata?.author_name && (
              <p className="font-medium text-gray-900">{post.metadata.author_name}</p>
            )}
            {publishedDate && <p className="text-gray-500 text-xs">{publishedDate}</p>}
          </div>
        </div>
      </div>
    </Link>
  );
}