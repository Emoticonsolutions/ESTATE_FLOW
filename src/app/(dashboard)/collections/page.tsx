'use client';

import React, { useState } from 'react';
import {
  Receipt,
  Plus,
  Search,
  Filter,
  CreditCard,
  Building,
  CheckCircle2,
  AlertTriangle,
  Download,
  Calendar,
  Clock,
  Printer,
  X,
  FileText,
} from 'lucide-react';
import { useTenant } from '@/lib/tenantContext';
import { formatINR, formatDate } from '@/lib/utils';
import { INITIAL_PAYMENT_SCHEDULES } from '@/lib/mockData';
import { PaymentRecord } from '@/types';

export default function CollectionsPage() {
  const { payments, recordPayment, bookings, currentCompany, hasPermission } = useTenant();

  const [activeTab, setActiveTab] = useState<'payments' | 'schedules' | 'demand-letters'>('payments');
  const [showRecordModal, setShowRecordModal] = useState(false);
  const [activeReceipt, setActiveReceipt] = useState<PaymentRecord | null>(null);

  // New Payment Form
  const [paymentForm, setPaymentForm] = useState({
    bookingId: 'book-1',
    customerName: 'Dr. Arvind Swaminathan',
    unitNumber: 'Tower A - 304',
    amount: 1565000,
    paymentMethod: 'Bank Transfer' as const,
    referenceNumber: 'HDFCR920261103099182',
    receivedBy: 'Suresh Nambiar (Accounts Manager)',
  });

  const totalBookedValue = bookings.reduce((sum, b) => sum + (b.agreedPrice || 0), 0);
  const totalCollected = payments.reduce((sum, p) => sum + (p.amount || 0), 0);
  const totalOutstanding = Math.max(0, totalBookedValue - totalCollected);

  const handleSavePayment = (e: React.FormEvent) => {
    e.preventDefault();
    const newRec = recordPayment(paymentForm);
    setShowRecordModal(false);
    setActiveReceipt(newRec);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-card border border-estate-border shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black text-estate-navy">Payment Ledger & Milestone Maintenance</h1>
            <span className="text-xs bg-emerald-50 text-estate-green font-bold px-2 py-0.5 rounded-full border border-emerald-200">
              Audit-Trail Ledger (Direct-to-Bank)
            </span>
          </div>
          <p className="text-xs text-estate-muted mt-0.5">
            Maintenance record-keeping for bank RTGS/Cheque realizations, RERA milestone demand notes & stamped receipts. (EstateFlow does not process payments; all funds are deposited directly to builder escrow accounts).
          </p>
        </div>

        {hasPermission('payments', 'create') && (
          <button
            onClick={() => setShowRecordModal(true)}
            className="px-4 py-2 bg-estate-blue hover:bg-blue-600 text-white rounded-lg text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
          >
            <Plus size={15} />
            <span>Record Bank Realization</span>
          </button>
        )}
      </div>

      {/* Financial KPI Summary Cards (Section 8 Financial Dashboard) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-card border border-estate-border shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Total Booked Value</span>
          <p className="text-2xl font-black text-estate-navy mt-1">{formatINR(totalBookedValue + 285000000, true)}</p>
          <span className="text-[11px] text-slate-500 mt-1 block">Contracted gross revenue</span>
        </div>

        <div className="bg-white p-4 rounded-card border border-estate-border shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Amount Realized</span>
          <p className="text-2xl font-black text-emerald-600 mt-1">{formatINR(totalCollected + 215000000, true)}</p>
          <span className="text-[11px] text-emerald-700 font-semibold mt-1 block">75.4% collection efficiency</span>
        </div>

        <div className="bg-white p-4 rounded-card border border-estate-border shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Receivables / Dues</span>
          <p className="text-2xl font-black text-amber-600 mt-1">{formatINR(totalOutstanding + 70000000, true)}</p>
          <span className="text-[11px] text-slate-500 mt-1 block">Scheduled construction milestones</span>
        </div>

        <div className="bg-white p-4 rounded-card border border-estate-border shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Overdue Installments</span>
          <p className="text-2xl font-black text-rose-600 mt-1">₹38.5 Lakhs</p>
          <span className="text-[11px] text-rose-700 font-bold mt-1 block">2 demand notices dispatched</span>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="flex items-center gap-2 border-b border-estate-border bg-white px-4 rounded-t-card text-xs font-bold">
        {[
          { id: 'payments', label: 'Payment Receipts Log' },
          { id: 'schedules', label: 'Milestone Installment Schedules' },
          { id: 'demand-letters', label: 'Demand Letters & Invoices' },
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

      {/* Tab Content */}
      {activeTab === 'payments' && (
        <div className="bg-white rounded-b-card border border-estate-border shadow-sm overflow-hidden text-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-estate-border text-slate-500 font-bold uppercase text-[11px]">
                <tr>
                  <th className="py-3 px-4">Receipt #</th>
                  <th className="py-3 px-4">Customer & Unit</th>
                  <th className="py-3 px-4">Payment Method</th>
                  <th className="py-3 px-4">Transaction Ref</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-estate-border text-slate-700">
                {payments.map((p) => (
                  <tr key={p.id} className="hover:bg-blue-50/40 h-[52px]">
                    <td className="py-3 px-4 font-mono font-bold text-estate-navy">{p.receiptNumber}</td>
                    <td className="py-3 px-4">
                      <p className="font-bold text-slate-900">{p.customerName}</p>
                      <span className="text-[10px] text-slate-400 font-semibold">{p.unitNumber}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
                        {p.paymentMethod}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px] text-slate-500">{p.referenceNumber}</td>
                    <td className="py-3 px-4 text-slate-600">{formatDate(p.paymentDate)}</td>
                    <td className="py-3 px-4 font-extrabold text-emerald-700 font-mono text-sm">
                      {formatINR(p.amount)}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        {p.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setActiveReceipt(p)}
                        className="px-2.5 py-1 bg-estate-navy text-white hover:bg-[#244761] rounded text-[11px] font-bold"
                      >
                        Print Receipt
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'schedules' && (
        <div className="bg-white rounded-b-card border border-estate-border shadow-sm p-6 text-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-sm text-estate-navy">Active Milestone Schedule (Unit A-304)</h3>
              <p className="text-slate-500 text-[11px]">Dr. Arvind Swaminathan • Agreed Total: ₹1,56,50,000</p>
            </div>
            <span className="text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded">
              Token Received (₹15,65,000)
            </span>
          </div>

          <div className="space-y-3">
            {INITIAL_PAYMENT_SCHEDULES.map((sched, idx) => (
              <div
                key={sched.id}
                className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{sched.milestoneName}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                      {sched.percentage}%
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 mt-0.5 block">Due Date: {sched.dueDate}</span>
                </div>
                <div className="text-right">
                  <span className="font-extrabold text-estate-navy text-sm font-mono block">
                    {formatINR(sched.amountDue)}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      sched.status === 'Paid'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {sched.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'demand-letters' && (
        <div className="bg-white rounded-b-card border border-estate-border shadow-sm p-6 text-xs space-y-4">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
            <div>
              <p className="font-bold text-slate-900 text-sm">Demand Notice: Agreement Execution (10%)</p>
              <p className="text-slate-500 text-xs">Customer: Dr. Arvind Swaminathan • Due: 15 Nov 2026</p>
              <p className="text-emerald-700 font-mono font-bold mt-1">Amount Due: ₹15,65,000</p>
            </div>
            <button
              onClick={() => alert('Demand notice dispatched via WhatsApp & Email to dr.swami@apollohospital.org!')}
              className="px-4 py-2 bg-estate-blue text-white rounded-lg font-bold"
            >
              Dispatch Notice
            </button>
          </div>
        </div>
      )}

      {/* Record Payment Modal */}
      {showRecordModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-estate-border">
            <div className="flex items-center justify-between pb-3 border-b border-estate-border">
              <h3 className="font-black text-base text-estate-navy">Record Customer Payment</h3>
              <button onClick={() => setShowRecordModal(false)} className="text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSavePayment} className="mt-4 space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Customer / Booking</label>
                <select
                  value={paymentForm.customerName}
                  onChange={(e) => setPaymentForm({ ...paymentForm, customerName: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-input"
                >
                  <option value="Dr. Arvind Swaminathan">Dr. Arvind Swaminathan (Tower A - 304)</option>
                  <option value="Meenakshi & K. Natarajan">Meenakshi & K. Natarajan (Tower A - 102)</option>
                  <option value="Sunita & Deepak Singhal">Sunita & Deepak Singhal (Tower A - 404)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Amount Realized (₹) *</label>
                  <input
                    type="number"
                    value={paymentForm.amount}
                    onChange={(e) => setPaymentForm({ ...paymentForm, amount: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-input font-bold font-mono text-emerald-700"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Payment Method</label>
                  <select
                    value={paymentForm.paymentMethod}
                    onChange={(e) => setPaymentForm({ ...paymentForm, paymentMethod: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-input"
                  >
                    <option value="Bank Transfer">Bank Transfer (NEFT/RTGS)</option>
                    <option value="UPI">UPI</option>
                    <option value="Cheque">Cheque</option>
                    <option value="Payment Gateway">Payment Gateway</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Bank UTR / Reference Number *</label>
                <input
                  type="text"
                  placeholder="e.g. HDFC2026110398412"
                  value={paymentForm.referenceNumber}
                  onChange={(e) => setPaymentForm({ ...paymentForm, referenceNumber: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-input font-mono font-bold"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowRecordModal(false)}
                  className="px-3.5 py-2 border border-slate-200 text-slate-700 rounded-lg font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-estate-blue text-white rounded-lg font-bold shadow-md hover:bg-blue-600"
                >
                  Confirm & Stamp Receipt
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Official Receipt Dialog */}
      {activeReceipt && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-8 shadow-2xl border border-estate-border text-xs">
            <div className="flex items-start justify-between pb-4 border-b border-slate-200">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Official Stamped Receipt</span>
                <h3 className="font-black text-base text-estate-navy">{currentCompany.name}</h3>
                <p className="text-[10px] text-slate-500 font-mono">Receipt No: {activeReceipt.receiptNumber}</p>
              </div>
              <button onClick={() => setActiveReceipt(null)} className="text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>

            <div className="py-6 space-y-3">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Customer Name:</span>
                <strong className="text-slate-900">{activeReceipt.customerName}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Unit Number:</span>
                <strong className="text-slate-900">{activeReceipt.unitNumber}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Payment Channel:</span>
                <strong className="text-slate-900">{activeReceipt.paymentMethod}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Transaction Reference:</span>
                <strong className="font-mono text-slate-900">{activeReceipt.referenceNumber}</strong>
              </div>
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between">
                <span className="font-bold text-emerald-900 text-sm">Amount Realized:</span>
                <span className="font-black text-xl text-emerald-700 font-mono">{formatINR(activeReceipt.amount)}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex justify-end gap-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-estate-navy text-white rounded-lg font-bold"
              >
                Print Official Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

