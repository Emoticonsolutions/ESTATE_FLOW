'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldAlert,
  Building,
  Users,
  CreditCard,
  Layers,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Sliders,
  Power,
  Plus,
} from 'lucide-react';
import { useTenant } from '@/lib/tenantContext';
import { INITIAL_COMPANIES } from '@/lib/mockData';
import { Company } from '@/types';

export default function SuperAdminPage() {
  const { allCompanies, setCompanyId, setRole } = useTenant();
  const [companies, setCompanies] = useState<Company[]>(INITIAL_COMPANIES);
  const [activeTab, setActiveTab] = useState<'companies' | 'plans' | 'audit'>('companies');

  const toggleStatus = (id: string) => {
    setCompanies((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, status: c.status === 'Active' ? 'Suspended' : 'Active' } : c
      )
    );
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-800/80 backdrop-blur p-5 rounded-2xl border border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-600 flex items-center justify-center font-black text-white shadow-lg">
              <ShieldAlert size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black text-white">EstateFlow SaaS Super Admin Portal</h1>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Root Platform Authority
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Multi-tenant isolation management, subscription tier quotas, and cross-company audit logs
              </p>
            </div>
          </div>

          <Link
            href="/dashboard"
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-2"
          >
            <span>Exit to Company Dashboard</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Global SaaS Platform KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Registered Builders</span>
            <p className="text-2xl font-black text-white mt-1">{companies.length}</p>
            <span className="text-[10px] text-emerald-400 font-bold mt-1 block">100% Active Tenants</span>
          </div>
          <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total SaaS ARR</span>
            <p className="text-2xl font-black text-emerald-400 mt-1">₹42.8 Lakhs</p>
            <span className="text-[10px] text-slate-400 mt-1 block">Annual Contract Value</span>
          </div>
          <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Active Users</span>
            <p className="text-2xl font-black text-white mt-1">75 Accounts</p>
            <span className="text-[10px] text-slate-400 mt-1 block">Across 3 Tenants</span>
          </div>
          <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">System Health</span>
            <p className="text-2xl font-black text-teal-400 mt-1">99.98%</p>
            <span className="text-[10px] text-slate-400 mt-1 block">Cloud API Latency 42ms</span>
          </div>
        </div>

        {/* Tab Bar */}
        <div className="flex items-center gap-2 border-b border-slate-700 text-xs font-bold">
          {[
            { id: 'companies', label: 'Registered Tenant Companies' },
            { id: 'plans', label: 'Subscription Tiers & Quotas' },
            { id: 'audit', label: 'Global Audit Trail' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`py-3 px-4 border-b-2 transition-all ${
                activeTab === t.id
                  ? 'border-amber-400 text-amber-300'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Companies Table */}
        {activeTab === 'companies' && (
          <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden text-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-800/80 border-b border-slate-700 text-slate-400 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Company Name & Code</th>
                    <th className="py-3 px-4">Headquarters</th>
                    <th className="py-3 px-4">Active Plan</th>
                    <th className="py-3 px-4">User Quota</th>
                    <th className="py-3 px-4">Project Quota</th>
                    <th className="py-3 px-4">Tenant Status</th>
                    <th className="py-3 px-4 text-right">Super Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/60 text-slate-300">
                  {companies.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-700/40 h-[52px]">
                      <td className="py-3 px-4">
                        <p className="font-bold text-white">{c.name}</p>
                        <span className="text-[10px] font-mono text-amber-400 font-bold">{c.code}</span>
                      </td>
                      <td className="py-3 px-4">{c.city}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                          {c.plan}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono">{c.userLimit} Seats</td>
                      <td className="py-3 px-4 font-mono">{c.projectLimit} Projects</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            c.status === 'Active'
                              ? 'bg-emerald-500/20 text-emerald-300'
                              : 'bg-rose-500/20 text-rose-300'
                          }`}
                        >
                          {c.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => {
                              setCompanyId(c.id);
                              alert(`Active tenant set to ${c.name}. Switching to dashboard.`);
                            }}
                            className="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded text-[10px] font-bold"
                          >
                            Impersonate Tenant
                          </button>
                          <button
                            onClick={() => toggleStatus(c.id)}
                            className={`p-1.5 rounded text-white ${
                              c.status === 'Active'
                                ? 'bg-rose-600/80 hover:bg-rose-600'
                                : 'bg-emerald-600/80 hover:bg-emerald-600'
                            }`}
                            title="Toggle Status"
                          >
                            <Power size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Subscription Plans Quota */}
        {activeTab === 'plans' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700 space-y-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Starter Tier</span>
              <p className="text-xl font-bold text-white">₹14,999 / mo</p>
              <p className="text-slate-400 text-xs">5 Users • 2 Active Projects • Standard Reports</p>
            </div>
            <div className="bg-slate-800 p-5 rounded-2xl border border-amber-500/40 ring-1 ring-amber-500/30 space-y-3">
              <span className="text-[10px] font-bold text-amber-400 uppercase">Professional Tier</span>
              <p className="text-xl font-bold text-white">₹34,999 / mo</p>
              <p className="text-slate-400 text-xs">20 Users • 10 Active Projects • WhatsApp API • Inventory Grid</p>
            </div>
            <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700 space-y-3">
              <span className="text-[10px] font-bold text-purple-400 uppercase">Enterprise Tier</span>
              <p className="text-xl font-bold text-white">Custom Annual</p>
              <p className="text-slate-400 text-xs">Unlimited Users & Projects • AI Assistant • Dedicated SLA</p>
            </div>
          </div>
        )}

        {/* Tab 3: Global Audit Logs */}
        {activeTab === 'audit' && (
          <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700 text-xs space-y-3">
            <div className="p-3 bg-slate-900/60 rounded-xl font-mono text-[11px] text-slate-300 flex justify-between">
              <span>[2026-11-03 07:20:14] Tenant 'PRESTIGE': User 'Rohan Sharma' generated Cost Sheet CS-084</span>
              <span className="text-slate-500">IP: 103.21.144.12</span>
            </div>
            <div className="p-3 bg-slate-900/60 rounded-xl font-mono text-[11px] text-slate-300 flex justify-between">
              <span>[2026-11-03 06:45:00] Tenant 'PRESTIGE': Manager 'Ananya Deshmukh' approved Booking BK-089</span>
              <span className="text-slate-500">IP: 103.21.144.18</span>
            </div>
            <div className="p-3 bg-slate-900/60 rounded-xl font-mono text-[11px] text-slate-300 flex justify-between">
              <span>[2026-11-02 18:30:11] Tenant 'GODREJ': Automated Meta Lead Ads Webhook Synced 4 Enquiries</span>
              <span className="text-slate-500">IP: 31.13.127.1</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

