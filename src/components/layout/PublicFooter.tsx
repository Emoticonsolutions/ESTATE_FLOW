import React from 'react';
import Link from 'next/link';
import { Building2, ShieldCheck, Mail, Phone, MapPin, Lock } from 'lucide-react';

export function PublicFooter() {
  return (
    <footer className="bg-[#17324D] text-slate-400 text-xs border-t border-[#244761]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-teal-500 text-white font-black text-sm flex items-center justify-center">
                EF
              </div>
              <span className="text-white font-black text-base tracking-tight">
                ESTATE<span className="text-[#3478C9]">FLOW</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Multi-tenant enterprise SaaS CRM tailored for real estate developers, builders, sales forces, and channel partners.
            </p>
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-[11px]">
              <ShieldCheck size={14} />
              <span>RERA Compliance Architecture</span>
            </div>
          </div>

          {/* Core Modules */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">17 Core Modules</h4>
            <ul className="space-y-1.5 text-slate-300">
              <li><Link href="/leads" className="hover:text-white transition-colors">Omni-Channel Lead 360</Link></li>
              <li><Link href="/inventory" className="hover:text-white transition-colors">Visual Tower Stacking Grid</Link></li>
              <li><Link href="/cost-sheets" className="hover:text-white transition-colors">Dynamic Cost Sheet Generator</Link></li>
              <li><Link href="/bookings" className="hover:text-white transition-colors">Booking Authorization Workflow</Link></li>
              <li><Link href="/collections" className="hover:text-white transition-colors">Construction Milestone Billing</Link></li>
              <li><Link href="/brokers" className="hover:text-white transition-colors">Channel Partner & Broker Payouts</Link></li>
            </ul>
          </div>

          {/* Stakeholder Access */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Stakeholder Portals</h4>
            <ul className="space-y-1.5 text-slate-300">
              <li><Link href="/login/company_admin" className="hover:text-white transition-colors">Builder / Company Admin</Link></li>
              <li><Link href="/login/sales_manager" className="hover:text-white transition-colors">Sales Operations Manager</Link></li>
              <li><Link href="/login/sales_executive" className="hover:text-white transition-colors">Sales Executive / Field Rep</Link></li>
              <li><Link href="/login/accounts_manager" className="hover:text-white transition-colors">Accounts & Receivables</Link></li>
              <li><Link href="/login/broker" className="hover:text-white transition-colors">Channel Partner / Broker</Link></li>
              <li><Link href="/login/super_admin" className="hover:text-white transition-colors">Platform Super Admin</Link></li>
            </ul>
          </div>

          {/* Quick Links & Contact */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Navigation & Support</h4>
            <ul className="space-y-1.5 text-slate-300">
              <li><Link href="/pricing" className="hover:text-white transition-colors">SaaS Pricing Plans</Link></li>
              <li><Link href="/features" className="hover:text-white transition-colors">System Capabilities</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About the Architecture</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Book a Demo Walkthrough</Link></li>
              <li><Link href="/login" className="text-teal-400 font-bold hover:underline flex items-center gap-1"><Lock size={12} /><span>Stakeholder Login (Live Access) →</span></Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[#244761] flex flex-col sm:flex-row items-center justify-between text-slate-400 text-[11px] gap-2">
          <span>&copy; {new Date().getFullYear()} EstateFlow CRM Inc. All rights reserved.</span>
          <span>Benchmarked against Vastu CRM • Multi-Tenant Real Estate SaaS</span>
        </div>
      </div>
    </footer>
  );
}

