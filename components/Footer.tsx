import type { SiteSettings } from '@/types';

export default function Footer({ settings }: { settings: SiteSettings | null }) {
  const siteName = settings?.metadata?.site_name || 'My Content';
  const tagline = settings?.metadata?.site_tagline;
  const email = settings?.metadata?.contact_email;
  const phone = settings?.metadata?.contact_phone;
  const address = settings?.metadata?.address;
  const footerText = settings?.metadata?.footer_text;
  const socialLinks = settings?.metadata?.social_links;
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-3">{siteName}</h3>
            {tagline && <p className="text-sm text-gray-400">{tagline}</p>}
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold mb-3 uppercase tracking-wider">
              Contact
            </h4>
            <ul className="space-y-2 text-sm">
              {email && (
                <li>
                  <a href={`mailto:${email}`} className="hover:text-white transition-colors">
                    {email}
                  </a>
                </li>
              )}
              {phone && <li>{phone}</li>}
              {address && <li className="text-gray-400">{address}</li>}
            </ul>
          </div>

          {socialLinks && Object.keys(socialLinks).length > 0 && (
            <div>
              <h4 className="text-white text-sm font-semibold mb-3 uppercase tracking-wider">
                Follow
              </h4>
              <ul className="space-y-2 text-sm">
                {Object.entries(socialLinks).map(([key, value]) => (
                  <li key={key}>
                    <a
                      href={String(value)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors capitalize"
                    >
                      {key}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="pt-8 border-t border-gray-800 text-sm text-gray-400 flex flex-col sm:flex-row justify-between gap-2">
          <p>{footerText || `© ${year} ${siteName}. All rights reserved.`}</p>
          <p>Powered by Cosmic CMS</p>
        </div>
      </div>
    </footer>
  );
}