'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Building2,
  Plus,
  MapPin,
  Calendar,
  Layers,
  Boxes,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  X,
} from 'lucide-react';
import { INITIAL_PROJECTS } from '@/lib/mockData';
import { useTenant } from '@/lib/tenantContext';
import { formatINR } from '@/lib/utils';
import { Project } from '@/types';

export default function ProjectsPage() {
  const { currentCompany, hasPermission } = useTenant();
  const [projectsList, setProjectsList] = useState<Project[]>(INITIAL_PROJECTS);
  const [showAddModal, setShowAddModal] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    code: '',
    builderName: currentCompany.name,
    category: 'Residential' as const,
    type: 'High-Rise Apartments' as const,
    location: '',
    city: currentCompany.city,
    state: 'Karnataka',
    pincode: '560001',
    reraNumber: 'PRM/KA/RERA/1251/310/PR/2026',
    launchDate: '2024-06-01',
    possessionDate: '2027-12-31',
    status: 'Under Construction' as const,
    totalLandArea: '12.0 Acres',
    amenities: ['Clubhouse', 'Swimming Pool', 'EV Charging', 'Jogging Track'],
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    totalTowers: 3,
    totalUnits: 72,
    availableUnits: 45,
    bookedUnits: 27,
    blockedUnits: 0,
    baseRatePerSqFt: 8500,
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const newProj: Project = {
      ...formData,
      id: `proj-${Date.now()}`,
      companyId: currentCompany.id,
    };
    setProjectsList([newProj, ...projectsList]);
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-card border border-estate-border shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black text-estate-navy">Project Portfolio</h1>
            <span className="text-xs bg-slate-100 text-slate-700 font-bold px-2 py-0.5 rounded-full">
              {projectsList.length} Active Developments
            </span>
          </div>
          <p className="text-xs text-estate-muted mt-0.5">
            Manage high-rise towers, gated villa communities, RERA registrations and master plans
          </p>
        </div>

        {hasPermission('projects', 'create') && (
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-estate-blue hover:bg-blue-600 text-white rounded-lg text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
          >
            <Plus size={15} />
            <span>Add New Project</span>
          </button>
        )}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projectsList.map((project) => {
          const bookedPercent = Math.round((project.bookedUnits / project.totalUnits) * 100);

          return (
            <div
              key={project.id}
              className="bg-white rounded-card border border-estate-border shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Project Image & Badge */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <img
                    src={project.imageUrl}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#17324D]/90 backdrop-blur text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {project.status}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur text-estate-navy text-xs font-black px-2.5 py-1 rounded-md shadow-sm">
                    From {formatINR(project.baseRatePerSqFt * 1400, true)}
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h2 className="font-extrabold text-base text-estate-navy leading-snug">
                        {project.name}
                      </h2>
                      <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-1">
                        <MapPin size={12} className="text-estate-blue shrink-0" />
                        <span className="truncate">{project.location}, {project.city}</span>
                      </p>
                    </div>
                    <span className="text-[10px] font-mono bg-slate-100 px-2 py-0.5 rounded font-bold text-slate-600 shrink-0">
                      {project.code}
                    </span>
                  </div>

                  {/* RERA Badge */}
                  <div className="mt-3 p-2 bg-emerald-50/70 border border-emerald-200 rounded-lg text-[10px] text-emerald-800 flex items-center gap-1.5">
                    <ShieldCheck size={14} className="text-[#16A36A] shrink-0" />
                    <span className="truncate">RERA: <strong className="font-mono">{project.reraNumber}</strong></span>
                  </div>

                  {/* Metrics grid */}
                  <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-100 text-center text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Towers</span>
                      <strong className="text-slate-800 text-sm">{project.totalTowers}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Units</span>
                      <strong className="text-slate-800 text-sm">{project.totalUnits}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Available</span>
                      <strong className="text-[#16A36A] text-sm">{project.availableUnits}</strong>
                    </div>
                  </div>

                  {/* Booking progress */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-[11px] font-medium text-slate-500 mb-1">
                      <span>Inventory Absorbed</span>
                      <strong className="text-estate-blue">{bookedPercent}% Booked</strong>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-[#3478C9] to-[#159D91] h-full rounded-full"
                        style={{ width: `${bookedPercent}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Card Actions */}
              <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between text-xs">
                <Link
                  href="/inventory"
                  className="font-bold text-estate-blue hover:underline flex items-center gap-1"
                >
                  <Boxes size={14} />
                  <span>Visual Tower Grid</span>
                </Link>

                <Link
                  href={`/projects/${project.id}`}
                  className="px-3 py-1.5 bg-white border border-slate-300 hover:border-estate-blue text-slate-800 rounded-lg font-bold shadow-sm transition-all flex items-center gap-1"
                >
                  <span>Project 360</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Project Modal Dialog */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-estate-border">
            <div className="flex items-center justify-between pb-4 border-b border-estate-border">
              <h3 className="font-black text-base text-estate-navy">Launch New Real Estate Project</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreate} className="mt-4 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Project Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Prestige Willow Tree"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-input"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Project Code *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. PWT-BLR"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-input uppercase font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Property Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-input"
                  >
                    <option value="High-Rise Apartments">High-Rise Apartments</option>
                    <option value="Luxury Villas">Luxury Villas</option>
                    <option value="Gated Community">Gated Community</option>
                    <option value="Plotted Development">Plotted Development</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">RERA Number</label>
                  <input
                    type="text"
                    value={formData.reraNumber}
                    onChange={(e) => setFormData({ ...formData, reraNumber: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-input font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Base Rate (₹ / sq ft)</label>
                  <input
                    type="number"
                    value={formData.baseRatePerSqFt}
                    onChange={(e) => setFormData({ ...formData, baseRatePerSqFt: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-input"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Location & Address</label>
                <input
                  type="text"
                  placeholder="e.g. Near Vidyaranyapura Main Road, Bangalore North"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-input"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-estate-blue text-white rounded-lg font-bold shadow-md hover:bg-blue-600"
                >
                  Publish Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

