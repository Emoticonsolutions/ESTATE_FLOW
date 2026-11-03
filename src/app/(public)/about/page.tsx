import Link from 'next/link';
import { ArrowLeft, Building2, CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-6 font-medium">
          <Link href="/" className="hover:text-[#3478C9]">Home</Link>
          <span>/</span>
          <span className="text-[#17324D] font-bold">About</span>
        </div>
        <div className="bg-white p-8 md:p-12 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-teal-600 uppercase tracking-widest">About EstateFlow</span>
          <h1 className="text-3xl font-black text-[#17324D] mt-1 mb-6">Engineered for High-Velocity Real Estate</h1>
          <p className="text-sm text-slate-600 leading-relaxed mb-6">
            EstateFlow CRM is a next-generation Multi-Tenant Software-as-a-Service (SaaS) platform built specifically for real estate builders, developers, and leading channel partners. Inspired by top-tier real estate enterprise management systems, EstateFlow unifies enquiry acquisition, visual unit availability, automated costing, booking workflows, and construction milestone collections into one seamless, secure digital core.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <h3 className="font-bold text-[#17324D] text-sm mb-1">Zero Double-Booking Guarantee</h3>
              <p className="text-xs text-slate-600">Transactional locking ensures that two sales executives or brokers cannot block or confirm the same unit at the same time.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <h3 className="font-bold text-[#17324D] text-sm mb-1">True Multi-Tenant Isolation</h3>
              <p className="text-xs text-slate-600">Company-scoped data boundaries guarantee that each builder’s customer lists, cost sheets, and commission tiers remain strictly isolated.</p>
            </div>
          </div>

          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#3478C9] hover:bg-blue-600 text-white rounded-lg font-bold text-sm shadow-md transition-all"
          >
            Explore the Live Application →
          </Link>
        </div>
      </div>
    </div>
  );
}

