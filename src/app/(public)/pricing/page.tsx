'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Check, Sparkles, ShieldCheck, Zap } from 'lucide-react';

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'annual' | 'monthly'>('annual');

  const plans = [
    {
      name: 'Starter',
      badge: 'For Boutique Builders & Agencies',
      priceMonthly: 249,
      priceAnnual: 199,
      period: 'per month',
      limits: 'Up to 5 Users • 2 Active Projects',
      desc: 'Ideal for independent developers and boutique firms launching 1-2 residential or commercial projects.',
      features: [
        'Lead Management & Deduplication Engine',
        'Follow-ups & Overdue Follow-up Alerts',
        'Visual Tower Floor Inventory Grid',
        'Dynamic Cost Sheet Calculator',
        'Direct-to-Bank Booking & Stamped Receipt Records',
        'Standard Email & In-App Notifications',
        'Export to Excel / CSV / Printable PDF',
      ],
      cta: 'Get Started with Starter',
      popular: false,
    },
    {
      name: 'Professional',
      badge: 'Most Popular for Developers',
      priceMonthly: 599,
      priceAnnual: 499,
      period: 'per month',
      limits: 'Up to 20 Users • 10 Active Projects',
      desc: 'Complete sales orchestration, 72-hour unit locking, broker portal, and milestone billing for scaling builders.',
      features: [
        'Everything in Starter',
        '72-Hour Anti-Conflict Unit Locking',
        'Full Multi-Tier Booking Approval Workflows',
        'Milestone Payment Schedules & Demand Notes',
        '1-Click WhatsApp Integration (Pre-built Templates)',
        'Channel Partner / Broker Management & Commission',
        'Automated Round-Robin Lead Assignment',
        'Bank Escrow Reconciliation & Audit Logs',
      ],
      cta: 'Start 14-Day Free Trial',
      popular: true,
    },
    {
      name: 'Enterprise',
      badge: 'For Multi-City Real Estate Conglomerates',
      priceMonthly: 1199,
      priceAnnual: 999,
      period: 'per month',
      limits: 'Unlimited Users • Unlimited Projects',
      desc: 'Dedicated enterprise infrastructure with AI sales assistants, custom roles, and multi-tenant security.',
      features: [
        'Everything in Professional',
        'AI Sales Assistant & 0-100 Lead Scoring',
        'Natural Language BI Analytics Queries',
        'Custom Roles & Granular RBAC Permission Matrix',
        'Dedicated Cloud Escrow & ERP Database Sync',
        '99.9% Uptime SLA & Dedicated Account Manager',
        'Custom WhatsApp Visual Workflow Automation',
        'White-Label Custom Domain & Branding',
      ],
      cta: 'Contact Enterprise Sales',
      popular: false,
    },
  ];

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-6 font-medium">
          <Link href="/" className="hover:text-[#3478C9]">Home</Link>
          <span>/</span>
          <span className="text-[#17324D] font-bold">SaaS Pricing</span>
        </div>

        <div className="text-center mb-10">
          <span className="text-xs font-bold text-teal-600 uppercase tracking-widest">
            Predictable SaaS Pricing in USD
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-[#17324D] mt-1">
            Simple, Transparent Pricing for Real Estate Developers
          </h1>
          <p className="text-slate-600 mt-2 text-sm max-w-2xl mx-auto">
            Choose the tier matching your active inventory and sales team scale. No hidden transaction fees, no commission on your property sales.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="inline-flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 mt-6 text-xs">
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-2 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                billingCycle === 'annual'
                  ? 'bg-white text-[#17324D] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Annual Billing</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-700 font-bold">
                Save 20%
              </span>
            </button>
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-lg font-bold transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-white text-[#17324D] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Monthly Billing
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((p, idx) => {
            const price = billingCycle === 'annual' ? p.priceAnnual : p.priceMonthly;

            return (
              <div
                key={idx}
                className={`bg-white rounded-3xl p-7 border relative flex flex-col justify-between shadow-sm transition-all ${
                  p.popular
                    ? 'border-[#3478C9] ring-2 ring-[#3478C9]/20 shadow-xl'
                    : 'border-slate-200 hover:shadow-md'
                }`}
              >
                {p.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#3478C9] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow">
                    Most Popular
                  </span>
                )}
                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{p.badge}</p>
                  <h2 className="text-2xl font-black text-[#17324D] mt-1">{p.name}</h2>
                  <p className="text-xs text-slate-500 mt-1 mb-4 leading-relaxed">{p.desc}</p>

                  <div className="mt-4 mb-2 flex items-baseline gap-1">
                    <span className="text-4xl font-black text-[#17324D] font-mono">
                      ${price}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      / month {billingCycle === 'annual' ? '(billed annually)' : ''}
                    </span>
                  </div>

                  <div className="py-2 px-3 bg-slate-50 rounded-xl text-xs font-semibold text-slate-700 mb-6 border border-slate-100">
                    {p.limits}
                  </div>

                  <div className="space-y-3 mb-8">
                    {p.features.map((f, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <Check size={15} className="text-[#16A36A] shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href="/contact"
                  className={`w-full py-3 rounded-xl text-xs font-bold text-center transition-all ${
                    p.popular
                      ? 'bg-[#3478C9] hover:bg-blue-600 text-white shadow-md'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                  }`}
                >
                  {p.cta}
                </Link>
              </div>
            );
          })}
        </div>

        {/* FAQ or Commercial Summary Bar */}
        <div className="mt-16 p-8 bg-slate-100/80 rounded-3xl border border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600">
            <div>
              <div className="flex items-center gap-2 font-bold text-slate-900 mb-1">
                <ShieldCheck size={16} className="text-emerald-600" />
                <span>Zero Transaction Cuts</span>
              </div>
              <p>We charge only flat SaaS platform fees in USD. All property buyer booking funds and installments go direct-to-bank without any percentage deductions.</p>
            </div>
            <div>
              <div className="flex items-center gap-2 font-bold text-slate-900 mb-1">
                <Zap size={16} className="text-teal-600" />
                <span>Instant Activation</span>
              </div>
              <p>Your company tenant is provisioned immediately with your customized inventory stacking, pricing matrices, and sales team roles.</p>
            </div>
            <div>
              <div className="flex items-center gap-2 font-bold text-slate-900 mb-1">
                <Sparkles size={16} className="text-[#3478C9]" />
                <span>Dedicated Portals</span>
              </div>
              <p>Every account includes dedicated logins for Company Admin, Sales Managers, Sales Executives, Accounts Managers, and External Brokers.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
