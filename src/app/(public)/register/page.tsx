'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Building, Mail, Phone, Lock, ArrowRight } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    plan: 'Professional',
    city: 'Bangalore',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/dashboard');
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="max-w-lg w-full mx-auto">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-[#17324D] text-white flex items-center justify-center font-black text-xl mx-auto mb-3 shadow-md">
            EF
          </div>
          <h1 className="text-2xl font-black text-[#17324D]">Register Real Estate Company</h1>
          <p className="text-xs text-slate-500 mt-1">Start your 14-day full multi-tenant SaaS trial</p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Company / Developer Name</label>
              <div className="relative">
                <Building size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="e.g. Skyline Infra Ltd"
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-input text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#3478C9]"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Admin Name</label>
                <input
                  type="text"
                  placeholder="e.g. Ramesh V"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-input text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#3478C9]"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Headquarters City</label>
                <input
                  type="text"
                  placeholder="e.g. Mumbai, Bangalore"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-input text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#3478C9]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Official Work Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  placeholder="admin@yourcompany.com"
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-input text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#3478C9]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Official Mobile Number</label>
              <div className="relative">
                <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="tel"
                  placeholder="+91 98000 00000"
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-input text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#3478C9]"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#3478C9] hover:bg-blue-600 text-white rounded-lg text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 mt-2"
            >
              <span>Create SaaS Tenant & Launch</span>
              <ArrowRight size={14} />
            </button>
          </form>

          <p className="text-center text-xs text-slate-500 mt-5">
            Already have an account?{' '}
            <Link href="/login" className="text-[#3478C9] font-bold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

