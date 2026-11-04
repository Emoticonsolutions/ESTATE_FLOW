'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  Sparkles,
  Boxes,
  Calculator,
  MessageSquare,
  Receipt,
  Users,
  ShieldCheck,
  ChevronRight,
  MonitorPlay,
  ExternalLink,
  Film,
  CheckCircle2,
  Layers,
  Lock,
  Clock,
  ArrowRight,
  Send,
  Building2,
  FileText,
  DollarSign,
  Download,
} from 'lucide-react';
import Link from 'next/link';

interface DemoScene {
  id: string;
  timestamp: string;
  durationSeconds: number;
  title: string;
  tag: string;
  targetModuleUrl: string;
  moduleName: string;
  description: string;
  highlights: string[];
}

export function DemoVideoPlayer() {
  const scenes: DemoScene[] = [
    {
      id: 'lead-360',
      timestamp: '0:00 - 0:45',
      durationSeconds: 45,
      title: 'Lead 360 Ingestion & Instant WhatsApp Automation',
      tag: 'Leads & WhatsApp',
      targetModuleUrl: '/leads',
      moduleName: 'Launch Lead 360',
      description:
        'Inbound buyer leads from Meta Lead Ads, Google Search, and portals sync automatically with duplicate phone number detection, 0-100 AI buyer scoring, and 1-click WhatsApp brochure dispatch.',
      highlights: [
        'Automatic phone number & email deduplication across company accounts',
        'Instant 0-100 AI purchase intent scoring',
        '1-Click WhatsApp brochure & project deck dispatch',
        'Automated round-robin distribution to available sales executives',
      ],
    },
    {
      id: 'tower-inventory',
      timestamp: '0:45 - 1:30',
      durationSeconds: 45,
      title: 'Interactive Tower Stacking & 72-Hour Anti-Conflict Lock',
      tag: 'Inventory & Locking',
      targetModuleUrl: '/inventory',
      moduleName: 'Launch Tower Inventory',
      description:
        'Architectural floor-by-floor unit stacking grid with color-coded live availability. Placing a hold locks the unit in the database for 72 hours with a live countdown, preventing concurrent double-booking.',
      highlights: [
        'Color-coded unit stacking: Available (Green), Locked (Amber), Booked (Blue), Sold (Slate)',
        '72-Hour transactional database lock with live countdown timer',
        'Multi-agent concurrency protection—no two reps can claim the same unit',
        'Bulk Excel inventory import and real-time floor rise visibility',
      ],
    },
    {
      id: 'cost-sheets',
      timestamp: '1:30 - 2:15',
      durationSeconds: 45,
      title: 'Dynamic Automated Cost Sheet & Pricing Matrix',
      tag: 'Cost Calculator',
      targetModuleUrl: '/cost-sheets',
      moduleName: 'Launch Cost Calculator',
      description:
        'Calculates base pricing, floor rise rate ($500/floor), preferential location charges (PLC), covered parking, and statutory taxes with one-click exportable PDF cost sheets.',
      highlights: [
        'Automatic floor rise, corner PLC, and clubhouse amenity calculations',
        'Manager-level discount approvals before cost sheet finalization',
        'Complete RERA milestone installment breakdown schedule',
        'Instant official PDF cost sheet generation for client presentation',
      ],
    },
    {
      id: 'milestone-ledger',
      timestamp: '2:15 - 3:00',
      durationSeconds: 45,
      title: 'Direct-to-Bank Milestone Maintenance & Stamped Receipts',
      tag: 'Accounting Ledger',
      targetModuleUrl: '/collections',
      moduleName: 'Launch Payment Ledger',
      description:
        'Direct-to-bank accounting maintenance ledger recording RTGS/Cheque realization reference numbers, generating milestone demand notes, and issuing official stamped digital receipts with QR verification.',
      highlights: [
        'Construction-linked milestone payment schedules (Plinth, 5th Slab, Handover)',
        'Records bank Cheque/UTR realization reference numbers directly to escrow',
        'Automated demand letters with overdue aging alerts',
        'Official stamped digital receipts with cryptographic QR verification',
      ],
    },
    {
      id: 'broker-network',
      timestamp: '3:00 - 3:45',
      durationSeconds: 45,
      title: 'Channel Partner & RERA Broker Commission Network',
      tag: 'Broker Portal',
      targetModuleUrl: '/brokers',
      moduleName: 'Launch Broker Portal',
      description:
        'Accredited broker directory with 90-day anti-poaching client ownership locks, tiered commission calculations, deal attribution tracking, and executive payout approvals.',
      highlights: [
        '90-Day anti-poaching client ownership tagging for brokers',
        'Automated tiered commission calculation (1.5% - 3.0%)',
        'Separate authenticated login portal for external brokers',
        'Manager-approved commission payout vouchers and tax TDS statements',
      ],
    },
  ];

  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentSeconds, setCurrentSeconds] = useState(12);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isMuted, setIsMuted] = useState(false);

  const activeScene = scenes[activeSceneIndex];
  const totalDemoSeconds = 225; // 3 minutes 45 seconds

  // Auto playback simulation loop
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentSeconds((prev) => {
        const next = prev + 1;
        if (next >= totalDemoSeconds) {
          return 0; // Loop back
        }

        // Determine scene based on seconds
        const sceneIdx = Math.min(Math.floor(next / 45), scenes.length - 1);
        if (sceneIdx !== activeSceneIndex) {
          setActiveSceneIndex(sceneIdx);
        }

        return next;
      });
    }, 1000 / playbackSpeed);

    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed, activeSceneIndex, scenes.length]);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setCurrentSeconds(val);
    const sceneIdx = Math.min(Math.floor(val / 45), scenes.length - 1);
    setActiveSceneIndex(sceneIdx);
  };

  const handleSelectScene = (index: number) => {
    setActiveSceneIndex(index);
    setCurrentSeconds(index * 45);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="w-full">
      {/* Chapter Selection Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex flex-wrap items-center gap-2">
          {scenes.map((scene, idx) => {
            const isActive = activeSceneIndex === idx;
            return (
              <button
                key={scene.id}
                onClick={() => handleSelectScene(idx)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
                  isActive
                    ? 'bg-[#17324D] text-white border-[#17324D] shadow-md ring-2 ring-teal-400/30'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-md flex items-center justify-center font-mono text-[10px] ${
                    isActive ? 'bg-teal-500 text-slate-950 font-bold' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {idx + 1}
                </span>
                <span>{scene.tag}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Interactive Product Simulator (No External Plugins)</span>
        </div>
      </div>

      {/* Main Interactive Demo Player Container */}
      <div className="rounded-2xl border border-slate-700 bg-slate-950 shadow-2xl overflow-hidden">
        {/* macOS Browser Chrome Bar */}
        <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-3 text-[11px] font-mono text-slate-400 hidden sm:inline">
              estateflow.io/app{activeScene.targetModuleUrl}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] font-bold text-teal-400 bg-teal-950/80 border border-teal-800 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping" />
              <span>Official EstateFlow Live Tour</span>
            </span>

            <Link
              href={activeScene.targetModuleUrl}
              className="text-xs text-slate-300 hover:text-white flex items-center gap-1 bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded-lg transition-colors border border-slate-700"
            >
              <span>{activeScene.moduleName}</span>
              <ExternalLink size={12} />
            </Link>
          </div>
        </div>

        {/* Dynamic Video Stage Screen */}
        <div className="relative aspect-video w-full bg-gradient-to-br from-slate-950 via-[#0B1522] to-slate-900 overflow-hidden select-none p-4 sm:p-8 flex items-center justify-center">
          {/* Animated Watermark */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
            <div className="w-5 h-5 rounded bg-teal-500 text-slate-950 font-black text-[10px] flex items-center justify-center">
              EF
            </div>
            <span className="font-bold text-white tracking-tight">
              ESTATE<span className="text-[#3478C9]">FLOW</span> OS
            </span>
          </div>

          {/* Interactive Simulated Screen per Scene */}
          <div className="w-full max-w-4xl h-full flex flex-col justify-center">
            {/* SCENE 1: Lead 360 & WhatsApp */}
            {activeSceneIndex === 0 && (
              <div className="animate-in fade-in duration-500 space-y-4">
                <div className="bg-slate-900/90 border border-slate-700 rounded-2xl p-5 shadow-2xl backdrop-blur-md">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold">
                        <Users size={20} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-white text-base">Aditya Verma (Lead #EF-8921)</h4>
                          <span className="text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded-full">
                            Hot Buyer (Score 94/100)
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Source: Meta Lead Ads • Inquired for 3BHK Azure Heights • Budget: $450k - $550k
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-teal-400 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700">
                      Zero Duplication Verified
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
                    <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                      <span className="text-[10px] text-slate-400 block uppercase">Assigned Executive</span>
                      <strong className="text-white text-xs">Rohan S. (Senior Property Advisor)</strong>
                    </div>
                    <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                      <span className="text-[10px] text-slate-400 block uppercase">Next Scheduled Action</span>
                      <strong className="text-amber-300 text-xs">Site Visit Tomorrow, 11:30 AM</strong>
                    </div>
                    <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                      <span className="text-[10px] text-slate-400 block uppercase">Broker Attribution</span>
                      <strong className="text-teal-300 text-xs">Direct Organic / Zero Broker Fee</strong>
                    </div>
                  </div>

                  {/* WhatsApp Simulation Banner */}
                  <div className="p-3 bg-emerald-950/70 border border-emerald-800 rounded-xl flex items-center justify-between text-xs text-emerald-200">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-emerald-500 text-slate-950 flex items-center justify-center font-bold">
                        <MessageSquare size={14} />
                      </div>
                      <div>
                        <strong>1-Click WhatsApp Trigger Ready:</strong>
                        <span className="text-emerald-300 ml-1">Send High-Res Azure Heights Brochure & Cost Sheet PDF</span>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs cursor-pointer shadow">
                      Dispatch WhatsApp →
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* SCENE 2: Tower Inventory & 72-Hour Anti-Conflict Lock */}
            {activeSceneIndex === 1 && (
              <div className="animate-in fade-in duration-500 space-y-4">
                <div className="bg-slate-900/90 border border-slate-700 rounded-2xl p-5 shadow-2xl backdrop-blur-md">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-white text-base">Azure Heights • Tower B Architectural Stacking</h4>
                        <span className="text-[10px] font-bold bg-amber-950 text-amber-400 border border-amber-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Lock size={10} /> 72-Hour Hold Engine
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Floor 14 • Penthouse & Luxury Corner Suites • Concurrency Shield Active
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                      <span className="text-slate-300 mr-2">Available</span>
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                      <span className="text-slate-300 mr-2">Locked</span>
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                      <span className="text-slate-300">Booked</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-3 my-4">
                    <div className="p-3 bg-emerald-950/60 border border-emerald-700 rounded-xl text-center">
                      <span className="text-xs font-mono font-bold text-emerald-300 block">Unit 1401</span>
                      <span className="text-[10px] text-emerald-400">3BHK • $495,000</span>
                      <span className="mt-1 block text-[9px] font-bold bg-emerald-900/80 text-emerald-200 py-0.5 rounded">
                        Available
                      </span>
                    </div>

                    <div className="p-3 bg-amber-950/90 border-2 border-amber-400 rounded-xl text-center shadow-lg ring-2 ring-amber-400/30 animate-pulse">
                      <div className="flex items-center justify-center gap-1 text-amber-300 text-xs font-mono font-bold">
                        <Lock size={12} /> Unit 1402
                      </div>
                      <span className="text-[10px] text-amber-200">3BHK Parkview • $510,000</span>
                      <span className="mt-1 block text-[9px] font-bold bg-amber-900 text-amber-100 py-0.5 rounded">
                        Locked (48h 12m left)
                      </span>
                    </div>

                    <div className="p-3 bg-blue-950/60 border border-blue-700 rounded-xl text-center">
                      <span className="text-xs font-mono font-bold text-blue-300 block">Unit 1403</span>
                      <span className="text-[10px] text-blue-400">2BHK • $335,000</span>
                      <span className="mt-1 block text-[9px] font-bold bg-blue-900/80 text-blue-200 py-0.5 rounded">
                        Booked
                      </span>
                    </div>

                    <div className="p-3 bg-slate-800/80 border border-slate-700 rounded-xl text-center opacity-60">
                      <span className="text-xs font-mono font-bold text-slate-300 block">Unit 1404</span>
                      <span className="text-[10px] text-slate-400">3BHK • $485,000</span>
                      <span className="mt-1 block text-[9px] font-bold bg-slate-700 text-slate-300 py-0.5 rounded">
                        Sold
                      </span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 text-xs text-slate-300 flex items-center justify-between">
                    <span>
                      <strong className="text-amber-400">Anti-Double-Booking Protection:</strong> Unit 1402 is held for Buyer token verification. Other agents and brokers are locked out.
                    </span>
                    <span className="font-mono text-teal-400 font-bold">Expires: Nov 07, 2026</span>
                  </div>
                </div>
              </div>
            )}

            {/* SCENE 3: Cost Sheet Engine */}
            {activeSceneIndex === 2 && (
              <div className="animate-in fade-in duration-500 space-y-4">
                <div className="bg-slate-900/90 border border-slate-700 rounded-2xl p-5 shadow-2xl backdrop-blur-md">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div>
                      <h4 className="font-bold text-white text-base">Dynamic RERA Cost Sheet Calculator</h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Unit 1402 (2,200 sq.ft) • Floor 14 • Azure Heights Project
                      </p>
                    </div>
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-950 border border-emerald-800 px-2.5 py-1 rounded-lg">
                      Manager Pre-Approved
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4 text-xs">
                    <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                      <span className="text-[10px] text-slate-400 block">Base Rate</span>
                      <strong className="text-white text-sm font-mono">$215 / sq.ft</strong>
                      <span className="text-[10px] text-slate-500 block">$473,000</span>
                    </div>
                    <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                      <span className="text-[10px] text-slate-400 block">Floor Rise (14th Flr)</span>
                      <strong className="text-teal-400 text-sm font-mono">+$7,000</strong>
                      <span className="text-[10px] text-slate-500 block">+$500/floor rate</span>
                    </div>
                    <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                      <span className="text-[10px] text-slate-400 block">Parkview Corner PLC</span>
                      <strong className="text-teal-400 text-sm font-mono">+$15,000</strong>
                      <span className="text-[10px] text-slate-500 block">Premium corner facing</span>
                    </div>
                    <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                      <span className="text-[10px] text-slate-400 block">Total Agreement Cost</span>
                      <strong className="text-amber-400 text-sm font-mono">$510,000</strong>
                      <span className="text-[10px] text-slate-500 block">Taxes & Amenities Incl.</span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700 flex items-center justify-between text-xs text-slate-300">
                    <span>
                      Milestone schedule automatically formatted: <strong>10% Booking • 10% Foundation • 80% Construction Linked</strong>
                    </span>
                    <button className="px-3 py-1.5 bg-[#3478C9] hover:bg-blue-600 text-white rounded-lg font-bold text-xs flex items-center gap-1.5 shadow">
                      <Download size={13} />
                      <span>Download PDF Cost Sheet</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* SCENE 4: Direct-to-Bank Milestone Maintenance Ledger */}
            {activeSceneIndex === 3 && (
              <div className="animate-in fade-in duration-500 space-y-4">
                <div className="bg-slate-900/90 border border-slate-700 rounded-2xl p-5 shadow-2xl backdrop-blur-md">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-white text-base">Direct-to-Bank Accounting & Milestone Ledger</h4>
                        <span className="text-[10px] font-bold bg-teal-950 text-teal-400 border border-teal-800 px-2 py-0.5 rounded-full">
                          Audit Trail Ledger
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Booking #BK-2026-9021 • Unit 1402 • Builder RERA Escrow Account
                      </p>
                    </div>
                    <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-800">
                      Realized: $102,000 / $510,000
                    </span>
                  </div>

                  <div className="space-y-2 my-4">
                    <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 flex items-center justify-between text-xs">
                      <div>
                        <strong className="text-white block">Milestone 1: Booking Advance (10%)</strong>
                        <span className="text-slate-400 text-[11px]">
                          RTGS UTR #HDFC009218201 • State Bank of India • Deposited to RERA Escrow
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-emerald-400 font-bold font-mono">$51,000</span>
                        <span className="block text-[10px] font-bold text-emerald-500">Realized & Stamped</span>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 flex items-center justify-between text-xs">
                      <div>
                        <strong className="text-white block">Milestone 2: Plinth Completion (10%)</strong>
                        <span className="text-slate-400 text-[11px]">
                          Cheque #881920 Clearance • ICICI Bank • Deposited Oct 28
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-emerald-400 font-bold font-mono">$51,000</span>
                        <span className="block text-[10px] font-bold text-emerald-500">Realized & Stamped</span>
                      </div>
                    </div>

                    <div className="p-3 bg-amber-950/50 rounded-xl border border-amber-800/80 flex items-center justify-between text-xs">
                      <div>
                        <strong className="text-amber-300 block">Milestone 3: 5th Floor Slab Cast (15%)</strong>
                        <span className="text-amber-200 text-[11px]">Demand Notice Dispatched via WhatsApp & Email</span>
                      </div>
                      <div className="text-right">
                        <span className="text-amber-400 font-bold font-mono">$76,500</span>
                        <span className="block text-[10px] font-bold text-amber-300">Due in 14 Days</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-emerald-950/70 border border-emerald-800 rounded-xl flex items-center justify-between text-xs text-emerald-200">
                    <div className="flex items-center gap-2">
                      <Receipt size={16} className="text-emerald-400" />
                      <span>Official Stamped Receipt #RCP-9021-02 with Verification QR Code ready</span>
                    </div>
                    <span className="px-3 py-1 bg-emerald-600 text-white font-bold rounded-lg text-xs">
                      View Stamped Receipt PDF
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* SCENE 5: Broker Network & Deal Attribution */}
            {activeSceneIndex === 4 && (
              <div className="animate-in fade-in duration-500 space-y-4">
                <div className="bg-slate-900/90 border border-slate-700 rounded-2xl p-5 shadow-2xl backdrop-blur-md">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div>
                      <h4 className="font-bold text-white text-base">Channel Partner & Broker Network Portal</h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Apex Realty Partners (RERA #PRM/KA/RERA/1251/310/AG/18021) • Tier-1 Partner
                      </p>
                    </div>
                    <span className="text-xs font-bold text-purple-400 bg-purple-950 border border-purple-800 px-2.5 py-1 rounded-lg">
                      Brokerage Tier: 2.0%
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4 text-xs">
                    <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                      <span className="text-[10px] text-slate-400 block uppercase">Client Ownership Lock</span>
                      <strong className="text-white text-xs">Buyer Aditya Verma</strong>
                      <span className="text-[10px] text-emerald-400 block">Locked for 90 Days (Anti-Poaching)</span>
                    </div>
                    <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                      <span className="text-[10px] text-slate-400 block uppercase">Earned Commission</span>
                      <strong className="text-amber-400 text-sm font-mono">$10,200</strong>
                      <span className="text-[10px] text-slate-400 block">Based on $510,000 unit</span>
                    </div>
                    <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                      <span className="text-[10px] text-slate-400 block uppercase">Payout Status</span>
                      <strong className="text-emerald-400 text-xs">Approved by Company Admin</strong>
                      <span className="text-[10px] text-slate-400 block">TDS Deducted (5%)</span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700 text-xs text-slate-300 flex items-center justify-between">
                    <span>Brokers have their own private portal to register clients, track deals, and view commission vouchers.</span>
                    <span className="font-bold text-teal-400">Zero Direct Contact Leakage</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Video Scrubber & Playback Controls Bar */}
        <div className="bg-slate-900 px-4 sm:px-6 py-4 border-t border-slate-800 text-white">
          {/* Timeline Range Bar */}
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-mono text-slate-400 w-10 text-right">
              {formatTime(currentSeconds)}
            </span>
            <input
              type="range"
              min="0"
              max={totalDemoSeconds}
              value={currentSeconds}
              onChange={handleSeek}
              className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-400 hover:accent-teal-300"
            />
            <span className="text-xs font-mono text-slate-400 w-10">
              {formatTime(totalDemoSeconds)}
            </span>
          </div>

          {/* Controls Footer */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-9 h-9 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 flex items-center justify-center font-bold shadow-md transition-all"
                title={isPlaying ? 'Pause Demo' : 'Play Demo'}
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
              </button>

              <button
                onClick={() => {
                  setCurrentSeconds(0);
                  setActiveSceneIndex(0);
                  setIsPlaying(true);
                }}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                title="Restart Tour"
              >
                <RotateCcw size={16} />
              </button>

              <div className="h-4 w-px bg-slate-800" />

              {/* Speed Buttons */}
              <div className="flex items-center gap-1 bg-slate-800/80 p-0.5 rounded-lg border border-slate-700 text-[11px] font-mono">
                {[1, 1.5, 2].map((spd) => (
                  <button
                    key={spd}
                    onClick={() => setPlaybackSpeed(spd)}
                    className={`px-2 py-0.5 rounded ${
                      playbackSpeed === spd
                        ? 'bg-teal-500 text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {spd}x
                  </button>
                ))}
              </div>

              {/* Mute Toggle */}
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
            </div>

            {/* Current Active Scene Title */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-300 hidden md:inline">
                {activeScene.title}
              </span>
              <Link
                href="/login"
                className="px-3.5 py-1.5 bg-[#3478C9] hover:bg-blue-600 text-white rounded-lg text-xs font-bold transition-all shadow flex items-center gap-1.5"
              >
                <span>Launch Live Demo</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>

        {/* Feature Highlights Accordion/Checklist */}
        <div className="bg-slate-950 p-4 sm:p-5 border-t border-slate-800/80">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
              <Sparkles size={12} />
              <span>What You Are Seeing In This Chapter:</span>
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Step {activeSceneIndex + 1} of {scenes.length}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
            {activeScene.highlights.map((h, i) => (
              <div key={i} className="flex items-start gap-2 text-slate-300">
                <CheckCircle2 size={14} className="text-teal-400 shrink-0 mt-0.5" />
                <span>{h}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
