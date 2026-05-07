import type { Metadata } from 'next';
import AdminLayout from '@/components/shared/layouts/admin-layout';

export const metadata: Metadata = {
  title: 'Talex Admin Panel',
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}
