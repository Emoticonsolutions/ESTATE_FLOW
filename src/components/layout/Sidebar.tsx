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
  ShieldAlert,
} from 'lucide-react';
import { useTenant } from '@/lib/tenantContext';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const { currentRole, currentCompany } = useTenant();

  const navigationItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Lead 360', href: '/leads', icon: Users },
    { name: 'Lead Pipeline', href: '/leads/pipeline', icon: KanbanSquare },
    { name: 'Follow-ups', href: '/follow-ups', icon: CalendarClock },
    { name: 'Projects', href: '/projects', icon: Building2 },
    { name: 'Inventory & Towers', href: '/inventory', icon: Boxes },
    { name: 'Cost Sheets', href: '/cost-sheets', icon: Calculator },
    { name: 'Bookings', href: '/bookings', icon: FileCheck },
    { name: 'Collections & Dues', href: '/collections', icon: Receipt },
    { name: 'Brokers & Partners', href: '/brokers', icon: Handshake },
    { name: 'Property Listings', href: '/property-listings', icon: Home },
    { name: 'WhatsApp & Automations', href: '/communications', icon: MessageSquareShare },
    { name: 'AI Sales Assistant', href: '/ai-assistant', icon: Sparkles },
    { name: 'Reports & BI', href: '/reports', icon: BarChart3 },
    { name: 'Team & Permissions', href: '/employees', icon: ShieldCheck },
    { name: 'Documents Vault', href: '/documents', icon: FolderOpen },
    { name: 'Notifications', href: '/notifications', icon: Bell },
  ];

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
                Real Estate SaaS
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

      {/* Tenant Indicator badge */}
      {!collapsed && (
        <div className="px-3 py-2.5 mx-3 mt-3 bg-[#244761]/60 rounded-lg border border-[#3478C9]/30">
          <p className="text-[10px] uppercase font-semibold text-teal-300 tracking-wider">Active Builder</p>
          <p className="text-xs font-semibold text-white truncate">{currentCompany.name}</p>
        </div>
      )}

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
        {navigationItems.map((item) => {
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
              {!collapsed && item.name === 'AI Sales Assistant' && (
                <span className="ml-auto text-[9px] bg-teal-500/20 text-teal-300 px-1.5 py-0.5 rounded-full font-bold">
                  AI
                </span>
              )}
            </Link>
          );
        })}

        {/* Super Admin Section (available to all for easy evaluation) */}
        <div className="pt-2 mt-2 border-t border-[#244761]">
          <Link
            href="/super-admin"
            className={cn(
              'flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all group',
              pathname.startsWith('/super-admin')
                ? 'bg-rose-700 text-white font-semibold shadow-sm'
                : 'text-amber-300 hover:bg-[#244761]'
            )}
            title={collapsed ? 'Super Admin SaaS' : undefined}
          >
            <ShieldAlert size={18} className="shrink-0 text-amber-400 group-hover:scale-105" />
            {!collapsed && <span className="truncate">Super Admin SaaS</span>}
            {!collapsed && (
              <span className="ml-auto text-[9px] bg-amber-500/30 text-amber-200 px-1.5 py-0.5 rounded-full font-bold">
                ROOT
              </span>
            )}
          </Link>
        </div>
      </nav>

      {/* Footer Profile Section */}
      <div className="p-3 border-t border-[#244761] bg-[#14293f]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#3478C9] text-white flex items-center justify-center font-bold text-xs ring-2 ring-teal-400/30 shrink-0">
            {currentRole.slice(0, 2)}
          </div>
          {!collapsed && (
            <div className="overflow-hidden leading-tight">
              <p className="text-xs font-semibold text-white truncate">{currentRole.replace('_', ' ')}</p>
              <p className="text-[10px] text-slate-400 truncate">EstateFlow v1.0</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

