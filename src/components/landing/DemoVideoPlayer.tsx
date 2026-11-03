'use client';

import React, { useState } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
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
} from 'lucide-react';
import Link from 'next/link';

interface DemoVideoOption {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  badge: string;
  embedUrl: string;
  youtubeId: string;
  description: string;
  keyHighlights: string[];
}

interface VideoChapter {
  time: string;
  seconds: number;
  title: string;
  description: string;
  tag: string;
  targetModuleUrl: string;
  moduleName: string;
}

export function DemoVideoPlayer() {
  const videoOptions: DemoVideoOption[] = [
    {
      id: 'full-crm-tour',
      title: 'Full Real Estate CRM & Builder ERP Platform Tour',
      subtitle: 'Complete walkthrough: Lead 360, Kanban pipeline, property matching, and team follow-up management',
      duration: '14:20',
      badge: 'Comprehensive Tour',
      embedUrl: 'https://www.youtube-nocookie.com/embed/m7GwPgox1Ks?rel=0&modestbranding=1&playsinline=1',
      youtubeId: 'm7GwPgox1Ks',
      description: 'Comprehensive software walkthrough covering multi-source lead ingestion, duplicate phone detection, automated executive assignment, site visit scheduling, and live conversion dashboards.',
      keyHighlights: [
        'Multi-tenant developer and builder architecture',
        'Automatic phone number & email deduplication',
        'Visual 9-stage lead conversion Kanban pipeline',
        'Site visit tour feedback and follow-up reminders',
      ],
    },
    {
      id: 'pipeline-automation',
      title: 'Omni-Channel Lead Acquisition & Meta Lead Ads Integration',
      subtitle: 'Capturing, scoring, and automatically routing incoming inquiries with WhatsApp automation',
      duration: '8:45',
      badge: 'Leads & Automation',
      embedUrl: 'https://www.youtube-nocookie.com/embed/PUYh4y2wH9s?rel=0&modestbranding=1&playsinline=1',
      youtubeId: 'PUYh4y2wH9s',
      description: 'Watch how inquiries from Meta Lead Ads, Google Ads, and realty portals flow into the system instantly without latency, triggering automated WhatsApp welcome sequences and assigning executives via round-robin.',
      keyHighlights: [
        'Instant Meta Lead Ads webhook synchronization',
        'AI Lead Intent scoring (0-100 cold to hot)',
        'Round-robin and project-based lead distribution',
        'WhatsApp Business Cloud API drip campaigns',
      ],
    },
    {
      id: 'inventory-costing',
      title: 'Tower Floor Stacking Grid, 72-Hr Locking & Cost Sheet Engine',
      subtitle: 'Real-time unit availability, anti-double-booking concurrency lock, and dynamic RERA pricing',
      duration: '6:15',
      badge: 'Inventory & Costing',
      embedUrl: 'https://www.youtube-nocookie.com/embed/m7GwPgox1Ks?start=180&rel=0&modestbranding=1&playsinline=1',
      youtubeId: 'm7GwPgox1Ks',
      description: 'Explore the architectural tower stacking plan. Color-coded unit statuses (Available, Blocked, Booked, Sold) prevent concurrent double-booking with 72-hour transactional holds, followed by one-click RERA cost sheet calculation.',
      keyHighlights: [
        'Color-coded unit stacking: Available, Blocked, Booked, Sold',
        '72-hour transactional database lock preventing double-booking',
        'Automatic base rate, floor rise (₹50k/flr), and PLC calculation',
        'Provisional allotment letters and printable PDF cost sheets',
      ],
    },
  ];

  const [selectedVideo, setSelectedVideo] = useState<DemoVideoOption>(videoOptions[0]);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const chapters: VideoChapter[] = [
    {
      time: '0:00',
      seconds: 0,
      title: 'Lead 360 & Duplicate Detection',
      description: 'Captures inquiries from Meta, Google, and 99acres with zero manual entry. Flags duplicate phone numbers across existing company files.',
      tag: 'Leads',
      targetModuleUrl: '/leads',
      moduleName: 'Open Lead 360',
    },
    {
      time: '2:45',
      seconds: 165,
      title: 'Tower Floor Stacking & 72-Hr Locking',
      description: 'Interactive architectural unit grid. Placing a hold locks the unit in the database, strictly preventing double-booking by any broker.',
      tag: 'Inventory',
      targetModuleUrl: '/inventory',
      moduleName: 'Open Tower Inventory',
    },
    {
      time: '5:30',
      seconds: 330,
      title: 'Dynamic RERA Cost Sheet Calculator',
      description: 'Calculates base price, floor rise rate, PLC, car parking, clubhouse charges, and statutory 5% GST with manager discount approval.',
      tag: 'Cost Sheets',
      targetModuleUrl: '/cost-sheets',
      moduleName: 'Open Cost Calculator',
    },
    {
      time: '8:15',
      seconds: 495,
      title: 'Milestone Collections & Stamped Receipts',
      description: 'Construction-linked 10:10:15:25:20:20 payment schedules, automated demand notices, and instantly generated official stamped receipts.',
      tag: 'Collections',
      targetModuleUrl: '/collections',
      moduleName: 'Open Collections',
    },
    {
      time: '11:00',
      seconds: 660,
      title: 'Channel Partner & Broker Payouts',
      description: 'RERA accredited broker directory, deal attribution pipeline, tiered brokerage rates, and manager approval for commission payouts.',
      tag: 'Brokers',
      targetModuleUrl: '/brokers',
      moduleName: 'Open Broker Portal',
    },
  ];

  const handleSelectChapter = (index: number) => {
    setActiveChapterIndex(index);
    const chapter = chapters[index];
    // Reload embed with timestamp
    const baseEmbed = selectedVideo.embedUrl.split('?')[0];
    const newEmbedUrl = `${baseEmbed}?start=${chapter.seconds}&autoplay=1&rel=0&modestbranding=1`;
    setSelectedVideo((prev) => ({
      ...prev,
      embedUrl: newEmbedUrl,
    }));
    setIsPlaying(true);
  };

  const handleSelectVideo = (option: DemoVideoOption) => {
    setSelectedVideo(option);
    setActiveChapterIndex(0);
    setIsPlaying(true);
  };

  return (
    <div className="w-full">
      {/* Video Demo Selection Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex flex-wrap items-center gap-2">
          {videoOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => handleSelectVideo(opt)}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 border ${
                selectedVideo.id === opt.id
                  ? 'bg-[#17324D] text-white border-[#17324D] shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              <Film size={14} className={selectedVideo.id === opt.id ? 'text-teal-400' : 'text-slate-400'} />
              <span>{opt.badge}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                selectedVideo.id === opt.id ? 'bg-slate-700/80 text-teal-300' : 'bg-slate-100 text-slate-500'
              }`}>
                {opt.duration}
              </span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>1080p Real Video Stream</span>
        </div>
      </div>

      {/* Main Video Frame Container */}
      <div className="rounded-2xl border border-slate-700 bg-slate-950 shadow-2xl overflow-hidden">
        {/* macOS Browser Chrome Header */}
        <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-rose-500 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
            <span className="ml-3 text-[11px] font-mono text-slate-400 hidden sm:inline">
              estateflow.io/live-demo/{selectedVideo.id}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] font-bold text-teal-400 bg-teal-950/80 border border-teal-800 px-2 py-0.5 rounded-full flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping"></span>
              Live Product Demonstration
            </span>
            <a
              href={`https://www.youtube.com/watch?v=${selectedVideo.youtubeId}`}
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-white text-xs flex items-center gap-1 transition-colors"
              title="Watch on YouTube"
            >
              <ExternalLink size={13} />
              <span className="hidden md:inline">Open on YouTube</span>
            </a>
          </div>
        </div>

        {/* Video Player (16:9 Aspect Ratio) */}
        <div className="relative aspect-video w-full bg-black">
          <iframe
            src={selectedVideo.embedUrl}
            title={selectedVideo.title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        {/* Video Info Bar */}
        <div className="bg-slate-900/95 p-4 sm:p-5 border-t border-slate-800 text-white">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-600/30 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded">
                  {selectedVideo.badge}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-white">{selectedVideo.title}</h3>
              </div>
              <p className="text-xs text-slate-400 mt-1">{selectedVideo.subtitle}</p>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#159D91] hover:bg-teal-600 text-white rounded-lg text-xs font-bold shadow-md transition-all shrink-0"
              >
                <span>Book a Live Demo</span>
                <ChevronRight size={14} />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 rounded-lg text-xs font-bold transition-all shrink-0"
              >
                <Lock size={13} className="text-slate-400" />
                <span>Stakeholder Login</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Timestamp Chapter Bookmarks */}
      <div className="mt-6 bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-3">
          <div>
            <h4 className="text-xs font-bold text-[#17324D] uppercase tracking-wider">
              Interactive Chapter Jump Links
            </h4>
            <p className="text-[11px] text-slate-500">
              Click any section below to seek the video to that exact feature timestamp:
            </p>
          </div>
          <span className="text-[10px] bg-slate-100 text-slate-600 font-semibold px-2 py-0.5 rounded">
            5 Chapters Available
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
          {chapters.map((ch, idx) => (
            <button
              key={ch.title}
              onClick={() => handleSelectChapter(idx)}
              className={`p-3 text-left rounded-lg border transition-all flex flex-col justify-between ${
                activeChapterIndex === idx
                  ? 'bg-blue-50/80 border-[#3478C9] shadow-xs ring-1 ring-[#3478C9]'
                  : 'bg-slate-50/60 border-slate-200 hover:bg-slate-100/70 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                  activeChapterIndex === idx ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  {ch.time}
                </span>
                <span className="text-[10px] font-semibold text-slate-500">{ch.tag}</span>
              </div>
              <p className={`text-xs font-bold line-clamp-1 ${
                activeChapterIndex === idx ? 'text-[#17324D]' : 'text-slate-700'
              }`}>
                {ch.title}
              </p>
            </button>
          ))}
        </div>

        {/* Selected Chapter Details Card */}
        <div className="mt-4 p-4 rounded-lg bg-slate-50 border border-slate-200/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#17324D]">
                Chapter {activeChapterIndex + 1}: {chapters[activeChapterIndex].title}
              </span>
              <span className="text-[10px] font-mono text-[#3478C9] bg-blue-100 px-1.5 py-0.2 rounded font-bold">
                At {chapters[activeChapterIndex].time}
              </span>
            </div>
            <p className="text-xs text-slate-600">
              {chapters[activeChapterIndex].description}
            </p>
          </div>

          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-100 text-[#17324D] border border-slate-200 rounded-lg text-xs font-bold transition-all shadow-xs shrink-0"
          >
            <Lock size={12} className="text-slate-500" />
            <span>Login to Access {chapters[activeChapterIndex].tag}</span>
            <ExternalLink size={12} />
          </Link>
        </div>
      </div>
    </div>
  );
}
