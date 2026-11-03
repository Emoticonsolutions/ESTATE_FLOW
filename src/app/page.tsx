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
  FileCheck,
  Layers,
  Phone,
  Lock,
  ChevronRight,
  Handshake,
  ShieldAlert,
  Play,
  Check,
  HelpCircle,
  FileText,
  Clock,
  Calendar,
} from 'lucide-react';
import { DemoVideoPlayer } from '@/components/landing/DemoVideoPlayer';
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
      color: 'border-blue-400 bg-blue-50/40 text-blue-800',
      icon: Building2,
      desc: 'Complete portfolio oversight, pricing matrices, tower launching, and user quota management.',
      caps: ['Full Company Controls', 'Pricing & Base Rates', 'Authorize Bookings'],
      href: '/login?portal=admin',
    },
    {
      portalId: 'sales-manager',
      role: 'Sales Manager',
      title: 'Sales Operations & GM',
      email: 'ananya.d@prestigeconstructions.com',
      pass: 'sales123',
      color: 'border-indigo-400 bg-indigo-50/40 text-indigo-800',
      icon: Users,
      desc: 'Lead assignment round-robin, discount approval on cost sheets, and executive leaderboards.',
      caps: ['Approve Special Discounts', 'Booking Authorizations', 'Lead Redistribution'],
      href: '/login?portal=sales-manager',
    },
    {
      portalId: 'sales-executive',
      role: 'Sales Executive',
      title: 'Property Advisor / Field Rep',
      email: 'rohan.s@prestigeconstructions.com',
      pass: 'sales123',
      color: 'border-teal-400 bg-teal-50/40 text-teal-800',
      icon: Sparkles,
      desc: 'Daily customer follow-ups, calls, site visit tours, 72-hr unit blocking, and cost estimates.',
      caps: ['72-Hr Transactional Unit Lock', 'WhatsApp Brochure Dispatch', 'Generate Cost Sheets'],
      href: '/login?portal=sales-executive',
    },
    {
      portalId: 'accounts',
      role: 'Accounts Manager',
      title: 'Billing & Receivables',
      email: 'suresh.n@prestigeconstructions.com',
      pass: 'accts123',
      color: 'border-emerald-400 bg-emerald-50/40 text-emerald-800',
      icon: Receipt,
      desc: 'Milestone payment schedules, demand notes, payment realizations, and stamped receipts.',
      caps: ['Demand Letter Dispatches', 'Stamped Digital Receipts', 'RERA Escrow Audits'],
      href: '/login?portal=accounts',
    },
    {
      portalId: 'broker',
      role: 'Channel Partner',
      title: 'Broker & RERA Agent Portal',
      email: 'kunal.verma@apexrealty.in',
      pass: 'broker123',
      color: 'border-purple-400 bg-purple-50/40 text-purple-800',
      icon: Handshake,
      desc: 'External enquiry registration, client ownership tracking, and commission payout statements.',
      caps: ['Client Registration with Ownership Tag', 'Track Attributed Deals', 'Commission Payout Statements'],
      href: '/login?portal=broker',
    },
    {
      portalId: 'super-admin',
      role: 'Super Admin',
      title: 'Platform SaaS Root',
      email: 'admin@estateflow.io',
      pass: 'root123',
      color: 'border-amber-400 bg-amber-50/40 text-amber-900',
      icon: ShieldAlert,
      desc: 'Multi-tenant master console: manage all registered builders, subscriptions, quotas, and audit logs.',
      caps: ['Tenant Provisioning', 'SaaS Subscription Plans', 'Cross-Company Audit Trail'],
      href: '/login?portal=super-admin',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-[#263445]">
      {/* Universal Public Navbar */}
      <PublicNavbar />

      {/* Hero Section */}
      <section className="pt-16 pb-20 px-6 bg-gradient-to-b from-white via-slate-50 to-slate-100 border-b border-slate-200">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold mb-6 shadow-sm">
            <Sparkles size={14} className="text-[#159D91]" />
            <span>The Next-Generation Real Estate Operating System for High-Velocity Builders</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-[#17324D] tracking-tight leading-[1.12] mb-6">
            Empower Every Stakeholder in Your <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#17324D] via-[#3478C9] to-[#159D91]">
              Property Sales & Collections Lifecycle
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto font-normal leading-relaxed mb-8">
            From omni-channel enquiry acquisition and automated round-robin assignment to interactive 3D visual tower inventory, dynamic RERA cost sheets, booking approvals, construction milestone collections, and official Meta WhatsApp Cloud API automation.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-3.5 bg-[#159D91] hover:bg-teal-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-teal-700/20 transition-all flex items-center justify-center gap-2"
            >
              <Calendar size={16} />
              <span>Book an Executive Demo</span>
            </Link>

            <Link
              href="/login"
              className="w-full sm:w-auto px-8 py-3.5 bg-[#17324D] hover:bg-[#244761] text-white rounded-xl text-sm font-bold shadow-xl shadow-slate-900/10 transition-all flex items-center justify-center gap-2"
            >
              <Lock size={15} className="text-slate-300" />
              <span>Stakeholder Login (Live Access)</span>
            </Link>

            <a
              href="#demo-video"
              className="w-full sm:w-auto px-6 py-3.5 bg-white border border-slate-300 hover:border-[#3478C9] text-slate-800 rounded-xl text-sm font-bold transition-all shadow-sm flex items-center justify-center gap-2 group"
            >
              <Play size={15} className="text-[#3478C9] fill-[#3478C9] group-hover:scale-110 transition-transform" />
              <span>Watch Video Tour (3:45)</span>
            </a>
          </div>

          {/* Key Trust Proof Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-10 border-t border-slate-200/80 text-left">
            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Concurrency Engine</span>
              <p className="text-2xl font-black text-emerald-600 mt-1">Zero Double Booking</p>
              <span className="text-[11px] text-slate-500 mt-0.5 block">72-hr transactional holds</span>
            </div>
            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">SaaS Architecture</span>
              <p className="text-2xl font-black text-[#17324D] mt-1">100% Tenant Isolation</p>
              <span className="text-[11px] text-slate-500 mt-0.5 block">PostgreSQL Row-Level Security</span>
            </div>
            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Security & RBAC</span>
              <p className="text-2xl font-black text-[#3478C9] mt-1">6 Dedicated Portals</p>
              <span className="text-[11px] text-slate-500 mt-0.5 block">Working credentials for all roles</span>
            </div>
            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">RERA Compliant</span>
              <p className="text-2xl font-black text-teal-600 mt-1">Instant Cost Sheet PDF</p>
              <span className="text-[11px] text-slate-500 mt-0.5 block">Statutory GST & milestone notes</span>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* REQUIREMENT 1: FEATURED DEMO VIDEO SHOWCASE */}
      {/* ======================================================== */}
      <section id="demo-video" className="py-20 px-6 max-w-7xl mx-auto scroll-mt-24">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-200 text-xs font-bold uppercase tracking-wider mb-2">
            <Play size={12} className="fill-teal-600" /> Interactive Product Demonstration
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#17324D] tracking-tight">
            See EstateFlow in Action Across the Sales Lifecycle
          </h2>
          <p className="text-slate-600 mt-2 text-sm max-w-2xl mx-auto">
            Interact with our simulated high-definition video walkthrough below. Click any chapter to jump directly to that workflow or launch the live screen in the CRM.
          </p>
        </div>

        {/* Embedded Interactive Video Player */}
        <DemoVideoPlayer />
      </section>

      {/* ======================================================== */}
      {/* REQUIREMENT 2: SEPARATE, WORKING LOGINS FOR ALL STAKEHOLDERS */}
      {/* ======================================================== */}
      <section id="stakeholders" className="py-20 px-6 bg-slate-100 border-t border-b border-slate-200 scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-bold text-[#3478C9] uppercase tracking-widest">
              Dedicated Stakeholder Portals
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#17324D] tracking-tight mt-1">
              Separate, Fully Working Logins for Every Role
            </h2>
            <p className="text-slate-600 mt-2 text-sm max-w-2xl mx-auto">
              Each stakeholder has a dedicated, authenticated portal with real working permissions, tailored navigation, and working test credentials.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stakeholderRoles.map((role) => {
              const RoleIcon = role.icon;

              return (
                <div
                  key={role.portalId}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 text-[#17324D] flex items-center justify-center font-bold shadow-sm">
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
                    <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
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
                    className="mt-5 w-full py-2.5 bg-[#3478C9] hover:bg-blue-600 text-white font-bold text-xs rounded-lg text-center transition-all shadow flex items-center justify-center gap-1.5"
                  >
                    <span>Log In to {role.role} Portal</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 17 CORE MODULES DEEP BREAKDOWN */}
      {/* ======================================================== */}
      <section id="modules" className="py-20 px-6 max-w-7xl mx-auto scroll-mt-24">
        <div className="text-center mb-14">
          <span className="text-xs font-bold text-teal-600 uppercase tracking-widest">
            Full Enterprise Scope
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#17324D] tracking-tight mt-1">
            17 Purpose-Built Real Estate Modules
          </h2>
          <p className="text-slate-600 mt-2 text-sm max-w-2xl mx-auto">
            Engineered from ground up to replace fragmented spreadsheets, generic CRMs, and offline paper cost sheets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold mb-3">
              <TrendingUp size={20} />
            </div>
            <h4 className="font-bold text-base text-estate-navy">1. Executive Dashboard</h4>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              12 live KPI widgets, conversion funnel, lead source distribution, monthly contracted sales in ₹ Crores, and sales leaderboard.
            </p>
            <Link href="/login" className="text-xs text-[#3478C9] font-bold hover:underline mt-3 inline-block">
              Login to Access Dashboard →
            </Link>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold mb-3">
              <Users size={20} />
            </div>
            <h4 className="font-bold text-base text-estate-navy">2. Lead 360 & Deduplication</h4>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Comprehensive customer requirements, automated duplicate mobile alerts, 7 detail tabs (Overview, Notes, Visits, Timeline).
            </p>
            <Link href="/leads" className="text-xs text-estate-blue font-bold hover:underline mt-3 inline-block">
              Open Lead 360 →
            </Link>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold mb-3">
              <Boxes size={20} />
            </div>
            <h4 className="font-bold text-base text-estate-navy">3. Visual Tower Floor Grid</h4>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Interactive architectural stacking plan with color-coded unit statuses, 72-hr transactional locks, and bulk Excel import.
            </p>
            <Link href="/inventory" className="text-xs text-estate-blue font-bold hover:underline mt-3 inline-block">
              Open Tower Grid →
            </Link>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold mb-3">
              <Calculator size={20} />
            </div>
            <h4 className="font-bold text-base text-estate-navy">4. Dynamic Cost Sheets</h4>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Automatic pricing matrices: base price, floor rise, PLC, parking, clubhouse fee, statutory GST, discount approvals, and PDF export.
            </p>
            <Link href="/cost-sheets" className="text-xs text-estate-blue font-bold hover:underline mt-3 inline-block">
              Open Cost Calculator →
            </Link>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold mb-3">
              <Receipt size={20} />
            </div>
            <h4 className="font-bold text-base text-estate-navy">5. Milestone Collections</h4>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Construction milestone schedules (10:10:15:25:20:20), demand notes, payment recording, and official stamped digital receipts.
            </p>
            <Link href="/collections" className="text-xs text-estate-blue font-bold hover:underline mt-3 inline-block">
              Open Collections →
            </Link>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold mb-3">
              <Handshake size={20} />
            </div>
            <h4 className="font-bold text-base text-estate-navy">6. Broker & Channel Partners</h4>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              RERA broker directory, deal attribution, tiered commission calculation, and payout authorization queues.
            </p>
            <Link href="/brokers" className="text-xs text-estate-blue font-bold hover:underline mt-3 inline-block">
              Open Broker Network →
            </Link>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* COMPARISON MATRIX (EstateFlow vs Generic CRM vs Excel) */}
      {/* ======================================================== */}
      <section id="comparison" className="py-20 px-6 bg-white border-t border-slate-200 scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">
              Industry Benchmark
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#17324D] tracking-tight mt-1">
              Why Real Estate Giants Choose EstateFlow Over Generic CRMs
            </h2>
            <p className="text-slate-600 mt-2 text-sm max-w-2xl mx-auto">
              Generic software fails in property sales because it lacks unit stacking, floor rise calculations, and RERA milestone collections.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <thead className="bg-[#17324D] text-white font-bold uppercase text-[11px]">
                <tr>
                  <th className="py-4 px-5">Capability / Requirement</th>
                  <th className="py-4 px-5 bg-[#3478C9] text-white">ESTATEFLOW CRM</th>
                  <th className="py-4 px-5">Vastu CRM Benchmark</th>
                  <th className="py-4 px-5">Generic CRM (Salesforce)</th>
                  <th className="py-4 px-5">Excel / Offline Spreadsheets</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                <tr className="hover:bg-slate-50">
                  <td className="py-3.5 px-5 font-bold text-slate-900">Visual Tower & Floor Stacking Plan</td>
                  <td className="py-3.5 px-5 font-bold text-[#16A36A] bg-blue-50/50">Built-in Interactive 3D Grid</td>
                  <td className="py-3.5 px-5">Proprietary Visual Grid</td>
                  <td className="py-3.5 px-5 text-rose-600">Requires Expensive Custom Code</td>
                  <td className="py-3.5 px-5 text-rose-600">Manual Colors (High Error Risk)</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-3.5 px-5 font-bold text-slate-900">Anti-Double-Booking Locking</td>
                  <td className="py-3.5 px-5 font-bold text-[#16A36A] bg-blue-50/50">72-hr Transactional DB Lock</td>
                  <td className="py-3.5 px-5">Supported</td>
                  <td className="py-3.5 px-5 text-rose-600">No Unit Concurrency Engine</td>
                  <td className="py-3.5 px-5 text-rose-600">Zero Concurrency Protection</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-3.5 px-5 font-bold text-slate-900">RERA Milestone Schedules & Dues</td>
                  <td className="py-3.5 px-5 font-bold text-[#16A36A] bg-blue-50/50">10:10:15:25:20:20 Auto Invoices</td>
                  <td className="py-3.5 px-5">Supported</td>
                  <td className="py-3.5 px-5 text-slate-500">Generic Recurring Invoicing</td>
                  <td className="py-3.5 px-5 text-rose-600">Manual Formula Calculation</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-3.5 px-5 font-bold text-slate-900">Official Stamped Payment Receipts</td>
                  <td className="py-3.5 px-5 font-bold text-[#16A36A] bg-blue-50/50">One-Click PDF with Stamped Logo</td>
                  <td className="py-3.5 px-5">Supported</td>
                  <td className="py-3.5 px-5 text-slate-500">Generic Receipt Format</td>
                  <td className="py-3.5 px-5 text-rose-600">Manual Word Document Typing</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-3.5 px-5 font-bold text-slate-900">Meta WhatsApp Cloud API Integration</td>
                  <td className="py-3.5 px-5 font-bold text-[#16A36A] bg-blue-50/50">Official Verified API + Drip Bot</td>
                  <td className="py-3.5 px-5">WhatsApp Integration</td>
                  <td className="py-3.5 px-5 text-slate-500">Expensive 3rd Party Add-on</td>
                  <td className="py-3.5 px-5 text-rose-600">Manual Personal Phone Chat</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-3.5 px-5 font-bold text-slate-900">Multi-Stakeholder Dedicated Portals</td>
                  <td className="py-3.5 px-5 font-bold text-[#16A36A] bg-blue-50/50">6 Working Role Gateways</td>
                  <td className="py-3.5 px-5">Role-Based Access</td>
                  <td className="py-3.5 px-5 text-slate-500">Costly Per-User License Tiers</td>
                  <td className="py-3.5 px-5 text-rose-600">No Permission Security</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 px-6 bg-[#17324D] text-white">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <span className="text-teal-400 text-xs font-bold uppercase tracking-widest">Ready to Transform Your Realty Sales?</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold mt-1">Transform Your Realty Sales Lifecycle</h3>
            <p className="text-slate-300 text-xs max-w-2xl mt-1.5 leading-relaxed">
              Book a live 1-on-1 walkthrough with an enterprise product specialist or sign in with an authorized stakeholder account.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="px-6 py-3 bg-[#159D91] hover:bg-teal-600 text-white rounded-lg font-bold text-xs shadow-md transition-all whitespace-nowrap"
            >
              Book an Executive Demo →
            </Link>
            <Link
              href="/login"
              className="px-6 py-3 bg-white text-[#17324D] hover:bg-slate-100 rounded-lg font-bold text-xs shadow-md transition-all whitespace-nowrap"
            >
              Stakeholder Login (Live Access) →
            </Link>
          </div>
        </div>
      </section>

      {/* Universal Public Footer */}
      <PublicFooter />
    </div>
  );
}
