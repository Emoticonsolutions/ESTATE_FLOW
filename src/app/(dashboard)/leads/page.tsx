'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Users,
  Plus,
  Search,
  Filter,
  Download,
  Phone,
  MessageSquare,
  Mail,
  Eye,
  Calendar,
  AlertCircle,
  CheckCircle2,
  MoreVertical,
  Flame,
  X,
  FileSpreadsheet,
} from 'lucide-react';
import { useTenant } from '@/lib/tenantContext';
import { formatINR, formatDate, getLeadPriorityStyle, getLeadStatusColor } from '@/lib/utils';
import { LeadPriority, LeadStatus } from '@/types';

export default function LeadsPage() {
  const { leads, addLead, currentCompany, hasPermission, currentRole, currentUser } = useTenant();

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sourceFilter, setSourceFilter] = useState('All');
  const [onlyMyLeads, setOnlyMyLeads] = useState(currentRole === 'SALES_EXECUTIVE' || currentRole === 'BROKER');

  // Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [duplicateWarning, setDuplicateWarning] = useState<string | null>(null);

  // New Lead Form State
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    alternateMobile: '',
    email: '',
    city: 'Bangalore',
    state: 'Karnataka',
    preferredContactMethod: 'WhatsApp' as 'WhatsApp' | 'Phone' | 'Email',
    interestedProjectId: 'proj-1',
    propertyType: 'Apartment' as const,
    configuration: '3 BHK' as const,
    budgetMin: 125,
    budgetMax: 160,
    preferredFloor: 'Floor 3-5',
    purpose: 'End-use' as const,
    possessionPreference: 'Within 6 Months' as const,
    source: 'Meta (Facebook/IG)' as const,
    campaign: 'Nov_Festive_Campaign',
    priority: 'Hot' as LeadPriority,
    assignedManagerId: 'user-sales-manager',
    assignedExecutiveId: 'user-sales-exec-1',
    status: 'New' as LeadStatus,
    aiScore: 85,
    notes: '',
    nextFollowUpDate: '2026-11-05T11:00:00',
  });

  // Duplicate detection check
  const handleMobileChange = (mobile: string) => {
    setFormData((prev) => ({ ...prev, mobile }));
    const duplicate = leads.find((l) => l.mobile.replace(/\s+/g, '') === mobile.replace(/\s+/g, ''));
    if (duplicate) {
      setDuplicateWarning(`Duplicate alert! An existing lead (${duplicate.fullName} - ${duplicate.leadNumber}) already has this mobile number.`);
    } else {
      setDuplicateWarning(null);
    }
  };

  const handleSubmitLead = (e: React.FormEvent) => {
    e.preventDefault();
    addLead(formData);
    setShowAddModal(false);
    setDuplicateWarning(null);
    // Reset form
    setFormData({
      fullName: '',
      mobile: '',
      alternateMobile: '',
      email: '',
      city: 'Bangalore',
      state: 'Karnataka',
      preferredContactMethod: 'WhatsApp',
      interestedProjectId: 'proj-1',
      propertyType: 'Apartment',
      configuration: '3 BHK',
      budgetMin: 125,
      budgetMax: 160,
      preferredFloor: '',
      purpose: 'End-use',
      possessionPreference: 'Within 6 Months',
      source: 'Meta (Facebook/IG)',
      campaign: '',
      priority: 'Hot',
      assignedManagerId: 'user-sales-manager',
      assignedExecutiveId: 'user-sales-exec-1',
      status: 'New',
      aiScore: 80,
      notes: '',
      nextFollowUpDate: '',
    });
  };

  // Filtered Leads according to RBAC Role
  const filteredLeads = leads.filter((lead) => {
    // If external broker, only show broker attributed leads
    if (currentRole === 'BROKER') {
      if (lead.source !== 'Broker Referral' && !lead.notes?.toLowerCase().includes('apex')) {
        return false;
      }
    } else if (currentRole === 'SALES_EXECUTIVE' && onlyMyLeads) {
      if (lead.assignedExecutiveId !== currentUser.id && lead.assignedExecutiveId !== 'user-sales-exec-1') {
        return false;
      }
    }

    const matchesSearch =
      lead.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.mobile.includes(searchTerm) ||
      lead.leadNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPriority = priorityFilter === 'All' || lead.priority === priorityFilter;
    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
    const matchesSource = sourceFilter === 'All' || lead.source === sourceFilter;

    return matchesSearch && matchesPriority && matchesStatus && matchesSource;
  });

  const exportCSV = () => {
    const headers = ['Lead Number', 'Name', 'Mobile', 'Email', 'Configuration', 'Budget Max', 'Source', 'Priority', 'Status', 'AI Score'];
    const rows = filteredLeads.map((l) => [
      l.leadNumber,
      `"${l.fullName}"`,
      l.mobile,
      l.email,
      l.configuration,
      `₹${l.budgetMax}L`,
      l.source,
      l.priority,
      l.status,
      l.aiScore,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `leads_${currentCompany.code}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Role-Specific Context Notification Banner */}
      {currentRole === 'SALES_EXECUTIVE' && (
        <div className="p-3.5 bg-teal-50 border border-teal-200 rounded-xl flex items-center justify-between text-xs text-teal-900">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
            <span>
              <strong>Sales Executive View:</strong> Showing leads assigned to <strong>{currentUser?.name || 'Rohan Sharma'}</strong>.
            </span>
          </div>
          <button
            onClick={() => setOnlyMyLeads(!onlyMyLeads)}
            className="text-[11px] font-bold underline hover:text-teal-950"
          >
            {onlyMyLeads ? 'Show All Company Leads' : 'Filter Back to My Assigned Leads'}
          </button>
        </div>
      )}

      {currentRole === 'BROKER' && (
        <div className="p-3.5 bg-purple-50 border border-purple-200 rounded-xl flex items-center justify-between text-xs text-purple-900">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-500"></span>
            <span>
              <strong>Channel Partner Registry (Apex Realty):</strong> Showing your tagged buyer leads. 90-day anti-poaching lock active.
            </span>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="text-[11px] font-bold bg-purple-600 text-white px-2.5 py-1 rounded hover:bg-purple-700"
          >
            + Register New Client
          </button>
        </div>
      )}

      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-card border border-estate-border shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black text-estate-navy">
              {currentRole === 'BROKER' ? 'My Registered Clients (Channel Partner)' : 'Lead Management (Lead 360)'}
            </h1>
            <span className="text-xs bg-slate-100 text-slate-700 font-bold px-2 py-0.5 rounded-full">
              {filteredLeads.length} Total
            </span>
          </div>
          <p className="text-xs text-estate-muted mt-0.5">
            {currentRole === 'BROKER'
              ? 'Track the qualification, site visit and booking progression of your referred clients'
              : 'Capture, qualify, deduplicate and track enquiries from all digital and channel partner sources'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href="/leads/pipeline"
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5"
          >
            <span>Kanban Pipeline</span>
          </Link>

          <button
            onClick={exportCSV}
            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5"
          >
            <Download size={14} />
            <span>Export CSV</span>
          </button>

          {hasPermission('leads', 'create') && (
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-estate-blue hover:bg-blue-600 text-white rounded-lg text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
            >
              <Plus size={15} />
              <span>Add New Lead</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-card border border-estate-border shadow-sm flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by customer name, phone (+91...), lead ID (LEAD-2026-...) or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-estate-bg border border-estate-border rounded-input text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-estate-blue"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Priority */}
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-3 py-2 bg-estate-bg border border-estate-border rounded-input text-xs font-medium text-slate-700 cursor-pointer focus:outline-none"
          >
            <option value="All">All Priorities</option>
            <option value="Hot">Hot Priority</option>
            <option value="Warm">Warm Priority</option>
            <option value="Cold">Cold Priority</option>
            <option value="Qualified">Qualified</option>
          </select>

          {/* Status */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-estate-bg border border-estate-border rounded-input text-xs font-medium text-slate-700 cursor-pointer focus:outline-none"
          >
            <option value="All">All Stages</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Site Visit Scheduled">Site Visit Scheduled</option>
            <option value="Site Visit Completed">Site Visit Completed</option>
            <option value="Negotiation">Negotiation</option>
            <option value="Booked">Booked</option>
            <option value="Lost">Lost</option>
          </select>

          {/* Source */}
          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="px-3 py-2 bg-estate-bg border border-estate-border rounded-input text-xs font-medium text-slate-700 cursor-pointer focus:outline-none"
          >
            <option value="All">All Sources</option>
            <option value="Meta (Facebook/IG)">Meta (FB/IG)</option>
            <option value="Google Ads">Google Ads</option>
            <option value="99acres">99acres</option>
            <option value="Broker Referral">Broker Referral</option>
            <option value="Website Form">Website Form</option>
            <option value="Walk-in">Walk-in</option>
          </select>
        </div>
      </div>

      {/* Leads Data Table (Row Height 52px as per Section 2.4) */}
      <div className="bg-white rounded-card border border-estate-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-estate-border text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4 w-10">
                  <input type="checkbox" className="rounded text-estate-blue cursor-pointer" />
                </th>
                <th className="py-3 px-4">Lead ID & Date</th>
                <th className="py-3 px-4">Customer Details</th>
                <th className="py-3 px-4">Requirement</th>
                <th className="py-3 px-4">Source</th>
                <th className="py-3 px-4">Priority</th>
                <th className="py-3 px-4">AI Score</th>
                <th className="py-3 px-4">Current Stage</th>
                <th className="py-3 px-4">Next Follow-up</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-estate-border text-slate-700">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-12 text-center text-slate-400">
                    No leads matching your current filter criteria.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => {
                  const priorityStyle = getLeadPriorityStyle(lead.priority);
                  const statusStyle = getLeadStatusColor(lead.status);

                  return (
                    <tr
                      key={lead.id}
                      className="hover:bg-blue-50/30 transition-colors h-[52px]"
                    >
                      <td className="py-3 px-4">
                        <input type="checkbox" className="rounded text-estate-blue cursor-pointer" />
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <Link
                          href={`/leads/${lead.id}`}
                          className="font-bold text-estate-blue hover:underline"
                        >
                          {lead.leadNumber}
                        </Link>
                        <span className="block text-[10px] text-slate-400">{formatDate(lead.createdAt)}</span>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <p className="font-bold text-slate-900">{lead.fullName}</p>
                        <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                          <span className="flex items-center gap-1 font-mono">{lead.mobile}</span>
                          <span className="text-slate-300">•</span>
                          <span>{lead.city}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="font-semibold text-slate-800">{lead.configuration}</span>
                        <span className="text-slate-400 text-[11px] block">
                          ₹{lead.budgetMin}L - ₹{lead.budgetMax}L
                        </span>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700">
                          {lead.source}
                        </span>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${priorityStyle.badge}`}>
                          {lead.priority}
                        </span>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <div className="w-12 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                            <div
                              className={`h-full ${lead.aiScore > 80 ? 'bg-emerald-500' : lead.aiScore > 50 ? 'bg-amber-500' : 'bg-slate-400'}`}
                              style={{ width: `${lead.aiScore}%` }}
                            ></div>
                          </div>
                          <span className="font-bold text-[11px] text-slate-700">{lead.aiScore}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className={`px-2.5 py-1 rounded-md text-[11px] font-semibold border ${statusStyle}`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap text-slate-600 text-[11px]">
                        {lead.nextFollowUpDate ? formatDate(lead.nextFollowUpDate) : '-'}
                      </td>
                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link
                            href={`/leads/${lead.id}`}
                            className="p-1 text-slate-400 hover:text-estate-blue hover:bg-blue-50 rounded"
                            title="View Lead 360"
                          >
                            <Eye size={15} />
                          </Link>
                          <a
                            href={`https://wa.me/${lead.mobile.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded"
                            title="WhatsApp Chat"
                          >
                            <MessageSquare size={15} />
                          </a>
                          <a
                            href={`tel:${lead.mobile}`}
                            className="p-1 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded"
                            title="Call Customer"
                          >
                            <Phone size={15} />
                          </a>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination bar */}
        <div className="p-3 bg-slate-50 border-t border-estate-border flex items-center justify-between text-xs text-slate-500">
          <span>Showing 1 to {filteredLeads.length} of {filteredLeads.length} entries</span>
          <div className="flex items-center gap-1">
            <button className="px-2.5 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50" disabled>
              Previous
            </button>
            <span className="px-3 py-1 rounded bg-estate-blue text-white font-bold">1</span>
            <button className="px-2.5 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50" disabled>
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Add Lead Slide-Over / Modal Dialog (Section 2.5 & Module 2) */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-estate-border p-6">
            <div className="flex items-center justify-between pb-4 border-b border-estate-border">
              <div>
                <h2 className="text-base font-black text-estate-navy">Capture New Customer Enquiry</h2>
                <p className="text-xs text-slate-500">Complete lead intake with instant duplicate verification</p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            {duplicateWarning && (
              <div className="mt-4 p-3 bg-rose-50 border border-rose-200 rounded-lg flex items-start gap-2.5 text-xs text-rose-700">
                <AlertCircle size={16} className="shrink-0 mt-0.5 text-rose-600" />
                <div>
                  <p className="font-bold">Duplicate Detected</p>
                  <p>{duplicateWarning}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmitLead} className="mt-4 space-y-4">
              {/* Customer Details */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h3 className="text-xs font-bold text-estate-navy uppercase tracking-wider mb-3">
                  1. Customer Identification
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Chandra"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-input text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98000 00000"
                      value={formData.mobile}
                      onChange={(e) => handleMobileChange(e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-input text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="ramesh@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-input text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">City & State</label>
                    <input
                      type="text"
                      placeholder="Bangalore, Karnataka"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-input text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Property Requirements */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h3 className="text-xs font-bold text-estate-navy uppercase tracking-wider mb-3">
                  2. Property Requirements
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Interested Project</label>
                    <select
                      value={formData.interestedProjectId}
                      onChange={(e) => setFormData({ ...formData, interestedProjectId: e.target.value })}
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-input text-xs"
                    >
                      <option value="proj-1">Prestige Falcon City Ph 2</option>
                      <option value="proj-2">Prestige Sanctuary Villas</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Configuration</label>
                    <select
                      value={formData.configuration}
                      onChange={(e) => setFormData({ ...formData, configuration: e.target.value as any })}
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-input text-xs"
                    >
                      <option value="1 BHK">1 BHK</option>
                      <option value="2 BHK">2 BHK</option>
                      <option value="3 BHK">3 BHK</option>
                      <option value="4 BHK">4 BHK</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Budget Max (₹ Lakhs)</label>
                    <input
                      type="number"
                      value={formData.budgetMax}
                      onChange={(e) => setFormData({ ...formData, budgetMax: Number(e.target.value) })}
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-input text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Attribution & Assignment */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h3 className="text-xs font-bold text-estate-navy uppercase tracking-wider mb-3">
                  3. Attribution & Assignment
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Lead Source</label>
                    <select
                      value={formData.source}
                      onChange={(e) => setFormData({ ...formData, source: e.target.value as any })}
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-input text-xs"
                    >
                      <option value="Meta (Facebook/IG)">Meta (Facebook/IG)</option>
                      <option value="Google Ads">Google Ads</option>
                      <option value="99acres">99acres</option>
                      <option value="Broker Referral">Broker Referral</option>
                      <option value="Website Form">Website Form</option>
                      <option value="Walk-in">Walk-in</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Priority</label>
                    <select
                      value={formData.priority}
                      onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-input text-xs font-semibold"
                    >
                      <option value="Hot">Hot Priority</option>
                      <option value="Warm">Warm Priority</option>
                      <option value="Cold">Cold Priority</option>
                      <option value="Qualified">Qualified</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Assign Sales Advisor</label>
                    <select
                      value={formData.assignedExecutiveId}
                      onChange={(e) => setFormData({ ...formData, assignedExecutiveId: e.target.value })}
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-input text-xs"
                    >
                      <option value="user-sales-exec-1">Rohan Sharma (Round-Robin)</option>
                      <option value="user-sales-exec-2">Priya Iyer</option>
                    </select>
                  </div>
                </div>

                <div className="mt-3">
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Initial Discussion Notes</label>
                  <textarea
                    rows={2}
                    placeholder="Specific requirements, preferred facing, move-in timeframe..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-input text-xs"
                  ></textarea>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-estate-blue hover:bg-blue-600 text-white rounded-lg text-xs font-bold shadow-md transition-all"
                >
                  Save & Register Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

