import Link from 'next/link';

const links = [
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms' },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <Link href="/" className="inline-block text-4xl font-bold sm:text-5xl">
            <span className="text-red-500">T</span>
            <span className="text-blue-500">a</span>
            <span className="text-green-500">l</span>
            <span className="text-purple-500">e</span>
            <span className="text-orange-500">x</span>
          </Link>
          <p className="mt-2 max-w-xl text-sm text-slate-600">Fast, secure Canada job matching for Kenyan applicants.</p>
        </div>

        <div className="flex flex-wrap gap-3">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm text-slate-600 hover:text-slate-900">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
