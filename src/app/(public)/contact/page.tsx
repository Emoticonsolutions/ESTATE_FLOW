'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-6 font-medium">
          <Link href="/" className="hover:text-[#3478C9]">Home</Link>
          <span>/</span>
          <span className="text-[#17324D] font-bold">Contact Enterprise</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-8 md:p-12 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <span className="text-xs font-bold text-teal-600 uppercase tracking-widest">Get in Touch</span>
            <h1 className="text-2xl sm:text-3xl font-black text-[#17324D] mt-1 mb-4">Connect with Enterprise Advisory</h1>
            <p className="text-xs text-slate-600 leading-relaxed mb-6">
              Have questions regarding multi-tenant deployment, custom ERP integrations, or WhatsApp Cloud API onboarding? Our team is available 24/7.
            </p>

            <div className="space-y-4 text-xs text-slate-700">
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-[#3478C9]" />
                <span>enterprise@estateflow.io</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-[#3478C9]" />
                <span>+91 (80) 4129-8800</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-[#3478C9]" />
                <span>Tech Park, Outer Ring Road, Bangalore - 560103</span>
              </div>
            </div>
          </div>

          <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); alert('Inquiry submitted! Our representative will call within 15 minutes.'); }}>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
              <input type="text" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-input text-xs" placeholder="Aditya Verma" required />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Company / Developer</label>
              <input type="text" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-input text-xs" placeholder="Verma Developers Ltd" required />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Message</label>
              <textarea rows={3} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-input text-xs" placeholder="We have 4 residential towers launching next month..." required></textarea>
            </div>
            <button type="submit" className="w-full py-2.5 bg-[#3478C9] text-white rounded-lg text-xs font-bold shadow-md hover:bg-blue-600 flex items-center justify-center gap-2">
              <Send size={14} /> Send Inquiry
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

