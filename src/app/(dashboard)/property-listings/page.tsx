'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Home,
  Plus,
  Search,
  Filter,
  MapPin,
  Share2,
  Download,
  Building,
  CheckCircle2,
  Sparkles,
  Bed,
} from 'lucide-react';
import { formatINR } from '@/lib/utils';

export default function PropertyListingsPage() {
  const [filterType, setFilterType] = useState('All');

  const listings = [
    {
      id: 'lst-1',
      title: 'Tower A - 3 BHK Luxury Sky Suite',
      project: 'Prestige Falcon City Ph 2',
      type: 'Residential Apartment',
      location: 'Kanakapura Road, Bangalore',
      carpetArea: '1,420 sq ft',
      price: 14500000,
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
      status: 'Available',
      bhk: '3 BHK',
      facing: 'East Facing',
    },
    {
      id: 'lst-2',
      title: 'Sanctuary Presidential Villa Plot 14',
      project: 'Prestige Sanctuary Villas',
      type: 'Luxury Villa',
      location: 'Nandi Hills Road, Devanahalli',
      carpetArea: '3,800 sq ft',
      price: 36000000,
      image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80',
      status: 'Available',
      bhk: '4 BHK',
      facing: 'North-East',
    },
    {
      id: 'lst-3',
      title: 'Tower B - 2 BHK Compact Residence',
      project: 'Prestige Falcon City Ph 2',
      type: 'Residential Apartment',
      location: 'Kanakapura Road, Bangalore',
      carpetArea: '1,080 sq ft',
      price: 11200000,
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
      status: 'Available',
      bhk: '2 BHK',
      facing: 'North Facing',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-card border border-estate-border shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black text-estate-navy">Property Listings Catalog</h1>
            <span className="text-xs bg-teal-50 text-estate-teal font-bold px-2 py-0.5 rounded-full border border-teal-200">
              Public & Broker View
            </span>
          </div>
          <p className="text-xs text-estate-muted mt-0.5">
            Shareable high-resolution inventory listings with floor plans, virtual tours and direct agent assignment
          </p>
        </div>

        <Link
          href="/cost-sheets"
          className="px-4 py-2 bg-estate-blue hover:bg-blue-600 text-white rounded-lg text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
        >
          <Sparkles size={15} />
          <span>Generate Cost Estimate</span>
        </Link>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {listings.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-card border border-estate-border shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="relative h-48 w-full bg-slate-900">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                <span className="absolute top-3 left-3 bg-estate-navy text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {item.bhk}
                </span>
                <span className="absolute bottom-3 right-3 bg-white/95 text-estate-navy text-xs font-extrabold px-2.5 py-1 rounded shadow">
                  {formatINR(item.price, true)}
                </span>
              </div>

              <div className="p-5">
                <h3 className="font-extrabold text-base text-estate-navy leading-snug">{item.title}</h3>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                  <MapPin size={12} className="text-estate-blue" />
                  <span>{item.location}</span>
                </p>

                <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-100 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Carpet Space</span>
                    <strong className="text-slate-800">{item.carpetArea}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Facing</span>
                    <strong className="text-estate-blue">{item.facing}</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
              <Link
                href={`/cost-sheets?price=${item.price}`}
                className="font-bold text-estate-blue hover:underline"
              >
                Cost Breakdown →
              </Link>
              <button
                onClick={() => alert('Listing brochure link copied to clipboard!')}
                className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded"
                title="Share link"
              >
                <Share2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

