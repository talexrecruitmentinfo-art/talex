import type { Metadata } from 'next';
import './globals.css';
import PublicLayout from '@/components/shared/layouts/public-layout';
import { ToastProvider } from '@/components/shared/toast-provider';

export const metadata: Metadata = {
  title: 'Government of Canada - Employment Portal for Kenyan Professionals',
  description: 'Official Canadian employment portal for qualified Kenyan professionals. Apply for visa-sponsored positions with secure processing and government oversight.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <PublicLayout>{children}</PublicLayout>
        <ToastProvider />
      </body>
    </html>
  );
}
