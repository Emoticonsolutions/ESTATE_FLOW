import Link from 'next/link';
import { ArrowLeft, Check, Sparkles, Building2, Shield, Zap, Database } from 'lucide-react';

export default function FeaturesPage() {
  const modules = [
    { title: 'Module 1: Executive Dashboard', desc: 'Real-time KPI metrics, acquisition funnel, booking trends, sales leaderboard, and collection analytics.' },
    { title: 'Module 2: Lead 360 & Kanban Pipeline', desc: 'Full customer profiles, 9-stage drag-and-drop pipeline, duplicate detection, and round-robin assignment.' },
    { title: 'Module 3: Follow-Up & Reminder Engine', desc: 'Overdue alerts, multi-channel tasks (Calls, WhatsApp, Meetings, Site Visits), and team escalations.' },
    { title: 'Module 4: Project Management', desc: 'High-rise, luxury villas, commercial portfolios with RERA tracking, amenities, and floor plans.' },
    { title: 'Module 5: Tower, Floor & Visual Inventory', desc: 'Floor-by-floor interactive architectural unit grid with real-time status (Available, Blocked, Reserved, Booked, Sold).' },
    { title: 'Module 6: Dynamic Cost Sheet Calculator', desc: 'Automatic base rates, floor rise, PLC, parking, clubhouse, GST calculations, and exportable PDF cost sheets.' },
    { title: 'Module 7: Booking & Allotment Workflow', desc: 'Qualification check, multi-tier manager approvals, booking tokens, and allotment letter generation.' },
    { title: 'Module 8: Payment & Collection Management', desc: 'Construction-linked milestone installment schedules, stamped receipts, and immutable audit logs.' },
    { title: 'Module 9: Broker & Channel Partner Network', desc: 'RERA registry, deal attribution, tiered commission calculation, and payout approval workflows.' },
    { title: 'Module 10: Property Listings Catalog', desc: 'Residential and commercial listings with brochure downloads and direct broker assignments.' },
    { title: 'Module 11: WhatsApp & Email Automation', desc: 'Meta Cloud API integration, verified templates, and visual trigger-based drip nurturing sequences.' },
    { title: 'Module 12: AI Sales Assistant & Lead Scoring', desc: '0-100 purchase intent scoring, auto-generated follow-up copy, and natural language analytics queries.' },
    { title: 'Module 13: Reports & Business Intelligence', desc: 'Lead conversion funnels, inventory ageing, project-wise collections with Excel/CSV/PDF exports.' },
    { title: 'Module 14: Employee Management & RBAC Matrix', desc: 'Granular permissions matrix (View, Create, Edit, Delete, Approve) tailored for 6 distinct roles.' },
    { title: 'Module 15: Secure Document Vault', desc: 'Private document storage for customer KYC, agreements, and stamped financial receipts.' },
    { title: 'Module 16: Notification Center', desc: 'In-app and channel notifications for overdue follow-ups, payment milestones, and booking approvals.' },
    { title: 'Module 17: Super Admin Multi-Tenant SaaS', desc: 'Platform-level tenant isolation, company lifecycle management, and subscription tier billing.' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#3478C9] font-semibold mb-6 hover:underline">
          <ArrowLeft size={16} /> Back to Home
        </Link>
        <div className="mb-10">
          <span className="text-xs font-bold text-teal-600 uppercase tracking-widest">Complete Feature Breakdown</span>
          <h1 className="text-3xl font-black text-[#17324D] mt-1">EstateFlow Product Capabilities</h1>
          <p className="text-slate-600 mt-2 text-sm max-w-2xl">
            Explore all 17 fully engineered modules designed specifically for real estate enterprises and fast-growing developers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {modules.map((m, idx) => (
            <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-md bg-blue-50 text-[#3478C9] flex items-center justify-center font-bold text-xs">
                  {idx + 1}
                </div>
                <h2 className="font-bold text-[#17324D] text-sm">{m.title}</h2>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pl-8">{m.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#3478C9] hover:bg-blue-600 text-white rounded-lg font-bold text-sm shadow-md transition-all"
          >
            Launch Interactive CRM Dashboard →
          </Link>
        </div>
      </div>
    </div>
  );
}

