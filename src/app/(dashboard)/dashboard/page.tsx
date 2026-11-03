'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Users,
  Flame,
  CalendarClock,
  Building2,
  Boxes,
  FileCheck,
  TrendingUp,
  CreditCard,
  AlertTriangle,
  ArrowUpRight,
  Filter,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  PhoneCall,
  Download,
  Receipt,
  Handshake,
  DollarSign,
  MessageSquare,
  Clock,
  ShieldCheck,
  Lock,
  Plus,
  Send,
  Printer,
  FileText,
  UserCheck,
  Check,
  X,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { useTenant } from '@/lib/tenantContext';
import { formatINR, formatDate, getLeadPriorityStyle } from '@/lib/utils';
import { UserRole } from '@/types';

export default function DashboardPage() {
  const { currentRole } = useTenant();

  // Render role-specific tailored cockpit
  switch (currentRole) {
    case 'BROKER':
      return <BrokerDashboard />;
    case 'ACCOUNTS_MANAGER':
      return <AccountsDashboard />;
    case 'SALES_EXECUTIVE':
      return <SalesExecutiveDashboard />;
    case 'SALES_MANAGER':
      return <SalesManagerDashboard />;
    case 'COMPANY_ADMIN':
    default:
      return <BuilderAdminDashboard />;
  }
}

