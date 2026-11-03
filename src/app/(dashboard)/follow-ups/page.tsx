'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  CalendarClock,
  Plus,
  Phone,
  MessageSquare,
  Mail,
  Users,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Clock,
  RotateCcw,
  X,
} from 'lucide-react';
import { useTenant } from '@/lib/tenantContext';
import { formatDate, formatDateTime } from '@/lib/utils';
import { FollowUpType } from '@/types';

export default function FollowUpsPage() {
  const { followUps, leads, addFollowUp, completeFollowUp } = useTenant();
  const [activeTab, setActiveTab] = useState<'today' | 'upcoming' | 'overdue' | 'completed'>('today');

  // Modal State
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedLeadId, setSelectedLeadId] = useState(leads[0]?.id || '');
  const [fuType, setFuType] = useState<FollowUpType>('Phone Call');
  const [fuDateTime, setFuDateTime] = useState('2026-11-04T11:00:00');
  const [fuRemarks, setFuRemarks] = useState('');

  // Complete Dialog State
  const [completingId, setCompletingId] = useState<string | null>(null);
  const [completionNotes, setCompletionNotes] = useState('');

  const todayFollowUps = followUps.filter((f) => !f.isCompleted && !f.isOverdue);
  const overdueFollowUps = followUps.filter((f) => !f.isCompleted && f.isOverdue);
  const completedFollowUps = followUps.filter((f) => f.isCompleted);
  const allUpcoming = followUps.filter((f) => !f.isCompleted);

  const getListForTab = () => {
    switch (activeTab) {
      case 'today':
        return todayFollowUps;
      case 'overdue':
        return overdueFollowUps;
      case 'completed':
        return completedFollowUps;
      case 'upcoming':
        return allUpcoming;
    }
  };

  const currentList = getListForTab();

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const targetLead = leads.find((l) => l.id === selectedLeadId) || leads[0];
    addFollowUp({
      leadId: targetLead.id,
      leadName: targetLead.fullName,
      leadMobile: targetLead.mobile,
      assignedToId: 'user-sales-exec-1',
      assignedToName: 'Rohan Sharma',
      type: fuType,
      dateTime: fuDateTime,
      remarks: fuRemarks,
    });
    setShowScheduleModal(false);
    setFuRemarks('');
  };

  const handleFinishCompletion = (id: string) => {
    completeFollowUp(id, completionNotes || 'Discussion completed successfully.');
    setCompletingId(null);
    setCompletionNotes('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-card border border-estate-border shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black text-estate-navy">Follow-up & Task Engine</h1>
            <span className="text-xs bg-amber-50 text-estate-amber font-bold px-2.5 py-0.5 rounded-full border border-amber-200">
              {overdueFollowUps.length > 0 ? `${overdueFollowUps.length} Overdue Alerts` : 'All On Track'}
            </span>
          </div>
          <p className="text-xs text-estate-muted mt-0.5">
            Automated notifications, multi-channel customer contacts and site visit reminders
          </p>
        </div>

        <button
          onClick={() => setShowScheduleModal(true)}
          className="px-4 py-2 bg-estate-blue hover:bg-blue-600 text-white rounded-lg text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
        >
          <Plus size={15} />
          <span>Schedule Follow-up</span>
        </button>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center gap-2 border-b border-estate-border bg-white px-4 rounded-t-card">
        {[
          { id: 'today', label: "Today's Follow-ups", count: todayFollowUps.length, color: 'text-estate-blue' },
          { id: 'upcoming', label: 'All Scheduled', count: allUpcoming.length, color: 'text-slate-700' },
          { id: 'overdue', label: 'Overdue Alerts', count: overdueFollowUps.length, color: 'text-estate-red' },
          { id: 'completed', label: 'Completed Log', count: completedFollowUps.length, color: 'text-estate-green' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`py-3.5 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-all ${
              activeTab === tab.id
                ? 'border-estate-blue text-estate-blue'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>{tab.label}</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] bg-slate-100 ${tab.color} font-bold`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Follow-up Cards */}
      <div className="space-y-3">
        {currentList.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-b-card border border-estate-border">
            <CheckCircle2 size={36} className="mx-auto text-emerald-500 mb-2" />
            <p className="text-sm font-bold text-slate-800">No tasks in this category</p>
            <p className="text-xs text-slate-400 mt-1">All follow-ups are up to date.</p>
          </div>
        ) : (
          currentList.map((fu) => (
            <div
              key={fu.id}
              className={`bg-white p-4 rounded-card border shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all ${
                fu.isOverdue
                  ? 'border-red-200 bg-red-50/20'
                  : fu.isCompleted
                  ? 'border-slate-200 bg-slate-50/40 opacity-80'
                  : 'border-estate-border hover:border-blue-300'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div
                  className={`p-2.5 rounded-xl shrink-0 ${
                    fu.type === 'Phone Call'
                      ? 'bg-blue-50 text-blue-600'
                      : fu.type === 'WhatsApp'
                      ? 'bg-emerald-50 text-emerald-600'
                      : fu.type === 'Site Visit'
                      ? 'bg-amber-50 text-amber-600'
                      : 'bg-purple-50 text-purple-600'
                  }`}
                >
                  {fu.type === 'Phone Call' && <Phone size={18} />}
                  {fu.type === 'WhatsApp' && <MessageSquare size={18} />}
                  {fu.type === 'Site Visit' && <MapPin size={18} />}
                  {fu.type !== 'Phone Call' && fu.type !== 'WhatsApp' && fu.type !== 'Site Visit' && <Clock size={18} />}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <Link href={`/leads/${fu.leadId}`} className="font-bold text-sm text-slate-900 hover:text-estate-blue">
                      {fu.leadName}
                    </Link>
                    <span className="text-xs font-mono text-slate-400">({fu.leadMobile})</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700">
                      {fu.type}
                    </span>
                    {fu.isOverdue && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-700 flex items-center gap-1">
                        <AlertTriangle size={11} /> Overdue Task
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 mt-1">{fu.remarks}</p>

                  <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-2">
                    <span>Scheduled: <strong>{formatDateTime(fu.dateTime)}</strong></span>
                    <span>•</span>
                    <span>Assigned: <strong>{fu.assignedToName}</strong></span>
                    {fu.isCompleted && fu.completionNotes && (
                      <>
                        <span>•</span>
                        <span className="text-emerald-700 font-medium">Outcome: {fu.completionNotes}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={`https://wa.me/${fu.leadMobile.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg"
                  title="WhatsApp"
                >
                  <MessageSquare size={16} />
                </a>
                <a
                  href={`tel:${fu.leadMobile}`}
                  className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                  title="Call"
                >
                  <Phone size={16} />
                </a>

                {!fu.isCompleted ? (
                  completingId === fu.id ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Call notes / outcome..."
                        value={completionNotes}
                        onChange={(e) => setCompletionNotes(e.target.value)}
                        className="px-2.5 py-1 text-xs border border-slate-300 rounded"
                        autoFocus
                      />
                      <button
                        onClick={() => handleFinishCompletion(fu.id)}
                        className="px-2.5 py-1 bg-emerald-600 text-white rounded text-xs font-bold"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setCompletingId(null)}
                        className="text-slate-400 text-xs hover:text-slate-600"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setCompletingId(fu.id)}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5"
                    >
                      <CheckCircle2 size={14} />
                      <span>Complete Task</span>
                    </button>
                  )
                ) : (
                  <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                    <CheckCircle2 size={15} /> Completed
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Schedule Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-estate-border">
            <div className="flex items-center justify-between pb-3 border-b border-estate-border">
              <h3 className="font-bold text-base text-estate-navy">Schedule New Follow-up</h3>
              <button onClick={() => setShowScheduleModal(false)} className="text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreate} className="mt-4 space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Select Customer Lead</label>
                <select
                  value={selectedLeadId}
                  onChange={(e) => setSelectedLeadId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-input"
                >
                  {leads.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.fullName} ({l.leadNumber}) - {l.mobile}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Follow-up Channel</label>
                  <select
                    value={fuType}
                    onChange={(e) => setFuType(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-input font-medium"
                  >
                    <option value="Phone Call">Phone Call</option>
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="Site Visit">Site Visit</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Email">Email</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Target Date & Time</label>
                  <input
                    type="datetime-local"
                    value={fuDateTime}
                    onChange={(e) => setFuDateTime(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-input font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Agenda & Notes</label>
                <textarea
                  rows={3}
                  placeholder="e.g. Discuss revised cost sheet with 1.5% discount approval and parking bay selection..."
                  value={fuRemarks}
                  onChange={(e) => setFuRemarks(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-input"
                  required
                ></textarea>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowScheduleModal(false)}
                  className="px-3.5 py-2 border border-slate-200 text-slate-700 rounded-lg font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-estate-blue text-white rounded-lg font-bold shadow-md hover:bg-blue-600"
                >
                  Save Reminder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

