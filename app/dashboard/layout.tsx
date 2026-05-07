import type { Metadata } from 'next';
import DashboardLayout from '@/components/shared/layouts/dashboard-layout';

export const metadata: Metadata = {
  title: 'Talex Dashboard',
};

export default function DashboardRootLayout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
