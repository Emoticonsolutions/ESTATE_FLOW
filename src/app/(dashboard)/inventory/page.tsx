'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Boxes,
  Table as TableIcon,
  LayoutGrid,
  Filter,
  Search,
  Lock,
  Unlock,
  CheckCircle2,
  AlertTriangle,
  Building2,
  FileSpreadsheet,
  Download,
  Upload,
  Sparkles,
  X,
  Compass,
  ArrowRight,
} from 'lucide-react';
import { useTenant } from '@/lib/tenantContext';
import { Unit, UnitStatus } from '@/types';
import { formatINR, getUnitStatusStyle } from '@/lib/utils';
import { INITIAL_TOWERS } from '@/lib/mockData';

export default function InventoryPage() {
  const { units, blockUnit, releaseUnit, updateUnitStatus, currentUser, hasPermission, currentRole } = useTenant();

  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [selectedTower, setSelectedTower] = useState('tower-a');
  const [statusFilter, setStatusFilter] = useState('All');
  const [bhkFilter, setBhkFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Unit detail drawer modal
  const [activeUnit, setActiveUnit] = useState<Unit | null>(null);
  const [blockReason, setBlockReason] = useState('');
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);

  // Filter units
  const filteredUnits = units.filter((u) => {
    const matchesTower = u.towerId === selectedTower;
    const matchesStatus = statusFilter === 'All' || u.status === statusFilter;
    const matchesBhk = bhkFilter === 'All' || u.bhk === bhkFilter;
    const matchesSearch = u.unitNumber.includes(searchTerm) || u.bhk.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTower && matchesStatus && matchesBhk && matchesSearch;
  });

  // Group by floors descending (top floor to 1st floor)
  const floorNumbers = [6, 5, 4, 3, 2, 1];

  const handleBlockAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeUnit) return;
    blockUnit(activeUnit.id, blockReason || 'Customer token discussion', currentUser.name);
    setShowBlockModal(false);
    setActiveUnit({ ...activeUnit, status: 'Blocked', blockedBy: currentUser.name });
    setBlockReason('');
  };

  const handleReleaseAction = () => {
    if (!activeUnit) return;
    releaseUnit(activeUnit.id);
    setActiveUnit({ ...activeUnit, status: 'Available', blockedBy: undefined, blockedUntil: undefined });
  };

  return (
    <div className="space-y-6">
      {/* Role-Specific Banner */}
      {currentRole === 'BROKER' && (
        <div className="p-3.5 bg-purple-50 border border-purple-200 rounded-xl flex items-center justify-between text-xs text-purple-900">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-600"></span>
            <span>
              <strong>Channel Partner Live Inventory:</strong> Live units available for booking with client commission protection.
            </span>
          </div>
          <Link
            href="/cost-sheets"
            className="text-[11px] font-bold bg-purple-600 text-white px-2.5 py-1 rounded hover:bg-purple-700"
          >
            Calculate Buyer Cost Sheet →
          </Link>
        </div>
      )}

      {currentRole === 'SALES_EXECUTIVE' && (
        <div className="p-3.5 bg-teal-50 border border-teal-200 rounded-xl flex items-center justify-between text-xs text-teal-900">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
            <span>
              <strong>Sales Advisor Authority:</strong> Click any Available unit to initiate instant <strong>72-Hour Token Hold</strong>.
            </span>
          </div>
          <span className="text-[10px] font-mono text-teal-700 font-bold">Auto-expires after 72 hours</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-card border border-estate-border shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black text-estate-navy">Tower, Floor & Inventory Visualizer</h1>
            <span className="text-xs bg-emerald-50 text-estate-green font-bold px-2 py-0.5 rounded-full border border-emerald-200">
              Live Real-Time Inventory
            </span>
          </div>
          <p className="text-xs text-estate-muted mt-0.5">
            Architectural unit grid with transactional double-booking locking & instant cost sheet calculation
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Dual View Toggle (Grid vs Table) */}
          <div className="bg-estate-bg p-1 rounded-lg border border-estate-border flex items-center">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold transition-all ${
                viewMode === 'grid' ? 'bg-white text-estate-navy shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <LayoutGrid size={14} />
              <span>Visual Grid</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold transition-all ${
                viewMode === 'table' ? 'bg-white text-estate-navy shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <TableIcon size={14} />
              <span>Table List</span>
            </button>
          </div>

          <button
            onClick={() => setShowImportModal(true)}
            className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            <Upload size={14} />
            <span>Import Excel</span>
          </button>
        </div>
      </div>

      {/* Status Legend Bar (Section 2.2 Inventory Status Colors) */}
      <div className="bg-white p-4 rounded-card border border-estate-border shadow-sm flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-4">
          <span className="font-bold text-slate-700 text-[11px] uppercase tracking-wider">Inventory Status:</span>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#16A36A]"></span>
            <span className="font-medium text-slate-700">Available ({units.filter(u => u.status === 'Available').length})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#E9A23B]"></span>
            <span className="font-medium text-slate-700">Blocked ({units.filter(u => u.status === 'Blocked').length})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#8965C7]"></span>
            <span className="font-medium text-slate-700">Reserved / Hold</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#3478C9]"></span>
            <span className="font-medium text-slate-700">Booked ({units.filter(u => u.status === 'Booked').length})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#7B8794]"></span>
            <span className="font-medium text-slate-700">Sold ({units.filter(u => u.status === 'Sold').length})</span>
          </div>
        </div>

        {/* Tower Selector Pills */}
        <div className="flex items-center gap-2">
          {INITIAL_TOWERS.map((tower) => (
            <button
              key={tower.id}
              onClick={() => setSelectedTower(tower.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedTower === tower.id
                  ? 'bg-estate-navy text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tower.name}
            </button>
          ))}
        </div>
      </div>

      {/* Grid View Mode: Visual Floor-by-Floor Architecture Layout */}
      {viewMode === 'grid' && (
        <div className="bg-white rounded-card border border-estate-border shadow-sm p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-base font-extrabold text-estate-navy">
                Tower A - Emerald Wings (Visual Stacking Plan)
              </h2>
              <p className="text-xs text-estate-muted">
                Click any apartment unit to inspect specifications, place 72-hr block, or generate instant branded cost sheet
              </p>
            </div>
            <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded font-mono font-bold">
              6 Floors • 4 Units / Floor
            </span>
          </div>

          {/* Stacking Floor Plan */}
          <div className="space-y-3.5 max-w-5xl mx-auto py-2">
            {floorNumbers.map((floorNum) => {
              const floorUnits = filteredUnits.filter((u) => u.floorNumber === floorNum);

              return (
                <div
                  key={floorNum}
                  className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 bg-slate-50/70 rounded-xl border border-slate-200 hover:border-slate-300 transition-all"
                >
                  {/* Floor Label Badge */}
                  <div className="w-24 shrink-0 font-bold text-xs text-estate-navy flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-estate-navy text-white flex items-center justify-center font-black text-xs shadow-sm">
                      F{floorNum}
                    </span>
                    <span className="text-[11px] text-slate-500 font-semibold">Floor {floorNum}</span>
                  </div>

                  {/* Units Row */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 flex-1">
                    {floorUnits.map((unit) => {
                      const style = getUnitStatusStyle(unit.status);

                      return (
                        <div
                          key={unit.id}
                          onClick={() => setActiveUnit(unit)}
                          className={`p-3 rounded-xl border-2 transition-all cursor-pointer relative overflow-hidden group shadow-sm hover:scale-[1.02] ${
                            unit.status === 'Available'
                              ? 'border-emerald-400 bg-emerald-50/40 hover:bg-emerald-50'
                              : unit.status === 'Blocked'
                              ? 'border-amber-400 bg-amber-50/40 hover:bg-amber-50'
                              : unit.status === 'Reserved' || unit.status === 'On Hold'
                              ? 'border-purple-400 bg-purple-50/40 hover:bg-purple-50'
                              : unit.status === 'Booked'
                              ? 'border-blue-400 bg-blue-50/40 hover:bg-blue-50'
                              : 'border-slate-300 bg-slate-100/60 opacity-70'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-black text-sm text-slate-900 group-hover:text-estate-blue">
                              {unit.unitNumber}
                            </span>
                            <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full ${style.badge}`}>
                              {unit.status}
                            </span>
                          </div>

                          <p className="text-[11px] font-bold text-slate-700">{unit.bhk} • {unit.facing}</p>
                          <p className="text-[10px] text-slate-500">{unit.carpetArea} sq ft</p>

                          <div className="mt-2 pt-1.5 border-t border-slate-200/80 flex items-center justify-between text-[11px]">
                            <strong className="text-estate-navy">{formatINR(unit.basePrice, true)}</strong>
                            <span className="text-estate-blue text-[10px] font-bold group-hover:underline">
                              Inspect →
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Table View Mode */}
      {viewMode === 'table' && (
        <div className="bg-white rounded-card border border-estate-border shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-estate-border text-slate-500 font-bold uppercase text-[11px]">
                <tr>
                  <th className="py-3 px-4">Unit #</th>
                  <th className="py-3 px-4">Type / BHK</th>
                  <th className="py-3 px-4">Floor</th>
                  <th className="py-3 px-4">Carpet Area</th>
                  <th className="py-3 px-4">Facing</th>
                  <th className="py-3 px-4">Base Price</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-estate-border text-slate-700">
                {filteredUnits.map((u) => {
                  const style = getUnitStatusStyle(u.status);

                  return (
                    <tr
                      key={u.id}
                      onClick={() => setActiveUnit(u)}
                      className="hover:bg-blue-50/40 cursor-pointer h-[52px]"
                    >
                      <td className="py-3 px-4 font-black text-slate-900">{u.unitNumber}</td>
                      <td className="py-3 px-4 font-bold text-slate-800">{u.bhk}</td>
                      <td className="py-3 px-4">Floor {u.floorNumber}</td>
                      <td className="py-3 px-4">{u.carpetArea} sq ft</td>
                      <td className="py-3 px-4">{u.facing}</td>
                      <td className="py-3 px-4 font-bold text-estate-navy">{formatINR(u.basePrice)}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${style.badge}`}>
                          {u.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveUnit(u);
                          }}
                          className="px-2.5 py-1 text-estate-blue font-bold hover:bg-blue-50 rounded"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Unit Detail Modal / Drawer (Section 5 Unit Detail Page) */}
      {activeUnit && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-estate-border animate-in fade-in">
            <div className="flex items-center justify-between pb-4 border-b border-estate-border">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-black text-xl text-estate-navy">
                    Unit {activeUnit.unitNumber} ({activeUnit.bhk})
                  </h3>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${getUnitStatusStyle(activeUnit.status).badge}`}>
                    {activeUnit.status}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Tower A (Emerald Wings) • Floor {activeUnit.floorNumber} • Prestige Falcon City Ph 2
                </p>
              </div>
              <button onClick={() => setActiveUnit(null)} className="text-slate-400 hover:text-slate-600 p-1">
                <X size={20} />
              </button>
            </div>

            {/* Unit Specifications */}
            <div className="mt-4 space-y-4 text-xs">
              <div className="grid grid-cols-3 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Carpet Area</span>
                  <strong className="text-slate-800 text-sm">{activeUnit.carpetArea} sq ft</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Super Built-up</span>
                  <strong className="text-slate-800 text-sm">{activeUnit.superBuiltUpArea} sq ft</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Balcony</span>
                  <strong className="text-slate-800 text-sm">{activeUnit.balconyArea} sq ft</strong>
                </div>
                <div className="pt-2">
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Facing</span>
                  <strong className="text-estate-blue text-sm">{activeUnit.facing}</strong>
                </div>
                <div className="pt-2">
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Floor Rise</span>
                  <strong className="text-slate-800 text-sm">{formatINR(activeUnit.floorRiseRate)}</strong>
                </div>
                <div className="pt-2">
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">PLC Corner</span>
                  <strong className="text-slate-800 text-sm">{formatINR(activeUnit.plcRate)}</strong>
                </div>
              </div>

              {/* Total Unit Base Value */}
              <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-600">Base Unit Value (excluding GST)</span>
                  <p className="text-xl font-black text-estate-navy mt-0.5">{formatINR(activeUnit.basePrice)}</p>
                </div>
                <Link
                  href={`/cost-sheets?unit=${activeUnit.unitNumber}&price=${activeUnit.basePrice}`}
                  className="px-4 py-2 bg-estate-blue hover:bg-blue-600 text-white rounded-lg font-bold text-xs shadow-md flex items-center gap-1.5"
                >
                  <Sparkles size={14} />
                  <span>Full Cost Sheet</span>
                </Link>
              </div>

              {/* Blocked or Booked metadata */}
              {activeUnit.status === 'Blocked' && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-xs">
                  <p className="font-bold">Unit currently blocked by: {activeUnit.blockedBy || 'Sales Executive'}</p>
                  <p className="text-[11px] mt-0.5">Expires automatically after 72 hours unless confirmed with booking token.</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-3">
                {activeUnit.status === 'Available' ? (
                  <button
                    onClick={() => setShowBlockModal(true)}
                    className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-bold text-xs shadow flex items-center justify-center gap-1.5"
                  >
                    <Lock size={14} />
                    <span>Hold / Block Unit (72-hr Lock)</span>
                  </button>
                ) : activeUnit.status === 'Blocked' ? (
                  <button
                    onClick={handleReleaseAction}
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs shadow flex items-center justify-center gap-1.5"
                  >
                    <Unlock size={14} />
                    <span>Release Unit Back to Available</span>
                  </button>
                ) : (
                  <div className="w-full text-center py-2 text-slate-500 text-xs italic">
                    Unit is currently {activeUnit.status}. Transaction locked.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Block Confirmation Modal */}
      {showBlockModal && activeUnit && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-estate-border">
            <h3 className="font-bold text-base text-estate-navy mb-1">
              Block Unit {activeUnit.unitNumber}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Apply transactional hold to prevent double-booking while customer arranges token deposit.
            </p>

            <form onSubmit={handleBlockAction} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Reason for Hold</label>
                <input
                  type="text"
                  placeholder="e.g. Deepak Singhal requested 48-hr hold for RTGS token"
                  value={blockReason}
                  onChange={(e) => setBlockReason(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-input"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowBlockModal(false)}
                  className="px-3 py-1.5 border border-slate-200 rounded-lg text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-amber-500 text-white rounded-lg font-bold hover:bg-amber-600"
                >
                  Confirm 72-hr Lock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Excel Import Simulation Modal */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-estate-border">
            <h3 className="font-bold text-base text-estate-navy mb-1">Bulk Excel Inventory Upload</h3>
            <p className="text-xs text-slate-500 mb-4">Upload inventory spreadsheet (.xlsx / .csv) with column auto-mapping</p>
            <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center bg-slate-50">
              <FileSpreadsheet size={36} className="mx-auto text-[#3478C9] mb-2" />
              <p className="text-xs font-bold text-slate-800">Drop your tower units Excel file here</p>
              <p className="text-[10px] text-slate-400 mt-1">Columns: Unit_No, Floor, BHK, Carpet_Sqft, Base_Price, Facing</p>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setShowImportModal(false)}
                className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded"
              >
                Close
              </button>
              <button
                onClick={() => {
                  alert('24 units successfully imported and verified against tower floor plan!');
                  setShowImportModal(false);
                }}
                className="px-4 py-1.5 bg-estate-blue text-white rounded text-xs font-bold"
              >
                Simulate Import
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

