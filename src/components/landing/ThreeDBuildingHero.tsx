'use client';

import React, { useState, useEffect } from 'react';
import {
  Building2,
  ShieldCheck,
  Sparkles,
  Layers,
  Lock,
  Eye,
  CheckCircle2,
  Clock,
  RotateCw,
  Compass,
} from 'lucide-react';

interface UnitInfo {
  number: string;
  floor: number;
  type: string;
  area: string;
  price: string;
  status: 'available' | 'locked' | 'sold' | 'booked';
  lockedBy?: string;
  timeLeft?: string;
}

export function ThreeDBuildingHero() {
  const [selectedFloor, setSelectedFloor] = useState<number>(14);
  const [hoveredUnit, setHoveredUnit] = useState<UnitInfo | null>(null);
  const [rotationAngle, setRotationAngle] = useState<'iso' | 'front' | 'top'>('iso');
  const [autoRotate, setAutoRotate] = useState<boolean>(true);

  const unitsData: Record<number, UnitInfo[]> = {
    15: [
      { number: '1501', floor: 15, type: '4BHK Sky Penthouse', area: '3,450 sq.ft', price: '$850,000', status: 'available' },
      { number: '1502', floor: 15, type: '4BHK Sky Penthouse', area: '3,450 sq.ft', price: '$865,000', status: 'sold' },
    ],
    14: [
      { number: '1401', floor: 14, type: '3BHK Premium Corner', area: '2,150 sq.ft', price: '$495,000', status: 'available' },
      { number: '1402', floor: 14, type: '3BHK Luxury Parkview', area: '2,200 sq.ft', price: '$510,000', status: 'locked', lockedBy: 'Agent Rohan S.', timeLeft: '48h 12m' },
      { number: '1403', floor: 14, type: '2BHK Executive', area: '1,450 sq.ft', price: '$335,000', status: 'available' },
      { number: '1404', floor: 14, type: '3BHK Sunrise Suite', area: '2,100 sq.ft', price: '$485,000', status: 'booked' },
    ],
    12: [
      { number: '1201', floor: 12, type: '3BHK Corner', area: '2,150 sq.ft', price: '$475,000', status: 'sold' },
      { number: '1202', floor: 12, type: '3BHK Luxury', area: '2,200 sq.ft', price: '$490,000', status: 'sold' },
      { number: '1203', floor: 12, type: '2BHK Executive', area: '1,450 sq.ft', price: '$325,000', status: 'available' },
      { number: '1204', floor: 12, type: '3BHK Deluxe', area: '2,100 sq.ft', price: '$465,000', status: 'available' },
    ],
    10: [
      { number: '1001', floor: 10, type: '3BHK Corner', area: '2,150 sq.ft', price: '$455,000', status: 'booked' },
      { number: '1002', floor: 10, type: '3BHK Luxury', area: '2,200 sq.ft', price: '$470,000', status: 'available' },
      { number: '1003', floor: 10, type: '2BHK Executive', area: '1,450 sq.ft', price: '$315,000', status: 'sold' },
      { number: '1004', floor: 10, type: '3BHK Deluxe', area: '2,100 sq.ft', price: '$445,000', status: 'sold' },
    ],
    6: [
      { number: '601', floor: 6, type: '3BHK Corner', area: '2,150 sq.ft', price: '$415,000', status: 'sold' },
      { number: '602', floor: 6, type: '3BHK Luxury', area: '2,200 sq.ft', price: '$430,000', status: 'sold' },
      { number: '603', floor: 6, type: '2BHK Executive', area: '1,450 sq.ft', price: '$295,000', status: 'available' },
      { number: '604', floor: 6, type: '3BHK Deluxe', area: '2,100 sq.ft', price: '$405,000', status: 'sold' },
    ],
    2: [
      { number: '201', floor: 2, type: 'Podium Garden Villa', area: '2,800 sq.ft', price: '$580,000', status: 'sold' },
      { number: '202', floor: 2, type: 'Podium Garden Villa', area: '2,800 sq.ft', price: '$590,000', status: 'booked' },
    ],
  };

  const floors = [15, 14, 12, 10, 6, 2];

  useEffect(() => {
    // Default preview unit
    if (!hoveredUnit && unitsData[14]) {
      setHoveredUnit(unitsData[14][1]);
    }
  }, []);

  const getStatusColor = (status: UnitInfo['status']) => {
    switch (status) {
      case 'available':
        return 'bg-emerald-500 text-white shadow-emerald-500/50 border-emerald-400';
      case 'locked':
        return 'bg-amber-500 text-white shadow-amber-500/50 border-amber-400 animate-pulse';
      case 'booked':
        return 'bg-blue-600 text-white shadow-blue-500/50 border-blue-400';
      case 'sold':
        return 'bg-slate-700 text-slate-300 border-slate-600 opacity-60';
    }
  };

  const getStatusLabel = (status: UnitInfo['status']) => {
    switch (status) {
      case 'available':
        return 'Available for Sale';
      case 'locked':
        return '72-Hour Hold (Locked)';
      case 'booked':
        return 'Booked & Token Received';
      case 'sold':
        return 'Registered & Sold';
    }
  };

  return (
    <div className="relative w-full rounded-3xl bg-gradient-to-b from-slate-900 via-[#102336] to-[#0A1624] p-6 sm:p-8 text-white shadow-2xl border border-slate-800 overflow-hidden">
      {/* Background 3D Grid Blueprint Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f3b5c15_1px,transparent_1px),linear-gradient(to_bottom,#1f3b5c15_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Controls */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-teal-400 uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
            <span>Interactive 3D Architectural Stacking</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
            Azure Heights • Tower B
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Click any floor or hover a unit to inspect live availability & 72-hour anti-conflict locking.
          </p>
        </div>

        {/* View Perspective Controls */}
        <div className="flex items-center gap-1.5 bg-slate-800/80 p-1 rounded-xl border border-slate-700 text-xs">
          <button
            onClick={() => setRotationAngle('iso')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
              rotationAngle === 'iso'
                ? 'bg-[#3478C9] text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Compass size={13} />
            <span>3D Isometric</span>
          </button>
          <button
            onClick={() => setRotationAngle('front')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
              rotationAngle === 'front'
                ? 'bg-[#3478C9] text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers size={13} />
            <span>Elevation</span>
          </button>
          <button
            onClick={() => setRotationAngle('top')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
              rotationAngle === 'top'
                ? 'bg-[#3478C9] text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Eye size={13} />
            <span>Plan View</span>
          </button>
        </div>
      </div>

      {/* 3D Main Stage Area */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-6">
        {/* Left Side: 3D Isometric Tower Simulation (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center min-h-[380px] py-4">
          <div
            className={`w-full max-w-md transition-all duration-700 ease-out ${
              rotationAngle === 'iso'
                ? '[perspective:1200px] [transform-style:preserve-3d]'
                : rotationAngle === 'top'
                ? '[perspective:900px]'
                : ''
            }`}
          >
            <div
              className={`space-y-3.5 transition-transform duration-700 ${
                rotationAngle === 'iso'
                  ? 'rotate-x-[26deg] -rotate-y-[14deg] rotate-z-[2deg] translate-z-[10px]'
                  : rotationAngle === 'top'
                  ? 'rotate-x-[55deg] -rotate-z-[4deg]'
                  : ''
              }`}
            >
              {floors.map((floorNum) => {
                const isSelected = selectedFloor === floorNum;
                const units = unitsData[floorNum] || [];

                return (
                  <div
                    key={floorNum}
                    onClick={() => setSelectedFloor(floorNum)}
                    className={`cursor-pointer transition-all duration-300 rounded-2xl p-3 border ${
                      isSelected
                        ? 'bg-slate-800/90 border-teal-400 ring-2 ring-teal-400/30 shadow-xl shadow-teal-500/10 scale-102 translate-x-2'
                        : 'bg-slate-900/70 border-slate-700/60 hover:bg-slate-800/60 hover:border-slate-600'
                    }`}
                    style={{
                      transform: isSelected
                        ? 'translateZ(30px)'
                        : 'translateZ(0px)',
                      boxShadow: isSelected
                        ? '0 20px 30px -10px rgba(21, 157, 145, 0.3)'
                        : '0 6px 15px -3px rgba(0, 0, 0, 0.5)',
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-md bg-slate-700/80 text-white font-mono text-xs font-bold flex items-center justify-center">
                          {floorNum}F
                        </span>
                        <span className="text-xs font-bold text-slate-200">
                          {floorNum === 15
                            ? 'Penthouse Sky Deck'
                            : floorNum === 2
                            ? 'Podium Garden Suites'
                            : `Tower Level ${floorNum}`}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">
                        {units.filter((u) => u.status === 'available').length} of {units.length} Available
                      </span>
                    </div>

                    {/* Unit Blocks on this Floor */}
                    <div className="grid grid-cols-4 gap-2">
                      {units.map((unit) => {
                        const isHovered = hoveredUnit?.number === unit.number;

                        return (
                          <div
                            key={unit.number}
                            onMouseEnter={() => setHoveredUnit(unit)}
                            className={`p-2 rounded-xl border text-center transition-all duration-200 relative group ${getStatusColor(
                              unit.status
                            )} ${isHovered ? 'scale-108 ring-2 ring-white z-20 shadow-lg' : ''}`}
                          >
                            <span className="block font-mono font-bold text-xs tracking-tight">
                              {unit.number}
                            </span>
                            <span className="block text-[9px] font-semibold opacity-90 truncate">
                              {unit.type.split(' ')[0]}
                            </span>

                            {unit.status === 'locked' && (
                              <div className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shadow">
                                <Lock size={9} />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side: Real-Time Unit Inspector & Locking Engine (5 Cols) */}
        <div className="lg:col-span-5">
          {hoveredUnit ? (
            <div className="rounded-2xl bg-slate-800/90 border border-slate-700 p-6 shadow-2xl backdrop-blur-md relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-teal-400 bg-teal-950/80 border border-teal-800 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                  <Sparkles size={12} />
                  <span>Unit Live Inspection</span>
                </span>
                <span
                  className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                    hoveredUnit.status === 'available'
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      : hoveredUnit.status === 'locked'
                      ? 'bg-amber-950 text-amber-400 border border-amber-800 animate-pulse'
                      : hoveredUnit.status === 'booked'
                      ? 'bg-blue-950 text-blue-400 border border-blue-800'
                      : 'bg-slate-900 text-slate-400 border border-slate-700'
                  }`}
                >
                  {getStatusLabel(hoveredUnit.status)}
                </span>
              </div>

              <div className="flex items-baseline justify-between mb-2">
                <h4 className="text-3xl font-black text-white font-mono">
                  Unit {hoveredUnit.number}
                </h4>
                <div className="text-right">
                  <span className="text-2xl font-black text-teal-400">
                    {hoveredUnit.price}
                  </span>
                  <span className="block text-[10px] text-slate-400">Base Listed Price</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 font-medium mb-4">
                {hoveredUnit.type} • Floor {hoveredUnit.floor} • Super Built-Up {hoveredUnit.area}
              </p>

              {/* Status Specific Callouts */}
              {hoveredUnit.status === 'locked' && (
                <div className="mb-4 p-3 rounded-xl bg-amber-950/60 border border-amber-800/80 text-amber-300 text-xs">
                  <div className="flex items-center gap-2 font-bold mb-1">
                    <Clock size={14} className="text-amber-400" />
                    <span>Active 72-Hour Anti-Conflict Lock</span>
                  </div>
                  <p className="text-[11px] text-amber-200/90 leading-relaxed">
                    Held by <strong>{hoveredUnit.lockedBy}</strong> for verified buyer token verification. Auto-expires in <strong>{hoveredUnit.timeLeft}</strong>.
                  </p>
                </div>
              )}

              {hoveredUnit.status === 'available' && (
                <div className="mb-4 p-3 rounded-xl bg-emerald-950/60 border border-emerald-800/80 text-emerald-300 text-xs">
                  <div className="flex items-center gap-2 font-bold mb-1">
                    <ShieldCheck size={14} className="text-emerald-400" />
                    <span>Instant Booking Ready</span>
                  </div>
                  <p className="text-[11px] text-emerald-200/90 leading-relaxed">
                    Zero conflict holds. Field reps can generate dynamic cost sheet or issue 72-hr block in 1 click.
                  </p>
                </div>
              )}

              {/* Key Specs Grid */}
              <div className="grid grid-cols-2 gap-2 text-xs mb-5">
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-700/80">
                  <span className="text-[10px] text-slate-400 block">Carpet Area</span>
                  <span className="font-bold text-white">1,620 sq.ft (75%)</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-700/80">
                  <span className="text-[10px] text-slate-400 block">Facing & View</span>
                  <span className="font-bold text-white">East / City Skyline</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-700/80">
                  <span className="text-[10px] text-slate-400 block">Floor Rise Rate</span>
                  <span className="font-bold text-white">+$500 / Floor</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-700/80">
                  <span className="text-[10px] text-slate-400 block">Covered Parking</span>
                  <span className="font-bold text-white">2 Stencil Slots</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <a
                  href="/login"
                  className="w-full py-2.5 bg-gradient-to-r from-teal-500 to-[#3478C9] hover:from-teal-600 hover:to-blue-600 text-white rounded-xl text-xs font-bold text-center block shadow-lg shadow-teal-700/20 transition-all"
                >
                  Sign In to Lock Unit or Issue Cost Sheet →
                </a>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl bg-slate-800/50 border border-slate-700 p-8 text-center text-slate-400 text-xs">
              <Building2 size={36} className="mx-auto mb-3 text-slate-500 opacity-60" />
              Hover or tap any flat on the left to inspect real-time pricing and lock status.
            </div>
          )}

          {/* Legend */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-[11px] text-slate-300">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>Available</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span>Locked (72h)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
              <span>Booked</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-600" />
              <span>Sold</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
