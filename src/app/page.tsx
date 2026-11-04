import Link from 'next/link';
import {
  Building2,
  Users,
  Boxes,
  Calculator,
  Receipt,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  MessageSquare,
  Layers,
  Lock,
  ChevronRight,
  Handshake,
  ShieldAlert,
  Check,
  Calendar,
  Clock,
  FileText,
  DollarSign,
  Zap,
  ExternalLink,
  Laptop,
  Compass,
  CheckCircle,
} from 'lucide-react';
import { PublicNavbar } from '@/components/layout/PublicNavbar';
import { PublicFooter } from '@/components/layout/PublicFooter';

export default function HomePage() {
  const stakeholderRoles = [
    {
      portalId: 'admin',
      role: 'Company Owner / Admin',
      title: 'Builder & Executive Leadership',
      email: 'vikram.rao@prestigeconstructions.com',
      pass: 'admin123',
      color: 'border-blue-400 bg-blue-50/60 text-blue-800',
      icon: Building2,
      desc: 'Complete portfolio oversight, pricing matrices, tower launching, and user quota management.',
      caps: ['Full Company Controls', 'Pricing & Base Rates', 'Authorize Bookings'],
      href: '/login/company_admin',
    },
    {
      portalId: 'sales-manager',
      role: 'Sales Manager',
      title: 'Sales Operations & GM',
      email: 'ananya.d@prestigeconstructions.com',
      pass: 'sales123',
      color: 'border-indigo-400 bg-indigo-50/60 text-indigo-800',
      icon: Users,
      desc: 'Lead assignment round-robin, discount approval on cost sheets, and executive leaderboards.',
      caps: ['Approve Special Discounts', 'Booking Authorizations', 'Lead Redistribution'],
      href: '/login/sales_manager',
    },
    {
      portalId: 'sales-executive',
      role: 'Sales Executive',
      title: 'Property Advisor / Field Rep',
      email: 'rohan.s@prestigeconstructions.com',
      pass: 'sales123',
      color: 'border-teal-400 bg-teal-50/60 text-teal-800',
      icon: Sparkles,
      desc: 'Daily customer follow-ups, calls, site visit tours, 72-hr unit blocking, and cost estimates.',
      caps: ['72-Hr Transactional Unit Lock', '1-Click WhatsApp Dispatch', 'Generate Cost Sheets'],
      href: '/login/sales_executive',
    },
    {
      portalId: 'accounts',
      role: 'Accounts Manager',
      title: 'Billing & Receivables',
      email: 'suresh.n@prestigeconstructions.com',
      pass: 'accts123',
      color: 'border-emerald-400 bg-emerald-50/60 text-emerald-800',
      icon: Receipt,
      desc: 'Milestone payment schedules, demand notes, payment realizations, and stamped receipts.',
      caps: ['Demand Letter Dispatches', 'Stamped Digital Receipts', 'RERA Escrow Audits'],
      href: '/login/accounts_manager',
    },
    {
      portalId: 'broker',
      role: 'Channel Partner',
      title: 'Broker & RERA Agent Portal',
      email: 'kunal.verma@apexrealty.in',
      pass: 'broker123',
      color: 'border-purple-400 bg-purple-50/60 text-purple-800',
      icon: Handshake,
      desc: 'External enquiry registration, client ownership tracking, and commission payout statements.',
      caps: ['Client Registration with Ownership Tag', 'Track Attributed Deals', 'Commission Payout Statements'],
      href: '/login/broker',
    },
    {
      portalId: 'super-admin',
      role: 'Super Admin',
      title: 'Platform SaaS Root',
      email: 'admin@estateflow.io',
      pass: 'root123',
      color: 'border-amber-400 bg-amber-50/60 text-amber-900',
      icon: ShieldAlert,
      desc: 'Multi-tenant master console: manage all registered builders, subscriptions, quotas, and audit logs.',
      caps: ['Tenant Provisioning', 'SaaS Subscription Plans in USD', 'Cross-Company Audit Trail'],
      href: '/login/super_admin',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-[#263445]">
      {/* Universal Public Navbar */}
      <PublicNavbar />

      {/* ======================================================== */}
      {/* HERO SECTION: High-Impact SaaS Showcase with Luxury Imagery */}
      {/* ======================================================== */}
      <section className="pt-16 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-slate-50 to-slate-100 border-b border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Hero Header */}
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold mb-6 shadow-xs">
              <Sparkles size={14} className="text-[#159D91]" />
              <span>The Next-Generation Real Estate Sales & Inventory Operating System</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-[#17324D] tracking-tight leading-[1.12] mb-6">
              Sell Property Faster. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#17324D] via-[#3478C9] to-[#159D91]">
                Zero Double-Bookings. Direct Bank Ledgers.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto font-normal leading-relaxed mb-8">
              The modern software built specifically for <strong>real estate developers, builders, and sales agencies</strong>. 
              Capture leads automatically, manage tower unit availability with 72-hour holds, generate dynamic cost sheets, and maintain construction milestone records in one simple, unified platform.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/login"
                className="w-full sm:w-auto px-8 py-3.5 bg-[#159D91] hover:bg-teal-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-teal-700/20 transition-all flex items-center justify-center gap-2"
              >
                <Sparkles size={16} />
                <span>Launch Live Platform Demo</span>
              </Link>

              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-3.5 bg-[#17324D] hover:bg-[#244761] text-white rounded-xl text-sm font-bold shadow-xl shadow-slate-900/10 transition-all flex items-center justify-center gap-2"
              >
                <Calendar size={15} className="text-slate-300" />
                <span>Book 1-on-1 Walkthrough</span>
              </Link>

              <Link
                href="/pricing"
                className="w-full sm:w-auto px-6 py-3.5 bg-white border border-slate-300 hover:border-[#3478C9] text-slate-800 rounded-xl text-sm font-bold transition-all shadow-xs flex items-center justify-center gap-2"
              >
                <DollarSign size={15} className="text-[#3478C9]" />
                <span>View Plans in USD</span>
              </Link>
            </div>
          </div>

          {/* SaaS Platform Showcase Hero: Modern Light SaaS Cockpit */}
          <div className="mt-14 relative max-w-5xl mx-auto">
            {/* Background Glow */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-teal-500 via-[#3478C9] to-blue-600 rounded-3xl blur-xl opacity-15 pointer-events-none" />

            {/* Main Light Cockpit Window */}
            <div className="relative rounded-3xl bg-white border border-slate-200 shadow-2xl overflow-hidden ring-1 ring-slate-900/5">
              {/* macOS Style Header Bar */}
              <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-rose-400 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
                  <span className="ml-3 text-xs font-mono text-slate-500 font-medium hidden sm:inline">
                    estateflow-eta.vercel.app/dashboard • Prestige Estates Developer Console
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Live Multi-Tenant ERP</span>
                  </span>
                  <Link
                    href="/login"
                    className="text-xs text-white bg-[#3478C9] hover:bg-blue-600 px-3 py-1 rounded-lg font-bold flex items-center gap-1 transition-all shadow-xs"
                  >
                    <span>Test Drive</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </div>

              {/* Inner Application Layout */}
              <div className="p-5 sm:p-7 space-y-5 text-left">
                {/* Top Metric KPI Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-2xs">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Tower Inventory</span>
                    <p className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">140 Units</p>
                    <div className="mt-1 flex items-center gap-1.5 text-xs text-emerald-700 font-bold">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                      <span>24 Available for Sale</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-2xs">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">72-Hour Anti-Conflict</span>
                    <p className="text-xl sm:text-2xl font-black text-amber-600 mt-0.5">4 Locked</p>
                    <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-600">
                      <span>Zero Double-Booking</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-2xs">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Escrow Bank Realization</span>
                    <p className="text-xl sm:text-2xl font-black text-teal-700 mt-0.5">$14.2M</p>
                    <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-600">
                      <span>Direct RTGS / Cheques</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-2xs">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Inbound Lead Pipeline</span>
                    <p className="text-xl sm:text-2xl font-black text-[#3478C9] mt-0.5">184 Leads</p>
                    <div className="mt-1 flex items-center gap-1.5 text-xs text-blue-700 font-bold">
                      <span>94/100 AI Intent Score</span>
                    </div>
                  </div>
                </div>

                {/* Main Interactive Split View */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                  {/* Left: Architectural Stacking Plan (7 Cols) */}
                  <div className="lg:col-span-7 bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-3.5 border-b border-slate-200 gap-2">
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">Azure Heights • Tower B Architectural Stacking</h4>
                        <p className="text-[11px] text-slate-500 mt-0.5">Floor-by-floor real-time unit status & 72-hour transactional locking</p>
                      </div>
                      <div className="flex items-center gap-2.5 text-[11px] font-semibold text-slate-600">
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Available</span>
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" /> 72h Hold</span>
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-600" /> Booked</span>
                      </div>
                    </div>

                    {/* Floor Units Grid */}
                    <div className="space-y-2.5">
                      {/* Floor 14 */}
                      <div className="bg-white p-3 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-2xs">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded bg-slate-100 text-slate-700 font-mono text-xs font-bold flex items-center justify-center shrink-0">14F</span>
                          <span className="text-xs font-bold text-slate-800">Level 14 Penthouse & Corner</span>
                        </div>
                        <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                          <span className="px-2 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-bold text-center">1401 • Avail</span>
                          <span className="px-2 py-1 bg-amber-100 text-amber-900 border border-amber-300 rounded-lg text-xs font-bold text-center shadow-2xs ring-1 ring-amber-400">1402 • Locked</span>
                          <span className="px-2 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg text-xs font-bold text-center">1403 • Booked</span>
                          <span className="px-2 py-1 bg-slate-100 text-slate-400 rounded-lg text-xs font-bold text-center">1404 • Sold</span>
                        </div>
                      </div>

                      {/* Floor 12 */}
                      <div className="bg-white p-3 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-2xs">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded bg-slate-100 text-slate-700 font-mono text-xs font-bold flex items-center justify-center shrink-0">12F</span>
                          <span className="text-xs font-bold text-slate-800">Level 12 Executive Suites</span>
                        </div>
                        <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                          <span className="px-2 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-bold text-center">1201 • Avail</span>
                          <span className="px-2 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-bold text-center">1202 • Avail</span>
                          <span className="px-2 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg text-xs font-bold text-center">1203 • Booked</span>
                          <span className="px-2 py-1 bg-slate-100 text-slate-400 rounded-lg text-xs font-bold text-center">1204 • Sold</span>
                        </div>
                      </div>

                      {/* Floor 10 */}
                      <div className="bg-white p-3 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-2xs">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded bg-slate-100 text-slate-700 font-mono text-xs font-bold flex items-center justify-center shrink-0">10F</span>
                          <span className="text-xs font-bold text-slate-800">Level 10 Deluxe 3BHK</span>
                        </div>
                        <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                          <span className="px-2 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg text-xs font-bold text-center">1001 • Booked</span>
                          <span className="px-2 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-bold text-center">1002 • Avail</span>
                          <span className="px-2 py-1 bg-slate-100 text-slate-400 rounded-lg text-xs font-bold text-center">1003 • Sold</span>
                          <span className="px-2 py-1 bg-slate-100 text-slate-400 rounded-lg text-xs font-bold text-center">1004 • Sold</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Real-Time Audit Feed & WhatsApp Dispatch (5 Cols) */}
                  <div className="lg:col-span-5 space-y-3">
                    {/* Active Hold Card */}
                    <div className="p-3.5 bg-amber-50/90 rounded-2xl border border-amber-200 text-amber-950">
                      <div className="flex items-center justify-between text-xs font-bold mb-1">
                        <span className="flex items-center gap-1.5 text-amber-800">
                          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                          <span>72-Hour Hold Placed</span>
                        </span>
                        <span className="font-mono text-amber-700 font-bold">48h 12m Left</span>
                      </div>
                      <h5 className="text-xs font-bold text-slate-900">Unit 1402 (3BHK Parkview • $510,000)</h5>
                      <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                        Held by <strong className="text-slate-800">Agent Rohan S.</strong> for Buyer Aditya Verma. Other channel partners are locked out.
                      </p>
                    </div>

                    {/* Bank Escrow Realization Card */}
                    <div className="p-3.5 bg-emerald-50/90 rounded-2xl border border-emerald-200 text-emerald-950">
                      <div className="flex items-center justify-between text-xs font-bold mb-1">
                        <span className="flex items-center gap-1.5 text-emerald-800 font-bold">
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          <span>Escrow Realization Verified</span>
                        </span>
                        <span className="font-mono text-emerald-800 font-bold">$51,000 RTGS</span>
                      </div>
                      <h5 className="text-xs font-bold text-slate-900">Milestone 1 Deposit • Booking #BK-9021</h5>
                      <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                        Cheque/UTR reference verified and deposited to RERA Escrow. Official stamped receipt #RCP-9021 issued.
                      </p>
                    </div>

                    {/* 1-Click WhatsApp Trigger */}
                    <div className="p-3 bg-white rounded-2xl border border-slate-200 flex items-center justify-between gap-3 shadow-2xs">
                      <div className="min-w-0">
                        <span className="text-xs font-bold text-slate-800 block truncate">1-Click WhatsApp Delivery</span>
                        <span className="text-[11px] text-slate-500 truncate block">High-Res Brochure & Stamped Cost Sheet</span>
                      </div>
                      <Link
                        href="/login/broker"
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs shadow-xs shrink-0 transition-all flex items-center gap-1"
                      >
                        <MessageSquare size={12} />
                        <span>Dispatch</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Trust Proof Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-10 border-t border-slate-200/80 text-left">
            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Inventory Concurrency</span>
              <p className="text-2xl font-black text-emerald-600 mt-1">Zero Double Booking</p>
              <span className="text-[11px] text-slate-500 mt-0.5 block">72-Hour transactional holds</span>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">SaaS Architecture</span>
              <p className="text-2xl font-black text-[#17324D] mt-1">100% Tenant Isolation</p>
              <span className="text-[11px] text-slate-500 mt-0.5 block">PostgreSQL Row-Level Security</span>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Security & RBAC</span>
              <p className="text-2xl font-black text-[#3478C9] mt-1">6 Dedicated Portals</p>
              <span className="text-[11px] text-slate-500 mt-0.5 block">Working credentials for all roles</span>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Direct Bank Accounting</span>
              <p className="text-2xl font-black text-teal-600 mt-1">Milestone Ledgers</p>
              <span className="text-[11px] text-slate-500 mt-0.5 block">Demand letters & stamped receipts</span>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 2: INTERACTIVE LIVE PLATFORM DEMO HUB */}
      {/* ======================================================== */}
      <section id="live-demo" className="py-20 px-6 max-w-7xl mx-auto scroll-mt-24">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-200 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles size={12} className="fill-teal-600 text-teal-600" />
            <span>Interactive Live Product Tour</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#17324D] tracking-tight">
            Test Drive EstateFlow with Real Working Portals
          </h2>
          <p className="text-slate-600 mt-2 text-sm max-w-2xl mx-auto">
            No signup or credit card required. Click any stakeholder portal below to log in immediately with pre-configured demo data and experience the actual platform workflows.
          </p>
        </div>

        {/* 6 Stakeholder Portals Interactive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stakeholderRoles.map((role) => {
            const RoleIcon = role.icon;

            return (
              <div
                key={role.portalId}
                className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 text-[#17324D] flex items-center justify-center font-bold shadow-xs">
                      <RoleIcon size={20} />
                    </div>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${role.color}`}>
                      {role.role}
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-slate-900 leading-tight">
                    {role.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                    {role.desc}
                  </p>

                  {/* Capabilities Checklist */}
                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Key Authorized Actions:
                    </p>
                    {role.caps.map((cap, cIdx) => (
                      <div key={cIdx} className="flex items-center gap-1.5 text-xs text-slate-700">
                        <CheckCircle2 size={13} className="text-[#16A36A] shrink-0" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>

                  {/* Working Credentials Box */}
                  <div className="mt-4 p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-500">Email:</span>
                      <strong className="font-mono text-slate-800">{role.email}</strong>
                    </div>
                    <div className="flex items-center justify-between text-[11px] mt-1">
                      <span className="text-slate-500">Password:</span>
                      <strong className="font-mono text-slate-800">{role.pass}</strong>
                    </div>
                  </div>
                </div>

                <Link
                  href={role.href}
                  className="mt-5 w-full py-2.5 bg-[#3478C9] hover:bg-blue-600 text-white font-bold text-xs rounded-xl text-center transition-all shadow flex items-center justify-center gap-1.5"
                >
                  <span>Launch {role.role} Portal</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 3: CORE CAPABILITIES WITH REAL-WORLD IMAGERY */}
      {/* ======================================================== */}
      <section className="py-20 px-6 bg-white border-t border-b border-slate-200">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold text-teal-600 uppercase tracking-widest">
              Purpose-Built Real Estate Infrastructure
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#17324D] tracking-tight mt-1">
              Engineered to Replace Messy Spreadsheets & Lost Inquiries
            </h2>
            <p className="text-slate-600 mt-2 text-sm leading-relaxed">
              Every workflow has been designed around the real commercial operations of property developers, builders, sales agents, and channel partners.
            </p>
          </div>

          {/* Feature 1: Inventory & 72-Hour Hold */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="order-2 lg:order-1 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold">
                <Lock size={12} />
                <span>Zero Double-Booking Guarantee</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-[#17324D]">
                Visual Tower Stacking with 72-Hour Anti-Conflict Holds
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                When two sales executives or brokers negotiate with different buyers for the same high-demand apartment, EstateFlow locks the unit in the database for 72 hours with a live countdown timer. No other rep can confirm or book the unit while token verification is pending.
              </p>
              <ul className="space-y-2.5 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle size={15} className="text-emerald-600 shrink-0" />
                  <span>Real-time color-coded availability (Available, Locked, Booked, Sold)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={15} className="text-emerald-600 shrink-0" />
                  <span>Bulk Excel inventory upload and automatic unit configuration</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={15} className="text-emerald-600 shrink-0" />
                  <span>Automated unit unlock if token deposit is not verified within 72 hours</span>
                </li>
              </ul>
              <div className="pt-2">
                <Link
                  href="/inventory"
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#3478C9] hover:underline"
                >
                  <span>Explore Tower Inventory Screen →</span>
                </Link>
              </div>
            </div>

            <div className="order-1 lg:order-2 relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-slate-900 group">
              <img
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=900&q=80"
                alt="Residential Apartment Complex with Distinct Tower Units"
                className="w-full h-80 object-cover"
              />
              {/* Live Inventory Status Overlay */}
              <div className="absolute bottom-3 left-3 right-3 p-3 bg-slate-900/95 backdrop-blur-md rounded-2xl border border-slate-700 text-white shadow-xl">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                    <Lock size={11} /> 72-Hour Anti-Conflict Lock
                  </span>
                  <span className="text-[10px] font-mono text-teal-400 font-bold">48h 12m Remaining</span>
                </div>
                <p className="text-xs text-white font-semibold">
                  Unit 1402 (3BHK Parkview) • Held for Buyer Aditya Verma
                </p>
                <span className="text-[10px] text-slate-300 mt-0.5 block">
                  Other sales executives & channel partners are locked out in real-time.
                </span>
              </div>
            </div>
          </div>

          {/* Feature 2: Dynamic Cost Sheet Engine */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-slate-900 group">
              <img
                src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=900&q=80"
                alt="Financial Cost Quotation Review and Document Calculation"
                className="w-full h-80 object-cover"
              />
              {/* Authentic Cost Sheet Breakdown Box */}
              <div className="absolute bottom-3 left-3 right-3 p-3 bg-slate-900/95 backdrop-blur-md rounded-2xl border border-slate-700 text-white shadow-xl">
                <div className="flex items-center justify-between mb-1 text-[11px]">
                  <span className="font-bold text-teal-400 uppercase tracking-wider">Automated Cost Calculation</span>
                  <span className="font-mono text-emerald-400 font-bold">$510,000 Agreement Total</span>
                </div>
                <div className="text-[10px] text-slate-300 font-mono space-y-0.5">
                  <div>Base Price (2,200 sq.ft @ $215/sq.ft): $473,000</div>
                  <div>Floor Rise (14th Flr @ +$500/flr): +$7,000 • Parkview PLC: +$15,000</div>
                </div>
                <div className="mt-2 pt-1.5 border-t border-slate-800 flex items-center justify-between text-[10px]">
                  <span className="text-slate-400">RERA Milestone Breakdown Attached</span>
                  <span className="text-white font-bold bg-[#3478C9] px-2 py-0.5 rounded">PDF Generated</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold">
                <Calculator size={12} />
                <span>Instant Buyer Quotations</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-[#17324D]">
                Dynamic Automated Cost Sheet & Pricing Engine
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Eliminate manual spreadsheet errors. EstateFlow automatically calculates the base price, floor rise rate ($500/floor), corner parkview PLC, covered parking slots, clubhouse amenities, and statutory taxes.
              </p>
              <ul className="space-y-2.5 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle size={15} className="text-emerald-600 shrink-0" />
                  <span>One-click printable PDF cost sheet with builder branding</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={15} className="text-emerald-600 shrink-0" />
                  <span>Manager-level discount approvals before customer finalization</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={15} className="text-emerald-600 shrink-0" />
                  <span>Automatic construction-linked milestone payment schedule breakdown</span>
                </li>
              </ul>
              <div className="pt-2">
                <Link
                  href="/cost-sheets"
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#3478C9] hover:underline"
                >
                  <span>Open Cost Sheet Calculator →</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Feature 3: Direct-to-Bank Milestone Maintenance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="order-2 lg:order-1 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                <Receipt size={12} />
                <span>Direct Bank Escrow Accounting</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-[#17324D]">
                Direct Bank Milestone Maintenance & Stamped Receipts
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                EstateFlow does not process payments or take transaction cuts. All buyer funds are deposited directly into the builder’s bank escrow account. The platform serves as the immutable maintenance ledger—recording RTGS/Cheque realization numbers, dispatching milestone demand letters, and issuing official stamped digital receipts with verification QR codes.
              </p>
              <ul className="space-y-2.5 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle size={15} className="text-emerald-600 shrink-0" />
                  <span>Records Cheque & RTGS realization reference numbers per milestone</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={15} className="text-emerald-600 shrink-0" />
                  <span>Automated milestone demand letters with overdue aging alerts</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={15} className="text-emerald-600 shrink-0" />
                  <span>Cryptographically verified stamped digital receipts with QR codes</span>
                </li>
              </ul>
              <div className="pt-2">
                <Link
                  href="/collections"
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#3478C9] hover:underline"
                >
                  <span>View Payment Ledger Module →</span>
                </Link>
              </div>
            </div>

            <div className="order-1 lg:order-2 relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-slate-900 group">
              <img
                src="https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=900&q=80"
                alt="Executive Banking Agreement and Escrow Documentation Signing"
                className="w-full h-80 object-cover"
              />
              {/* Authentic Bank Realization Ledger Card */}
              <div className="absolute bottom-3 left-3 right-3 p-3 bg-slate-900/95 backdrop-blur-md rounded-2xl border border-slate-700 text-white shadow-xl">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                    <Receipt size={12} /> Direct-to-Bank Escrow Realization
                  </span>
                  <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded font-bold">
                    Realized & Cleared
                  </span>
                </div>
                <p className="text-xs text-white font-mono font-bold">
                  RTGS UTR #HDFC009218201 • $51,000 Milestone 1
                </p>
                <span className="text-[10px] text-slate-300 mt-0.5 block">
                  Deposited into Builder Escrow • Official Stamped Receipt #RCP-9021 Issued with QR Verification
                </span>
              </div>
            </div>
          </div>

          {/* Feature 4: Broker Network & 90-Day Protection */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-slate-900 group">
              <img
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=900&q=80"
                alt="Channel Partner Professional Real Estate Handshake"
                className="w-full h-80 object-cover"
              />
              {/* Authentic Channel Partner Protection Card */}
              <div className="absolute bottom-3 left-3 right-3 p-3 bg-slate-900/95 backdrop-blur-md rounded-2xl border border-slate-700 text-white shadow-xl">
                <div className="flex items-center justify-between mb-1 text-[11px]">
                  <span className="font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1">
                    <Handshake size={12} /> Broker Deal Attribution
                  </span>
                  <span className="font-mono text-amber-400 font-bold">$10,200 Commission</span>
                </div>
                <p className="text-xs text-slate-200 font-semibold">
                  Apex Realty Partners • Client: Aditya Verma
                </p>
                <span className="text-[10px] text-emerald-400 mt-0.5 block font-semibold">
                  90-Day Anti-Poaching Protection Active • Approved by Company Admin
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200 text-xs font-bold">
                <Handshake size={12} />
                <span>Broker Protection Engine</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-[#17324D]">
                Channel Partner Network with 90-Day Anti-Poaching Lock
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Empower your external broker network without risking client leakage. When a broker registers a prospective buyer in their portal, that buyer is locked to the broker for 90 days. Deals are attributed automatically, commission vouchers are calculated, and payouts require manager authorization.
              </p>
              <ul className="space-y-2.5 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle size={15} className="text-emerald-600 shrink-0" />
                  <span>Dedicated authenticated portal for external brokers and agencies</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={15} className="text-emerald-600 shrink-0" />
                  <span>90-Day client ownership tagging prevents direct developer poaching</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={15} className="text-emerald-600 shrink-0" />
                  <span>Tiered commission tracking (1.5% - 3.0%) with TDS deduction logs</span>
                </li>
              </ul>
              <div className="pt-2">
                <Link
                  href="/brokers"
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#3478C9] hover:underline"
                >
                  <span>Open Broker Portal →</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 4: PRICING SNAPSHOT IN USD ($) */}
      {/* ======================================================== */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-xs font-bold text-teal-600 uppercase tracking-widest">
            SaaS Platform Pricing in USD
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#17324D] tracking-tight mt-1">
            Simple Plans That Scale with Your Sales Team
          </h2>
          <p className="text-slate-600 mt-2 text-sm max-w-xl mx-auto">
            Zero percentage cuts on your property sales. Pay only flat monthly SaaS platform fees in USD.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Starter</span>
              <h3 className="text-2xl font-black text-[#17324D] mt-1">Boutique Builders</h3>
              <p className="text-xs text-slate-500 mt-1 mb-4">For firms launching 1-2 active projects.</p>
              <div className="flex items-baseline gap-1 my-3">
                <span className="text-4xl font-black text-[#17324D] font-mono">$199</span>
                <span className="text-xs text-slate-500">/ month (annual)</span>
              </div>
              <div className="py-2 px-3 bg-slate-50 rounded-xl text-xs font-semibold text-slate-700 mb-6">
                Up to 5 Users • 2 Active Projects
              </div>
              <ul className="space-y-2 text-xs text-slate-700 mb-6">
                <li className="flex items-center gap-2"><Check size={14} className="text-emerald-600" /> Lead Ingestion & Deduplication</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-emerald-600" /> Visual Tower Floor Stacking</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-emerald-600" /> Dynamic Cost Sheet Calculator</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-emerald-600" /> Direct Bank Milestone Records</li>
              </ul>
            </div>
            <Link href="/pricing" className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold text-center block">
              View Starter Details
            </Link>
          </div>

          <div className="bg-white p-7 rounded-3xl border-2 border-[#3478C9] shadow-xl relative flex flex-col justify-between ring-2 ring-blue-100">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#3478C9] text-white text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider">
              Recommended
            </span>
            <div>
              <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">Professional</span>
              <h3 className="text-2xl font-black text-[#17324D] mt-1">Scaling Developers</h3>
              <p className="text-xs text-slate-500 mt-1 mb-4">Complete sales and milestone automation.</p>
              <div className="flex items-baseline gap-1 my-3">
                <span className="text-4xl font-black text-[#17324D] font-mono">$499</span>
                <span className="text-xs text-slate-500">/ month (annual)</span>
              </div>
              <div className="py-2 px-3 bg-blue-50 rounded-xl text-xs font-semibold text-blue-900 mb-6 border border-blue-100">
                Up to 20 Users • 10 Active Projects
              </div>
              <ul className="space-y-2 text-xs text-slate-700 mb-6">
                <li className="flex items-center gap-2"><Check size={14} className="text-emerald-600" /> Everything in Starter</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-emerald-600" /> 72-Hour Anti-Double-Booking Lock</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-emerald-600" /> 1-Click WhatsApp Brochures</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-emerald-600" /> Broker Portal & Commission Logs</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-emerald-600" /> Stamped Receipts with QR Code</li>
              </ul>
            </div>
            <Link href="/pricing" className="w-full py-2.5 bg-[#3478C9] hover:bg-blue-600 text-white rounded-xl text-xs font-bold text-center block shadow">
              Explore Professional Tier
            </Link>
          </div>

          <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Enterprise</span>
              <h3 className="text-2xl font-black text-[#17324D] mt-1">Multi-City Developers</h3>
              <p className="text-xs text-slate-500 mt-1 mb-4">Dedicated cloud infrastructure & AI assist.</p>
              <div className="flex items-baseline gap-1 my-3">
                <span className="text-4xl font-black text-[#17324D] font-mono">$999</span>
                <span className="text-xs text-slate-500">/ month (annual)</span>
              </div>
              <div className="py-2 px-3 bg-slate-50 rounded-xl text-xs font-semibold text-slate-700 mb-6">
                Unlimited Users • Unlimited Projects
              </div>
              <ul className="space-y-2 text-xs text-slate-700 mb-6">
                <li className="flex items-center gap-2"><Check size={14} className="text-emerald-600" /> Everything in Professional</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-emerald-600" /> AI Sales Assistant & 0-100 Scoring</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-emerald-600" /> Granular Custom RBAC Roles</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-emerald-600" /> Dedicated Account Manager & SLA</li>
              </ul>
            </div>
            <Link href="/contact" className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold text-center block">
              Contact Enterprise Sales
            </Link>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 5: INDUSTRY COMPARISON TABLE */}
      {/* ======================================================== */}
      <section id="comparison" className="py-20 px-6 bg-white border-t border-slate-200 scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">
              Industry Comparison
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#17324D] tracking-tight mt-1">
              Why Real Estate Leaders Choose EstateFlow Over Generic CRMs
            </h2>
            <p className="text-slate-600 mt-2 text-sm max-w-2xl mx-auto">
              Generic software fails in property sales because it lacks unit stacking, floor rise calculations, and construction milestone collections.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
              <thead className="bg-[#17324D] text-white font-bold uppercase text-[11px]">
                <tr>
                  <th className="py-4 px-5">Capability / Requirement</th>
                  <th className="py-4 px-5 bg-[#3478C9] text-white">ESTATEFLOW PLATFORM</th>
                  <th className="py-4 px-5">Generic CRM (Salesforce / HubSpot)</th>
                  <th className="py-4 px-5">Excel & Offline WhatsApp Chaos</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                <tr className="hover:bg-slate-50">
                  <td className="py-3.5 px-5 font-bold text-slate-900">Visual Tower & Floor Stacking Plan</td>
                  <td className="py-3.5 px-5 font-bold text-[#16A36A] bg-blue-50/50">Built-in Architectural Grid</td>
                  <td className="py-3.5 px-5 text-rose-600">Requires Expensive Custom Code</td>
                  <td className="py-3.5 px-5 text-rose-600">Manual Colors (High Error Risk)</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-3.5 px-5 font-bold text-slate-900">Anti-Double-Booking Protection</td>
                  <td className="py-3.5 px-5 font-bold text-[#16A36A] bg-blue-50/50">72-Hour Transactional Lock</td>
                  <td className="py-3.5 px-5 text-rose-600">No Unit Concurrency Engine</td>
                  <td className="py-3.5 px-5 text-rose-600">Zero Concurrency Protection</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-3.5 px-5 font-bold text-slate-900">Milestone Schedules & Direct-to-Bank Ledger</td>
                  <td className="py-3.5 px-5 font-bold text-[#16A36A] bg-blue-50/50">Auto Demand Notes & Escrow Ledger</td>
                  <td className="py-3.5 px-5 text-slate-500">Generic Invoicing Add-ons</td>
                  <td className="py-3.5 px-5 text-rose-600">Manual Formula Calculation</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-3.5 px-5 font-bold text-slate-900">Official Stamped Digital Receipts</td>
                  <td className="py-3.5 px-5 font-bold text-[#16A36A] bg-blue-50/50">One-Click PDF with QR Verification</td>
                  <td className="py-3.5 px-5 text-slate-500">Generic Receipt Format</td>
                  <td className="py-3.5 px-5 text-rose-600">Manual Word Document Typing</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-3.5 px-5 font-bold text-slate-900">1-Click WhatsApp Brochure Dispatch</td>
                  <td className="py-3.5 px-5 font-bold text-[#16A36A] bg-blue-50/50">Built-in Native Launcher & Webhook</td>
                  <td className="py-3.5 px-5 text-slate-500">Expensive 3rd Party Add-on</td>
                  <td className="py-3.5 px-5 text-rose-600">Manual Personal Phone Chat</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-3.5 px-5 font-bold text-slate-900">Multi-Stakeholder Dedicated Portals</td>
                  <td className="py-3.5 px-5 font-bold text-[#16A36A] bg-blue-50/50">6 Working Role Gateways</td>
                  <td className="py-3.5 px-5 text-slate-500">Costly Per-User License Tiers</td>
                  <td className="py-3.5 px-5 text-rose-600">No Permission Security</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* FOOTER CTA */}
      {/* ======================================================== */}
      <section className="py-16 px-6 bg-[#17324D] text-white">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <span className="text-teal-400 text-xs font-bold uppercase tracking-widest">
              Ready to Accelerate Your Property Sales?
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold mt-1">
              Transform Your Property Sales Lifecycle Today
            </h3>
            <p className="text-slate-300 text-xs max-w-2xl mt-1.5 leading-relaxed">
              Log in directly with an authorized stakeholder account to test all features live, or schedule a personalized consultation with our product team.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="px-6 py-3 bg-[#159D91] hover:bg-teal-600 text-white rounded-xl font-bold text-xs shadow-md transition-all whitespace-nowrap flex items-center gap-1.5"
            >
              <Sparkles size={14} />
              <span>Launch Live Platform →</span>
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 bg-white text-[#17324D] hover:bg-slate-100 rounded-xl font-bold text-xs shadow-md transition-all whitespace-nowrap"
            >
              Contact Enterprise Sales →
            </Link>
          </div>
        </div>
      </section>

      {/* Universal Public Footer */}
      <PublicFooter />
    </div>
  );
}
