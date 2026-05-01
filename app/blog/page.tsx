import { getAllBlogPosts } from '@/lib/cosmic';
import BlogCard from '@/components/BlogCard';

export const metadata = {
  title: 'Blog | My Content',
  description: 'Latest articles and stories',
};

export default async function BlogPage() {
  const posts = await getAllBlogPosts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="max-w-3xl mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          The Blog
        </h1>
        <p className="text-xl text-gray-600">
          Stories, insights, and perspectives on the things that matter.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">No blog posts yet. Check back soon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}