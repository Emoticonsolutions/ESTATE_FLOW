import React from 'react';
import { PublicNavbar } from '@/components/layout/PublicNavbar';
import { PublicFooter } from '@/components/layout/PublicFooter';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7FA]">
      {/* Universal Public Navigation Bar */}
      <PublicNavbar />

      {/* Main Page Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Universal Public Footer */}
      <PublicFooter />
    </div>
  );
}
