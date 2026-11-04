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

          {/* SaaS Platform Showcase Hero: Real UI Frame with Real Estate Photography */}
          <div className="mt-14 relative max-w-5xl mx-auto">
            {/* Background Glow */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-teal-500 via-[#3478C9] to-blue-600 rounded-3xl blur-xl opacity-20 pointer-events-none" />

            {/* Main Window */}
            <div className="relative rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl overflow-hidden">
              {/* macOS Style Bar */}
              <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                  <span className="ml-3 text-[11px] font-mono text-slate-400 hidden sm:inline">
                    estateflow-eta.vercel.app/dashboard
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-teal-400 bg-teal-950 border border-teal-800 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                    <span>Live Multi-Tenant CRM</span>
                  </span>
                  <Link
                    href="/login"
                    className="text-xs text-white bg-[#3478C9] hover:bg-blue-600 px-3 py-1 rounded-lg font-bold flex items-center gap-1 transition-all"
                  >
                    <span>Test Drive</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </div>

              {/* Showcase Image & UI Layout */}
              <div className="relative aspect-video sm:aspect-21/9 w-full overflow-hidden bg-slate-950">
                <img
                  src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1400&q=80"
                  alt="Modern Luxury High-Rise Real Estate"
                  className="w-full h-full object-cover opacity-35"
                />

                {/* Overlaid Platform UI Mockup Layer */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent p-6 sm:p-8 flex flex-col justify-end">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Floating Status Card 1 */}
                    <div className="p-4 bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-700/80 shadow-xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                          Real-Time Inventory
                        </span>
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      </div>
                      <h4 className="text-white font-bold text-sm">Azure Heights • Tower B</h4>
                      <p className="text-xs text-slate-300 mt-1">
                        48 Total Units • 38 Sold • 2 on 72h Hold • <strong>8 Available</strong>
                      </p>
                      <div className="mt-3 flex items-center gap-1.5 text-[11px] text-teal-400 font-bold">
                        <CheckCircle size={13} />
                        <span>Zero Double-Booking Guarantee</span>
                      </div>
                    </div>

                    {/* Floating Status Card 2 */}
                    <div className="p-4 bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-700/80 shadow-xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold text-teal-400 uppercase tracking-wider">
                          Direct-to-Bank Ledger
                        </span>
                        <Receipt size={14} className="text-teal-400" />
                      </div>
                      <h4 className="text-white font-bold text-sm">Milestone Payment #BK-9021</h4>
                      <p className="text-xs text-slate-300 mt-1">
                        $51,000 Realized via RTGS Cheque • Deposited into Builder Escrow
                      </p>
                      <div className="mt-3 flex items-center gap-1.5 text-[11px] text-emerald-400 font-bold">
                        <ShieldCheck size={13} />
                        <span>Stamped Receipt with QR Code</span>
                      </div>
                    </div>

                    {/* Floating Status Card 3 */}
                    <div className="p-4 bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-700/80 shadow-xl hidden sm:block">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">
                          Lead Ingestion & WhatsApp
                        </span>
                        <MessageSquare size={14} className="text-emerald-400" />
                      </div>
                      <h4 className="text-white font-bold text-sm">Aditya Verma (Lead #EF-8921)</h4>
                      <p className="text-xs text-slate-300 mt-1">
                        Inquiry from Meta Ads • AI Score 94/100 • Executive Assigned
                      </p>
                      <div className="mt-3 flex items-center gap-1.5 text-[11px] text-emerald-300 font-bold">
                        <span>1-Click WhatsApp Brochure Dispatched</span>
                      </div>
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

            <div className="order-1 lg:order-2 rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=900&q=80"
                alt="High-Rise Tower Real Estate Inventory"
                className="w-full h-80 object-cover hover:scale-102 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Feature 2: Dynamic Cost Sheet Engine */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80"
                alt="Architectural Blueprint & Cost Calculator"
                className="w-full h-80 object-cover hover:scale-102 transition-transform duration-500"
              />
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

            <div className="order-1 lg:order-2 rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=900&q=80"
                alt="Executive Banking Agreement Signing"
                className="w-full h-80 object-cover hover:scale-102 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Feature 4: Broker Network & 90-Day Protection */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=900&q=80"
                alt="Channel Partner Broker Partnership"
                className="w-full h-80 object-cover hover:scale-102 transition-transform duration-500"
              />
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
