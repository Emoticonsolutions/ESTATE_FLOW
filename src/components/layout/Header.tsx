'use client';

import React, { useState } from 'react';
import {
  Search,
  Bell,
  Building,
  UserCheck,
  ChevronDown,
  PlusCircle,
  Sparkles,
  LogOut,
  Building2,
  Handshake,
  Receipt,
  Users,
} from 'lucide-react';
import { useTenant } from '@/lib/tenantContext';
import { UserRole } from '@/types';
import Link from 'next/link';

export function Header() {
  const { currentCompany, allCompanies, setCompanyId, currentRole, setRole, currentUser } = useTenant();
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showCompanyMenu, setShowCompanyMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Operational Stakeholder Profiles
  const roles: { role: UserRole; label: string; desc: string; persona: string }[] = [
    {
      role: 'COMPANY_ADMIN',
      label: 'Builder & Company Owner',
      desc: 'Master projects, pricing rates, team quotas & company health',
      persona: 'Vikramaditya Rao',
    },
    {
      role: 'SALES_MANAGER',
      label: 'Sales Operations Manager',
      desc: 'Lead assignment round-robin, discount approvals, team quota review',
      persona: 'Ananya Deshmukh',
    },
    {
      role: 'SALES_EXECUTIVE',
      label: 'Sales Executive / Field Advisor',
      desc: 'Daily calling queue, site visits, 72h unit blocking, WhatsApp quotes',
      persona: 'Rohan Sharma',
    },
    {
      role: 'ACCOUNTS_MANAGER',
      label: 'Accounts & Billing Manager',
      desc: 'Demand letters, RTGS/Cheque realization, escrow reconciliations & stamped receipts',
      persona: 'Suresh Nambiar',
    },
    {
      role: 'BROKER',
      label: 'Channel Partner & Broker',
      desc: 'Register client inquiries (90d lock), live available inventory, commission claims',
      persona: 'Kunal Verma (Apex Realty)',
    },
  ];

  const roleMeta: Record<UserRole, { badge: string; color: string; bg: string }> = {
    COMPANY_ADMIN: { badge: 'Builder Admin', color: 'text-blue-700', bg: 'bg-blue-50 border-blue-200' },
    SALES_MANAGER: { badge: 'Sales Manager', color: 'text-indigo-700', bg: 'bg-indigo-50 border-indigo-200' },
    SALES_EXECUTIVE: { badge: 'Sales Executive', color: 'text-teal-700', bg: 'bg-teal-50 border-teal-200' },
    ACCOUNTS_MANAGER: { badge: 'Accounts / Billing', color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200' },
    BROKER: { badge: 'Channel Partner', color: 'text-purple-700', bg: 'bg-purple-50 border-purple-200' },
    SUPER_ADMIN: { badge: 'Super Admin', color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200' },
  };

  const activeMeta = roleMeta[currentRole] || roleMeta.COMPANY_ADMIN;

  return (
    <header className="h-16 bg-white border-b border-[#E3E8EF] flex items-center justify-between px-4 sm:px-6 z-20 shadow-xs">
      {/* Left side: Search & Tenant Switcher */}
      <div className="flex items-center space-x-3 sm:space-x-4">
        {/* Company / Builder Switcher (Or Channel Partner affiliation) */}
        <div className="relative">
          {currentRole === 'BROKER' ? (
            <div className="h-9 flex items-center gap-2 px-3 bg-purple-50/70 border border-purple-200 rounded-lg text-xs font-semibold text-purple-900 shadow-2xs">
              <Handshake size={14} className="text-purple-600 shrink-0" />
              <span className="truncate">Apex Realty • Partnered with {currentCompany?.name}</span>
            </div>
          ) : (
            <>
              <button
                onClick={() => {
                  setShowCompanyMenu(!showCompanyMenu);
                  setShowRoleMenu(false);
                }}
                className="h-9 flex items-center gap-2 px-3 bg-[#F5F7FA] border border-[#E3E8EF] rounded-lg text-xs font-semibold text-[#17324D] hover:bg-slate-100 transition-colors shadow-2xs"
              >
                <Building size={14} className="text-[#3478C9] shrink-0" />
                <span className="max-w-[130px] sm:max-w-[170px] truncate">{currentCompany?.name || 'Prestige Estates'}</span>
                <ChevronDown size={14} className="text-slate-400 shrink-0" />
              </button>

              {showCompanyMenu && (
                <div className="absolute left-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in">
                  <div className="px-3 py-1.5 border-b border-slate-100">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Switch Active Company (Multi-Tenant)
                    </p>
                  </div>
                  {allCompanies.map((comp) => (
                    <button
                      key={comp.id}
                      onClick={() => {
                        setCompanyId(comp.id);
                        setShowCompanyMenu(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex flex-col hover:bg-slate-50 transition-colors ${
                        comp.id === currentCompany.id ? 'bg-blue-50/70 text-[#3478C9] font-semibold' : 'text-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-slate-900">{comp.name}</span>
                        <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-500 font-mono">
                          {comp.plan}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400">{comp.city} • {comp.code}</span>
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Global Search Bar */}
        <div className="relative hidden md:block">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder={
              currentRole === 'BROKER'
                ? 'Search available inventory & floorplans...'
                : currentRole === 'ACCOUNTS_MANAGER'
                ? 'Search receipts, buyers, unit dues...'
                : 'Search leads, units, customers...'
            }
            className="w-48 lg:w-64 h-9 pl-9 pr-3 bg-[#F5F7FA] border border-[#E3E8EF] rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#3478C9] focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Right side: Role Simulator, Notifications, Profile */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        {/* Interactive Role Switcher Pill */}
        <div className="relative">
          <button
            onClick={() => {
              setShowRoleMenu(!showRoleMenu);
              setShowCompanyMenu(false);
            }}
            className={`h-9 flex items-center gap-1.5 px-3 border rounded-lg text-xs font-bold transition-all shadow-2xs ${activeMeta.bg} ${activeMeta.color}`}
            title="Switch stakeholder view to test role functionality"
          >
            <UserCheck size={14} className="shrink-0" />
            <span className="hidden sm:inline font-normal text-slate-600">Role:</span>
            <span className="truncate max-w-[120px] sm:max-w-none">{activeMeta.badge}</span>
            <ChevronDown size={13} className="shrink-0 opacity-70" />
          </button>

          {showRoleMenu && (
            <div className="absolute right-0 mt-2 w-84 bg-white rounded-xl shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in">
              <div className="px-3.5 py-2 border-b border-slate-100 bg-slate-50/50">
                <p className="text-[11px] font-bold text-[#17324D] uppercase tracking-wider">
                  Test Role-Based Access Control (RBAC)
                </p>
                <p className="text-[11px] text-slate-500">
                  Switch personas to verify dedicated dashboards, sidebars & actions
                </p>
              </div>
              <div className="divide-y divide-slate-100">
                {roles.map((r) => (
                  <button
                    key={r.role}
                    onClick={() => {
                      setRole(r.role);
                      setShowRoleMenu(false);
                    }}
                    className={`w-full text-left px-3.5 py-2.5 text-xs hover:bg-slate-50 transition-colors ${
                      r.role === currentRole ? 'bg-blue-50/80 font-bold' : 'text-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{r.label}</span>
                      {r.role === currentRole && (
                        <span className="text-[10px] text-blue-700 font-bold bg-blue-100 border border-blue-200 px-1.5 py-0.2 rounded">
                          Active
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{r.desc}</p>
                    <span className="text-[10px] text-teal-700 font-medium block mt-1">
                      Logged in as: <strong>{r.persona}</strong>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Quick Action Button based on Role */}
        {currentRole === 'BROKER' ? (
          <Link
            href="/leads?action=register"
            className="h-9 hidden lg:flex items-center gap-1.5 px-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-bold shadow-xs transition-all"
          >
            <PlusCircle size={14} />
            <span>Register Client</span>
          </Link>
        ) : currentRole === 'ACCOUNTS_MANAGER' ? (
          <Link
            href="/collections?action=record"
            className="h-9 hidden lg:flex items-center gap-1.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-xs transition-all"
          >
            <Receipt size={14} />
            <span>Record Payment</span>
          </Link>
        ) : (
          <Link
            href="/leads?action=new"
            className="h-9 hidden lg:flex items-center gap-1.5 px-3 bg-[#3478C9] hover:bg-blue-600 text-white rounded-lg text-xs font-bold shadow-xs transition-all"
          >
            <PlusCircle size={14} />
            <span>New Lead</span>
          </Link>
        )}

        {/* Notifications Icon with Badge */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="h-9 w-9 flex items-center justify-center text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg relative transition-colors"
          >
            <Bell size={17} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-[#DC5555] rounded-full ring-2 ring-white"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in">
              <div className="px-3 py-2 border-b border-slate-100 flex items-center justify-between">
                <span className="font-semibold text-xs text-slate-900">Notifications</span>
                <span className="text-[10px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded font-bold">3 new</span>
              </div>
              <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                <div className="p-3 text-xs hover:bg-slate-50 transition-colors">
                  <p className="font-semibold text-slate-800">Booking Approved</p>
                  <p className="text-slate-500 text-[11px]">Unit A-102 approved by Ananya Deshmukh.</p>
                  <span className="text-[10px] text-slate-400 mt-1 block">10 mins ago</span>
                </div>
                <div className="p-3 text-xs hover:bg-slate-50 transition-colors">
                  <p className="font-semibold text-[#DC5555]">Follow-up Alert</p>
                  <p className="text-slate-500 text-[11px]">Naveen Jindal scheduled site visit today at 4:00 PM.</p>
                  <span className="text-[10px] text-slate-400 mt-1 block">1 hour ago</span>
                </div>
                <div className="p-3 text-xs hover:bg-slate-50 transition-colors">
                  <p className="font-semibold text-[#16A36A]">Payment Realized</p>
                  <p className="text-slate-500 text-[11px]">₹15,65,000 RTGS credited to Escrow A/c.</p>
                  <span className="text-[10px] text-slate-400 mt-1 block">Yesterday</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar & Switch Stakeholder */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-[#17324D] text-white flex items-center justify-center font-black text-xs ring-2 ring-blue-100">
            {currentUser?.name ? currentUser.name.charAt(0) : 'U'}
          </div>
          <div className="hidden xl:block text-left leading-tight">
            <p className="text-xs font-bold text-slate-800 truncate">{currentUser?.name || 'Authorized User'}</p>
            <p className="text-[10px] text-slate-400 truncate">{currentUser?.designation || activeMeta.badge}</p>
          </div>
          <Link
            href="/login"
            className="ml-1 p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors flex items-center gap-1 text-[11px] font-bold"
            title="Log in as another stakeholder"
          >
            <LogOut size={13} />
            <span className="hidden sm:inline">Portal</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
