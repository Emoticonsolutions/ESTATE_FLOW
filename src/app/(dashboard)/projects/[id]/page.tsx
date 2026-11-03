'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ArrowLeft,
  Building2,
  Boxes,
  MapPin,
  ShieldCheck,
  Calendar,
  Users,
  FileCheck,
  Download,
  Share2,
} from 'lucide-react';
import { INITIAL_PROJECTS, INITIAL_TOWERS } from '@/lib/mockData';
import { useTenant } from '@/lib/tenantContext';
import { formatINR } from '@/lib/utils';

export default function ProjectDetailPage() {
  const params = useParams();
  const { leads, bookings, units } = useTenant();
  const projectId = params.id as string;
  const project = INITIAL_PROJECTS.find((p) => p.id === projectId) || INITIAL_PROJECTS[0];

  const [activeTab, setActiveTab] = useState<'overview' | 'towers' | 'pricing' | 'leads' | 'documents'>('overview');

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-card border border-estate-border shadow-sm overflow-hidden">
        <div className="relative h-60 w-full bg-slate-900">
          <img
            src={project.imageUrl}
            alt={project.name}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#17324D] via-[#17324D]/40 to-transparent"></div>

          <div className="absolute top-4 left-4">
            <Link
              href="/projects"
              className="px-3 py-1.5 bg-black/40 hover:bg-black/60 text-white rounded-lg text-xs font-semibold backdrop-blur flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft size={14} /> Back to Projects
            </Link>
          </div>

          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-white">
            <div>
              <span className="text-[10px] bg-teal-500/30 text-teal-300 border border-teal-400/40 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                {project.status}
              </span>
              <h1 className="text-2xl sm:text-3xl font-black mt-1.5">{project.name}</h1>
              <p className="text-xs text-slate-300 flex items-center gap-1.5 mt-1">
                <MapPin size={13} className="text-teal-400" />
                <span>{project.location}, {project.city} • Code: {project.code}</span>
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/inventory"
                className="px-4 py-2 bg-estate-blue hover:bg-blue-600 text-white rounded-lg text-xs font-bold shadow-md flex items-center gap-1.5 transition-all"
              >
                <Boxes size={15} />
                <span>Open Visual Tower Grid</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Tab Header */}
        <div className="flex items-center gap-2 px-6 border-b border-estate-border bg-slate-50/70 text-xs font-bold">
          {['overview', 'towers', 'pricing', 'leads', 'documents'].map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t as any)}
              className={`py-3 px-3.5 border-b-2 uppercase tracking-wider text-[11px] transition-all ${
                activeTab === t
                  ? 'border-estate-blue text-estate-blue bg-white'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6 text-xs">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">RERA Registration</span>
                  <span className="font-bold text-slate-900 font-mono mt-1 block">{project.reraNumber}</span>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Base Rate</span>
                  <span className="font-extrabold text-estate-navy text-sm mt-1 block">₹{project.baseRatePerSqFt} / sq ft</span>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Land Parcel</span>
                  <span className="font-bold text-slate-900 mt-1 block">{project.totalLandArea}</span>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Target Possession</span>
                  <span className="font-bold text-slate-900 mt-1 block">{project.possessionDate}</span>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-slate-800 text-sm mb-2">Amenities & Infrastructure</h3>
                <div className="flex flex-wrap gap-2">
                  {project.amenities.map((amenity) => (
                    <span
                      key={amenity}
                      className="px-3 py-1.5 bg-blue-50 text-[#3478C9] border border-blue-200 rounded-lg text-xs font-semibold"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'towers' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {INITIAL_TOWERS.map((t) => (
                <div key={t.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                  <h4 className="font-bold text-slate-900 text-sm">{t.name}</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">{t.description}</p>
                  <div className="mt-3 pt-3 border-t border-slate-200 text-[11px] text-slate-600 flex justify-between">
                    <span>Floors: <strong>{t.totalFloors}</strong></span>
                    <span>Units / Floor: <strong>{t.unitsPerFloor}</strong></span>
                    <span>Total: <strong>{t.totalUnits}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'pricing' && (
            <div className="space-y-3">
              <h3 className="font-bold text-slate-800 text-sm">Configured Pricing Matrices</h3>
              <p className="text-slate-600">Base Rate: ₹{project.baseRatePerSqFt}/sq ft. Floor Rise: ₹50,000 per level. PLC East/Corner: ₹2,50,000.</p>
              <Link href="/cost-sheets" className="inline-block mt-2 font-bold text-estate-blue hover:underline">
                Open Cost Sheet Generator →
              </Link>
            </div>
          )}

          {activeTab === 'leads' && (
            <div className="space-y-3">
              <p className="text-slate-600">{leads.length} enquiries currently associated with this project.</p>
              <Link href="/leads" className="font-bold text-estate-blue hover:underline">
                View All Enquiries in Lead 360 →
              </Link>
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="space-y-3">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                <span>RERA_Sanction_Plan_Approval.pdf (14.2 MB)</span>
                <span className="text-estate-blue font-bold cursor-pointer">Download</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

