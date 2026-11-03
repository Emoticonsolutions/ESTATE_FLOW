'use client';

import React, { useState } from 'react';
import {
  Search,
  Bell,
  Building,
  UserCheck,
  ChevronDown,
  PlusCircle,
  HelpCircle,
  ExternalLink,
  Shield,
  Layers,
} from 'lucide-react';
import { useTenant } from '@/lib/tenantContext';
import { UserRole } from '@/types';
import Link from 'next/link';

export function Header() {
  const { currentCompany, allCompanies, setCompanyId, currentRole, setRole, currentUser } = useTenant();
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showCompanyMenu, setShowCompanyMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const roles: { role: UserRole; label: string; desc: string }[] = [
    { role: 'COMPANY_ADMIN', label: 'Company Owner / Admin', desc: 'Full company operations, settings & projects' },
    { role: 'SALES_MANAGER', label: 'Sales Manager', desc: 'Team oversight, approvals, assignments' },
    { role: 'SALES_EXECUTIVE', label: 'Sales Executive', desc: 'Lead follow-ups, calls, site visits & offers' },
    { role: 'ACCOUNTS_MANAGER', label: 'Accounts Manager', desc: 'Payments, collections, demand letters & receipts' },
    { role: 'BROKER', label: 'Channel Partner / Broker', desc: 'Direct deals, client registrations & commission' },
    { role: 'SUPER_ADMIN', label: 'Super Admin (SaaS)', desc: 'Multi-tenant master, subscription & plans' },
  ];

  return (
    <header className="h-16 bg-white border-b border-[#E3E8EF] flex items-center justify-between px-4 sm:px-6 z-20 shadow-xs">
      {/* Left side: Search & Tenant Switcher */}
      <div className="flex items-center space-x-3 sm:space-x-4">
        {/* Company / Builder Switcher */}
        <div className="relative">
          <button
            onClick={() => {
              setShowCompanyMenu(!showCompanyMenu);
              setShowRoleMenu(false);
            }}
            className="h-9 flex items-center gap-2 px-3 bg-[#F5F7FA] border border-[#E3E8EF] rounded-lg text-xs font-semibold text-[#17324D] hover:bg-slate-100 transition-colors shadow-2xs"
          >
            <Building size={14} className="text-[#3478C9] shrink-0" />
            <span className="max-w-[130px] sm:max-w-[170px] truncate">{currentCompany?.name || 'Prestige Estates Projects Ltd'}</span>
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
        </div>

        {/* Global Search Bar */}
        <div className="relative hidden md:block">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search leads, units, customers..."
            className="w-48 lg:w-64 h-9 pl-9 pr-3 bg-[#F5F7FA] border border-[#E3E8EF] rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#3478C9] focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Right side: Role Simulator, Notifications, Profile */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        {/* Role Switcher Pill */}
        <div className="relative">
          <button
            onClick={() => {
              setShowRoleMenu(!showRoleMenu);
              setShowCompanyMenu(false);
            }}
            className="h-9 flex items-center gap-1.5 px-3 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 text-[#3478C9] rounded-lg text-xs font-semibold hover:border-blue-300 transition-colors shadow-2xs"
          >
            <UserCheck size={14} className="text-[#3478C9] shrink-0" />
            <span className="hidden sm:inline text-slate-600 font-normal">Role:</span>
            <span className="font-semibold text-[#17324D] truncate max-w-[110px] sm:max-w-none">{currentRole.replace('_', ' ')}</span>
            <ChevronDown size={13} className="text-blue-500 shrink-0" />
          </button>

          {showRoleMenu && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in">
              <div className="px-3 py-1.5 border-b border-slate-100">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Test Role-Based Access Control (RBAC)
                </p>
                <p className="text-[11px] text-slate-500">
                  Switch roles to verify UI permissions & backend capabilities
                </p>
              </div>
              {roles.map((r) => (
                <button
                  key={r.role}
                  onClick={() => {
                    setRole(r.role);
                    setShowRoleMenu(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs hover:bg-slate-50 transition-colors ${
                    r.role === currentRole ? 'bg-blue-50/80 text-[#3478C9] font-bold' : 'text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-900">{r.label}</span>
                    {r.role === currentRole && (
                      <span className="text-[10px] text-blue-600 font-bold bg-blue-100 px-1.5 py-0.2 rounded">
                        Active
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">{r.desc}</p>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Quick Add Lead Shortcut */}
        <Link
          href="/leads?action=new"
          className="h-9 hidden lg:flex items-center gap-1.5 px-3 bg-[#3478C9] hover:bg-blue-600 text-white rounded-lg text-xs font-semibold shadow-xs transition-all"
        >
          <PlusCircle size={14} />
          <span>New Lead</span>
        </Link>

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
                  <p className="font-semibold text-[#DC5555]">Follow-up Overdue</p>
                  <p className="text-slate-500 text-[11px]">Naveen Jindal (+91 99011 88765) overdue by 2 days.</p>
                  <span className="text-[10px] text-slate-400 mt-1 block">2 hours ago</span>
                </div>
                <div className="p-3 text-xs hover:bg-slate-50 transition-colors">
                  <p className="font-semibold text-[#16A36A]">Payment Received</p>
                  <p className="text-slate-500 text-[11px]">₹11,80,000 via UPI for Unit A-102.</p>
                  <span className="text-[10px] text-slate-400 mt-1 block">Yesterday</span>
                </div>
              </div>
              <div className="p-2 border-t border-slate-100 text-center">
                <Link
                  href="/notifications"
                  onClick={() => setShowNotifications(false)}
                  className="text-xs text-[#3478C9] hover:underline font-medium"
                >
                  View all notifications →
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* User Profile avatar & Sign Out */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-[#17324D] text-white flex items-center justify-center font-bold text-xs ring-2 ring-blue-100">
            {currentUser.name.charAt(0)}
          </div>
          <div className="hidden xl:block text-left leading-tight">
            <p className="text-xs font-semibold text-slate-800 truncate">{currentUser.name}</p>
            <p className="text-[10px] text-slate-400 truncate">{currentUser.designation}</p>
          </div>
          <Link
            href="/login"
            className="ml-1 p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
            title="Switch Stakeholder / Sign Out"
          >
            <span className="text-[11px] font-bold text-slate-500 hover:text-rose-600">Switch Role</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

