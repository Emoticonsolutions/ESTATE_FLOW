'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Lock,
  Menu,
  X,
  Play,
  Calendar,
  CheckCircle2,
  Send,
  Building,
  Phone,
  User,
} from 'lucide-react';

export function PublicNavbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [demoSubmitted, setDemoSubmitted] = useState(false);
  const [demoForm, setDemoForm] = useState({
    name: '',
    phone: '',
    company: '',
    city: 'Metro City',
    slot: 'Tomorrow, 11:00 AM',
  });

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Demo Video', href: '/#demo-video', icon: Play, highlight: true },
    { name: 'Stakeholders', href: '/#stakeholders' },
    { name: 'Features', href: '/features' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    if (href.startsWith('/#')) return false;
    return pathname === href || pathname.startsWith(href + '/');
  };

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDemoSubmitted(true);
    setTimeout(() => {
      setDemoSubmitted(false);
      setDemoModalOpen(false);
      setDemoForm({ name: '', phone: '', company: '', city: 'Metro City', slot: 'Tomorrow, 11:00 AM' });
    }, 2500);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 sm:h-18 items-center justify-between gap-3 sm:gap-6">
            {/* 1. Brand Logo: Strictly Single Horizontal Line */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0 whitespace-nowrap group">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-[#17324D] via-[#3478C9] to-[#159D91] flex items-center justify-center text-white font-black text-sm shadow-sm group-hover:scale-105 transition-transform">
                EF
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-black text-[#17324D] tracking-tight whitespace-nowrap">
                  ESTATE<span className="text-[#3478C9]">FLOW</span>
                </span>
                <span className="hidden xl:inline-block px-1.5 py-0.5 rounded text-[10px] font-bold bg-teal-50 text-teal-700 border border-teal-200 uppercase tracking-wide whitespace-nowrap">
                  CRM SaaS
                </span>
              </div>
            </Link>

            {/* 2. Desktop Navigation Links: Strictly One Single Line, Zero Text Wrap */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 whitespace-nowrap">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-semibold tracking-normal transition-all inline-flex items-center gap-1.5 ${
                      active
                        ? 'bg-blue-50 text-[#3478C9] font-bold'
                        : link.highlight
                        ? 'text-teal-700 hover:text-teal-800 hover:bg-teal-50 font-bold'
                        : 'text-slate-600 hover:text-[#17324D] hover:bg-slate-100/80'
                    }`}
                  >
                    {Icon && <Icon size={12} className={link.highlight ? 'text-teal-600 fill-teal-600 shrink-0' : 'shrink-0'} />}
                    <span className="whitespace-nowrap">{link.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* 3. Right Action Buttons: Strictly One Line (Book Demo + Login Only) */}
            <div className="hidden sm:flex items-center gap-2.5 shrink-0 whitespace-nowrap">
              {/* Book Demo Button */}
              <button
                onClick={() => setDemoModalOpen(true)}
                className="whitespace-nowrap h-9 px-4 rounded-lg text-xs font-bold text-white bg-[#159D91] hover:bg-teal-600 shadow-xs transition-all inline-flex items-center gap-1.5"
              >
                <Calendar size={13} className="shrink-0" />
                <span className="whitespace-nowrap">Book a Demo</span>
              </button>

              {/* Stakeholder Login (The only pathway to live product access) */}
              <Link
                href="/login"
                className="whitespace-nowrap h-9 px-4 rounded-lg text-xs font-bold text-white bg-[#17324D] hover:bg-[#244761] shadow-xs transition-all inline-flex items-center gap-1.5"
              >
                <Lock size={13} className="text-slate-300 shrink-0" />
                <span className="whitespace-nowrap">Stakeholder Login</span>
              </Link>
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors shrink-0"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 shadow-xl animate-in fade-in slide-in-from-top-1">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`whitespace-nowrap px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 ${
                      active ? 'bg-blue-50 text-[#3478C9] font-bold' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {Icon && <Icon size={14} className="text-teal-600 shrink-0" />}
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setDemoModalOpen(true);
                }}
                className="w-full h-10 px-4 rounded-lg text-xs font-bold text-white bg-[#159D91] hover:bg-teal-600 flex items-center justify-center gap-2 shadow-xs"
              >
                <Calendar size={14} />
                <span>Book a Demo</span>
              </button>

              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full h-10 px-4 rounded-lg text-xs font-bold text-white bg-[#17324D] hover:bg-[#244761] flex items-center justify-center gap-2 shadow-xs"
              >
                <Lock size={14} className="text-slate-300" />
                <span>Stakeholder Login (Live Access)</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Book a Demo Modal */}
      {demoModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative animate-in zoom-in-95">
            <button
              onClick={() => setDemoModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg"
            >
              <X size={18} />
            </button>

            {demoSubmitted ? (
              <div className="text-center py-6">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 size={24} />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Demo Request Submitted!</h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Thank you! Our enterprise real estate specialist will contact you on <strong>{demoForm.phone || 'your contact number'}</strong> to confirm your slot: <strong>{demoForm.slot}</strong>.
                </p>
                <span className="inline-block mt-4 text-[11px] text-slate-400 font-mono">
                  Closing in 2 seconds...
                </span>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2 text-teal-600 text-xs font-bold uppercase tracking-wider mb-1">
                  <Calendar size={14} />
                  <span>Executive 1-on-1 Walkthrough</span>
                </div>
                <h3 className="text-xl font-black text-[#17324D]">Book a Live CRM Demo</h3>
                <p className="text-xs text-slate-500 mt-1 mb-5">
                  Experience full multi-tenant capabilities, visual tower stacking, and RERA cost sheet automation customized for your project portfolio.
                </p>

                <form onSubmit={handleDemoSubmit} className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Your Full Name</label>
                    <div className="relative">
                      <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Aditya Birla"
                        required
                        value={demoForm.name}
                        onChange={(e) => setDemoForm({ ...demoForm, name: e.target.value })}
                        className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#3478C9]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile Number (WhatsApp Enabled)</label>
                    <div className="relative">
                      <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="tel"
                        placeholder="e.g. +1 (555) 000-0000"
                        required
                        value={demoForm.phone}
                        onChange={(e) => setDemoForm({ ...demoForm, phone: e.target.value })}
                        className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#3478C9]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Builder / Developer</label>
                      <input
                        type="text"
                        placeholder="e.g. Skyline Infra"
                        required
                        value={demoForm.company}
                        onChange={(e) => setDemoForm({ ...demoForm, company: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#3478C9]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">City</label>
                      <input
                        type="text"
                        placeholder="e.g. Metro City"
                        required
                        value={demoForm.city}
                        onChange={(e) => setDemoForm({ ...demoForm, city: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#3478C9]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Preferred Demo Slot</label>
                    <select
                      value={demoForm.slot}
                      onChange={(e) => setDemoForm({ ...demoForm, slot: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#3478C9]"
                    >
                      <option>Today, 3:00 PM IST</option>
                      <option>Today, 5:30 PM IST</option>
                      <option>Tomorrow, 11:00 AM IST</option>
                      <option>Tomorrow, 4:00 PM IST</option>
                      <option>This Friday, 2:00 PM IST</option>
                    </select>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-2.5 bg-[#159D91] hover:bg-teal-600 text-white rounded-lg text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2"
                    >
                      <Send size={13} />
                      <span>Confirm & Schedule Demo</span>
                    </button>
                    <p className="text-[11px] text-slate-400 text-center mt-2">
                      Live product access is restricted to registered stakeholder accounts via Stakeholder Login.
                    </p>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
