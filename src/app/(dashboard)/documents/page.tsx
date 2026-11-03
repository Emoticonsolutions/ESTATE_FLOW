'use client';

import React, { useState } from 'react';
import {
  FolderOpen,
  Plus,
  Search,
  Filter,
  FileText,
  Download,
  Share2,
  Lock,
  Calendar,
  CheckCircle2,
} from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function DocumentsPage() {
  const [categoryFilter, setCategoryFilter] = useState('All');

  const docs = [
    { name: 'RERA_Sanctioned_Master_Plan.pdf', category: 'Project Legal', size: '14.2 MB', date: '2026-08-15', project: 'Falcon City Ph 2' },
    { name: 'Standard_Agreement_For_Sale_Format.docx', category: 'Agreements', size: '2.4 MB', date: '2026-09-01', project: 'Falcon City Ph 2' },
    { name: 'PAN_KYC_Deepak_Singhal.pdf', category: 'Customer KYC', size: '1.1 MB', date: '2026-10-20', project: 'Unit A-501' },
    { name: 'Allotment_BK_PRESTIGE_089.pdf', category: 'Allotments', size: '850 KB', date: '2026-10-24', project: 'Unit A-304' },
    { name: 'Receipt_REC_2026_00452.pdf', category: 'Financial Receipts', size: '420 KB', date: '2026-10-24', project: 'Unit A-304' },
    { name: 'Prestige_Sanctuary_Villa_Brochure.pdf', category: 'Brochures', size: '28.5 MB', date: '2026-07-10', project: 'Sanctuary Villas' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-card border border-estate-border shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black text-estate-navy">Secure Documents Vault</h1>
            <span className="text-xs bg-slate-100 text-slate-700 font-bold px-2 py-0.5 rounded-full">
              S3 Signed URLs & KMS Encrypted
            </span>
          </div>
          <p className="text-xs text-estate-muted mt-0.5">
            Customer KYC files, provisional allotment notes, sale deeds, stamped receipts and master plans
          </p>
        </div>

        <button
          onClick={() => alert('Document upload modal initiated.')}
          className="px-4 py-2 bg-estate-blue hover:bg-blue-600 text-white rounded-lg text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
        >
          <Plus size={15} />
          <span>Upload Document</span>
        </button>
      </div>

      {/* Docs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {docs.map((d, idx) => (
          <div
            key={idx}
            className="p-4 bg-white rounded-xl border border-estate-border shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-blue-50 text-estate-blue rounded-xl shrink-0">
                <FileText size={20} />
              </div>
              <div className="overflow-hidden">
                <p className="font-bold text-xs text-slate-900 truncate">{d.name}</p>
                <span className="text-[10px] font-semibold text-estate-teal bg-teal-50 px-2 py-0.2 rounded mt-1 inline-block">
                  {d.category}
                </span>
                <p className="text-[10px] text-slate-400 mt-1">{d.project} • {d.size}</p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-[10px] text-slate-400">{d.date}</span>
              <button
                onClick={() => alert(`Generating signed expiring URL for ${d.name}...`)}
                className="font-bold text-estate-blue hover:underline flex items-center gap-1"
              >
                <Download size={13} /> Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

