import type { Metadata } from 'next';
import './globals.css';
import PublicLayout from '@/components/shared/layouts/public-layout';

export const metadata: Metadata = {
  title: 'Talex | Canada Jobs for Kenyan Applicants',
  description: 'Mobile-first job application platform connecting Kenyan job seekers with verified Canada positions.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <PublicLayout>{children}</PublicLayout>
      </body>
    </html>
  );
}
