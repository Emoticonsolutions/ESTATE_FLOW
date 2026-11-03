'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Phone,
  MessageSquare,
  Mail,
  Calendar,
  Sparkles,
  Building,
  CheckCircle2,
  Clock,
  FileText,
  AlertCircle,
  Plus,
  Send,
  UserCheck,
  Tag,
  Paperclip,
} from 'lucide-react';
import { useTenant } from '@/lib/tenantContext';
import { formatINR, formatDate, formatDateTime, getLeadPriorityStyle, getLeadStatusColor } from '@/lib/utils';
import { LeadStatus } from '@/types';

export default function LeadDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { leads, updateLeadStatus, units, addFollowUp } = useTenant();

  const leadId = params.id as string;
  const lead = leads.find((l) => l.id === leadId) || leads[0];

  const [activeTab, setActiveTab] = useState<'overview' | 'activities' | 'followups' | 'sitevisits' | 'properties' | 'documents' | 'timeline'>('overview');
  const [newNote, setNewNote] = useState('');
  const [showStatusModal, setShowStatusModal] = useState(false);

  // Status transitions
  const pipelineStages: LeadStatus[] = [
    'New',
    'Contacted',
    'Qualified',
    'Interested',
    'Site Visit Scheduled',
    'Site Visit Completed',
    'Negotiation',
    'Booked',
    'Lost',
  ];

  const priorityStyle = getLeadPriorityStyle(lead.priority);
  const statusColor = getLeadStatusColor(lead.status);

  return (
    <div className="space-y-6">
      {/* Back button & Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-card border border-estate-border shadow-sm">
        <div className="flex items-center gap-3">
          <Link
            href="/leads"
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={18} />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black text-estate-navy">{lead.fullName}</h1>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${priorityStyle.badge}`}>
                {lead.priority} Priority
              </span>
              <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-semibold border ${statusColor}`}>
                {lead.status}
              </span>
            </div>
            <p className="text-xs text-estate-muted mt-0.5">
              Lead ID: <strong className="font-mono text-slate-700">{lead.leadNumber}</strong> • Source: {lead.source} • Registered {formatDate(lead.createdAt)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={`https://wa.me/${lead.mobile.replace(/[^0-9]/g, '')}`}
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5"
          >
            <MessageSquare size={14} />
            <span>WhatsApp</span>
          </a>

          <a
            href={`tel:${lead.mobile}`}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold flex items-center gap-1.5"
          >
            <Phone size={14} />
            <span>Call</span>
          </a>

          <button
            onClick={() => setShowStatusModal(true)}
            className="px-3.5 py-1.5 bg-estate-blue hover:bg-blue-600 text-white rounded-lg text-xs font-bold shadow-sm flex items-center gap-1.5"
          >
            <span>Update Stage</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Left 360 Tabs, Right AI & Executive Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 cols): Tabbed details */}
        <div className="lg:col-span-2 bg-white rounded-card border border-estate-border shadow-sm overflow-hidden">
          {/* Tab Navigation (Section 4 Module 2) */}
          <div className="flex items-center gap-2 px-4 border-b border-estate-border bg-slate-50/70 overflow-x-auto text-xs">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'activities', label: 'Activities & Notes' },
              { id: 'followups', label: 'Follow-ups' },
              { id: 'sitevisits', label: 'Site Visits' },
              { id: 'properties', label: 'Recommended Units' },
              { id: 'documents', label: 'Documents' },
              { id: 'timeline', label: 'Chronological Timeline' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3 px-3 font-semibold border-b-2 transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-estate-blue text-estate-blue bg-white'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-6">
            {/* Tab 1: Overview */}
            {activeTab === 'overview' && (
              <div className="space-y-6 text-xs">
                <div>
                  <h3 className="font-bold text-slate-800 text-sm mb-3">Customer Profile & Contact</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <div>
                      <span className="text-slate-400 block text-[11px]">Primary Mobile</span>
                      <span className="font-bold text-slate-800 font-mono">{lead.mobile}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Alternate Phone</span>
                      <span className="font-medium text-slate-700">{lead.alternateMobile || 'None registered'}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Email Address</span>
                      <span className="font-medium text-slate-700">{lead.email}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">City & State</span>
                      <span className="font-medium text-slate-700">{lead.city}, {lead.state}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Preferred Channel</span>
                      <span className="font-semibold text-estate-teal">{lead.preferredContactMethod}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Assigned Manager</span>
                      <span className="font-semibold text-slate-800">Ananya Deshmukh</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-slate-800 text-sm mb-3">Real Estate Requirements</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <div>
                      <span className="text-slate-400 block text-[11px]">Project Interest</span>
                      <span className="font-bold text-estate-navy">Prestige Falcon City Ph 2</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Property Type</span>
                      <span className="font-medium text-slate-800">{lead.propertyType}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Configuration</span>
                      <span className="font-bold text-estate-blue">{lead.configuration}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Budget Range</span>
                      <span className="font-extrabold text-estate-green">₹{lead.budgetMin}L - ₹{lead.budgetMax}L</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Preferred Floor</span>
                      <span className="font-medium text-slate-800">{lead.preferredFloor || 'Flexible'}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Possession Timeframe</span>
                      <span className="font-medium text-slate-800">{lead.possessionPreference}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-slate-800 text-sm mb-2">Discussion Notes & Remarks</h3>
                  <div className="p-3 bg-amber-50/60 border border-amber-200 rounded-lg text-slate-700 leading-relaxed">
                    {lead.notes || 'No preliminary notes recorded yet.'}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Activities & Notes */}
            {activeTab === 'activities' && (
              <div className="space-y-4 text-xs">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <textarea
                    rows={2}
                    placeholder="Log client call outcome, meeting notes, objections or WhatsApp response..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-input text-xs"
                  ></textarea>
                  <div className="flex justify-end mt-2">
                    <button
                      onClick={() => {
                        if (!newNote) return;
                        alert('Activity note saved to lead timeline!');
                        setNewNote('');
                      }}
                      className="px-4 py-1.5 bg-estate-blue text-white rounded-lg text-xs font-bold hover:bg-blue-600 flex items-center gap-1.5"
                    >
                      <Send size={13} />
                      <span>Log Activity</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="p-3 bg-white border border-slate-200 rounded-lg flex items-start gap-3">
                    <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg shrink-0">
                      <Phone size={16} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">Outbound Call Completed</span>
                        <span className="text-[10px] text-slate-400">Yesterday at 15:30</span>
                      </div>
                      <p className="text-slate-600 mt-1">
                        Called customer regarding Tower A 5th floor unit. Client requested detailed break-up of clubhouse charges and parking allotment.
                      </p>
                      <span className="text-[10px] text-slate-400 mt-1 block">Logged by Rohan Sharma (Sales Exec)</span>
                    </div>
                  </div>

                  <div className="p-3 bg-white border border-slate-200 rounded-lg flex items-start gap-3">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg shrink-0">
                      <MessageSquare size={16} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">WhatsApp Brochure Shared</span>
                        <span className="text-[10px] text-slate-400">2 days ago</span>
                      </div>
                      <p className="text-slate-600 mt-1">
                        Dispatched verified Prestige Falcon City digital brochure and floor plans via WhatsApp Cloud API. Read receipt confirmed.
                      </p>
                      <span className="text-[10px] text-slate-400 mt-1 block">Automated Campaign Engine</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Follow-ups */}
            {activeTab === 'followups' && (
              <div className="space-y-4 text-xs">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-800 text-sm">Scheduled Reminders & Follow-ups</h3>
                  <button
                    onClick={() => {
                      addFollowUp({
                        leadId: lead.id,
                        leadName: lead.fullName,
                        leadMobile: lead.mobile,
                        assignedToId: 'user-sales-exec-1',
                        assignedToName: 'Rohan Sharma',
                        type: 'Phone Call',
                        dateTime: new Date(Date.now() + 86400000).toISOString(),
                        remarks: 'Follow up on revised cost sheet',
                      });
                      alert('New follow-up task scheduled!');
                    }}
                    className="px-3 py-1.5 bg-estate-blue text-white rounded-lg text-xs font-bold hover:bg-blue-600 flex items-center gap-1"
                  >
                    <Plus size={14} /> Schedule Follow-up
                  </button>
                </div>

                <div className="p-4 bg-blue-50/60 border border-blue-200 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900 block">Phone Call Discussion</span>
                    <p className="text-slate-600 text-xs mt-0.5">Discuss approved 1.5% concession on clubhouse with Deepak.</p>
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      Scheduled for: <strong>{lead.nextFollowUpDate ? formatDateTime(lead.nextFollowUpDate) : 'Tomorrow 11:00 AM'}</strong>
                    </span>
                  </div>
                  <button
                    onClick={() => alert('Follow-up marked completed!')}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold"
                  >
                    Mark Done
                  </button>
                </div>
              </div>
            )}

            {/* Tab 4: Site Visits */}
            {activeTab === 'sitevisits' && (
              <div className="space-y-4 text-xs">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-slate-900">Site Experience at Experience Centre</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                      Completed
                    </span>
                  </div>
                  <p className="text-slate-600">
                    Client visited with family. Showcase of 3 BHK model flat (Unit 302). Client gave 5/5 rating for layout and balcony view.
                  </p>
                  <p className="text-[11px] text-slate-400 mt-2">Attended by Rohan Sharma • 26 Oct 2026</p>
                </div>
              </div>
            )}

            {/* Tab 5: Recommended Units */}
            {activeTab === 'properties' && (
              <div className="space-y-4 text-xs">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-800 text-sm">Matching Units in Falcon City</h3>
                  <Link href="/inventory" className="text-estate-blue font-bold hover:underline">
                    Explore Full Visual Tower Grid →
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-white border border-estate-border rounded-xl shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-slate-900 text-sm">Unit A-501 (3 BHK)</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#16A36A] text-white">
                        Available
                      </span>
                    </div>
                    <p className="text-slate-500 text-xs">Carpet: 1,420 sq ft • Facing: East • Floor 5</p>
                    <p className="text-sm font-extrabold text-estate-navy mt-2">₹1,47,50,000</p>
                    <div className="mt-3 flex items-center gap-2">
                      <Link
                        href="/cost-sheets"
                        className="w-full py-1.5 bg-estate-blue hover:bg-blue-600 text-white rounded text-center font-bold"
                      >
                        Generate Cost Sheet
                      </Link>
                    </div>
                  </div>

                  <div className="p-4 bg-white border border-estate-border rounded-xl shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-slate-900 text-sm">Unit A-402 (2 BHK)</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#16A36A] text-white">
                        Available
                      </span>
                    </div>
                    <p className="text-slate-500 text-xs">Carpet: 1,080 sq ft • Facing: North • Floor 4</p>
                    <p className="text-sm font-extrabold text-estate-navy mt-2">₹1,14,00,000</p>
                    <div className="mt-3 flex items-center gap-2">
                      <Link
                        href="/cost-sheets"
                        className="w-full py-1.5 bg-estate-blue hover:bg-blue-600 text-white rounded text-center font-bold"
                      >
                        Generate Cost Sheet
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 6: Documents */}
            {activeTab === 'documents' && (
              <div className="space-y-4 text-xs">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-800 text-sm">Uploaded KYC & Documents</h3>
                  <button className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5">
                    <Paperclip size={14} /> Upload Doc
                  </button>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <FileText size={18} className="text-[#3478C9]" />
                    <div>
                      <p className="font-bold text-slate-800">PAN_Card_Deepak_Singhal.pdf</p>
                      <p className="text-[10px] text-slate-400">Verified KYC Document • 1.2 MB</p>
                    </div>
                  </div>
                  <span className="text-xs text-estate-blue font-bold cursor-pointer hover:underline">Download</span>
                </div>
              </div>
            )}

            {/* Tab 7: Timeline */}
            {activeTab === 'timeline' && (
              <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 text-xs">
                <div className="relative">
                  <div className="absolute -left-6 top-0.5 w-3 h-3 rounded-full bg-estate-blue ring-4 ring-white"></div>
                  <p className="font-bold text-slate-900">Moved to Stage: Negotiation</p>
                  <p className="text-slate-500 text-[11px]">Pricing concession discussions with Ananya Deshmukh.</p>
                  <span className="text-[10px] text-slate-400">2 Nov 2026, 15:20</span>
                </div>
                <div className="relative">
                  <div className="absolute -left-6 top-0.5 w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-white"></div>
                  <p className="font-bold text-slate-900">Site Visit Completed</p>
                  <p className="text-slate-500 text-[11px]">Sample flat tour with family completed.</p>
                  <span className="text-[10px] text-slate-400">26 Oct 2026, 11:30</span>
                </div>
                <div className="relative">
                  <div className="absolute -left-6 top-0.5 w-3 h-3 rounded-full bg-slate-400 ring-4 ring-white"></div>
                  <p className="font-bold text-slate-900">Lead Created via Meta Campaign</p>
                  <p className="text-slate-500 text-[11px]">FalconCity_Diwali_Upgrade ad click.</p>
                  <span className="text-[10px] text-slate-400">18 Oct 2026, 10:30</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column (1 col): AI Assistant & Quick Controls */}
        <div className="space-y-6">
          {/* AI Intelligence Card */}
          <div className="bg-gradient-to-br from-indigo-900 via-[#17324D] to-[#244761] text-white p-5 rounded-card shadow-md">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5 text-teal-300">
                <Sparkles size={16} />
                <span className="text-xs font-bold uppercase tracking-wider">AI Sales Assistant</span>
              </div>
              <span className="text-xs font-black bg-teal-400/20 text-teal-300 px-2 py-0.5 rounded-full border border-teal-400/30">
                Score: {lead.aiScore}/100
              </span>
            </div>

            <p className="text-xs text-slate-200 leading-relaxed">
              <strong>High Purchase Intent (92%):</strong> Customer visited the site, reviewed payment schedules, and has valid pre-approved financing with HDFC.
            </p>

            <div className="mt-4 pt-3 border-t border-white/10 space-y-2 text-xs">
              <p className="text-teal-300 font-semibold">Recommended Next Action:</p>
              <p className="text-slate-300 text-[11px]">
                Offer 1.5% festival concession on clubhouse charges to secure booking token within 48 hours.
              </p>
            </div>

            <Link
              href="/ai-assistant"
              className="mt-4 w-full py-2 bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold text-xs rounded-lg text-center block transition-all"
            >
              Draft AI Follow-up Message →
            </Link>
          </div>

          {/* Assigned Executive Card */}
          <div className="bg-white p-5 rounded-card border border-estate-border shadow-sm text-xs">
            <h3 className="font-bold text-estate-navy text-sm mb-3">Assigned Sales Team</h3>
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
              <div className="w-10 h-10 rounded-full bg-[#17324D] text-white flex items-center justify-center font-bold text-sm">
                RS
              </div>
              <div>
                <p className="font-bold text-slate-900">Rohan Sharma</p>
                <p className="text-[11px] text-slate-500">Senior Property Advisor</p>
                <p className="text-[10px] text-slate-400 font-mono mt-0.5">+91 97401 22334</p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
              <span className="text-slate-500">Reporting Manager:</span>
              <strong className="text-slate-800">Ananya Deshmukh</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Update Stage Modal */}
      {showStatusModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-estate-border">
            <h3 className="font-bold text-base text-estate-navy mb-1">Update Pipeline Stage</h3>
            <p className="text-xs text-slate-500 mb-4">Select the new lifecycle stage for {lead.fullName}</p>

            <div className="space-y-1.5 max-h-64 overflow-y-auto">
              {pipelineStages.map((stage) => (
                <button
                  key={stage}
                  onClick={() => {
                    updateLeadStatus(lead.id, stage);
                    setShowStatusModal(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    lead.status === stage
                      ? 'bg-estate-blue text-white'
                      : 'hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  {stage}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowStatusModal(false)}
              className="mt-4 w-full py-2 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

