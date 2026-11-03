'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  KanbanSquare,
  Plus,
  Search,
  Filter,
  Flame,
  ArrowRight,
  Phone,
  MessageSquare,
  ChevronRight,
  Sparkles,
  ArrowLeft,
} from 'lucide-react';
import { useTenant } from '@/lib/tenantContext';
import { LeadStatus, Lead } from '@/types';
import { getLeadPriorityStyle } from '@/lib/utils';

export default function PipelinePage() {
  const { leads, updateLeadStatus, hasPermission } = useTenant();
  const [searchTerm, setSearchTerm] = useState('');

  const stages: { stage: LeadStatus; label: string; color: string }[] = [
    { stage: 'New', label: 'New Enquiries', color: 'border-t-blue-500' },
    { stage: 'Contacted', label: 'Contacted', color: 'border-t-purple-500' },
    { stage: 'Qualified', label: 'Qualified', color: 'border-t-teal-500' },
    { stage: 'Interested', label: 'Interested', color: 'border-t-indigo-500' },
    { stage: 'Site Visit Scheduled', label: 'Visit Scheduled', color: 'border-t-amber-500' },
    { stage: 'Site Visit Completed', label: 'Visit Done', color: 'border-t-emerald-500' },
    { stage: 'Negotiation', label: 'Negotiation', color: 'border-t-orange-500' },
    { stage: 'Booked', label: 'Booked', color: 'border-t-green-600' },
    { stage: 'Lost', label: 'Lost', color: 'border-t-rose-500' },
  ];

  const handleAdvanceStage = (leadId: string, currentStatus: LeadStatus) => {
    const currentIndex = stages.findIndex((s) => s.stage === currentStatus);
    if (currentIndex < stages.length - 2) {
      // Don't advance to Lost automatically
      const nextStage = stages[currentIndex + 1].stage;
      updateLeadStatus(leadId, nextStage);
    }
  };

  const filteredLeads = leads.filter(
    (l) =>
      l.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.mobile.includes(searchTerm) ||
      l.configuration.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-card border border-estate-border shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <Link href="/leads" className="text-slate-400 hover:text-slate-700">
              <ArrowLeft size={18} />
            </Link>
            <h1 className="text-xl font-black text-estate-navy">Sales Pipeline Kanban</h1>
            <span className="text-xs bg-blue-50 text-estate-blue font-bold px-2.5 py-0.5 rounded-full border border-blue-200">
              9 Lifecycle Stages
            </span>
          </div>
          <p className="text-xs text-estate-muted mt-0.5">
            Visual deal flow from initial campaign enquiry to executed booking
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Filter cards..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-3 py-1.5 bg-estate-bg border border-estate-border rounded-input text-xs w-48 focus:outline-none focus:bg-white"
            />
          </div>

          <Link
            href="/leads?action=new"
            className="px-3.5 py-1.5 bg-estate-blue hover:bg-blue-600 text-white rounded-lg text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
          >
            <Plus size={14} />
            <span>New Lead</span>
          </Link>
        </div>
      </div>

      {/* Kanban Board Horizontal Scroll Container */}
      <div className="overflow-x-auto pb-4">
        <div className="flex items-start gap-3 min-w-[1900px]">
          {stages.map((stg) => {
            const columnLeads = filteredLeads.filter((l) => l.status === stg.stage);

            return (
              <div
                key={stg.stage}
                className={`w-[200px] shrink-0 bg-white rounded-xl border border-estate-border shadow-sm flex flex-col border-t-4 ${stg.color}`}
              >
                {/* Column Header */}
                <div className="p-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                  <div className="leading-tight">
                    <span className="font-bold text-xs text-estate-navy block truncate">{stg.label}</span>
                    <span className="text-[10px] text-slate-400">{columnLeads.length} leads</span>
                  </div>
                  <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-[10px]">
                    {columnLeads.length}
                  </span>
                </div>

                {/* Column Cards */}
                <div className="p-2 space-y-2.5 min-h-[500px] bg-slate-50/30">
                  {columnLeads.map((lead) => {
                    const priorityStyle = getLeadPriorityStyle(lead.priority);

                    return (
                      <div
                        key={lead.id}
                        className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-all group"
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full ${priorityStyle.badge}`}>
                            {lead.priority}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400">
                            Score: <strong className="text-slate-700">{lead.aiScore}</strong>
                          </span>
                        </div>

                        <Link
                          href={`/leads/${lead.id}`}
                          className="font-bold text-xs text-slate-900 group-hover:text-estate-blue block truncate"
                        >
                          {lead.fullName}
                        </Link>

                        <p className="text-[11px] text-slate-500 mt-0.5">
                          {lead.configuration} • ₹{lead.budgetMin}-{lead.budgetMax}L
                        </p>

                        <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
                          <span className="text-slate-400 truncate max-w-[100px]">{lead.source}</span>
                          <button
                            onClick={() => handleAdvanceStage(lead.id, lead.status)}
                            className="p-1 text-slate-400 hover:text-estate-blue hover:bg-blue-50 rounded"
                            title="Advance to Next Stage"
                          >
                            <ChevronRight size={14} />
                          </button>
                        </div>
                      </div>
                    );
                  })}

                  {columnLeads.length === 0 && (
                    <div className="py-8 text-center text-slate-300 text-xs italic">
                      No leads
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

