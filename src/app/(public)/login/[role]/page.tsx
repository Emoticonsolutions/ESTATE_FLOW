'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function RoleLoginPage() {
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    const role = params.role as string;
    router.replace(`/login?portal=${role}`);
  }, [params, router]);

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center text-xs text-slate-500">
      Redirecting to {params.role} portal...
    </div>
  );
}

