'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  KanbanSquare,
  CalendarClock,
  Building2,
  Boxes,
  Calculator,
  FileCheck,
  Receipt,
  Handshake,
  Home,
  MessageSquareShare,
  Sparkles,
  BarChart3,
  ShieldCheck,
  FolderOpen,
  Bell,
  Settings,
  ChevronLeft,
  ChevronRight,
  UserCheck,
  Award,
} from 'lucide-react';
import { useTenant } from '@/lib/tenantContext';
import { cn } from '@/lib/utils';
import { UserRole } from '@/types';

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const { currentRole, currentCompany, currentUser } = useTenant();

  // Role-Specific Navigation Definition
  const getNavigationForRole = (role: UserRole) => {
    switch (role) {
      case 'BROKER':
        return [
          { name: 'Partner Cockpit', href: '/dashboard', icon: LayoutDashboard, badge: 'Live' },
          { name: 'My Registered Clients', href: '/leads', icon: Users },
          { name: 'Available Inventory', href: '/inventory', icon: Boxes },
          { name: 'Cost Sheet Calculator', href: '/cost-sheets', icon: Calculator },
          { name: 'Commission Ledger', href: '/brokers', icon: Handshake },
          { name: 'Project Brochures', href: '/property-listings', icon: Home },
          { name: 'Notifications', href: '/notifications', icon: Bell },
        ];

      case 'ACCOUNTS_MANAGER':
        return [
          { name: 'Accounts Cockpit', href: '/dashboard', icon: LayoutDashboard },
          { name: 'Payment Ledger & Dues', href: '/collections', icon: Receipt },
          { name: 'Bookings & Allotments', href: '/bookings', icon: FileCheck },
          { name: 'Cost Sheets & GST', href: '/cost-sheets', icon: Calculator },
          { name: 'Customer Invoices', href: '/documents', icon: FolderOpen },
          { name: 'Escrow & BI Reports', href: '/reports', icon: BarChart3 },
          { name: 'Notifications', href: '/notifications', icon: Bell },
        ];

      case 'SALES_EXECUTIVE':
        return [
          { name: 'My Sales Cockpit', href: '/dashboard', icon: LayoutDashboard, badge: 'Daily' },
          { name: 'My Leads 360', href: '/leads', icon: Users },
          { name: 'Sales Pipeline', href: '/leads/pipeline', icon: KanbanSquare },
          { name: 'Daily Follow-ups', href: '/follow-ups', icon: CalendarClock },
          { name: 'Live Inventory (72h Lock)', href: '/inventory', icon: Boxes },
          { name: 'Cost Sheet Generator', href: '/cost-sheets', icon: Calculator },
          { name: 'Submit Booking', href: '/bookings', icon: FileCheck },
          { name: 'WhatsApp & Templates', href: '/communications', icon: MessageSquareShare },
          { name: 'AI Sales Assistant', href: '/ai-assistant', icon: Sparkles, isAi: true },
          { name: 'Notifications', href: '/notifications', icon: Bell },
        ];

      case 'SALES_MANAGER':
        return [
          { name: 'Sales Ops Cockpit', href: '/dashboard', icon: LayoutDashboard },
          { name: 'Lead 360 & Assignment', href: '/leads', icon: Users },
          { name: 'Pipeline Kanban', href: '/leads/pipeline', icon: KanbanSquare },
          { name: 'Follow-ups & Overdue', href: '/follow-ups', icon: CalendarClock },
          { name: 'Inventory & Towers', href: '/inventory', icon: Boxes },
          { name: 'Cost Sheets & Discounts', href: '/cost-sheets', icon: Calculator },
          { name: 'Bookings Review', href: '/bookings', icon: FileCheck },
          { name: 'Brokers & Partners', href: '/brokers', icon: Handshake },
          { name: 'Team Performance', href: '/reports', icon: BarChart3 },
          { name: 'AI Sales Assistant', href: '/ai-assistant', icon: Sparkles, isAi: true },
          { name: 'Notifications', href: '/notifications', icon: Bell },
        ];

      case 'COMPANY_ADMIN':
      default:
        return [
          { name: 'Executive Dashboard', href: '/dashboard', icon: LayoutDashboard },
          { name: 'Lead 360', href: '/leads', icon: Users },
          { name: 'Lead Pipeline', href: '/leads/pipeline', icon: KanbanSquare },
          { name: 'Follow-ups', href: '/follow-ups', icon: CalendarClock },
          { name: 'Projects', href: '/projects', icon: Building2 },
          { name: 'Inventory & Towers', href: '/inventory', icon: Boxes },
          { name: 'Cost Sheets', href: '/cost-sheets', icon: Calculator },
          { name: 'Bookings', href: '/bookings', icon: FileCheck },
          { name: 'Payment Ledger & Dues', href: '/collections', icon: Receipt },
          { name: 'Brokers & Partners', href: '/brokers', icon: Handshake },
          { name: 'Property Listings', href: '/property-listings', icon: Home },
          { name: 'WhatsApp & Automations', href: '/communications', icon: MessageSquareShare },
          { name: 'AI Sales Assistant', href: '/ai-assistant', icon: Sparkles, isAi: true },
          { name: 'Reports & BI', href: '/reports', icon: BarChart3 },
          { name: 'Team & Permissions', href: '/employees', icon: ShieldCheck },
          { name: 'Documents Vault', href: '/documents', icon: FolderOpen },
          { name: 'Notifications', href: '/notifications', icon: Bell },
          { name: 'Company Settings', href: '/settings', icon: Settings },
        ];
    }
  };

  const roleLabelMap: Record<UserRole, { badge: string; color: string; bg: string }> = {
    COMPANY_ADMIN: { badge: 'Builder Admin', color: 'text-blue-300', bg: 'bg-blue-500/20 border-blue-500/30' },
    SALES_MANAGER: { badge: 'Sales Manager', color: 'text-indigo-300', bg: 'bg-indigo-500/20 border-indigo-500/30' },
    SALES_EXECUTIVE: { badge: 'Sales Executive', color: 'text-teal-300', bg: 'bg-teal-500/20 border-teal-500/30' },
    ACCOUNTS_MANAGER: { badge: 'Accounts / Billing', color: 'text-emerald-300', bg: 'bg-emerald-500/20 border-emerald-500/30' },
    BROKER: { badge: 'Channel Partner', color: 'text-purple-300', bg: 'bg-purple-500/20 border-purple-500/30' },
    SUPER_ADMIN: { badge: 'Platform Owner', color: 'text-amber-300', bg: 'bg-amber-500/20 border-amber-500/30' },
  };

  const navItems = getNavigationForRole(currentRole);
  const roleMeta = roleLabelMap[currentRole] || roleLabelMap.COMPANY_ADMIN;

  return (
    <aside
      className={cn(
        'relative bg-[#17324D] text-slate-300 flex flex-col transition-all duration-300 z-30 select-none shadow-xl border-r border-[#244761]',
        collapsed ? 'w-[72px]' : 'w-[250px]'
      )}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-[#244761] bg-[#14293f]">
        {!collapsed && (
          <div className="flex items-center space-x-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#3478C9] to-[#159D91] flex items-center justify-center text-white font-bold shadow-md">
              EF
            </div>
            <div className="leading-tight">
              <span className="font-bold text-white text-base tracking-wide flex items-center gap-1.5">
                ESTATE<span className="text-[#3478C9]">FLOW</span>
              </span>
              <span className="text-[10px] text-teal-400 font-medium block uppercase tracking-wider">
                Real Estate OS
              </span>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="mx-auto w-8 h-8 rounded-lg bg-gradient-to-tr from-[#3478C9] to-[#159D91] flex items-center justify-center text-white font-bold shadow-md">
            EF
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-[#244761] transition-colors"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Role & Tenant Indicator Banner */}
      {!collapsed && (
        <div className="px-3 py-2.5 mx-3 mt-3 bg-[#244761]/60 rounded-lg border border-[#3478C9]/30">
          <div className="flex items-center justify-between mb-0.5">
            <p className="text-[10px] uppercase font-bold text-teal-300 tracking-wider">
              {currentRole === 'BROKER' ? 'Channel Partner' : 'Active Builder'}
            </p>
            <span className={cn('text-[9px] px-1.5 py-0.2 rounded font-bold uppercase border', roleMeta.bg, roleMeta.color)}>
              {roleMeta.badge}
            </span>
          </div>
          <p className="text-xs font-semibold text-white truncate">
            {currentRole === 'BROKER' ? 'Apex Channel Partners' : currentCompany.name}
          </p>
        </div>
      )}

      {/* Role Navigation Links */}
      <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all group',
                isActive
                  ? 'bg-[#3478C9] text-white shadow-sm font-semibold'
                  : 'text-slate-300 hover:bg-[#244761] hover:text-white'
              )}
              title={collapsed ? item.name : undefined}
            >
              <Icon
                size={18}
                className={cn(
                  'shrink-0 transition-transform group-hover:scale-105',
                  isActive ? 'text-white' : 'text-slate-400 group-hover:text-teal-400'
                )}
              />
              {!collapsed && <span className="truncate">{item.name}</span>}
              {!collapsed && item.badge && (
                <span className="ml-auto text-[9px] bg-teal-500/20 text-teal-300 px-1.5 py-0.5 rounded font-bold">
                  {item.badge}
                </span>
              )}
              {!collapsed && item.isAi && (
                <span className="ml-auto text-[9px] bg-gradient-to-r from-teal-400 to-blue-400 text-slate-950 px-1.5 py-0.5 rounded-full font-black">
                  AI
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer Profile Section showing Active Stakeholder */}
      <div className="p-3 border-t border-[#244761] bg-[#14293f]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#3478C9] text-white flex items-center justify-center font-black text-xs ring-2 ring-teal-400/30 shrink-0">
            {currentUser?.name ? currentUser.name.charAt(0) : 'U'}
          </div>
          {!collapsed && (
            <div className="overflow-hidden leading-tight">
              <p className="text-xs font-bold text-white truncate">{currentUser?.name || 'Logged In User'}</p>
              <p className="text-[10px] text-teal-300 truncate">{currentUser?.designation || roleMeta.badge}</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
