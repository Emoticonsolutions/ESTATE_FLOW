import Link from 'next/link';
import { ArrowLeft, Check, Sparkles } from 'lucide-react';

export default function PricingPage() {
  const plans = [
    {
      name: 'Starter',
      badge: 'For Boutique Builders',
      price: '₹14,999',
      period: 'per month / billed annually',
      limits: 'Up to 5 Users • 2 Active Projects',
      features: [
        'Lead Management & Deduplication',
        'Follow-ups & Overdue Alerts',
        'Visual Tower Floor Inventory Grid',
        'Dynamic Cost Sheet Generator',
        'Basic Booking & Receipts',
        'Standard Email Notifications',
      ],
      cta: 'Get Started with Starter',
      popular: false,
    },
    {
      name: 'Professional',
      badge: 'Most Popular for Developers',
      price: '₹34,999',
      period: 'per month / billed annually',
      limits: 'Up to 20 Users • 10 Active Projects',
      features: [
        'Everything in Starter',
        'Full Booking Approval Workflows',
        'Milestone Payment Schedules & Demand Notes',
        'WhatsApp Business Cloud API Integration',
        'Channel Partner / Broker Management & Commission',
        'Automated Round-Robin Lead Assignment',
        'Advanced Analytics & PDF Reports',
      ],
      cta: 'Start 14-Day Free Trial',
      popular: true,
    },
    {
      name: 'Enterprise',
      badge: 'For Multi-City Real Estate Conglomerates',
      price: 'Custom',
      period: 'tailored annual contract',
      limits: 'Unlimited Users • Unlimited Projects',
      features: [
        'Everything in Professional',
        'AI Sales Assistant & 0-100 Lead Scoring',
        'Natural Language BI Analytics Queries',
        'Custom Roles & Granular RBAC Permission Matrix',
        'Dedicated Cloud Escrow & ERP Database Sync',
        '99.9% Uptime SLA & Dedicated Account Manager',
        'Custom WhatsApp Visual Workflow Builder',
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
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-teal-600 uppercase tracking-widest">SaaS Subscriptions</span>
          <h1 className="text-3xl sm:text-4xl font-black text-[#17324D] mt-1">Transparent Pricing for Real Estate Leaders</h1>
          <p className="text-slate-600 mt-2 text-sm max-w-xl mx-auto">
            Choose the tier matching your active inventory and sales team scale. Easily configure or upgrade anytime from the Super Admin panel.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((p, idx) => (
            <div
              key={idx}
              className={`bg-white rounded-2xl p-7 border relative flex flex-col justify-between shadow-sm transition-all ${
                p.popular ? 'border-[#3478C9] ring-2 ring-[#3478C9]/20 shadow-lg' : 'border-slate-200'
              }`}
            >
              {p.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#3478C9] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Recommended
                </span>
              )}
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{p.badge}</p>
                <h2 className="text-2xl font-black text-[#17324D] mt-1">{p.name}</h2>
                <div className="mt-4 mb-2">
                  <span className="text-3xl font-black text-[#17324D]">{p.price}</span>
                  <span className="text-xs text-slate-500 ml-1">{p.period}</span>
                </div>
                <div className="py-2 px-3 bg-slate-50 rounded-lg text-xs font-semibold text-slate-700 mb-6 border border-slate-100">
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
                className={`w-full py-2.5 rounded-lg text-xs font-bold text-center transition-all ${
                  p.popular
                    ? 'bg-[#3478C9] hover:bg-blue-600 text-white shadow-md'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                }`}
              >
                {p.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

