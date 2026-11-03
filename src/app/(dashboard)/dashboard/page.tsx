'use client';

import React, { useState } from 'react';
import {
  Users,
  Flame,
  CalendarClock,
  MapPin,
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
import Link from 'next/link';

export default function DashboardPage() {
  const { currentCompany, leads, units, followUps, bookings, payments, currentRole } = useTenant();
  const [dateFilter, setDateFilter] = useState('This Month');
  const [projectFilter, setProjectFilter] = useState('All Projects');

  // Computed KPIs based on live context
  const totalLeads = leads.length;
  const hotLeads = leads.filter((l) => l.priority === 'Hot').length;
  const pendingFollowups = followUps.filter((f) => !f.isCompleted).length;
  const overdueFollowups = followUps.filter((f) => f.isOverdue).length;
  const siteVisitsToday = followUps.filter((f) => f.type === 'Site Visit').length;

  const availableUnits = units.filter((u) => u.status === 'Available').length;
  const blockedUnits = units.filter((u) => u.status === 'Blocked').length;
  const bookedUnits = units.filter((u) => u.status === 'Booked' || u.status === 'Sold').length;

  const totalBookedValue = bookings.reduce((sum, b) => sum + (b.agreedPrice || 0), 0);
  const totalCollected = payments.reduce((sum, p) => sum + (p.amount || 0), 0);
  const totalOutstanding = Math.max(0, totalBookedValue - totalCollected);

  // Chart Data: Lead Acquisition by Source
  const leadSourceData = [
    { name: 'Meta (FB/IG)', value: 34, color: '#3478C9' },
    { name: 'Google Ads', value: 26, color: '#159D91' },
    { name: '99acres/Portals', value: 18, color: '#E9A23B' },
    { name: 'Broker Referral', value: 14, color: '#8965C7' },
    { name: 'Walk-ins/Direct', value: 8, color: '#16A36A' },
  ];

  // Chart Data: Lead Conversion Funnel
  const funnelData = [
    { stage: 'New Enquiries', count: 180 },
    { stage: 'Contacted', count: 142 },
    { stage: 'Qualified', count: 96 },
    { stage: 'Site Visits', count: 54 },
    { stage: 'Negotiation', count: 28 },
    { stage: 'Booked', count: 18 },
  ];

  // Chart Data: Monthly Booking Trends (in Crores)
  const monthlyTrendsData = [
    { month: 'Jun', sales: 6.8, bookings: 5 },
    { month: 'Jul', sales: 8.2, bookings: 7 },
    { month: 'Aug', sales: 11.4, bookings: 9 },
    { month: 'Sep', sales: 9.6, bookings: 8 },
    { month: 'Oct', sales: 14.8, bookings: 12 },
    { month: 'Nov (Mtd)', sales: 4.3, bookings: 3 },
  ];

  // Chart Data: Project-wise Collections
  const collectionData = [
    { name: 'Falcon City Ph 2', collected: 18.4, pending: 4.8 },
    { name: 'Sanctuary Villas', collected: 24.1, pending: 6.2 },
    { name: 'Skyline Wadala', collected: 12.8, pending: 3.1 },
  ];

  // Sales Executive Leaderboard
  const leaderboard = [
    { name: 'Rohan Sharma', role: 'Sr. Property Advisor', deals: 8, volume: '₹12.4 Cr', target: '92%' },
    { name: 'Priya Iyer', role: 'Relationship Manager', deals: 6, volume: '₹9.8 Cr', target: '84%' },
    { name: 'Kunal Verma (Partner)', role: 'Apex Channel Partner', deals: 5, volume: '₹8.2 Cr', target: '78%' },
  ];

  return (
    <div className="space-y-6">
      {/* Page Title & Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-card border border-estate-border shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-estate-navy">
              Executive Dashboard
            </h1>
            <span className="text-xs bg-blue-50 text-estate-blue font-bold px-2 py-0.5 rounded-full border border-blue-200">
              {currentCompany.name}
            </span>
          </div>
          <p className="text-xs text-estate-muted mt-0.5">
            Real-time multi-project sales, inventory availability and collection analytics
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-1.5 bg-estate-bg px-3 py-1.5 rounded-lg border border-estate-border text-xs">
            <Filter size={14} className="text-estate-muted" />
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="bg-transparent text-estate-text font-semibold focus:outline-none cursor-pointer"
            >
              <option>Today</option>
              <option>Yesterday</option>
              <option>This Week</option>
              <option>This Month</option>
              <option>Last Month</option>
              <option>Year to Date</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 bg-estate-bg px-3 py-1.5 rounded-lg border border-estate-border text-xs">
            <Building2 size={14} className="text-estate-muted" />
            <select
              value={projectFilter}
              onChange={(e) => setProjectFilter(e.target.value)}
              className="bg-transparent text-estate-text font-semibold focus:outline-none cursor-pointer"
            >
              <option>All Projects</option>
              <option>Prestige Falcon City Ph 2</option>
              <option>Prestige Sanctuary Villas</option>
            </select>
          </div>

          <Link
            href="/cost-sheets"
            className="px-3.5 py-1.5 bg-estate-blue hover:bg-blue-600 text-white rounded-lg text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5"
          >
            <Sparkles size={14} />
            <span>Generate Cost Sheet</span>
          </Link>
        </div>
      </div>

      {/* 4-Column KPI Metric Cards (Section 2.4 & Module 1) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Leads */}
        <div className="bg-white p-4 rounded-card border border-estate-border shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-estate-muted uppercase tracking-wider">Total Leads</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-estate-blue flex items-center justify-center">
              <Users size={16} />
            </div>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-black text-estate-navy">{totalLeads + 140}</span>
            <span className="text-xs font-bold text-estate-green flex items-center gap-0.5">
              <ArrowUpRight size={14} /> +18.4%
            </span>
          </div>
          <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-estate-muted">
            <span><strong className="text-rose-600 font-bold">{hotLeads + 12}</strong> Hot Leads</span>
            <span><strong className="text-slate-800">14</strong> Added Today</span>
          </div>
        </div>

        {/* Card 2: Follow-ups */}
        <div className="bg-white p-4 rounded-card border border-estate-border shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-estate-muted uppercase tracking-wider">Follow-ups & Visits</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-estate-amber flex items-center justify-center">
              <CalendarClock size={16} />
            </div>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-black text-estate-navy">{pendingFollowups}</span>
            {overdueFollowups > 0 ? (
              <span className="text-[11px] font-bold text-estate-red bg-rose-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                <AlertTriangle size={12} /> {overdueFollowups} Overdue
              </span>
            ) : (
              <span className="text-xs text-estate-green font-bold">On track</span>
            )}
          </div>
          <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-estate-muted">
            <span><strong className="text-estate-teal">{siteVisitsToday + 4}</strong> Visits Today</span>
            <Link href="/follow-ups" className="text-estate-blue hover:underline font-medium">View Tasks →</Link>
          </div>
        </div>

        {/* Card 3: Inventory Availability */}
        <div className="bg-white p-4 rounded-card border border-estate-border shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-estate-muted uppercase tracking-wider">Unit Inventory</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-estate-green flex items-center justify-center">
              <Boxes size={16} />
            </div>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-black text-estate-green">{availableUnits + 32} Available</span>
            <span className="text-xs text-estate-muted font-medium">96 Total</span>
          </div>
          <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-estate-muted">
            <span><strong className="text-estate-amber">{blockedUnits}</strong> Blocked</span>
            <span><strong className="text-estate-blue">{bookedUnits + 45}</strong> Booked / Sold</span>
          </div>
        </div>

        {/* Card 4: Monthly Sales & Collections */}
        <div className="bg-white p-4 rounded-card border border-estate-border shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-estate-muted uppercase tracking-wider">Booked Value</span>
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-estate-teal flex items-center justify-center">
              <TrendingUp size={16} />
            </div>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-black text-estate-navy">
              {formatINR(totalBookedValue + 285000000, true)}
            </span>
            <span className="text-xs font-bold text-estate-green flex items-center gap-0.5">
              <ArrowUpRight size={14} /> +24% MTD
            </span>
          </div>
          <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-estate-muted">
            <span>Collected: <strong className="text-estate-green">{formatINR(totalCollected + 215000000, true)}</strong></span>
            <span>Due: <strong className="text-estate-amber">{formatINR(totalOutstanding + 70000000, true)}</strong></span>
          </div>
        </div>
      </div>

      {/* Row 2: Charts & Visual Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart 1: Monthly Booking Value Trend (2 cols) */}
        <div className="lg:col-span-2 bg-white p-5 rounded-card border border-estate-border shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-estate-navy">Monthly Sales & Bookings Trend</h2>
              <p className="text-[11px] text-estate-muted">Gross contracted booking value (₹ Crores) vs unit count</p>
            </div>
            <span className="text-[11px] bg-slate-100 px-2 py-0.5 rounded text-slate-600 font-medium">FY 2026-27</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyTrendsData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3478C9" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#3478C9" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E3E8EF" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#718096' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#718096' }} axisLine={false} tickLine={false} unit=" Cr" />
                <Tooltip
                  formatter={(value: any) => [`₹${value} Crores`, 'Contracted Sales']}
                  contentStyle={{ backgroundColor: '#17324D', color: '#fff', borderRadius: '8px', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="sales" stroke="#3478C9" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Lead Acquisition Source (1 col) */}
        <div className="bg-white p-5 rounded-card border border-estate-border shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-sm font-bold text-estate-navy">Lead Sources</h2>
              <p className="text-[11px] text-estate-muted">Channel acquisition breakdown</p>
            </div>
          </div>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={leadSourceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={75}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {leadSourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: any) => [`${value}%`, 'Share']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-100 text-[11px]">
            {leadSourceData.map((s) => (
              <div key={s.name} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: s.color }}></span>
                <span className="text-slate-600 truncate">{s.name}: <strong>{s.value}%</strong></span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 3: Conversion Funnel & Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lead Funnel (2 cols) */}
        <div className="lg:col-span-2 bg-white p-5 rounded-card border border-estate-border shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-estate-navy">Sales Conversion Funnel</h2>
              <p className="text-[11px] text-estate-muted">Pipeline progression from incoming inquiry to confirmed booking</p>
            </div>
            <Link href="/leads/pipeline" className="text-xs text-estate-blue font-semibold hover:underline">
              Open Kanban Pipeline →
            </Link>
          </div>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={funnelData} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E3E8EF" />
                <XAxis type="number" tick={{ fontSize: 11, fill: '#718096' }} axisLine={false} tickLine={false} />
                <YAxis dataKey="stage" type="category" tick={{ fontSize: 11, fill: '#263445', fontWeight: 600 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#17324D', color: '#fff', borderRadius: '8px', fontSize: '12px' }} />
                <Bar dataKey="count" fill="#159D91" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sales Executive Leaderboard (1 col) */}
        <div className="bg-white p-5 rounded-card border border-estate-border shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-estate-navy">Sales Leaderboard</h2>
              <span className="text-[10px] text-estate-green font-bold bg-emerald-50 px-2 py-0.5 rounded">
                This Month
              </span>
            </div>
            <div className="space-y-3.5">
              {leaderboard.map((item, idx) => (
                <div key={item.name} className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-full bg-[#17324D] text-white flex items-center justify-center font-bold text-[11px]">
                      {idx + 1}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">{item.name}</p>
                      <p className="text-[10px] text-slate-500">{item.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-extrabold text-[#3478C9]">{item.volume}</p>
                    <p className="text-[10px] text-emerald-600 font-semibold">{item.deals} Bookings</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Overall Team Target: <strong>88% Achieved</strong></span>
            <Link href="/reports" className="text-estate-blue hover:underline font-semibold">Full BI Report →</Link>
          </div>
        </div>
      </div>

      {/* Row 4: Recent Activities Feed & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Leads */}
        <div className="bg-white p-5 rounded-card border border-estate-border shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-estate-navy">Recent Inbound Leads</h2>
            <Link href="/leads" className="text-xs text-estate-blue font-semibold hover:underline">
              View All ({leads.length}) →
            </Link>
          </div>
          <div className="divide-y divide-slate-100">
            {leads.slice(0, 4).map((lead) => {
              const priorityStyle = getLeadPriorityStyle(lead.priority);
              return (
                <div key={lead.id} className="py-2.5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-8 rounded-full ${priorityStyle.badge}`}></div>
                    <div>
                      <Link href={`/leads/${lead.id}`} className="font-bold text-slate-900 hover:text-estate-blue">
                        {lead.fullName}
                      </Link>
                      <p className="text-[11px] text-slate-500">
                        {lead.configuration} • Budget ₹{lead.budgetMin}-{lead.budgetMax}L • {lead.source}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {lead.status}
                    </span>
                    <span className="block text-[10px] text-slate-400 mt-0.5">Score: {lead.aiScore}/100</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Bookings & Collections */}
        <div className="bg-white p-5 rounded-card border border-estate-border shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-estate-navy">Latest Bookings & Payments</h2>
            <Link href="/bookings" className="text-xs text-estate-blue font-semibold hover:underline">
              View All ({bookings.length}) →
            </Link>
          </div>
          <div className="divide-y divide-slate-100">
            {bookings.map((b) => (
              <div key={b.id} className="py-2.5 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-slate-900">{b.customerName}</p>
                  <p className="text-[11px] text-slate-500">
                    {b.unitNumber} • {b.projectName}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-extrabold text-estate-navy">{formatINR(b.agreedPrice, true)}</p>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    {b.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

