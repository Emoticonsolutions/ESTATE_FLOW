'use client';

import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  Building,
  Key,
  Sliders,
  Percent,
  CheckCircle2,
  Save,
} from 'lucide-react';
import { useTenant } from '@/lib/tenantContext';

export default function SettingsPage() {
  const { currentCompany } = useTenant();
  const [saved, setSaved] = useState(false);

  const [companySettings, setCompanySettings] = useState({
    name: currentCompany.name,
    code: currentCompany.code,
    phone: currentCompany.phone,
    email: currentCompany.contactEmail,
    city: currentCompany.city,
    gstNumber: '29AAACP1209Q1ZM',
    whatsappToken: 'EAAKxxxxxxxxxxxxMetaCloudAPIKey',
    whatsappPhoneId: '10984218902184',
    gstRate: 5,
    holdHours: 72,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-card border border-estate-border shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black text-estate-navy">Company Settings & Integration Keys</h1>
            <span className="text-xs bg-slate-100 text-slate-700 font-bold px-2 py-0.5 rounded-full">
              Tenant ID: {currentCompany.id}
            </span>
          </div>
          <p className="text-xs text-estate-muted mt-0.5">
            Configure RERA tax rules, WhatsApp Business API tokens, unit hold duration, and corporate branding
          </p>
        </div>

        {saved && (
          <span className="px-3 py-1.5 bg-emerald-100 text-emerald-800 rounded-lg text-xs font-bold flex items-center gap-1 animate-in fade-in">
            <CheckCircle2 size={14} /> Settings Saved
          </span>
        )}
      </div>

      <div className="bg-white rounded-card border border-estate-border shadow-sm p-6 text-xs max-w-4xl">
        <form onSubmit={handleSave} className="space-y-6">
          {/* Company Details */}
          <div>
            <h3 className="font-bold text-sm text-estate-navy mb-3 pb-2 border-b border-slate-100 flex items-center gap-2">
              <Building size={16} className="text-estate-blue" />
              <span>Developer Corporate Information</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Company Registered Name</label>
                <input
                  type="text"
                  value={companySettings.name}
                  onChange={(e) => setCompanySettings({ ...companySettings, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-input"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Corporate GSTIN</label>
                <input
                  type="text"
                  value={companySettings.gstNumber}
                  onChange={(e) => setCompanySettings({ ...companySettings, gstNumber: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-input font-mono font-bold"
                />
              </div>
            </div>
          </div>

          {/* Tax & Operational Rules */}
          <div>
            <h3 className="font-bold text-sm text-estate-navy mb-3 pb-2 border-b border-slate-100 flex items-center gap-2">
              <Percent size={16} className="text-estate-teal" />
              <span>Tax Calculations & Inventory Rules</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Applicable GST Rate (%)</label>
                <input
                  type="number"
                  value={companySettings.gstRate}
                  onChange={(e) => setCompanySettings({ ...companySettings, gstRate: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-input font-bold"
                />
                <span className="text-[10px] text-slate-400 mt-0.5 block">Configurable legally reviewed tax rules</span>
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Unit Block Auto-Expiry (Hours)</label>
                <input
                  type="number"
                  value={companySettings.holdHours}
                  onChange={(e) => setCompanySettings({ ...companySettings, holdHours: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-input font-bold"
                />
                <span className="text-[10px] text-slate-400 mt-0.5 block">Default 72-hour transactional lock</span>
              </div>
            </div>
          </div>

          {/* WhatsApp API Key */}
          <div>
            <h3 className="font-bold text-sm text-estate-navy mb-3 pb-2 border-b border-slate-100 flex items-center gap-2">
              <Key size={16} className="text-amber-500" />
              <span>Meta WhatsApp Cloud API Gateway</span>
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Permanent Access Token</label>
                <input
                  type="password"
                  value={companySettings.whatsappToken}
                  onChange={(e) => setCompanySettings({ ...companySettings, whatsappToken: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-input font-mono"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Phone Number ID</label>
                <input
                  type="text"
                  value={companySettings.whatsappPhoneId}
                  onChange={(e) => setCompanySettings({ ...companySettings, whatsappPhoneId: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-input font-mono"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-estate-blue hover:bg-blue-600 text-white rounded-lg text-xs font-bold shadow-md flex items-center gap-2"
            >
              <Save size={14} />
              <span>Save Configuration</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

