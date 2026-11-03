'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FileCheck,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Download,
  Building,
  User,
  Eye,
  X,
  CreditCard,
  FileText,
} from 'lucide-react';
import { useTenant } from '@/lib/tenantContext';
import { formatINR, formatDate, getBookingStatusStyle } from '@/lib/utils';
import { Booking, BookingStatus } from '@/types';

export default function BookingsPage() {
  const { bookings, approveBooking, cancelBooking, addBooking, leads, units, currentRole, hasPermission } = useTenant();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedBookingDoc, setSelectedBookingDoc] = useState<Booking | null>(null);

  // New Booking State
  const [newBookingData, setNewBookingData] = useState({
    projectId: 'proj-1',
    projectName: 'Prestige Falcon City Phase 2',
    unitId: 'unit-tower-a-501',
    unitNumber: 'Tower A - 501',
    leadId: 'lead-101',
    customerName: 'Sunita & Deepak Singhal',
    customerMobile: '+91 98412 88491',
    customerEmail: 'deepak.singhal@techcorp.in',
    agreedPrice: 15450000,
    bookingAmount: 1545000,
    paymentPlan: 'Construction Linked Milestone Plan',
    salesExecutiveName: 'Rohan Sharma',
    notes: 'Unit allotted with 1 covered parking (Bay B1-12).',
    status: 'Pending Approval' as BookingStatus,
    allotmentLetterGenerated: false,
  });

  const handleCreateBooking = (e: React.FormEvent) => {
    e.preventDefault();
    addBooking(newBookingData);
    setShowCreateModal(false);
  };

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.bookingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.unitNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-card border border-estate-border shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black text-estate-navy">Booking & Allotment Management</h1>
            <span className="text-xs bg-blue-50 text-estate-blue font-bold px-2 py-0.5 rounded-full border border-blue-200">
              {bookings.length} Bookings
            </span>
          </div>
          <p className="text-xs text-estate-muted mt-0.5">
            Two-tier manager approvals, booking tokens, allotment letters and agreement tracking
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {hasPermission('bookings', 'create') && (
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-2 bg-estate-blue hover:bg-blue-600 text-white rounded-lg text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
            >
              <Plus size={15} />
              <span>New Booking Request</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-card border border-estate-border shadow-sm flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search bookings by customer name, booking ID (BK-PRESTIGE-...), or unit..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-estate-bg border border-estate-border rounded-input text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-estate-blue"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 bg-estate-bg border border-estate-border rounded-input text-xs font-medium text-slate-700 cursor-pointer focus:outline-none"
        >
          <option value="All">All Booking Statuses</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Pending Approval">Pending Approval</option>
          <option value="Approved">Approved</option>
          <option value="Draft">Draft</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-card border border-estate-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-estate-border text-slate-500 font-bold uppercase text-[11px]">
              <tr>
                <th className="py-3 px-4">Booking # & Date</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Project & Unit</th>
                <th className="py-3 px-4">Agreed Value</th>
                <th className="py-3 px-4">Booking Token</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Allotment Doc</th>
                <th className="py-3 px-4 text-right">Approval Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-estate-border text-slate-700">
              {filteredBookings.map((b) => (
                <tr key={b.id} className="hover:bg-blue-50/40 h-[52px]">
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className="font-bold text-estate-navy font-mono block">{b.bookingNumber}</span>
                    <span className="text-[10px] text-slate-400">{formatDate(b.bookingDate)}</span>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <p className="font-bold text-slate-900">{b.customerName}</p>
                    <p className="text-[10px] text-slate-400 font-mono">{b.customerMobile}</p>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className="font-bold text-slate-800">{b.unitNumber}</span>
                    <span className="text-[10px] text-slate-400 block">{b.projectName}</span>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap font-extrabold text-estate-navy">
                    {formatINR(b.agreedPrice)}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap font-bold text-estate-green">
                    {formatINR(b.bookingAmount)}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className={`px-2.5 py-1 rounded-md text-[11px] ${getBookingStatusStyle(b.status)}`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <button
                      onClick={() => setSelectedBookingDoc(b)}
                      className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-estate-blue rounded text-[11px] font-bold flex items-center gap-1"
                    >
                      <FileText size={12} />
                      <span>Allotment Letter</span>
                    </button>
                  </td>
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    {b.status === 'Pending Approval' && hasPermission('bookings', 'approve') ? (
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => approveBooking(b.id)}
                          className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[11px] font-bold shadow-sm"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => cancelBooking(b.id)}
                          className="px-2.5 py-1 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded text-[11px] font-bold"
                        >
                          Reject
                        </button>
                      </div>
                    ) : b.status === 'Confirmed' ? (
                      <span className="text-emerald-700 font-bold text-[11px] flex items-center justify-end gap-1">
                        <CheckCircle2 size={13} /> Realized
                      </span>
                    ) : (
                      <span className="text-slate-400 text-[11px]">{b.status}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Booking Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-estate-border max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-estate-border">
              <h3 className="font-black text-base text-estate-navy">Create Property Booking Request</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateBooking} className="mt-4 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Customer Name</label>
                  <input
                    type="text"
                    value={newBookingData.customerName}
                    onChange={(e) => setNewBookingData({ ...newBookingData, customerName: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-input"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Mobile</label>
                  <input
                    type="tel"
                    value={newBookingData.customerMobile}
                    onChange={(e) => setNewBookingData({ ...newBookingData, customerMobile: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-input font-mono"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Unit Allotted</label>
                  <input
                    type="text"
                    value={newBookingData.unitNumber}
                    onChange={(e) => setNewBookingData({ ...newBookingData, unitNumber: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-input font-bold"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Contract Agreed Value (₹)</label>
                  <input
                    type="number"
                    value={newBookingData.agreedPrice}
                    onChange={(e) => setNewBookingData({ ...newBookingData, agreedPrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-input font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Initial Booking Token Amount (₹)</label>
                <input
                  type="number"
                  value={newBookingData.bookingAmount}
                  onChange={(e) => setNewBookingData({ ...newBookingData, bookingAmount: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-input font-bold text-emerald-700"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-estate-blue text-white rounded-lg font-bold shadow-md hover:bg-blue-600"
                >
                  Submit for Approval
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Allotment Letter Document Preview Dialog */}
      {selectedBookingDoc && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-8 shadow-2xl border border-estate-border max-h-[90vh] overflow-y-auto text-xs">
            <div className="flex items-start justify-between pb-4 border-b border-slate-200">
              <div>
                <h3 className="font-black text-lg text-estate-navy">OFFICIAL PROVISIONAL ALLOTMENT LETTER</h3>
                <p className="text-[10px] text-slate-400 font-mono">Document ref: ALLOT-{selectedBookingDoc.bookingNumber}</p>
              </div>
              <button onClick={() => setSelectedBookingDoc(null)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>

            <div className="py-6 space-y-4 text-slate-700 leading-relaxed">
              <p>Dear <strong>{selectedBookingDoc.customerName}</strong>,</p>
              <p>
                We have great pleasure in provisionally allotting you residential unit <strong>{selectedBookingDoc.unitNumber}</strong> in our development <strong>{selectedBookingDoc.projectName}</strong>.
              </p>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Total Agreed Price</span>
                  <strong className="text-estate-navy text-sm font-mono">{formatINR(selectedBookingDoc.agreedPrice)}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Booking Token Realized</span>
                  <strong className="text-emerald-700 text-sm font-mono">{formatINR(selectedBookingDoc.bookingAmount)}</strong>
                </div>
              </div>
              <p className="text-[11px] text-slate-500">
                This provisional allotment is subject to execution of the Agreement for Sale within 30 days and adherence to RERA milestone payment schedules.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-200 flex justify-end gap-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-estate-navy text-white rounded-lg font-bold"
              >
                Print Allotment Letter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

