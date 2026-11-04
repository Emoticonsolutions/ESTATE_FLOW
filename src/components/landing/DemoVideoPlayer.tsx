'use client';

import React, { useState, useRef, useEffect } from 'react';
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
  Film,
  CheckCircle2,
  Lock,
  ExternalLink,
  ArrowRight,
  Upload,
  Link as LinkIcon,
  Video,
} from 'lucide-react';
import Link from 'next/link';

interface VideoChapter {
  title: string;
  tag: string;
  timeSeconds: number;
  timeLabel: string;
  moduleUrl: string;
  desc: string;
}

export function DemoVideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(135); // 2:15 default duration
  const [isMuted, setIsMuted] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);
  const [videoSrc, setVideoSrc] = useState<string>('/videos/demo.mp4');
  const [hasCustomVideo, setHasCustomVideo] = useState(false);
  const [inputUrl, setInputUrl] = useState('');
  const [showUrlModal, setShowUrlModal] = useState(false);

  const chapters: VideoChapter[] = [
    {
      title: 'Stakeholder Login & Lead 360 Ingestion',
      tag: 'Lead Capture',
      timeSeconds: 0,
      timeLabel: '0:00',
      moduleUrl: '/leads',
      desc: 'Automatic lead ingestion from Meta Ads & Google with instant duplicate phone detection.',
    },
    {
      title: '3D Tower Inventory Stacking & 72-Hour Hold',
      tag: '72h Unit Lock',
      timeSeconds: 30,
      timeLabel: '0:30',
      moduleUrl: '/inventory',
      desc: 'Interactive floor grid with live availability and 72-hour transactional anti-conflict locking.',
    },
    {
      title: 'Dynamic Cost Sheet Calculation & PDF Export',
      tag: 'Cost Sheet',
      timeSeconds: 65,
      timeLabel: '1:05',
      moduleUrl: '/cost-sheets',
      desc: 'Base rate, floor rise ($500/flr), and corner PLC calculation with instant PDF quotation.',
    },
    {
      title: 'Direct-to-Bank Realization & Stamped Receipts',
      tag: 'Bank Ledger',
      timeSeconds: 95,
      timeLabel: '1:35',
      moduleUrl: '/collections',
      desc: 'Recording RTGS/Cheque deposits into builder escrow accounts with verified stamped receipts.',
    },
    {
      title: 'Broker Network & 90-Day Anti-Poaching Lock',
      tag: 'Broker Portal',
      timeSeconds: 120,
      timeLabel: '2:00',
      moduleUrl: '/brokers',
      desc: 'Channel partner registration, buyer ownership tagging, and commission payout statements.',
    },
  ];

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {
        // Fallback if browser blocks autoplay or file not loaded yet
        setIsPlaying(true);
      });
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const curr = videoRef.current.currentTime;
    setCurrentTime(curr);
    if (videoRef.current.duration) {
      setDuration(videoRef.current.duration);
    }

    // Update active chapter
    for (let i = chapters.length - 1; i >= 0; i--) {
      if (curr >= chapters[i].timeSeconds) {
        setActiveChapter(i);
        break;
      }
    }
  };

  const handleSeek = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = seconds;
      setCurrentTime(seconds);
    }
  };

  const handleApplyUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputUrl.trim()) {
      setVideoSrc(inputUrl.trim());
      setHasCustomVideo(true);
      setShowUrlModal(false);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.load();
          videoRef.current.play().catch(() => {});
          setIsPlaying(true);
        }
      }, 300);
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="w-full">
      {/* Chapter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex flex-wrap items-center gap-2">
          {chapters.map((ch, idx) => {
            const isActive = activeChapter === idx;
            return (
              <button
                key={idx}
                onClick={() => {
                  setActiveChapter(idx);
                  handleSeek(ch.timeSeconds);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
                  isActive
                    ? 'bg-[#17324D] text-white border-[#17324D] shadow-sm ring-2 ring-teal-400/20'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span
                  className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-mono ${
                    isActive ? 'bg-teal-400 text-slate-950 font-bold' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {idx + 1}
                </span>
                <span>{ch.tag}</span>
                <span className="text-[10px] opacity-70 font-mono">({ch.timeLabel})</span>
              </button>
            );
          })}
        </div>

        {/* Change Video Source / Upload Button */}
        <button
          onClick={() => setShowUrlModal(true)}
          className="text-xs font-bold text-slate-600 hover:text-[#17324D] bg-white border border-slate-200 hover:border-slate-300 px-3 py-1.5 rounded-xl shadow-xs flex items-center gap-1.5 transition-all"
        >
          <Video size={13} className="text-teal-600" />
          <span>{hasCustomVideo ? 'Change Video Source' : 'Link Your Recorded Video (.mp4)'}</span>
        </button>
      </div>

      {/* Main Video Frame */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl overflow-hidden relative group">
        {/* Top Browser Bar */}
        <div className="bg-slate-900 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-3 text-[11px] font-mono text-slate-400 hidden sm:inline">
              estateflow-eta.vercel.app/demo-walkthrough
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] font-bold text-teal-400 bg-teal-950/80 border border-teal-800 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping" />
              <span>Full Screen Software Demo</span>
            </span>

            <Link
              href={chapters[activeChapter].moduleUrl}
              className="text-xs text-slate-300 hover:text-white flex items-center gap-1 bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded-lg transition-colors border border-slate-700"
            >
              <span>Test Live Screen</span>
              <ExternalLink size={12} />
            </Link>
          </div>
        </div>

        {/* Real HTML5 Video Player Container */}
        <div className="relative aspect-video w-full bg-slate-950 flex items-center justify-center overflow-hidden">
          <video
            ref={videoRef}
            src={videoSrc}
            onTimeUpdate={handleTimeUpdate}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
            playsInline
            controls={false}
            className="w-full h-full object-cover"
            onError={() => {
              // Video file not yet mounted, keep poster view active
            }}
          />

          {/* Fallback / Initial Video Presentation Overlay */}
          {!hasCustomVideo && (
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900/90 to-slate-950 flex flex-col items-center justify-center text-center p-6 sm:p-10 z-10">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-teal-500 to-[#3478C9] text-white flex items-center justify-center shadow-2xl shadow-teal-500/30 mb-5 group-hover:scale-105 transition-transform cursor-pointer"
                onClick={togglePlay}
              >
                {isPlaying ? <Pause size={32} /> : <Play size={32} className="ml-1" />}
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950 text-teal-300 border border-teal-800 text-xs font-bold mb-3">
                <Sparkles size={13} />
                <span>Real Screen Recording Ready</span>
              </div>

              <h3 className="text-xl sm:text-3xl font-black text-white max-w-xl tracking-tight">
                EstateFlow Platform Demo Walkthrough
              </h3>

              <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-lg leading-relaxed">
                Watch the genuine screen recording showing lead acquisition, 3D floor stacking, 72-hour unit hold, instant cost sheet generation, and direct bank milestone ledgers.
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs">
                <button
                  onClick={() => setShowUrlModal(true)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold border border-slate-700 flex items-center gap-2 transition-all shadow"
                >
                  <Upload size={14} className="text-teal-400" />
                  <span>Attach Your Recorded MP4 Video</span>
                </button>

                <Link
                  href="/login"
                  className="px-4 py-2 bg-gradient-to-r from-teal-500 to-[#3478C9] text-white rounded-xl font-bold flex items-center gap-1.5 shadow"
                >
                  <span>Experience Platform Live</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          )}

          {/* Play/Pause Center Overlay on Hover */}
          {hasCustomVideo && (
            <button
              onClick={togglePlay}
              className={`absolute inset-0 w-full h-full flex items-center justify-center bg-black/30 transition-opacity ${
                isPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-100'
              }`}
            >
              <div className="w-16 h-16 rounded-full bg-teal-500/90 text-slate-950 flex items-center justify-center shadow-2xl backdrop-blur-sm">
                {isPlaying ? <Pause size={28} /> : <Play size={28} className="ml-1" />}
              </div>
            </button>
          )}
        </div>

        {/* Video Scrubber & Playback Controls Bar */}
        <div className="bg-slate-900 px-4 sm:px-6 py-3.5 border-t border-slate-800 text-white">
          {/* Seek Bar */}
          <div className="flex items-center gap-3 mb-2.5">
            <span className="text-xs font-mono text-slate-400 w-10 text-right">
              {formatTime(currentTime)}
            </span>
            <input
              type="range"
              min="0"
              max={duration || 135}
              value={currentTime}
              onChange={(e) => handleSeek(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-400 hover:accent-teal-300"
            />
            <span className="text-xs font-mono text-slate-400 w-10">
              {formatTime(duration)}
            </span>
          </div>

          {/* Controls Footer */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className="w-8 h-8 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 flex items-center justify-center font-bold shadow transition-all"
              >
                {isPlaying ? <Pause size={15} /> : <Play size={15} className="ml-0.5" />}
              </button>

              <button
                onClick={() => handleSeek(0)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                title="Restart"
              >
                <RotateCcw size={15} />
              </button>

              <button
                onClick={() => {
                  if (videoRef.current) {
                    videoRef.current.muted = !isMuted;
                    setIsMuted(!isMuted);
                  }
                }}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-300 font-semibold hidden md:inline">
                {chapters[activeChapter].title}
              </span>
              <span className="font-mono text-teal-400 text-[11px] bg-slate-800 px-2 py-0.5 rounded">
                Chapter {activeChapter + 1}/5
              </span>
            </div>
          </div>
        </div>

        {/* Current Chapter Description Bar */}
        <div className="bg-slate-950 p-4 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div>
            <strong className="text-white block font-semibold">
              {chapters[activeChapter].title}
            </strong>
            <p className="text-slate-400 text-[11px] mt-0.5">
              {chapters[activeChapter].desc}
            </p>
          </div>

          <Link
            href={chapters[activeChapter].moduleUrl}
            className="shrink-0 px-3.5 py-1.5 bg-[#3478C9] hover:bg-blue-600 text-white rounded-lg font-bold text-xs flex items-center gap-1.5 transition-all shadow"
          >
            <span>Launch Live in CRM</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>

      {/* Modal: Attach Your Recorded Video Link */}
      {showUrlModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-in zoom-in-95">
            <div className="flex items-center gap-2 text-teal-600 text-xs font-bold uppercase tracking-wider mb-1">
              <Video size={14} />
              <span>Use Your Real Screen Recording</span>
            </div>
            <h3 className="text-xl font-black text-[#17324D]">
              Attach Your Recorded Video
            </h3>
            <p className="text-xs text-slate-600 mt-1 mb-5 leading-relaxed">
              You can connect any direct video URL (e.g. an MP4 hosted on Cloudinary, AWS S3, Vercel Blob, Loom, or placed in <code>public/videos/demo.mp4</code>).
            </p>

            <form onSubmit={handleApplyUrl} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Video URL or Relative File Path
                </label>
                <div className="relative">
                  <LinkIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="https://.../my-estateflow-recording.mp4 or /videos/demo.mp4"
                    required
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-mono focus:outline-none focus:ring-1 focus:ring-[#3478C9]"
                  />
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Tip: If you placed the video file in <code>public/videos/demo.mp4</code>, just enter <code>/videos/demo.mp4</code>.
                </span>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowUrlModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-[#3478C9] hover:bg-blue-600 shadow"
                >
                  Save & Play Video
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
