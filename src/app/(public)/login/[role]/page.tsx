'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function RoleLoginPage() {
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    const rawRole = (params.role as string || '').toLowerCase().replace(/_/g, '-');
    let normalized = rawRole;
    if (rawRole === 'company-admin' || rawRole === 'builder') normalized = 'admin';
    if (rawRole === 'accounts-manager') normalized = 'accounts';
    if (rawRole === 'channel-partner') normalized = 'broker';
    router.replace(`/login?portal=${normalized}`);
  }, [params, router]);

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center text-xs text-slate-500">
      Redirecting to {params.role} portal...
    </div>
  );
}

