'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Calculator,
  Download,
  Share2,
  Printer,
  Sparkles,
  Building,
  CheckCircle2,
  AlertCircle,
  FileText,
  MessageSquare,
  ShieldAlert,
} from 'lucide-react';
import { useTenant } from '@/lib/tenantContext';
import { formatINR, formatDate } from '@/lib/utils';

export default function CostSheetsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500 text-xs">Loading Cost Sheet Calculator...</div>}>
      <CostSheetContent />
    </Suspense>
  );
}

function CostSheetContent() {
  const searchParams = useSearchParams();
  const { currentCompany, leads, units, currentRole } = useTenant();

  // Selected parameters
  const [selectedProject, setSelectedProject] = useState('proj-1');
  const [selectedUnitNumber, setSelectedUnitNumber] = useState('501');
  const [customerName, setCustomerName] = useState('Sunita & Deepak Singhal');
  const [customerMobile, setCustomerMobile] = useState('+91 98412 88491');
  const [paymentPlan, setPaymentPlan] = useState<'CLP' | 'DP1090' | 'FLEXI'>('CLP');

  // Pricing inputs
  const [basePrice, setBasePrice] = useState(14500000);
  const [floorRise, setFloorRise] = useState(250000);
  const [plc, setPlc] = useState(200000);
  const [parking, setParking] = useState(350000);
  const [clubhouse, setClubhouse] = useState(250000);
  const [maintenance, setMaintenance] = useState(120000);
  const [otherCharges, setOtherCharges] = useState(80000);
  const [discount, setDiscount] = useState(200000);
  const [discountApproved, setDiscountApproved] = useState(true);

  // Read query params if arriving from inventory
  useEffect(() => {
    const qUnit = searchParams.get('unit');
    const qPrice = searchParams.get('price');
    if (qUnit) setSelectedUnitNumber(qUnit);
    if (qPrice) setBasePrice(Number(qPrice));
  }, [searchParams]);

  // Calculations
  const subtotal = basePrice + floorRise + plc + parking + clubhouse + maintenance + otherCharges;
  const taxableAmount = Math.max(0, subtotal - discount);
  const gstRate = 0.05; // 5% GST for under construction residential
  const gstAmount = Math.round(taxableAmount * gstRate);
  const finalTotal = taxableAmount + gstAmount;

  // Milestone Schedule breakdown
  const milestones = [
    { name: 'Booking Token (Immediate)', pct: 10, amount: Math.round(finalTotal * 0.1) },
    { name: 'Agreement Signing (within 30 days)', pct: 10, amount: Math.round(finalTotal * 0.1) },
    { name: 'Completion of Plinth / Foundation', pct: 15, amount: Math.round(finalTotal * 0.15) },
    { name: 'Casting of 4th Slab', pct: 25, amount: Math.round(finalTotal * 0.25) },
    { name: 'Finishing & Flooring Milestone', pct: 20, amount: Math.round(finalTotal * 0.2) },
    { name: 'Possession & Handover Notice', pct: 20, amount: Math.round(finalTotal * 0.2) },
  ];

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `*${currentCompany.name} - Official Cost Estimate*\nProject: Prestige Falcon City Ph 2\nUnit: A-${selectedUnitNumber} (3 BHK)\nFinal Contract Total: ${formatINR(finalTotal)}\nAll-inclusive (GST included).\nContact your relationship advisor for formal allotment.`
    );
    window.open(`https://wa.me/${customerMobile.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-card border border-estate-border shadow-sm no-print">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black text-estate-navy">Dynamic Cost Sheet Generator</h1>
            <span className="text-xs bg-indigo-50 text-indigo-700 font-bold px-2 py-0.5 rounded-full border border-indigo-200">
              RERA Compliant Breakdown
            </span>
          </div>
          <p className="text-xs text-estate-muted mt-0.5">
            Auto-calculates floor rise, PLC, amenities, parking, GST tax schedules & manager discount approvals
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleWhatsAppShare}
            className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
          >
            <MessageSquare size={14} />
            <span>Share via WhatsApp</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-estate-navy hover:bg-[#244761] text-white rounded-lg text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
          >
            <Printer size={14} />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 1 Column: Inputs & Controls (hidden during print) */}
        <div className="bg-white p-5 rounded-card border border-estate-border shadow-sm space-y-4 text-xs no-print">
          <h2 className="font-extrabold text-sm text-estate-navy pb-2 border-b border-slate-100 flex items-center gap-2">
            <Calculator size={16} className="text-estate-blue" />
            <span>Cost Calculator Controls</span>
          </h2>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Select Customer Lead</label>
            <select
              onChange={(e) => {
                const lead = leads.find((l) => l.fullName === e.target.value);
                if (lead) {
                  setCustomerName(lead.fullName);
                  setCustomerMobile(lead.mobile);
                }
              }}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-input font-medium"
            >
              {leads.map((l) => (
                <option key={l.id} value={l.fullName}>
                  {l.fullName} ({l.configuration})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Unit Number</label>
              <input
                type="text"
                value={selectedUnitNumber}
                onChange={(e) => setSelectedUnitNumber(e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-input font-mono font-bold"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Payment Plan</label>
              <select
                value={paymentPlan}
                onChange={(e) => setPaymentPlan(e.target.value as any)}
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-input"
              >
                <option value="CLP">Construction Linked (CLP)</option>
                <option value="DP1090">10:90 Subvention Plan</option>
                <option value="FLEXI">50:50 Flexi Milestone</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Base Price (₹)</label>
            <input
              type="number"
              value={basePrice}
              onChange={(e) => setBasePrice(Number(e.target.value))}
              className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-input font-mono font-bold"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Floor Rise (₹)</label>
              <input
                type="number"
                value={floorRise}
                onChange={(e) => setFloorRise(Number(e.target.value))}
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-input font-mono"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">PLC Charges (₹)</label>
              <input
                type="number"
                value={plc}
                onChange={(e) => setPlc(Number(e.target.value))}
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-input font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Covered Parking (₹)</label>
              <input
                type="number"
                value={parking}
                onChange={(e) => setParking(Number(e.target.value))}
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-input font-mono"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Clubhouse Fee (₹)</label>
              <input
                type="number"
                value={clubhouse}
                onChange={(e) => setClubhouse(Number(e.target.value))}
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-input font-mono"
              />
            </div>
          </div>

          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-bold text-amber-900">Special Discount (₹)</span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">
                Manager Approved
              </span>
            </div>
            <input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(Number(e.target.value))}
              className="w-full px-3 py-1.5 bg-white border border-amber-300 rounded-input font-mono font-bold text-amber-900"
            />
            <p className="text-[10px] text-amber-700 mt-1">Authorized by Ananya Deshmukh (VP Sales)</p>
          </div>
        </div>

        {/* Right 2 Columns: Printable Official Cost Sheet Document */}
        <div className="lg:col-span-2 bg-white rounded-card border border-estate-border shadow-md p-8 text-xs font-sans">
          {/* Document Header */}
          <div className="flex items-start justify-between pb-6 border-b-2 border-estate-navy">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-estate-navy text-white font-extrabold flex items-center justify-center text-sm">
                  EF
                </div>
                <span className="text-xl font-black text-estate-navy tracking-wide">
                  {currentCompany.name.toUpperCase()}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Official Project Cost Estimate & Payment Schedule</p>
              <p className="text-[10px] text-slate-400 font-mono mt-0.5">RERA: PRM/KA/RERA/1251/310/PR/180516/001777</p>
            </div>

            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Ref #</span>
              <span className="font-mono font-bold text-estate-navy text-xs">CS-2026-FALCON-084</span>
              <span className="text-[11px] text-slate-500 block mt-1">Date: {formatDate(new Date().toISOString())}</span>
            </div>
          </div>

          {/* Unit & Client Details Row */}
          <div className="grid grid-cols-2 gap-4 py-4 border-b border-slate-200">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Prepared For</span>
              <p className="font-bold text-slate-900 text-sm mt-0.5">{customerName}</p>
              <p className="text-slate-500 font-mono text-xs">{customerMobile}</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Property Details</span>
              <p className="font-bold text-estate-navy text-sm mt-0.5">
                Prestige Falcon City Ph 2 • Unit {selectedUnitNumber}
              </p>
              <p className="text-slate-500 text-xs">3 BHK • 1,420 Carpet sq ft • Tower A</p>
            </div>
          </div>

          {/* Price Component Table (Section 6 Table) */}
          <div className="py-4">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-300 text-slate-500 text-[11px] font-bold uppercase">
                  <th className="py-2">Component Description</th>
                  <th className="py-2 text-right">Amount (INR)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr>
                  <td className="py-2 font-medium">Base Apartment Consideration (1,420 Carpet sq ft)</td>
                  <td className="py-2 text-right font-mono font-semibold">{formatINR(basePrice)}</td>
                </tr>
                <tr>
                  <td className="py-2">Floor Rise Charges (Floor 5)</td>
                  <td className="py-2 text-right font-mono">{formatINR(floorRise)}</td>
                </tr>
                <tr>
                  <td className="py-2">Prime Location Charges (East Garden Facing)</td>
                  <td className="py-2 text-right font-mono">{formatINR(plc)}</td>
                </tr>
                <tr>
                  <td className="py-2">Covered Basement Car Parking (1 Space)</td>
                  <td className="py-2 text-right font-mono">{formatINR(parking)}</td>
                </tr>
                <tr>
                  <td className="py-2">Clubhouse Access & Sports Infrastructure</td>
                  <td className="py-2 text-right font-mono">{formatINR(clubhouse)}</td>
                </tr>
                <tr>
                  <td className="py-2">Advance Maintenance & Sinking Corpus</td>
                  <td className="py-2 text-right font-mono">{formatINR(maintenance)}</td>
                </tr>
                <tr>
                  <td className="py-2">Electricity, Water & Legal Documentation</td>
                  <td className="py-2 text-right font-mono">{formatINR(otherCharges)}</td>
                </tr>
                <tr className="bg-slate-50 font-bold text-slate-900 border-t border-b border-slate-300">
                  <td className="py-2.5">Gross Subtotal</td>
                  <td className="py-2.5 text-right font-mono text-sm">{formatINR(subtotal)}</td>
                </tr>
                {discount > 0 && (
                  <tr className="text-amber-700 font-semibold">
                    <td className="py-2">Approved Festival Concession / Discount</td>
                    <td className="py-2 text-right font-mono">- {formatINR(discount)}</td>
                  </tr>
                )}
                <tr>
                  <td className="py-2 font-medium">Statutory GST (5% Under-Construction Residential)</td>
                  <td className="py-2 text-right font-mono font-semibold">{formatINR(gstAmount)}</td>
                </tr>
                <tr className="bg-estate-navy text-white font-extrabold text-sm border-t-2 border-estate-navy">
                  <td className="py-3 px-3 rounded-l">Total Contract Consideration (All-inclusive)</td>
                  <td className="py-3 px-3 text-right font-mono text-base rounded-r">{formatINR(finalTotal)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Milestone Installment Schedule (Section 6 & 8) */}
          <div className="mt-6 pt-4 border-t border-slate-200">
            <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-2">
              Construction Linked Milestone Schedule
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {milestones.map((m, idx) => (
                <div key={idx} className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold">
                    <span>Milestone {idx + 1}</span>
                    <span className="text-estate-blue">{m.pct}%</span>
                  </div>
                  <p className="font-bold text-slate-800 text-[11px] mt-0.5 truncate">{m.name}</p>
                  <p className="font-mono font-extrabold text-slate-900 text-xs mt-1">{formatINR(m.amount)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Signatures */}
          <div className="mt-8 pt-6 border-t border-slate-200 grid grid-cols-2 text-[11px] text-slate-400">
            <div>
              <p className="font-bold text-slate-700">Authorized Sales Representative</p>
              <p className="mt-6 text-slate-500 font-mono">Rohan Sharma (Prestige Estates)</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-slate-700">Customer Acceptance</p>
              <p className="mt-6 text-slate-500">Signature: ______________________</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

