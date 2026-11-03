'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTenant } from '@/lib/tenantContext';
import { UserRole } from '@/types';
import {
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Building2,
  Users,
  Receipt,
  Handshake,
  ShieldAlert,
  Eye,
  EyeOff,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

export default function LoginPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-slate-100 flex items-center justify-center text-xs text-slate-500">Loading Portal Gateway...</div>}>
      <LoginContent />
    </React.Suspense>
  );
}

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useTenant();

  const portalParam = searchParams.get('portal');

  // Stakeholder Profiles Definition
  const stakeholderPortals: {
    id: string;
    role: UserRole;
    title: string;
    badge: string;
    icon: any;
    color: string;
    bgHover: string;
    defaultEmail: string;
    defaultPass: string;
    personaName: string;
    personaTitle: string;
    description: string;
    capabilities: string[];
    redirectTo: string;
  }[] = [
    {
      id: 'admin',
      role: 'COMPANY_ADMIN',
      title: 'Company Owner & Builder Admin',
      badge: 'Developer Leadership',
      icon: Building2,
      color: 'text-[#3478C9] border-[#3478C9]',
      bgHover: 'hover:bg-blue-50/70',
      defaultEmail: 'vikram.rao@prestigeconstructions.com',
      defaultPass: 'admin123',
      personaName: 'Vikramaditya Rao',
      personaTitle: 'Managing Director & VP Sales',
      description: 'Complete management of real estate projects, company pricing setup, towers, and team oversight.',
      capabilities: ['Manage All Company Projects & Inventory', 'Configure Pricing & Base Rates', 'Authorize Sales Operations & User Quotas'],
      redirectTo: '/dashboard',
    },
    {
      id: 'sales-manager',
      role: 'SALES_MANAGER',
      title: 'Sales Manager Portal',
      badge: 'Sales Operations',
      icon: Users,
      color: 'text-indigo-600 border-indigo-600',
      bgHover: 'hover:bg-indigo-50/70',
      defaultEmail: 'ananya.d@prestigeconstructions.com',
      defaultPass: 'sales123',
      personaName: 'Ananya Deshmukh',
      personaTitle: 'Senior General Manager - Sales',
      description: 'Lead assignment round-robin, discount approvals, team performance tracking, and site visit coordination.',
      capabilities: ['Approve Special Discounts on Cost Sheets', 'Review & Authorize Booking Submissions', 'Lead Reassignment & Executive Leaderboard'],
      redirectTo: '/dashboard',
    },
    {
      id: 'sales-executive',
      role: 'SALES_EXECUTIVE',
      title: 'Sales Executive / Field Advisor',
      badge: 'Field Sales',
      icon: Sparkles,
      color: 'text-teal-600 border-teal-600',
      bgHover: 'hover:bg-teal-50/70',
      defaultEmail: 'rohan.s@prestigeconstructions.com',
      defaultPass: 'sales123',
      personaName: 'Rohan Sharma',
      personaTitle: 'Senior Property Advisor',
      description: 'Daily follow-up reminders, outbound calls, site visits, unit blocking, and brochure sharing.',
      capabilities: ['Capture Leads & Log Follow-up Notes', '72-Hour Transactional Unit Blocking', 'Generate Cost Estimates & WhatsApp Share'],
      redirectTo: '/leads',
    },
    {
      id: 'accounts',
      role: 'ACCOUNTS_MANAGER',
      title: 'Accounts & Receivables Portal',
      badge: 'Billing & Escrow',
      icon: Receipt,
      color: 'text-emerald-600 border-emerald-600',
      bgHover: 'hover:bg-emerald-50/70',
      defaultEmail: 'suresh.n@prestigeconstructions.com',
      defaultPass: 'accts123',
      personaName: 'Suresh Nambiar',
      personaTitle: 'Head of Billing & Receivables',
      description: 'Milestone installment schedules, demand letters, payment realizations, and stamped receipts.',
      capabilities: ['Record RTGS/UPI/Cheque Customer Payments', 'Issue Official Stamped Digital Receipts', 'Generate RERA Milestone Demand Letters'],
      redirectTo: '/collections',
    },
    {
      id: 'broker',
      role: 'BROKER',
      title: 'Channel Partner & Broker Portal',
      badge: 'RERA Partners',
      icon: Handshake,
      color: 'text-purple-600 border-purple-600',
      bgHover: 'hover:bg-purple-50/70',
      defaultEmail: 'kunal.verma@apexrealty.in',
      defaultPass: 'broker123',
      personaName: 'Kunal Verma',
      personaTitle: 'Managing Partner - Apex Channel Partners',
      description: 'External broker enquiry registration, attributed deals, client tracking, and commission payout statements.',
      capabilities: ['Register Client Enquiries with Ownership Tag', 'Track Attributed Bookings & Unit Allotments', 'Check Commission Slabs & Disbursal Status'],
      redirectTo: '/brokers',
    },
  ];

  function normalizePortal(id: string | null): string {
    if (!id) return 'admin';
    const clean = id.toLowerCase().replace(/_/g, '-');
    if (clean === 'super-admin' || clean === 'owner') return 'admin';
    if (clean === 'company-admin' || clean === 'builder') return 'admin';
    if (clean === 'accounts-manager') return 'accounts';
    if (clean === 'channel-partner') return 'broker';
    return clean;
  }

  const [activePortalId, setActivePortalId] = useState<string>(normalizePortal(portalParam));

  useEffect(() => {
    if (portalParam === 'super-admin') {
      router.replace('/super-admin');
      return;
    }
    if (portalParam) {
      setActivePortalId(normalizePortal(portalParam));
    }
  }, [portalParam, router]);

  // Find active portal
  const activePortal = stakeholderPortals.find((p) => p.id === activePortalId) || stakeholderPortals[0];

  const [email, setEmail] = useState(activePortal.defaultEmail);
  const [password, setPassword] = useState(activePortal.defaultPass);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update form inputs when switching stakeholder portal tab
  useEffect(() => {
    setEmail(activePortal.defaultEmail);
    setPassword(activePortal.defaultPass);
    setErrorMessage(null);
    setSuccessMessage(null);
  }, [activePortalId]);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const res = login(email, password, activePortal.role);

    if (res.success) {
      setSuccessMessage(res.message);
      setTimeout(() => {
        router.push(activePortal.redirectTo);
      }, 400);
    } else {
      setErrorMessage(res.message);
      setIsSubmitting(false);
    }
  };

  const handleQuickLogin = (portalId: string) => {
    const target = stakeholderPortals.find((p) => p.id === portalId) || stakeholderPortals[0];
    setActivePortalId(portalId);
    setEmail(target.defaultEmail);
    setPassword(target.defaultPass);

    const res = login(target.defaultEmail, target.defaultPass, target.role);
    if (res.success) {
      setSuccessMessage(`Logging in as ${target.personaName}...`);
      setTimeout(() => {
        router.push(target.redirectTo);
      }, 300);
    }
  };

  const Icon = activePortal.icon;

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="max-w-4xl w-full mx-auto">
        {/* Header Branding */}
        <div className="text-center mb-6">
          <Link href="/" className="inline-flex items-center space-x-2.5 mb-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#17324D] via-[#3478C9] to-[#159D91] flex items-center justify-center text-white font-black text-lg shadow-md group-hover:scale-105 transition-transform">
              EF
            </div>
            <span className="text-2xl font-black text-[#17324D] tracking-tight">
              ESTATE<span className="text-[#3478C9]">FLOW</span>
            </span>
          </Link>
          <h1 className="text-xl sm:text-2xl font-black text-[#17324D]">
            Multi-Stakeholder Authentication Gateway
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Select your real estate operational role below to access your dedicated, working portal
          </p>
        </div>

        {/* Stakeholder Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-6">
          {stakeholderPortals.map((p) => {
            const PIcon = p.icon;
            const isSelected = p.id === activePortalId;

            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setActivePortalId(p.id)}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-[#3478C9] ring-2 ring-[#3478C9]/20 shadow-md'
                    : 'bg-white/70 border-slate-200 hover:bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                      isSelected ? 'bg-blue-50 text-[#3478C9]' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    <PIcon size={15} />
                  </div>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-[#3478C9]"></span>
                  )}
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">
                    {p.badge}
                  </span>
                  <p className="text-xs font-bold text-slate-800 leading-tight mt-0.5 truncate">
                    {p.title.split(' ')[0]} {p.title.split(' ')[1] || ''}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Login Box with Split Columns: Left Form, Right Stakeholder Persona Details */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12">
          {/* Left Column: Real Working Login Form (7 cols) */}
          <div className="p-8 md:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">
                  {activePortal.badge} Access
                </span>
                <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-500 font-mono font-bold">
                  {activePortal.role}
                </span>
              </div>
              <h2 className="text-xl font-black text-[#17324D]">{activePortal.title}</h2>
              <p className="text-xs text-slate-500 mt-1">{activePortal.description}</p>

              {errorMessage && (
                <div className="mt-4 p-3 bg-rose-50 border border-rose-200 rounded-lg flex items-start gap-2.5 text-xs text-rose-700 animate-in fade-in">
                  <AlertCircle size={16} className="shrink-0 mt-0.5" />
                  <p>{errorMessage}</p>
                </div>
              )}

              {successMessage && (
                <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-start gap-2.5 text-xs text-emerald-800 animate-in fade-in">
                  <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
                  <p>{successMessage}</p>
                </div>
              )}

              <form onSubmit={handleLoginSubmit} className="mt-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Stakeholder Work Email
                  </label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-input text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#3478C9] focus:bg-white font-medium"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-slate-700">Password</label>
                    <span className="text-[11px] text-slate-400 font-mono">
                      Default: <strong className="text-slate-700">{activePortal.defaultPass}</strong>
                    </span>
                  </div>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-9 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-input text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#3478C9] focus:bg-white font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-[#3478C9] hover:bg-blue-600 text-white rounded-lg text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
                >
                  <span>Authenticate & Launch {activePortal.title.split(' ')[0]} Portal</span>
                  <ArrowRight size={15} />
                </button>
              </form>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
              <span>Session stored securely in browser</span>
              <Link href="/" className="text-[#3478C9] hover:underline font-semibold">
                Back to Home
              </Link>
            </div>
          </div>

          {/* Right Column: Persona Profile & Working Capabilities (5 cols) */}
          <div className="p-8 md:col-span-5 bg-gradient-to-br from-[#17324D] to-[#244761] text-white flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                <span className="text-[10px] font-mono text-teal-300 font-bold uppercase tracking-wider">
                  Active Persona Verification
                </span>
                <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-white font-bold">
                  Verified Stakeholder
                </span>
              </div>

              {/* Persona Card */}
              <div className="flex items-center gap-3.5 mb-5">
                <div className="w-12 h-12 rounded-xl bg-[#3478C9] text-white flex items-center justify-center font-black text-base shadow-md ring-2 ring-white/20">
                  {activePortal.personaName.charAt(0)}
                </div>
                <div>
                  <h3 className="font-extrabold text-white text-base">{activePortal.personaName}</h3>
                  <p className="text-teal-300 text-xs">{activePortal.personaTitle}</p>
                  <p className="text-slate-300 text-[10px] font-mono mt-0.5 truncate">{activePortal.defaultEmail}</p>
                </div>
              </div>

              {/* Working Permissions Checklist */}
              <div className="space-y-2.5 mt-6">
                <p className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                  Authorizations Granted:
                </p>
                {activePortal.capabilities.map((cap, cIdx) => (
                  <div key={cIdx} className="flex items-start gap-2 text-xs text-slate-200">
                    <CheckCircle2 size={14} className="text-[#16A36A] shrink-0 mt-0.5" />
                    <span>{cap}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Instant 1-Click Fill & Sign In Button */}
            <div className="mt-8 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => handleQuickLogin(activePortal.id)}
                className="w-full py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-black rounded-lg text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
              >
                <Sparkles size={14} />
                <span>One-Click Sign In as {activePortal.personaName.split(' ')[0]}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