// ==========================================
// 1. BUILDER ADMIN & COMPANY OWNER COCKPIT
// ==========================================
function BuilderAdminDashboard() {
  const { currentCompany, leads, units, followUps, bookings, payments } = useTenant();
  const [dateFilter, setDateFilter] = useState('This Month');
  const [projectFilter, setProjectFilter] = useState('All Projects');

  const totalBookedValue = bookings.reduce((sum, b) => sum + (b.agreedPrice || 0), 0);
  const totalCollected = payments.reduce((sum, p) => sum + (p.amount || 0), 0);
  const totalOutstanding = Math.max(0, totalBookedValue - totalCollected);

  const availableUnits = units.filter((u) => u.status === 'Available').length;
  const blockedUnits = units.filter((u) => u.status === 'Blocked').length;
  const bookedUnits = units.filter((u) => u.status === 'Booked' || u.status === 'Sold').length;

  const leadSourceData = [
    { name: 'Meta (FB/IG)', value: 34, color: '#3478C9' },
    { name: 'Google Ads', value: 26, color: '#159D91' },
    { name: '99acres/Portals', value: 18, color: '#E9A23B' },
    { name: 'Broker Referral', value: 14, color: '#8965C7' },
    { name: 'Walk-ins/Direct', value: 8, color: '#16A36A' },
  ];

  const monthlyTrendsData = [
    { month: 'Jun', sales: 6.8, bookings: 5 },
    { month: 'Jul', sales: 8.2, bookings: 7 },
    { month: 'Aug', sales: 11.4, bookings: 9 },
    { month: 'Sep', sales: 9.6, bookings: 8 },
    { month: 'Oct', sales: 14.8, bookings: 12 },
    { month: 'Nov (Mtd)', sales: 4.3, bookings: 3 },
  ];

  const collectionData = [
    { name: 'Falcon City Ph 2', collected: 18.4, pending: 4.8 },
    { name: 'Sanctuary Villas', collected: 24.1, pending: 6.2 },
    { name: 'Skyline Wadala', collected: 12.8, pending: 3.1 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-card border border-estate-border shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-estate-navy">
              Builder Executive Cockpit
            </h1>
            <span className="text-xs bg-blue-50 text-estate-blue font-bold px-2 py-0.5 rounded-full border border-blue-200">
              {currentCompany.name}
            </span>
            <span className="text-[10px] bg-slate-100 text-slate-700 font-mono px-2 py-0.5 rounded font-bold">
              CIN: {currentCompany.registrationNumber || currentCompany.cin || 'L45200KA1997PLC022365'}
            </span>
          </div>
          <p className="text-xs text-estate-muted mt-0.5">
            Enterprise portfolio analytics, revenue realization & multi-project velocity
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/projects"
            className="px-3.5 py-2 bg-estate-blue hover:bg-blue-600 text-white rounded-lg text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
          >
            <Building2 size={14} />
            <span>Master Projects</span>
          </Link>
          <Link
            href="/reports"
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <Download size={14} />
            <span>Export Financial MIS</span>
          </Link>
        </div>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-card border border-estate-border shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-estate-muted uppercase tracking-wider">Gross Booked Sales</span>
            <div className="p-2 bg-blue-50 text-estate-blue rounded-lg">
              <TrendingUp size={18} />
            </div>
          </div>
          <p className="text-2xl font-black text-estate-navy mt-2">
            {formatINR(totalBookedValue || 748000000)}
          </p>
          <p className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
            <ArrowUpRight size={13} /> +18.4% vs last quarter
          </p>
        </div>

        <div className="bg-white p-5 rounded-card border border-estate-border shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-estate-muted uppercase tracking-wider">Collections Realized</span>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <CreditCard size={18} />
            </div>
          </div>
          <p className="text-2xl font-black text-estate-navy mt-2">
            {formatINR(totalCollected || 553000000)}
          </p>
          <p className="text-xs text-slate-500 font-semibold mt-1">
            78.4% of milestone demand letters
          </p>
        </div>

        <div className="bg-white p-5 rounded-card border border-estate-border shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-estate-muted uppercase tracking-wider">Available Inventory</span>
            <div className="p-2 bg-teal-50 text-teal-600 rounded-lg">
              <Boxes size={18} />
            </div>
          </div>
          <p className="text-2xl font-black text-estate-navy mt-2">
            {availableUnits} Units
          </p>
          <p className="text-xs text-estate-muted font-semibold mt-1">
            {blockedUnits} units blocked • {bookedUnits} booked
          </p>
        </div>

        <div className="bg-white p-5 rounded-card border border-estate-border shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-estate-muted uppercase tracking-wider">Lead Conversion Rate</span>
            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
              <Users size={18} />
            </div>
          </div>
          <p className="text-2xl font-black text-estate-navy mt-2">12.8%</p>
          <p className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
            <ArrowUpRight size={13} /> 2.1% above industry average
          </p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-white p-6 rounded-card border border-estate-border shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-estate-navy">Monthly Sales Velocity & Run Rate</h2>
              <p className="text-xs text-estate-muted">Gross transaction volume (in ₹ Crores)</p>
            </div>
            <span className="text-xs font-bold text-estate-blue bg-blue-50 px-2.5 py-1 rounded-full">
              FY 2026 Target: ₹120 Cr
            </span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyTrendsData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3478C9" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#3478C9" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E3E8EF" />
                <XAxis dataKey="month" stroke="#718096" fontSize={11} tickLine={false} />
                <YAxis stroke="#718096" fontSize={11} tickLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="sales" stroke="#3478C9" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-4 bg-white p-6 rounded-card border border-estate-border shadow-sm">
          <h2 className="text-base font-bold text-estate-navy mb-1">Lead Acquisition Channels</h2>
          <p className="text-xs text-estate-muted mb-4">Where buyers are coming from</p>
          <div className="space-y-3">
            {leadSourceData.map((src) => (
              <div key={src.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: src.color }} />
                  <span className="font-semibold text-slate-800">{src.name}</span>
                </div>
                <span className="font-bold text-slate-900">{src.value}%</span>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Blended CAC: ₹4,200 / Qualified Lead</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 2. SALES MANAGER COCKPIT
// ==========================================
function SalesManagerDashboard() {
  const { leads, followUps } = useTenant();
  const [unassignedLeads, setUnassignedLeads] = useState([
    { id: 'lead-un-1', name: 'Dr. Vivek Mehra', mobile: '+91 98450 11223', budget: '₹1.8 Cr', project: 'Falcon City', source: 'Meta Ads' },
    { id: 'lead-un-2', name: 'Sunita Narang', mobile: '+91 99011 44556', budget: '₹2.4 Cr', project: 'Sanctuary Villas', source: 'Google Ads' },
  ]);
  const [discountRequests, setDiscountRequests] = useState([
    { id: 'disc-1', unit: 'Unit A-402 (3 BHK)', buyer: 'Rajesh Bansal', executive: 'Rohan Sharma', reqDiscount: '₹4.5 Lakhs (2.8%)', status: 'Pending' },
    { id: 'disc-2', unit: 'Villa V-12', buyer: 'Pooja Hegde', executive: 'Priya Iyer', reqDiscount: '₹7.0 Lakhs (2.5%)', status: 'Pending' },
  ]);

  const handleAssign = (id: string, execName: string) => {
    setUnassignedLeads((prev) => prev.filter((l) => l.id !== id));
  };

  const handleApproval = (id: string, decision: 'Approved' | 'Rejected') => {
    setDiscountRequests((prev) => prev.map((d) => (d.id === id ? { ...d, status: decision } : d)));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-card border border-estate-border shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-estate-navy">
              Sales Operations & Team Cockpit
            </h1>
            <span className="text-xs bg-indigo-50 text-indigo-700 font-bold px-2 py-0.5 rounded-full border border-indigo-200">
              Manager: Ananya Deshmukh
            </span>
          </div>
          <p className="text-xs text-estate-muted mt-0.5">
            Round-robin lead distribution, discount authorizations & executive pipeline velocity
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/leads"
            className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
          >
            <Users size={14} />
            <span>Manage Team Leads</span>
          </Link>
          <Link
            href="/cost-sheets"
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <CheckCircle2 size={14} />
            <span>Review Cost Sheets</span>
          </Link>
        </div>
      </div>

      {/* Manager KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-card border border-estate-border shadow-sm">
          <span className="text-xs font-semibold text-estate-muted uppercase tracking-wider">Quarterly Team Target</span>
          <p className="text-2xl font-black text-estate-navy mt-1">₹30.0 Cr</p>
          <div className="w-full bg-slate-100 h-2 rounded-full mt-2 overflow-hidden">
            <div className="bg-indigo-600 h-full rounded-full" style={{ width: '74%' }}></div>
          </div>
          <p className="text-xs text-indigo-700 font-semibold mt-1">₹22.2 Cr Closed (74% of Target)</p>
        </div>

        <div className="bg-white p-5 rounded-card border border-estate-border shadow-sm">
          <span className="text-xs font-semibold text-estate-muted uppercase tracking-wider">Unassigned Inbound Leads</span>
          <p className="text-2xl font-black text-amber-600 mt-1">{unassignedLeads.length} Enquiries</p>
          <p className="text-xs text-slate-500 font-semibold mt-1">Waiting for Round-Robin allocation</p>
        </div>

        <div className="bg-white p-5 rounded-card border border-estate-border shadow-sm">
          <span className="text-xs font-semibold text-estate-muted uppercase tracking-wider">Pending Discount Approvals</span>
          <p className="text-2xl font-black text-rose-600 mt-1">{discountRequests.filter(d => d.status === 'Pending').length} Requests</p>
          <p className="text-xs text-slate-500 font-semibold mt-1">Requires Manager Authorization</p>
        </div>

        <div className="bg-white p-5 rounded-card border border-estate-border shadow-sm">
          <span className="text-xs font-semibold text-estate-muted uppercase tracking-wider">Site Visits Scheduled</span>
          <p className="text-2xl font-black text-teal-600 mt-1">14 This Week</p>
          <p className="text-xs text-emerald-600 font-semibold mt-1">11 Completed • 3 Pending</p>
        </div>
      </div>

      {/* Operations Grid: Left Unassigned Leads, Right Discount Approvals */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Unassigned Leads Round Robin */}
        <div className="lg:col-span-6 bg-white p-6 rounded-card border border-estate-border shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-estate-navy">Unassigned Inbound Queue</h2>
              <p className="text-xs text-estate-muted">Allocate newly arrived enquiries directly to field executives</p>
            </div>
            <span className="text-xs font-bold bg-amber-50 text-amber-700 px-2 py-0.5 rounded border border-amber-200">
              Immediate Action
            </span>
          </div>

          {unassignedLeads.length === 0 ? (
            <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
              <CheckCircle2 size={32} className="text-emerald-500 mx-auto mb-2" />
              <p className="text-xs font-bold text-slate-800">All inbound leads are assigned!</p>
              <p className="text-[11px] text-slate-500">New Facebook & Google ad leads will appear here automatically.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {unassignedLeads.map((l) => (
                <div key={l.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">{l.name}</h3>
                    <p className="text-[11px] text-slate-500">{l.mobile} • Budget: <strong>{l.budget}</strong></p>
                    <span className="text-[10px] text-indigo-600 font-semibold">{l.project} ({l.source})</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleAssign(l.id, 'Rohan Sharma')}
                      className="px-2.5 py-1.5 bg-white border border-slate-300 hover:border-indigo-500 hover:text-indigo-600 rounded text-xs font-semibold text-slate-700 transition-colors shadow-2xs"
                    >
                      → Rohan
                    </button>
                    <button
                      onClick={() => handleAssign(l.id, 'Priya Iyer')}
                      className="px-2.5 py-1.5 bg-white border border-slate-300 hover:border-indigo-500 hover:text-indigo-600 rounded text-xs font-semibold text-slate-700 transition-colors shadow-2xs"
                    >
                      → Priya
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pending Special Discount Authorizations */}
        <div className="lg:col-span-6 bg-white p-6 rounded-card border border-estate-border shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-estate-navy">Discount & Booking Approvals</h2>
              <p className="text-xs text-estate-muted">Requests submitted by sales executives for price adjustments</p>
            </div>
            <span className="text-xs font-bold bg-rose-50 text-rose-700 px-2 py-0.5 rounded border border-rose-200">
              Authorization Gate
            </span>
          </div>

          <div className="space-y-3">
            {discountRequests.map((req) => (
              <div key={req.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{req.unit}</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                      req.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' :
                      req.status === 'Rejected' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {req.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">Buyer: <strong>{req.buyer}</strong> • Req: <strong className="text-rose-600">{req.reqDiscount}</strong></p>
                  <p className="text-[10px] text-slate-400">By Advisor: {req.executive}</p>
                </div>

                {req.status === 'Pending' ? (
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleApproval(req.id, 'Approved')}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-bold transition-colors flex items-center gap-1"
                    >
                      <Check size={13} />
                      <span>Approve</span>
                    </button>
                    <button
                      onClick={() => handleApproval(req.id, 'Rejected')}
                      className="px-2.5 py-1.5 bg-slate-200 hover:bg-rose-100 hover:text-rose-700 text-slate-700 rounded text-xs font-bold transition-colors"
                    >
                      <X size={13} />
                    </button>
                  </div>
                ) : (
                  <span className="text-xs font-bold text-slate-500">{req.status}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. SALES EXECUTIVE DAILY COCKPIT (Rohan Sharma)
// ==========================================
function SalesExecutiveDashboard() {
  const { leads, units, blockUnit, currentUser } = useTenant();
  const [selectedUnit, setSelectedUnit] = useState('unit-1');
  const [tokenAmount, setTokenAmount] = useState('1,00,000');
  const [blockedAlert, setBlockedAlert] = useState<string | null>(null);

  const [callQueue, setCallQueue] = useState([
    { id: 'call-1', name: 'Vikram Malhotra', mobile: '+91 98450 99881', unit: 'Tower A - 3 BHK', stage: 'Cost Sheet Sent', notes: 'Call regarding parking allotment' },
    { id: 'call-2', name: 'Sneha Kapoor', mobile: '+91 97112 33445', unit: 'Falcon City Villa', stage: 'Site Visit Confirmed', notes: 'Site visit today 4:00 PM at project site' },
    { id: 'call-3', name: 'Rajesh Bansal', mobile: '+91 98220 55667', unit: 'Tower A - 2 BHK', stage: 'Negotiation', notes: 'Requested ₹3,000/sqft discount' },
  ]);

  const handleCallComplete = (id: string) => {
    setCallQueue((prev) => prev.filter((c) => c.id !== id));
  };

  const handleQuickBlock = (e: React.FormEvent) => {
    e.preventDefault();
    blockUnit(selectedUnit, `₹${tokenAmount} token check collected`, currentUser?.name || 'Rohan Sharma');
    setBlockedAlert(`Unit successfully locked for 72 hours under your name! No other advisor can sell it.`);
    setTimeout(() => setBlockedAlert(null), 5000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-card border border-estate-border shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-estate-navy">
              My Daily Sales Cockpit
            </h1>
            <span className="text-xs bg-teal-50 text-teal-700 font-bold px-2 py-0.5 rounded-full border border-teal-200">
              Senior Property Advisor: Rohan Sharma
            </span>
          </div>
          <p className="text-xs text-estate-muted mt-0.5">
            Today's call schedule, client site visits, 72-hour unit locks & WhatsApp brochures
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/leads"
            className="px-3.5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
          >
            <Users size={14} />
            <span>My Active Leads</span>
          </Link>
          <Link
            href="/cost-sheets"
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <Sparkles size={14} />
            <span>Quick Cost Sheet</span>
          </Link>
        </div>
      </div>

      {blockedAlert && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl text-xs font-bold text-emerald-800 flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 size={16} className="text-emerald-600" />
          <span>{blockedAlert}</span>
        </div>
      )}

      {/* Personal KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-card border border-estate-border shadow-sm">
          <span className="text-xs font-semibold text-estate-muted uppercase tracking-wider">My Monthly Target</span>
          <p className="text-2xl font-black text-estate-navy mt-1">₹3.50 Cr</p>
          <div className="w-full bg-slate-100 h-2 rounded-full mt-2 overflow-hidden">
            <div className="bg-teal-600 h-full rounded-full" style={{ width: '61.4%' }}></div>
          </div>
          <p className="text-xs text-teal-700 font-semibold mt-1">₹2.15 Cr Achieved (61.4%)</p>
        </div>

        <div className="bg-white p-5 rounded-card border border-estate-border shadow-sm">
          <span className="text-xs font-semibold text-estate-muted uppercase tracking-wider">Calls Due Today</span>
          <p className="text-2xl font-black text-estate-navy mt-1">{callQueue.length} Pending</p>
          <p className="text-xs text-slate-500 font-semibold mt-1">12 Total Scheduled Today</p>
        </div>

        <div className="bg-white p-5 rounded-card border border-estate-border shadow-sm">
          <span className="text-xs font-semibold text-estate-muted uppercase tracking-wider">Site Visits Scheduled</span>
          <p className="text-2xl font-black text-estate-navy mt-1">2 Visits</p>
          <p className="text-xs text-emerald-600 font-semibold mt-1">1 Confirmed for 4:00 PM</p>
        </div>

        <div className="bg-white p-5 rounded-card border border-estate-border shadow-sm">
          <span className="text-xs font-semibold text-estate-muted uppercase tracking-wider">Units Blocked by Me</span>
          <p className="text-2xl font-black text-amber-600 mt-1">1 Unit Locked</p>
          <p className="text-xs text-slate-500 font-semibold mt-1">Tower A - 304 (72h Token Hold)</p>
        </div>
      </div>

      {/* Two-Column Cockpit: Left Calling Queue, Right 72h Instant Block Tool */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Today's Call Queue */}
        <div className="lg:col-span-7 bg-white p-6 rounded-card border border-estate-border shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-estate-navy">Today's High-Priority Call Queue</h2>
              <p className="text-xs text-estate-muted">Follow-ups scheduled with buyers due for immediate contact</p>
            </div>
            <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
              {callQueue.length} Remaining
            </span>
          </div>

          <div className="space-y-3">
            {callQueue.map((item) => (
              <div key={item.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-bold text-slate-900">{item.name}</h3>
                    <span className="text-[10px] bg-blue-100 text-blue-800 font-semibold px-2 py-0.2 rounded">
                      {item.stage}
                    </span>
                  </div>
                  <p className="text-xs font-mono text-slate-600 mt-0.5">{item.mobile} • {item.unit}</p>
                  <p className="text-[11px] text-slate-500 mt-1 italic">"{item.notes}"</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={`tel:${item.mobile}`}
                    className="p-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors shadow-2xs"
                    title="Call Buyer"
                  >
                    <PhoneCall size={14} />
                  </a>
                  <a
                    href={`https://wa.me/${item.mobile.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(item.name)},%20sharing%20the%20property%20cost%20sheet%20and%20brochure%20from%20EstateFlow.`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors shadow-2xs"
                    title="WhatsApp Message"
                  >
                    <MessageSquare size={14} />
                  </a>
                  <button
                    onClick={() => handleCallComplete(item.id)}
                    className="px-2.5 py-1.5 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-bold transition-colors"
                  >
                    Done
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 72-Hour Instant Unit Blocking Tool */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#17324D] to-[#244761] text-white p-6 rounded-card shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-300 flex items-center gap-1.5">
                <Lock size={14} /> 72-Hour Unit Blocking Tool
              </span>
              <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded font-mono">Anti-Conflict Lock</span>
            </div>

            <p className="text-xs text-slate-300 mb-4">
              Reserve an inventory unit instantly for a customer token discussion. Unit will be locked across all advisors and brokers for 72 hours.
            </p>

            <form onSubmit={handleQuickBlock} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">Select Tower & Unit</label>
                <select
                  value={selectedUnit}
                  onChange={(e) => setSelectedUnit(e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-xs text-white focus:outline-none focus:ring-2 focus:ring-teal-400 cursor-pointer"
                >
                  <option value="unit-1" className="text-slate-900">Tower A - Unit 101 (3 BHK, 1,650 sq ft)</option>
                  <option value="unit-2" className="text-slate-900">Tower A - Unit 202 (2 BHK, 1,220 sq ft)</option>
                  <option value="unit-3" className="text-slate-900">Tower A - Unit 401 (3 BHK Luxury Penthouse)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">Token Cheque / Advance Amount (INR)</label>
                <input
                  type="text"
                  value={tokenAmount}
                  onChange={(e) => setTokenAmount(e.target.value)}
                  placeholder="e.g. 1,00,000"
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-xs text-white focus:outline-none focus:ring-2 focus:ring-teal-400 font-mono"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-black rounded-lg text-xs shadow-md transition-all flex items-center justify-center gap-1.5 mt-2"
              >
                <Lock size={14} />
                <span>Lock Unit for 72 Hours</span>
              </button>
            </form>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 text-[10px] text-slate-400 flex items-center justify-between">
            <span>RERA Compliant Escrow Locking</span>
            <Link href="/inventory" className="text-teal-300 hover:underline font-bold">
              View Tower Stacking Plan →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 4. ACCOUNTS & RECEIVABLES COCKPIT (Suresh Nambiar)
// ==========================================
function AccountsDashboard() {
  const { payments } = useTenant();
  const [demandDispatched, setDemandDispatched] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-card border border-estate-border shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-estate-navy">
              Billing, Collections & Escrow Ledger
            </h1>
            <span className="text-xs bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full border border-emerald-200">
              Head of Accounts: Suresh Nambiar
            </span>
          </div>
          <p className="text-xs text-estate-muted mt-0.5">
            Milestone demand notes, RERA escrow audit, payment realizations & stamped digital receipts
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/collections"
            className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
          >
            <Receipt size={14} />
            <span>Record RTGS / Cheque</span>
          </Link>
          <Link
            href="/reports"
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <Download size={14} />
            <span>Escrow 70:30 Statement</span>
          </Link>
        </div>
      </div>

      {/* Financial KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-card border border-estate-border shadow-sm">
          <span className="text-xs font-semibold text-estate-muted uppercase tracking-wider">Total Realized Collections</span>
          <p className="text-2xl font-black text-emerald-700 mt-1">₹18.40 Cr</p>
          <p className="text-xs text-slate-500 font-semibold mt-1">HDFC Escrow A/c: 981120399</p>
        </div>

        <div className="bg-white p-5 rounded-card border border-estate-border shadow-sm">
          <span className="text-xs font-semibold text-estate-muted uppercase tracking-wider">Pending Milestone Dues</span>
          <p className="text-2xl font-black text-estate-navy mt-1">₹4.85 Cr</p>
          <p className="text-xs text-slate-500 font-semibold mt-1">Across 18 Booked Units</p>
        </div>

        <div className="bg-white p-5 rounded-card border border-estate-border shadow-sm">
          <span className="text-xs font-semibold text-estate-muted uppercase tracking-wider">Overdue Dues (&gt;30 Days)</span>
          <p className="text-2xl font-black text-rose-600 mt-1">₹1.42 Cr</p>
          <p className="text-xs text-rose-700 font-semibold mt-1">Penal Interest at 9.5% P.A.</p>
        </div>

        <div className="bg-white p-5 rounded-card border border-estate-border shadow-sm">
          <span className="text-xs font-semibold text-estate-muted uppercase tracking-wider">Realized This Month</span>
          <p className="text-2xl font-black text-estate-navy mt-1">₹3.42 Cr</p>
          <p className="text-xs text-emerald-600 font-semibold mt-1">100% reconciled against bank</p>
        </div>
      </div>

      {/* Accounts Operations Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Milestone Demand Letters Dispatch */}
        <div className="lg:col-span-6 bg-white p-6 rounded-card border border-estate-border shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-estate-navy">Milestone Demand Note Dispatch</h2>
              <p className="text-xs text-estate-muted">Construction stage reached: Eligible for installment billing</p>
            </div>
            <span className="text-xs font-bold bg-blue-50 text-[#3478C9] px-2 py-0.5 rounded border border-blue-200">
              Tower A
            </span>
          </div>

          <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/50 mb-4">
            <h3 className="text-xs font-bold text-[#17324D]">Milestone: 5th Floor Slab Casting Complete</h3>
            <p className="text-xs text-slate-600 mt-1">
              Architect Certificate Ref: <strong>ARC/2026/KA/109</strong>. 8 buyers in Tower A are due for 10% milestone installment.
            </p>
            <div className="mt-3 flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700">Total Billable: <strong>₹1.12 Crores</strong></span>
              {demandDispatched ? (
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle2 size={14} /> Demand Notes Dispatched via Email & WhatsApp
                </span>
              ) : (
                <button
                  onClick={() => setDemandDispatched(true)}
                  className="px-3 py-1.5 bg-[#3478C9] hover:bg-blue-600 text-white rounded text-xs font-bold transition-colors flex items-center gap-1"
                >
                  <Send size={13} />
                  <span>Generate & Dispatch All (8)</span>
                </button>
              )}
            </div>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            <div className="py-2.5 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-800">Unit A-102 (Priya & Amit Mehra)</p>
                <p className="text-[11px] text-slate-400">Demand: ₹14,20,000</p>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Ready</span>
            </div>
            <div className="py-2.5 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-800">Unit A-204 (Capt. Sunil Rawat)</p>
                <p className="text-[11px] text-slate-400">Demand: ₹15,80,000</p>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Ready</span>
            </div>
          </div>
        </div>

        {/* Recent Realizations & Stamped Receipts */}
        <div className="lg:col-span-6 bg-white p-6 rounded-card border border-estate-border shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-estate-navy">Recent Payment Realizations</h2>
              <p className="text-xs text-estate-muted">Official stamped receipts generated with QR verification</p>
            </div>
            <Link href="/collections" className="text-xs font-bold text-emerald-600 hover:underline">
              View All Ledger →
            </Link>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-slate-900">Dr. Arvind Swaminathan (Unit A-304)</h3>
                <p className="text-[11px] text-slate-500">₹15,65,000 via RTGS (HDFC Bank)</p>
                <span className="text-[10px] font-mono text-emerald-700">Receipt #REC-2026-0042</span>
              </div>
              <button
                onClick={() => alert('Official Stamped Digital Receipt with QR Verification Code generated!')}
                className="px-2.5 py-1.5 bg-white border border-slate-300 hover:bg-slate-100 rounded text-xs font-semibold text-slate-700 flex items-center gap-1 shadow-2xs"
              >
                <Printer size={13} />
                <span>Receipt</span>
              </button>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-slate-900">Meera Singhania (Unit B-601)</h3>
                <p className="text-[11px] text-slate-500">₹22,50,000 via Cheque #910284</p>
                <span className="text-[10px] font-mono text-emerald-700">Receipt #REC-2026-0043</span>
              </div>
              <button
                onClick={() => alert('Official Stamped Digital Receipt with QR Verification Code generated!')}
                className="px-2.5 py-1.5 bg-white border border-slate-300 hover:bg-slate-100 rounded text-xs font-semibold text-slate-700 flex items-center gap-1 shadow-2xs"
              >
                <Printer size={13} />
                <span>Receipt</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 5. CHANNEL PARTNER & BROKER PORTAL (Kunal Verma)
// ==========================================
function BrokerDashboard() {
  const [showRegModal, setShowRegModal] = useState(false);
  const [clientForm, setClientForm] = useState({ name: '', mobile: '', budget: '₹1.5 - 2.0 Cr', preferredConfig: '3 BHK' });
  const [myClients, setMyClients] = useState([
    { id: 'c-1', name: 'Alok Tandon', mobile: '+91 98450 12399', stage: 'Token Paid', unit: 'Tower A - 304', commEstimated: '₹4,25,000', lockExpires: '62 Days Left' },
    { id: 'c-2', name: 'Kavita Chawla', mobile: '+91 98221 44550', stage: 'Site Visit Completed', unit: 'Falcon City Ph 2', commEstimated: '₹3,50,000', lockExpires: '78 Days Left' },
    { id: 'c-3', name: 'Naveen Jindal', mobile: '+91 99011 88765', stage: 'Negotiation', unit: 'Sanctuary Villa', commEstimated: '₹6,10,000', lockExpires: '85 Days Left' },
  ]);

  const handleRegisterClient = (e: React.FormEvent) => {
    e.preventDefault();
    const newC = {
      id: `c-${Date.now()}`,
      name: clientForm.name,
      mobile: clientForm.mobile,
      stage: 'Registered (90d Lock)',
      unit: clientForm.preferredConfig,
      commEstimated: 'Calculating...',
      lockExpires: '90 Days Left',
    };
    setMyClients([newC, ...myClients]);
    setShowRegModal(false);
    setClientForm({ name: '', mobile: '', budget: '₹1.5 - 2.0 Cr', preferredConfig: '3 BHK' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-card border border-estate-border shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-estate-navy">
              Channel Partner Portal — Apex Realty
            </h1>
            <span className="text-xs bg-purple-50 text-purple-700 font-bold px-2 py-0.5 rounded-full border border-purple-200">
              Partner: Kunal Verma
            </span>
            <span className="text-[10px] bg-slate-100 text-slate-700 font-mono px-2 py-0.5 rounded font-bold">
              RERA: AG/KA/RERA/2021/000492
            </span>
          </div>
          <p className="text-xs text-estate-muted mt-0.5">
            Client anti-poaching lock registry, live inventory access, quote generator & commission disbursals
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowRegModal(true)}
            className="px-3.5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
          >
            <Plus size={14} />
            <span>Register New Client (90-Day Tag)</span>
          </button>
          <Link
            href="/inventory"
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <Boxes size={14} />
            <span>Available Inventory</span>
          </Link>
        </div>
      </div>

      {/* Broker KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-card border border-estate-border shadow-sm">
          <span className="text-xs font-semibold text-estate-muted uppercase tracking-wider">Total Deals Closed</span>
          <p className="text-2xl font-black text-purple-700 mt-1">14 Units</p>
          <p className="text-xs text-slate-500 font-semibold mt-1">Total Volume: ₹24.50 Cr</p>
        </div>

        <div className="bg-white p-5 rounded-card border border-estate-border shadow-sm">
          <span className="text-xs font-semibold text-estate-muted uppercase tracking-wider">Commission Earned</span>
          <p className="text-2xl font-black text-estate-navy mt-1">₹61.25 Lakhs</p>
          <p className="text-xs text-purple-700 font-semibold mt-1">2.5% Slab Tier-1 Partner</p>
        </div>

        <div className="bg-white p-5 rounded-card border border-estate-border shadow-sm">
          <span className="text-xs font-semibold text-estate-muted uppercase tracking-wider">Commission Disbursed</span>
          <p className="text-2xl font-black text-emerald-700 mt-1">₹52.00 Lakhs</p>
          <p className="text-xs text-slate-500 font-semibold mt-1">TDS 5% deducted u/s 194H</p>
        </div>

        <div className="bg-white p-5 rounded-card border border-estate-border shadow-sm">
          <span className="text-xs font-semibold text-estate-muted uppercase tracking-wider">Pending Disbursal</span>
          <p className="text-2xl font-black text-amber-600 mt-1">₹9.25 Lakhs</p>
          <p className="text-xs text-slate-500 font-semibold mt-1">In clearance cycle</p>
        </div>
      </div>

      {/* Broker Modules Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* My Registered Buyers */}
        <div className="lg:col-span-8 bg-white p-6 rounded-card border border-estate-border shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-estate-navy">My Tagged & Attributed Clients</h2>
              <p className="text-xs text-estate-muted">Protected by developer 90-day non-poaching policy</p>
            </div>
            <button
              onClick={() => setShowRegModal(true)}
              className="text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200 hover:bg-purple-100"
            >
              + Tag Buyer
            </button>
          </div>

          <div className="space-y-3">
            {myClients.map((client) => (
              <div key={client.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-bold text-slate-900">{client.name}</h3>
                    <span className="text-[10px] bg-purple-100 text-purple-800 font-bold px-2 py-0.2 rounded">
                      {client.stage}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{client.mobile} • Interested in: <strong>{client.unit}</strong></p>
                  <p className="text-[10px] text-amber-600 font-semibold mt-1">
                    🛡️ Non-Poach Guarantee: {client.lockExpires}
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block uppercase">Est. Commission</span>
                  <span className="text-sm font-bold text-emerald-700">{client.commEstimated}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Available Inventory & Brochures Shortcut */}
        <div className="lg:col-span-4 bg-gradient-to-br from-[#17324D] to-[#244761] text-white p-6 rounded-card shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-300 block mb-2">
              Developer Collateral Hub
            </span>
            <h3 className="text-base font-bold text-white mb-2">Prestige Falcon City Ph 2</h3>
            <p className="text-xs text-slate-300 mb-4">
              Download approved high-res e-brochures, master plans, tower stacking sheets and floorplans to share with clients.
            </p>

            <div className="space-y-2">
              <button
                onClick={() => alert('Downloading official RERA registered project e-brochure...')}
                className="w-full py-2 px-3 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-bold text-white flex items-center justify-between transition-colors"
              >
                <span>Project E-Brochure (PDF)</span>
                <Download size={13} />
              </button>
              <button
                onClick={() => alert('Downloading tower floorplans (2 BHK & 3 BHK)...')}
                className="w-full py-2 px-3 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-bold text-white flex items-center justify-between transition-colors"
              >
                <span>Tower A Floorplans</span>
                <Download size={13} />
              </button>
              <Link
                href="/cost-sheets"
                className="w-full py-2 px-3 bg-teal-500 hover:bg-teal-400 rounded-lg text-xs font-black text-slate-950 flex items-center justify-between transition-colors"
              >
                <span>Calculate Buyer Quote</span>
                <Sparkles size={13} />
              </Link>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 text-[10px] text-slate-400">
            Developer Commission Payout Cycle: 10th of every month
          </div>
        </div>
      </div>

      {/* Modal: Register Client */}
      {showRegModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-sm font-bold text-slate-900">Register Client with 90-Day Lock</h3>
              <button onClick={() => setShowRegModal(false)} className="text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleRegisterClient} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Client Full Name</label>
                <input
                  type="text"
                  required
                  value={clientForm.name}
                  onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })}
                  placeholder="e.g. Vikramaditya Singhania"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile Number</label>
                <input
                  type="tel"
                  required
                  value={clientForm.mobile}
                  onChange={(e) => setClientForm({ ...clientForm, mobile: e.target.value })}
                  placeholder="+91 98450 12345"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Preferred Configuration</label>
                <select
                  value={clientForm.preferredConfig}
                  onChange={(e) => setClientForm({ ...clientForm, preferredConfig: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900"
                >
                  <option>2 BHK Luxury (1,220 sq ft)</option>
                  <option>3 BHK Premium (1,650 sq ft)</option>
                  <option>4 BHK Penthouse (2,400 sq ft)</option>
                </select>
              </div>

              <div className="p-3 bg-purple-50 rounded-lg border border-purple-200 text-[11px] text-purple-900">
                🛡️ By submitting, this buyer is locked to Apex Realty for 90 days. If this buyer visits the developer directly, deal commission will still be credited to you.
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-bold shadow-md transition-all mt-2"
              >
                Register & Lock Client
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
