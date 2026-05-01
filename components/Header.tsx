import Link from 'next/link';
import type { SiteSettings } from '@/types';

export default function Header({ settings }: { settings: SiteSettings | null }) {
  const siteName = settings?.metadata?.site_name || 'My Content';
  const logo = settings?.metadata?.logo;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            {logo ? (
              <img
                src={`${logo.imgix_url}?w=160&h=80&fit=max&auto=format,compress`}
                alt={siteName}
                className="h-8 w-auto"
              />
            ) : (
              <span className="text-xl font-bold text-gray-900 group-hover:text-brand-600 transition-colors">
                {siteName}
              </span>
            )}
          </Link>

          <nav className="flex items-center gap-1 sm:gap-2">
            <Link
              href="/"
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-brand-600 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/blog"
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-brand-600 transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/pages"
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-brand-600 transition-colors"
            >
              Pages
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}