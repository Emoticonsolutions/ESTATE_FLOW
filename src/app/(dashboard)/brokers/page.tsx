'use client';

import React, { useState } from 'react';
import {
  Handshake,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Building,
  Phone,
  Mail,
  DollarSign,
  TrendingUp,
  X,
} from 'lucide-react';
import { useTenant } from '@/lib/tenantContext';
import { formatINR } from '@/lib/utils';
import { INITIAL_BROKERS, INITIAL_BROKER_DEALS } from '@/lib/mockData';
import { Broker, BrokerDeal } from '@/types';

export default function BrokersPage() {
  const { currentCompany, hasPermission, currentRole, currentUser } = useTenant();
  const [activeTab, setActiveTab] = useState<'brokers' | 'deals' | 'commissions'>('brokers');
  const [brokersList, setBrokersList] = useState<Broker[]>(INITIAL_BROKERS);
  const [dealsList, setDealsList] = useState<BrokerDeal[]>(INITIAL_BROKER_DEALS);
  const [showAddModal, setShowAddModal] = useState(false);

  // New Broker Form
  const [brokerForm, setBrokerForm] = useState({
    name: '',
    agencyName: '',
    reraRegistration: 'AG/KA/RERA/2026/001192',
    mobile: '+91 ',
    email: '',
    city: 'Bangalore',
    commissionPercentage: 2.5,
  });

  const handleRegisterBroker = (e: React.FormEvent) => {
    e.preventDefault();
    const newB: Broker = {
      ...brokerForm,
      id: `broker-${Date.now()}`,
      companyId: currentCompany.id,
      totalDeals: 0,
      totalVolume: 0,
      commissionEarned: 0,
      commissionPaid: 0,
      commissionPending: 0,
      status: 'Active',
    };
    setBrokersList([newB, ...brokersList]);
    setShowAddModal(false);
  };

  const handleApproveCommission = (dealId: string) => {
    setDealsList((prev) =>
      prev.map((d) => (d.id === dealId ? { ...d, payoutStatus: 'Approved' } : d))
    );
  };

  // Dedicated Channel Partner View
  if (currentRole === 'BROKER') {
    const myDeals = dealsList.filter((d) => d.brokerId === 'broker-1');
    const myTotalEarned = myDeals.reduce((sum, d) => sum + d.commissionAmount, 0) || 6125000;
    const myPending = 925000;
    const myDisbursed = myTotalEarned - myPending;

    return (
      <div className="space-y-6">
        {/* Broker Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-card border border-estate-border shadow-sm">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black text-estate-navy">Commission Ledger & Payout Statement</h1>
              <span className="text-xs bg-purple-50 text-purple-700 font-bold px-2 py-0.5 rounded-full border border-purple-200">
                Apex Channel Partners • Tier-1 Partner
              </span>
            </div>
            <p className="text-xs text-estate-muted mt-0.5">
              RERA Reg: <strong>AG/KA/RERA/2021/000492</strong> • Managing Partner: <strong>Kunal Verma</strong> • Slab: <strong>2.5%</strong>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => alert('Tax Invoice #INV-APEX-2026-09 with 5% TDS Form 16A downloaded!')}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold transition-all"
            >
              Download Tax Invoice (PDF)
            </button>
            <button
              onClick={() => alert('Form 16A TDS Certificate (Q2 FY 2026) downloaded!')}
              className="px-3.5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-bold transition-all shadow-sm"
            >
              Download TDS Certificate
            </button>
          </div>
        </div>

        {/* Broker Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-card border border-estate-border shadow-sm">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Total Commission Earned</span>
            <p className="text-2xl font-black text-estate-navy mt-1">₹61.25 Lakhs</p>
            <span className="text-[11px] text-purple-700 font-semibold mt-1 block">Across 14 booked units (₹24.5 Cr volume)</span>
          </div>

          <div className="bg-white p-5 rounded-card border border-estate-border shadow-sm">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Disbursed via RTGS</span>
            <p className="text-2xl font-black text-emerald-600 mt-1">₹52.00 Lakhs</p>
            <span className="text-[11px] text-emerald-700 font-semibold mt-1 block">Credited to HDFC Bank A/c ending 8812</span>
          </div>

          <div className="bg-white p-5 rounded-card border border-estate-border shadow-sm">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Pending Clearance</span>
            <p className="text-2xl font-black text-amber-600 mt-1">₹9.25 Lakhs</p>
            <span className="text-[11px] text-amber-700 font-semibold mt-1 block">Scheduled for 10th of this month</span>
          </div>
        </div>

        {/* My Closed Deals Table */}
        <div className="bg-white rounded-card border border-estate-border shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-sm font-bold text-estate-navy">Deals Attributed to Apex Channel Partners</h2>
            <span className="text-xs font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
              {myDeals.length} Deals Listed
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-600 font-semibold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="p-3.5">Deal ID</th>
                  <th className="p-3.5">Client Name</th>
                  <th className="p-3.5">Unit Allocated</th>
                  <th className="p-3.5">Deal Value</th>
                  <th className="p-3.5">Commission (2.5%)</th>
                  <th className="p-3.5">Payout Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {myDeals.map((deal) => (
                  <tr key={deal.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 font-mono text-slate-500 font-bold">{deal.id}</td>
                    <td className="p-3.5">
                      <p className="font-bold text-slate-900">{deal.clientName}</p>
                      <p className="text-[11px] text-slate-400">{deal.clientMobile}</p>
                    </td>
                    <td className="p-3.5 font-semibold text-slate-700">{deal.unitNumber}</td>
                    <td className="p-3.5 font-bold text-slate-900">{formatINR(deal.dealValue)}</td>
                    <td className="p-3.5 font-bold text-emerald-700">{formatINR(deal.commissionAmount)}</td>
                    <td className="p-3.5">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        deal.payoutStatus === 'Approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {deal.payoutStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-card border border-estate-border shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black text-estate-navy">Channel Partner & Broker Network</h1>
            <span className="text-xs bg-purple-50 text-purple-700 font-bold px-2 py-0.5 rounded-full border border-purple-200">
              RERA Authorized Partners
            </span>
          </div>
          <p className="text-xs text-estate-muted mt-0.5">
            Manage channel partner registries, deal attribution, commission slabs, and payout approvals
          </p>
        </div>

        {hasPermission('leads', 'create') && (
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-estate-blue hover:bg-blue-600 text-white rounded-lg text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
          >
            <Plus size={15} />
            <span>Register Broker</span>
          </button>
        )}
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-card border border-estate-border shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Channel Partner Volume</span>
          <p className="text-2xl font-black text-estate-navy mt-1">₹37.3 Crores</p>
          <span className="text-[11px] text-slate-500 mt-1 block">22 attributed client bookings</span>
        </div>

        <div className="bg-white p-4 rounded-card border border-estate-border shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Commission Disbursed</span>
          <p className="text-2xl font-black text-emerald-600 mt-1">₹73.0 Lakhs</p>
          <span className="text-[11px] text-emerald-700 font-semibold mt-1 block">Average slab: 2.2%</span>
        </div>

        <div className="bg-white p-4 rounded-card border border-estate-border shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Pending Payout Approvals</span>
          <p className="text-2xl font-black text-amber-600 mt-1">₹13.85 Lakhs</p>
          <span className="text-[11px] text-amber-700 font-semibold mt-1 block">Awaiting agreement stamping</span>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="flex items-center gap-2 border-b border-estate-border bg-white px-4 rounded-t-card text-xs font-bold">
        {[
          { id: 'brokers', label: 'Authorized Broker Directory' },
          { id: 'deals', label: 'Attributed Deal Pipeline' },
          { id: 'commissions', label: 'Commission Payout Approvals' },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`py-3.5 px-4 border-b-2 transition-all ${
              activeTab === t.id
                ? 'border-estate-blue text-estate-blue'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'brokers' && (
        <div className="bg-white rounded-b-card border border-estate-border shadow-sm overflow-hidden text-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-estate-border text-slate-500 font-bold uppercase text-[11px]">
                <tr>
                  <th className="py-3 px-4">Agency & Broker</th>
                  <th className="py-3 px-4">RERA Number</th>
                  <th className="py-3 px-4">Contact Details</th>
                  <th className="py-3 px-4">Commission Slab</th>
                  <th className="py-3 px-4">Closed Volume</th>
                  <th className="py-3 px-4">Commission Paid</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-estate-border text-slate-700">
                {brokersList.map((b) => (
                  <tr key={b.id} className="hover:bg-blue-50/40 h-[52px]">
                    <td className="py-3 px-4">
                      <p className="font-bold text-slate-900">{b.agencyName}</p>
                      <span className="text-[11px] text-slate-400 font-medium">Rep: {b.name}</span>
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px] font-semibold text-estate-navy">
                      {b.reraRegistration}
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-mono text-slate-800">{b.mobile}</p>
                      <span className="text-[10px] text-slate-400">{b.email}</span>
                    </td>
                    <td className="py-3 px-4 font-bold text-estate-blue">{b.commissionPercentage}%</td>
                    <td className="py-3 px-4 font-extrabold text-estate-navy">₹{b.totalVolume} Cr</td>
                    <td className="py-3 px-4 font-bold text-emerald-700">{formatINR(b.commissionPaid)}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'deals' && (
        <div className="bg-white rounded-b-card border border-estate-border shadow-sm p-5 text-xs space-y-3">
          {dealsList.map((deal) => (
            <div
              key={deal.id}
              className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-slate-900">{deal.clientName}</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                    Stage: {deal.stage}
                  </span>
                </div>
                <p className="text-slate-500 text-xs mt-0.5">
                  Attributed Partner: <strong>{deal.brokerName}</strong> • Phone: {deal.clientMobile}
                </p>
                <p className="font-mono text-estate-navy text-xs font-bold mt-1">
                  Deal Value: {formatINR(deal.dealValue)} • Computed Broker Fee: {formatINR(deal.commissionAmount)}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-1 rounded text-[11px] font-bold ${
                  deal.payoutStatus === 'Approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  Payout: {deal.payoutStatus}
                </span>
                {deal.payoutStatus === 'Pending' && (
                  <button
                    onClick={() => handleApproveCommission(deal.id)}
                    className="px-3 py-1 bg-estate-blue text-white rounded text-xs font-bold hover:bg-blue-600"
                  >
                    Approve Payout
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Register Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-estate-border">
            <div className="flex items-center justify-between pb-3 border-b border-estate-border">
              <h3 className="font-black text-base text-estate-navy">Onboard Channel Partner</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleRegisterBroker} className="mt-4 space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Agency Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Knight Frank Partner / PropTiger"
                  value={brokerForm.agencyName}
                  onChange={(e) => setBrokerForm({ ...brokerForm, agencyName: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-input"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Contact Person</label>
                  <input
                    type="text"
                    placeholder="Aditya M"
                    value={brokerForm.name}
                    onChange={(e) => setBrokerForm({ ...brokerForm, name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-input"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Commission Slab (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={brokerForm.commissionPercentage}
                    onChange={(e) => setBrokerForm({ ...brokerForm, commissionPercentage: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-input font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">RERA Registration Number *</label>
                <input
                  type="text"
                  value={brokerForm.reraRegistration}
                  onChange={(e) => setBrokerForm({ ...brokerForm, reraRegistration: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-input font-mono"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Mobile Phone *</label>
                <input
                  type="tel"
                  placeholder="+91 98000 00000"
                  value={brokerForm.mobile}
                  onChange={(e) => setBrokerForm({ ...brokerForm, mobile: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-input font-mono"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3.5 py-2 border border-slate-200 text-slate-700 rounded-lg font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-estate-blue text-white rounded-lg font-bold shadow-md hover:bg-blue-600"
                >
                  Register Partner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

