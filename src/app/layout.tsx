import type { Metadata } from 'next';
import './globals.css';
import { TenantProvider } from '@/lib/tenantContext';

export const metadata: Metadata = {
  title: 'EstateFlow CRM | Multi-Tenant Real Estate SaaS Platform',
  description: 'Enterprise Real Estate CRM SaaS for Builders, Developers & Channel Partners',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-[#F5F7FA] text-[#263445]">
        <TenantProvider>{children}</TenantProvider>
      </body>
    </html>
  );
}

