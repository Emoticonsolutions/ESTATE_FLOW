'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Building2,
  Lock,
  ArrowRight,
  Menu,
  X,
  Play,
  Layers,
  Sparkles,
  PhoneCall,
  CreditCard,
  Info,
} from 'lucide-react';

export function PublicNavbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Demo Video', href: '/#demo-video', icon: Play, highlight: true },
    { name: 'Stakeholders', href: '/#stakeholders' },
    { name: '17 Modules', href: '/#modules' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    if (href.startsWith('/#')) return false;
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/90 bg-white/95 backdrop-blur-md shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-4">
          {/* Brand Logo & Tag */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#17324D] via-[#3478C9] to-[#159D91] flex items-center justify-center text-white font-black text-lg shadow-md group-hover:shadow-blue-500/20 transition-all">
              EF
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xl font-black text-[#17324D] tracking-tight">
                  ESTATE<span className="text-[#3478C9]">FLOW</span>
                </span>
                <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-50 text-teal-700 border border-teal-200 uppercase tracking-wide">
                  CRM SaaS
                </span>
              </div>
              <span className="text-[11px] font-medium text-slate-500 -mt-1 hidden sm:block">
                Multi-Tenant Real Estate OS
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all flex items-center gap-1.5 ${
                    active
                      ? 'bg-blue-50 text-[#3478C9] font-bold'
                      : link.highlight
                      ? 'text-teal-700 hover:text-teal-800 hover:bg-teal-50 font-bold'
                      : 'text-slate-600 hover:text-[#17324D] hover:bg-slate-100/70'
                  }`}
                >
                  {Icon && <Icon size={13} className={link.highlight ? 'text-teal-600 fill-teal-600' : ''} />}
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <Link
              href="/login"
              className="h-10 px-4 rounded-lg text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200/80 transition-all flex items-center gap-1.5 shadow-xs"
            >
              <Lock size={13} className="text-slate-500" />
              <span>Stakeholder Login</span>
            </Link>
            <Link
              href="/dashboard"
              className="h-10 px-5 rounded-lg text-xs font-bold text-white bg-[#3478C9] hover:bg-blue-600 shadow-sm shadow-blue-500/20 transition-all flex items-center gap-2 group"
            >
              <span>Launch Live CRM</span>
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                    active
                      ? 'bg-blue-50 text-[#3478C9]'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {Icon && <Icon size={14} className="text-teal-600" />}
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-2.5">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full h-10 px-4 rounded-lg text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 flex items-center justify-center gap-2"
            >
              <Lock size={14} className="text-slate-500" />
              <span>Stakeholder Login (6 Roles)</span>
            </Link>
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full h-10 px-4 rounded-lg text-xs font-bold text-white bg-[#3478C9] hover:bg-blue-600 flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Launch Live CRM Dashboard</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
