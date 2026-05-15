import Link from 'next/link';
import { Share2, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      label: 'Government Services',
      links: [
        { href: '/about', label: 'About the Portal' },
        { href: '/how-it-works', label: 'Application Process' },
        { href: '/contact', label: 'Contact Information' },
      ],
    },
    {
      label: 'Legal & Support',
      links: [
        { href: '/privacy-policy', label: 'Privacy Policy' },
        { href: '/terms', label: 'Terms of Service' },
        { href: '/report', label: 'Report an Issue' },
      ],
    },
    {
      label: 'Contact Information',
      content: (
        <div className="space-y-2 text-sm text-government-gray">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <a href="mailto:employment@gov.ca" className="hover:text-government-primary">
              employment@gov.ca
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            <a href="tel:+254700000000" className="hover:text-government-primary">
              +254 (0) 700 000 000
            </a>
          </div>
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 mt-0.5" />
            <span>Government of Canada Employment Services<br />Nairobi, Kenya</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <footer className="border-t border-government-gray bg-government-primary text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="mb-12 grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-block font-bold text-xl">
              Government of Canada
            </Link>
            <p className="mt-3 text-sm text-government-gray">
              Official employment portal for qualified Kenyan professionals seeking visa-sponsored opportunities in Canada.
            </p>
          </div>

          {/* Links */}
          {footerLinks.map((section) => (
            <div key={section.label}>
              <h3 className="font-semibold text-base mb-4">{section.label}</h3>
              {section.content ? (
                section.content
              ) : (
                <ul className="space-y-2">
                  {section.links?.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-government-gray hover:text-white transition"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-government-secondary" />

        {/* Bottom Section */}
        <div className="mt-8 flex flex-col items-center justify-between gap-6 sm:flex-row">
          <p className="text-sm text-government-gray">
            © {currentYear} Government of Canada. All rights reserved. Official employment services for Kenyan professionals.
          </p>

          {/* Social */}
          <div className="flex gap-4">
            <a
              href="#"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
              aria-label="Facebook"
            >
              <Share2 className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
              aria-label="Twitter"
            >
              <Share2 className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
              aria-label="LinkedIn"
            >
              <Share2 className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
