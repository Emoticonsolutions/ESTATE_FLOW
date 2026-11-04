'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Clock, Send, CheckCircle2, MessageSquare, ShieldCheck } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectCount: '1-3 Projects',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        company: '',
        projectCount: '1-3 Projects',
        message: '',
      });
    }, 4000);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-6 font-medium">
          <Link href="/" className="hover:text-[#3478C9]">Home</Link>
          <span>/</span>
          <span className="text-[#17324D] font-bold">Contact Enterprise Advisory</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm">
          <div>
            <span className="text-xs font-bold text-teal-600 uppercase tracking-widest">
              Direct Enterprise Support
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-[#17324D] mt-1 mb-4">
              Get in Touch with Our Team
            </h1>
            <p className="text-xs text-slate-600 leading-relaxed mb-6">
              Have questions regarding custom deployment, multi-tenant inventory configuration, or booking a personalized walkthrough? Send us a message and our product team will respond promptly.
            </p>

            <div className="space-y-4 text-xs text-slate-700">
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <Mail size={18} className="text-[#3478C9] shrink-0" />
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase font-semibold">Email Advisory</span>
                  <span className="font-bold text-slate-900">support@estateflow.io</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <Clock size={18} className="text-teal-600 shrink-0" />
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase font-semibold">Response Time</span>
                  <span className="font-bold text-slate-900">Within 2 Hours (Mon–Sat, 9 AM – 8 PM)</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <ShieldCheck size={18} className="text-emerald-600 shrink-0" />
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase font-semibold">Data Confidentiality</span>
                  <span className="font-bold text-slate-900">Enterprise NDA & Encrypted Communications</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 bg-emerald-50 rounded-2xl border border-emerald-200">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-3">
                  <CheckCircle2 size={24} />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Message Received!</h3>
                <p className="text-xs text-slate-600 mt-2 max-w-xs leading-relaxed">
                  Thank you, <strong>{formData.name || 'Partner'}</strong>. Our product director will reach out to your email shortly.
                </p>
              </div>
            ) : (
              <form className="space-y-3.5" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#3478C9]"
                    placeholder="Aditya Sharma"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Corporate Email Address</label>
                  <input
                    type="email"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#3478C9]"
                    placeholder="aditya@skylineinfra.com"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Company / Developer</label>
                    <input
                      type="text"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#3478C9]"
                      placeholder="Skyline Developers"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Active Projects</label>
                    <select
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#3478C9]"
                      value={formData.projectCount}
                      onChange={(e) => setFormData({ ...formData, projectCount: e.target.value })}
                    >
                      <option value="1-3 Projects">1-3 Active Projects</option>
                      <option value="4-10 Projects">4-10 Active Projects</option>
                      <option value="10+ Projects">10+ Multi-City Projects</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">How can we assist you?</label>
                  <textarea
                    rows={4}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#3478C9]"
                    placeholder="Tell us about your upcoming project launch, sales team requirements, or request a customized software demo..."
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#3478C9] hover:bg-blue-600 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Send size={14} />
                  <span>Send Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
