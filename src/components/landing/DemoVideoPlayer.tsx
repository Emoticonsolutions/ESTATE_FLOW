'use client';

import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  CheckCircle2,
  Sparkles,
  Boxes,
  Calculator,
  MessageSquare,
  Receipt,
  Users,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import Link from 'next/link';

interface Chapter {
  id: string;
  time: string;
  title: string;
  subtitle: string;
  tag: string;
  icon: any;
  color: string;
  screenImage: string;
  featureList: string[];
  description: string;
}

export function DemoVideoPlayer() {
  const chapters: Chapter[] = [
    {
      id: 'lead-pipeline',
      time: '0:00 - 0:45',
      title: 'Omni-Channel Lead Acquisition & Kanban Pipeline',
      subtitle: 'Capturing, deduplicating and advancing leads through 9 visual sales stages',
      tag: 'Leads & Pipeline',
      icon: Users,
      color: 'from-blue-600 to-indigo-700',
      screenImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
      description: 'See how EstateFlow instantly captures inquiries from Meta Lead Ads, Google Ads, and 99acres with zero manual re-entry. Automated duplicate detection flags duplicate mobile numbers across existing company files before routing to active executives via round-robin distribution.',
      featureList: [
        'Instant Meta & Google Ads webhook sync with zero latency',
        'Automatic phone number & email deduplication check',
        '9-stage drag-and-drop Kanban pipeline with real-time value totals',
        '360° lead profiles with activities, calls, visits, and timeline',
      ],
    },
    {
      id: 'tower-inventory',
      time: '0:45 - 1:30',
      title: 'Interactive 3D Visual Tower & Floor Grid',
      subtitle: 'Real-time architectural stacking plan with 72-hr transactional locking',
      tag: 'Live Inventory',
      icon: Boxes,
      color: 'from-emerald-600 to-teal-700',
      screenImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      description: 'Explore the full architectural layout: Company → Project → Tower → Floor → Unit. Color-coded unit tiles clearly indicate Available (Green), Blocked (Orange), Booked (Blue), or Sold (Grey). Placing a 72-hour hold applies transactional database locking, strictly preventing concurrent double-booking by any other sales agent.',
      featureList: [
        'Dual View: Filterable tabular registry and visual tower stacking plan',
        'Color-coded unit statuses: Available, Blocked, Reserved, Booked, Sold',
        'Anti-double-booking concurrency protection with 72-hr auto-expiry',
        'Bulk Excel spreadsheet import with column auto-mapping',
      ],
    },
    {
      id: 'cost-sheets',
      time: '1:30 - 2:15',
      title: 'Dynamic RERA Cost Sheet Calculator & PDF Export',
      subtitle: 'Automated pricing breakdown with floor rise, PLC, amenities, and statutory GST',
      tag: 'Pricing & Costing',
      icon: Calculator,
      color: 'from-indigo-600 to-purple-700',
      screenImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
      description: 'Watch the instant calculation of base property price, floor rise rate, prime location charges (PLC corner/park-facing), covered parking, clubhouse membership, advance maintenance, and statutory 5% GST. Special festival discounts require authorized manager sign-off before generating clean, branded, print-ready PDF cost sheets.',
      featureList: [
        'Automatic base rate, floor rise (₹50k/level), and PLC calculation',
        'Statutory GST (5% under-construction) legal tax compliance',
        'Manager authorization check for festival discounts',
        'One-click PDF generation and WhatsApp estimate sharing',
      ],
    },
    {
      id: 'whatsapp-bot',
      time: '2:15 - 3:00',
      title: 'Automated Meta WhatsApp Cloud API Omnichannel',
      subtitle: 'Pre-approved message templates, automated brochure dispatch, and drip nurturing',
      tag: 'WhatsApp CRM',
      icon: MessageSquare,
      color: 'from-teal-600 to-emerald-700',
      screenImage: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?auto=format&fit=crop&w=1200&q=80',
      description: 'Connect official WhatsApp Business Cloud API to send verified high-resolution brochures, Google Maps pins for site visit confirmations, and milestone demand notes. The visual workflow builder lets you drag-and-drop automated drip sequences triggered by new enquiries or visit completions.',
      featureList: [
        'Official Meta Cloud API verified message templates',
        'Automated brochure, floor plan, and location pin distribution',
        'Visual drip workflow builder with triggers, delays, and stop conditions',
        'Two-way live WhatsApp conversational console linked to Lead 360',
      ],
    },
    {
      id: 'milestone-collections',
      time: '3:00 - 3:45',
      title: 'Construction Milestone Collections & Stamped Receipts',
      subtitle: 'RERA 10:10:15:25:20:20 payment schedules, demand notes, and immutable audit logs',
      tag: 'Billing & Escrow',
      icon: Receipt,
      color: 'from-amber-600 to-orange-700',
      screenImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80',
      description: 'Ensure statutory financial discipline with customizable construction installment schedules (Booking 10%, Agreement 10%, Foundation 15%, Structure 25%, Finishing 20%, Possession 20%). Record RTGS, UPI, cheque or gateway payments with instant generation of officially stamped digital receipts.',
      featureList: [
        'Customizable milestone payment schedules mapped to construction phases',
        'Automated generation and WhatsApp dispatch of demand letters',
        'Official stamped digital receipts with unique receipt numbering',
        'Immutable financial transaction audit trail for statutory compliance',
      ],
    },
  ];

  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(15);

  const activeChapter = chapters[activeChapterIndex];

  // Auto-progress simulation when playing
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveChapterIndex((c) => (c + 1) % chapters.length);
          return 0;
        }
        return prev + 1.2;
      });
    }, 200);
    return () => clearInterval(interval);
  }, [isPlaying, chapters.length]);

  return (
    <div className="bg-[#17324D] rounded-3xl border border-[#244761] shadow-2xl overflow-hidden text-white">
      {/* Video Player Header Bar */}
      <div className="p-4 sm:p-5 border-b border-[#244761] bg-[#14293f] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-rose-500 animate-pulse"></div>
          <div>
            <span className="text-[10px] font-mono text-teal-300 uppercase tracking-widest font-bold">
              Interactive Product Walkthrough Video
            </span>
            <h3 className="text-sm sm:text-base font-extrabold text-white">
              EstateFlow End-to-End Real Estate OS Demo
            </h3>
          </div>
        </div>

        {/* Live Chapter Indicators */}
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
          {chapters.map((ch, idx) => (
            <button
              key={ch.id}
              onClick={() => {
                setActiveChapterIndex(idx);
                setProgress(0);
                setIsPlaying(true);
              }}
              className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all whitespace-nowrap ${
                activeChapterIndex === idx
                  ? 'bg-[#3478C9] text-white shadow'
                  : 'bg-[#244761]/60 text-slate-300 hover:text-white hover:bg-[#244761]'
              }`}
            >
              {idx + 1}. {ch.tag}
            </button>
          ))}
        </div>
      </div>

      {/* Main Video Screen Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
        {/* Left Column: Simulated Video Screen (8 cols) */}
        <div className="lg:col-span-8 relative bg-slate-950 flex flex-col justify-between overflow-hidden group">
          {/* Background Screen Visual */}
          <div className="absolute inset-0">
            <img
              src={activeChapter.screenImage}
              alt={activeChapter.title}
              className="w-full h-full object-cover opacity-35 scale-105 transition-all duration-700 blur-[0.5px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40"></div>
          </div>

          {/* Top Video Overlay: Chapter Tag & Live Watermark */}
          <div className="relative z-10 p-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-bold uppercase tracking-wider backdrop-blur">
                Chapter {activeChapterIndex + 1} of {chapters.length} • {activeChapter.time}
              </span>
            </div>
            <div className="flex items-center gap-2 bg-black/60 backdrop-blur px-2.5 py-1 rounded-lg border border-white/10 text-[11px] text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>1080p 60fps HD</span>
            </div>
          </div>

          {/* Center Playback Overlay with Simulated Animated UI Preview */}
          <div className="relative z-10 p-6 sm:p-8 my-auto">
            <div className="max-w-xl bg-slate-900/90 backdrop-blur-md p-6 rounded-2xl border border-white/15 shadow-2xl">
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 rounded-lg bg-[#3478C9] text-white flex items-center justify-center font-bold">
                  <activeChapter.icon size={18} />
                </div>
                <h4 className="text-base sm:text-lg font-black text-white leading-tight">
                  {activeChapter.title}
                </h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mt-2">
                {activeChapter.description}
              </p>

              {/* Animated UI Pulse Indicator */}
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-teal-300 font-mono">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping"></span>
                  Live System Demonstration
                </span>
                <span>Role: Company Owner / Sales Leader</span>
              </div>
            </div>
          </div>

          {/* Bottom Video Controls Bar */}
          <div className="relative z-10 p-4 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent">
            {/* Scrubber Progress Bar */}
            <div className="w-full bg-slate-700/60 h-1.5 rounded-full overflow-hidden mb-3 cursor-pointer">
              <div
                className="bg-gradient-to-r from-[#3478C9] via-teal-400 to-[#16A36A] h-full transition-all duration-200"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-300">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-8 h-8 rounded-full bg-white text-slate-950 hover:bg-teal-400 flex items-center justify-center transition-colors shadow"
                  title={isPlaying ? 'Pause Demo' : 'Play Demo'}
                >
                  {isPlaying ? <Pause size={15} /> : <Play size={15} className="ml-0.5" />}
                </button>

                <button
                  onClick={() => {
                    setProgress(0);
                    setIsPlaying(true);
                  }}
                  className="p-1.5 text-slate-400 hover:text-white transition-colors"
                  title="Restart Chapter"
                >
                  <RotateCcw size={15} />
                </button>

                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-1.5 text-slate-400 hover:text-white transition-colors"
                  title={isMuted ? 'Unmute narration' : 'Mute narration'}
                >
                  {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                </button>

                <span className="font-mono text-[11px] text-slate-400">
                  {Math.floor((progress / 100) * 45)}s / 45s
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href="/dashboard"
                  className="px-3 py-1 bg-[#3478C9] hover:bg-blue-600 text-white rounded text-xs font-bold transition-all flex items-center gap-1"
                >
                  <span>Launch Live Screen</span>
                  <ChevronRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Chapter Index & Key Capabilities (4 cols) */}
        <div className="lg:col-span-4 p-5 sm:p-6 bg-[#17324D] border-t lg:border-t-0 lg:border-l border-[#244761] flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#244761] mb-4">
              <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                Video Chapters & Workflows
              </span>
              <span className="text-[10px] bg-[#244761] text-teal-300 font-mono font-bold px-2 py-0.5 rounded">
                5 Key Modules
              </span>
            </div>

            {/* Chapter Selection Accordion / List */}
            <div className="space-y-2">
              {chapters.map((ch, idx) => {
                const isSelected = activeChapterIndex === idx;
                const CIcon = ch.icon;

                return (
                  <button
                    key={ch.id}
                    onClick={() => {
                      setActiveChapterIndex(idx);
                      setProgress(0);
                      setIsPlaying(true);
                    }}
                    className={`w-full p-3 rounded-xl border text-left transition-all flex items-start gap-3 ${
                      isSelected
                        ? 'bg-[#244761] border-[#3478C9] shadow-md'
                        : 'bg-[#14293f]/60 border-transparent hover:bg-[#244761]/40 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-lg shrink-0 flex items-center justify-center font-bold text-xs ${
                        isSelected ? 'bg-[#3478C9] text-white' : 'bg-[#244761] text-slate-300'
                      }`}
                    >
                      <CIcon size={14} />
                    </div>
                    <div className="overflow-hidden leading-snug">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className={isSelected ? 'text-teal-300 font-bold' : 'text-slate-400'}>
                          Chapter {idx + 1}
                        </span>
                        <span className="font-mono text-slate-400">{ch.time}</span>
                      </div>
                      <p className={`text-xs font-bold mt-0.5 truncate ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                        {ch.title}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Key Capabilities for Active Chapter */}
            <div className="mt-5 p-3.5 bg-[#14293f] rounded-xl border border-[#244761]">
              <span className="text-[10px] font-bold text-teal-300 uppercase tracking-wider block mb-2">
                Demonstrated in this Segment:
              </span>
              <div className="space-y-1.5 text-xs text-slate-200">
                {activeChapter.featureList.map((f, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-2">
                    <CheckCircle2 size={13} className="text-[#16A36A] shrink-0 mt-0.5" />
                    <span className="text-[11px] leading-tight">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-[#244761]">
            <Link
              href="/login"
              className="w-full py-2.5 bg-gradient-to-r from-teal-500 to-[#3478C9] hover:from-teal-400 hover:to-blue-500 text-slate-950 font-black rounded-lg text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
            >
              <Sparkles size={14} />
              <span>Log In as Stakeholder & Try It Live →</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

