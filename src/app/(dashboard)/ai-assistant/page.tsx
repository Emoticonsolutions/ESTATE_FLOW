'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Bot,
  Send,
  Flame,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  TrendingUp,
  MessageSquare,
  FileText,
  Copy,
  Check,
} from 'lucide-react';
import { useTenant } from '@/lib/tenantContext';
import { formatINR } from '@/lib/utils';

export default function AIAssistantPage() {
  const { leads, units, currentCompany } = useTenant();

  const [activeTab, setActiveTab] = useState<'scorer' | 'draftsman' | 'bi-query'>('scorer');
  const [selectedLeadId, setSelectedLeadId] = useState(leads[0]?.id || '');
  const [copied, setCopied] = useState(false);

  // Natural Language Query state
  const [nlQuery, setNlQuery] = useState('Which sales executive has the highest conversion this month?');
  const [queryResponse, setQueryResponse] = useState<any>(null);

  const targetLead = leads.find((l) => l.id === selectedLeadId) || leads[0];

  const handleRunQuery = (e: React.FormEvent) => {
    e.preventDefault();
    if (nlQuery.toLowerCase().includes('executive') || nlQuery.toLowerCase().includes('conversion')) {
      setQueryResponse({
        answer: 'Rohan Sharma has the highest conversion rate at 22.4% with 8 completed bookings and ₹12.4 Cr in volume.',
        metrics: [
          { label: 'Top Executive', value: 'Rohan Sharma' },
          { label: 'Conversion Rate', value: '22.4%' },
          { label: 'Closed Volume', value: '₹12.40 Cr' },
        ],
      });
    } else if (nlQuery.toLowerCase().includes('project') || nlQuery.toLowerCase().includes('booking')) {
      setQueryResponse({
        answer: 'Prestige Falcon City Phase 2 generated the highest volume with 28 confirmed bookings totaling ₹38.6 Cr.',
        metrics: [
          { label: 'Leading Project', value: 'Falcon City Ph 2' },
          { label: 'Absorbed Units', value: '28 units' },
          { label: 'Revenue Contracted', value: '₹38.60 Cr' },
        ],
      });
    } else {
      setQueryResponse({
        answer: `Tenant data for ${currentCompany.name}: Total 6 leads currently in pipeline, average ticket size ₹1.45 Cr, overall lead-to-booking conversion is 18.2%.`,
        metrics: [
          { label: 'Active Pipeline', value: '6 Deals' },
          { label: 'Avg Ticket Size', value: '₹1.45 Cr' },
          { label: 'Conversion', value: '18.2%' },
        ],
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-card border border-estate-border shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black text-estate-navy">AI Sales Assistant & Analytics Co-Pilot</h1>
            <span className="text-xs bg-indigo-50 text-indigo-700 font-bold px-2.5 py-0.5 rounded-full border border-indigo-200 flex items-center gap-1">
              <Sparkles size={12} className="text-indigo-600" />
              Tenant Isolated Intelligence
            </span>
          </div>
          <p className="text-xs text-estate-muted mt-0.5">
            Predictive lead scoring, natural language business intelligence queries and automatic follow-up copywriting
          </p>
        </div>
      </div>

      {/* Mode Switcher */}
      <div className="flex items-center gap-2 border-b border-estate-border bg-white px-4 rounded-t-card text-xs font-bold">
        {[
          { id: 'scorer', label: '1. AI Lead Scoring & Gap Analysis' },
          { id: 'draftsman', label: '2. Smart Follow-up Copywriter' },
          { id: 'bi-query', label: '3. Conversational BI Analytics Query' },
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

      {/* Tab 1: Lead Scorer & 360 Analysis */}
      {activeTab === 'scorer' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-card border border-estate-border shadow-sm space-y-4 text-xs">
            <h3 className="font-bold text-sm text-estate-navy">Select Lead to Evaluate</h3>
            <select
              value={selectedLeadId}
              onChange={(e) => setSelectedLeadId(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-input"
            >
              {leads.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.fullName} ({l.leadNumber}) - Score {l.aiScore}
                </option>
              ))}
            </select>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400">Customer Intent Score</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-black text-estate-navy">{targetLead.aiScore}</span>
                <span className="text-xs text-slate-400">/ 100</span>
                <span className="ml-auto text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                  High Probability
                </span>
              </div>
            </div>

            <div className="space-y-2 text-slate-600">
              <div className="flex justify-between">
                <span>Budget Suitability:</span>
                <strong className="text-emerald-700">95% Match</strong>
              </div>
              <div className="flex justify-between">
                <span>Site Visit Engagement:</span>
                <strong className="text-emerald-700">Completed</strong>
              </div>
              <div className="flex justify-between">
                <span>Financing Pre-Approval:</span>
                <strong className="text-slate-800">Verified (HDFC Bank)</strong>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 bg-white p-6 rounded-card border border-estate-border shadow-sm space-y-6 text-xs">
            <div>
              <h3 className="font-bold text-base text-estate-navy">
                AI Diagnostic & Conversion Recommendation
              </h3>
              <p className="text-slate-500 text-xs mt-0.5">
                Evaluated for {targetLead.fullName} ({targetLead.configuration} • Budget ₹{targetLead.budgetMin}-{targetLead.budgetMax}L)
              </p>
            </div>

            <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-xl space-y-2">
              <span className="font-bold text-indigo-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles size={14} className="text-indigo-600" />
                Executive Summary
              </span>
              <p className="text-slate-700 leading-relaxed text-xs">
                Deepak & Sunita Singhal are actively evaluating 3-bedroom residences near metro connectivity for immediate possession. Their primary hesitance is the upfront clubhouse development levy (₹2.5 Lakhs). Offering a 1.5% concession approved by the Sales Manager has an <strong>88% likelihood of triggering the immediate booking deposit</strong>.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                <span className="font-bold text-amber-900 flex items-center gap-1 mb-1">
                  <AlertCircle size={14} /> Missing Lead Information
                </span>
                <ul className="list-disc list-inside text-amber-800 space-y-1 text-[11px]">
                  <li>Customer PAN Card not yet uploaded</li>
                  <li>Spouse Aadhaar identification pending</li>
                </ul>
              </div>

              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                <span className="font-bold text-emerald-900 flex items-center gap-1 mb-1">
                  <CheckCircle2 size={14} /> Recommended Inventory Match
                </span>
                <p className="text-emerald-800 text-[11px]">
                  <strong>Unit A-501 (3 BHK, Floor 5)</strong>: Exactly matches carpet specification (1,420 sq ft) and east facing preference.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Smart Copywriter */}
      {activeTab === 'draftsman' && (
        <div className="bg-white p-6 rounded-card border border-estate-border shadow-sm text-xs space-y-4">
          <h3 className="font-bold text-base text-estate-navy">One-Click AI WhatsApp Follow-up Generator</h3>
          <p className="text-slate-500">Generates hyper-personalized messaging referencing customer objections and recent visits.</p>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 relative">
            <button
              onClick={() => {
                navigator.clipboard.writeText(
                  `Namaste Deepak ji, thank you for visiting Prestige Falcon City yesterday with Sunita ji! Based on your preference for the east-facing 5th floor 3 BHK (Unit A-501), our VP Sales has sanctioned the requested ₹2 Lakhs concession on clubhouse amenities. May I share the final cost sheet and hold this unit for you until Thursday? Warm regards, Rohan Sharma (+91 97401 22334).`
                );
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="absolute top-3 right-3 p-1.5 bg-white border border-slate-300 rounded text-slate-700 hover:bg-slate-100 flex items-center gap-1 text-[11px]"
            >
              {copied ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>

            <p className="text-slate-800 leading-relaxed font-mono pr-20 text-[11px]">
              Namaste Deepak ji, thank you for visiting Prestige Falcon City yesterday with Sunita ji! Based on your preference for the east-facing 5th floor 3 BHK (Unit A-501), our VP Sales has sanctioned the requested ₹2 Lakhs concession on clubhouse amenities. May I share the final cost sheet and hold this unit for you until Thursday? Warm regards, Rohan Sharma (+91 97401 22334).
            </p>
          </div>

          <a
            href={`https://wa.me/${targetLead.mobile.replace(/[^0-9]/g, '')}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold shadow transition-all"
          >
            <MessageSquare size={14} /> Send to Customer WhatsApp
          </a>
        </div>
      )}

      {/* Tab 3: Conversational BI Queries */}
      {activeTab === 'bi-query' && (
        <div className="bg-white p-6 rounded-card border border-estate-border shadow-sm text-xs space-y-4">
          <div>
            <h3 className="font-bold text-base text-estate-navy">Natural Language Real Estate BI Assistant</h3>
            <p className="text-slate-500">Ask any operational or financial question across projects, sales teams, or inventory.</p>
          </div>

          <form onSubmit={handleRunQuery} className="flex gap-2">
            <input
              type="text"
              value={nlQuery}
              onChange={(e) => setNlQuery(e.target.value)}
              className="flex-1 px-4 py-2 bg-slate-50 border border-slate-300 rounded-input text-xs"
              placeholder="e.g. Which project generated highest bookings this month?"
            />
            <button
              type="submit"
              className="px-5 py-2 bg-estate-blue text-white rounded-lg font-bold shadow hover:bg-blue-600 flex items-center gap-1.5"
            >
              <Sparkles size={14} /> Ask AI Co-Pilot
            </button>
          </form>

          {queryResponse && (
            <div className="mt-4 p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <p className="font-bold text-slate-900 text-sm">{queryResponse.answer}</p>
              <div className="grid grid-cols-3 gap-3 pt-2 border-t border-slate-200">
                {queryResponse.metrics.map((m: any, i: number) => (
                  <div key={i} className="p-3 bg-white rounded-lg border border-slate-200 text-center">
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">{m.label}</span>
                    <strong className="text-estate-navy text-sm font-black mt-0.5 block">{m.value}</strong>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

