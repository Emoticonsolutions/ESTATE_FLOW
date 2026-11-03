'use client';

import React, { useState } from 'react';
import {
  BarChart3,
  Download,
  Calendar,
  Filter,
  FileSpreadsheet,
  Printer,
  TrendingUp,
  Boxes,
  Users,
  DollarSign,
  Building,
} from 'lucide-react';
import { useTenant } from '@/lib/tenantContext';
import { formatINR, formatDate } from '@/lib/utils';

export default function ReportsPage() {
  const { currentCompany, leads, units, bookings, payments, brokers } = useTenant();
  const [reportType, setReportType] = useState<'sales' | 'leads' | 'inventory' | 'finance' | 'broker'>('sales');

  const downloadReport = (format: 'csv' | 'excel' | 'pdf') => {
    alert(`Generating and downloading ${reportType.toUpperCase()} report in ${format.toUpperCase()} format for ${currentCompany.name}...`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-card border border-estate-border shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black text-estate-navy">Reports & Business Intelligence</h1>
            <span className="text-xs bg-blue-50 text-estate-blue font-bold px-2 py-0.5 rounded-full border border-blue-200">
              Audit-Ready Exports
            </span>
          </div>
          <p className="text-xs text-estate-muted mt-0.5">
            Cross-project financial statements, lead conversion metrics, and inventory absorption velocity
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => downloadReport('csv')}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5"
          >
            <Download size={14} />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => downloadReport('excel')}
            className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-lg text-xs font-semibold flex items-center gap-1.5"
          >
            <FileSpreadsheet size={14} />
            <span>Export Excel</span>
          </button>
          <button
            onClick={() => window.print()}
            className="px-3.5 py-1.5 bg-estate-navy text-white hover:bg-[#244761] rounded-lg text-xs font-bold flex items-center gap-1.5 shadow"
          >
            <Printer size={14} />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {/* Report Selector Pills */}
      <div className="flex items-center gap-2 border-b border-estate-border bg-white px-4 rounded-t-card text-xs font-bold">
        {[
          { id: 'sales', label: 'Sales & Revenue Report' },
          { id: 'leads', label: 'Lead Acquisition & Conversion' },
          { id: 'inventory', label: 'Inventory Ageing & Absorption' },
          { id: 'finance', label: 'Escrow Collection & Aging' },
          { id: 'broker', label: 'Broker Payout Statements' },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setReportType(t.id as any)}
            className={`py-3.5 px-4 border-b-2 transition-all ${
              reportType === t.id
                ? 'border-estate-blue text-estate-blue'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Report Content */}
      <div className="bg-white rounded-b-card border border-estate-border shadow-sm p-6 text-xs">
        {reportType === 'sales' && (
          <div className="space-y-4">
            <h3 className="font-bold text-sm text-estate-navy">Project-Wise Sales & Booking Velocity (FY 2026-27)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-estate-border text-slate-500 font-bold uppercase text-[11px]">
                  <tr>
                    <th className="py-2.5 px-3">Project Name</th>
                    <th className="py-2.5 px-3">Units Booked</th>
                    <th className="py-2.5 px-3">Gross Contracted Value</th>
                    <th className="py-2.5 px-3">Average Rate / Sq Ft</th>
                    <th className="py-2.5 px-3">Cancellation Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr>
                    <td className="py-3 px-3 font-bold text-slate-900">Prestige Falcon City Ph 2</td>
                    <td className="py-3 px-3">28 Units</td>
                    <td className="py-3 px-3 font-mono font-bold text-estate-navy">₹38,45,00,000</td>
                    <td className="py-3 px-3 font-mono">₹7,850</td>
                    <td className="py-3 px-3 text-emerald-700 font-semibold">0.0%</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-bold text-slate-900">Prestige Sanctuary Villas</td>
                    <td className="py-3 px-3">10 Villas</td>
                    <td className="py-3 px-3 font-mono font-bold text-estate-navy">₹34,80,00,000</td>
                    <td className="py-3 px-3 font-mono">₹14,500</td>
                    <td className="py-3 px-3 text-emerald-700 font-semibold">1.2%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {reportType === 'leads' && (
          <div className="space-y-4">
            <h3 className="font-bold text-sm text-estate-navy">Marketing Channel Return & Cost-Per-Acquisition</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Meta Ads (FB/IG)</span>
                <p className="text-xl font-bold text-estate-navy mt-1">142 Inquiries</p>
                <span className="text-[11px] text-emerald-700 font-semibold">14.2% Booked</span>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Google High-Intent Search</span>
                <p className="text-xl font-bold text-estate-navy mt-1">98 Inquiries</p>
                <span className="text-[11px] text-emerald-700 font-semibold">19.5% Booked</span>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Channel Partner Referrals</span>
                <p className="text-xl font-bold text-estate-navy mt-1">45 Inquiries</p>
                <span className="text-[11px] text-emerald-700 font-semibold">32.0% Booked</span>
              </div>
            </div>
          </div>
        )}

        {reportType === 'inventory' && (
          <div className="space-y-4">
            <h3 className="font-bold text-sm text-estate-navy">Tower Inventory Ageing Analysis</h3>
            <p className="text-slate-600">Average days on market for 3 BHK units: 42 days. Premium higher floors (Floors 4-6) are absorbing 2.4x faster than lower floors.</p>
          </div>
        )}

        {reportType === 'finance' && (
          <div className="space-y-4">
            <h3 className="font-bold text-sm text-estate-navy">RERA Escrow Account Status</h3>
            <p className="text-slate-600">Total collections credited to HDFC Escrow: ₹21,50,00,000 (100% verified against statutory construction drawdowns).</p>
          </div>
        )}

        {reportType === 'broker' && (
          <div className="space-y-4">
            <h3 className="font-bold text-sm text-estate-navy">Partner Commission Reconciliation</h3>
            <p className="text-slate-600">₹73,00,000 disbursed across 22 accredited channel partner deals. ₹13,85,000 pending manager sign-off.</p>
          </div>
        )}
      </div>
    </div>
  );
}

