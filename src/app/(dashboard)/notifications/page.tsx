'use client';

import React, { useState } from 'react';
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  CreditCard,
  Users,
  Calendar,
  Clock,
  Check,
} from 'lucide-react';

export default function NotificationsPage() {
  const [items, setItems] = useState([
    { id: 1, type: 'booking', title: 'Booking Approved', message: 'Unit A-102 approved by Ananya Deshmukh (VP Sales). Provisional allotment ready.', time: '10 mins ago', read: false },
    { id: 2, type: 'alert', title: 'Follow-up Overdue Warning', message: 'Naveen Jindal (+91 99011 88765) has had no activity for over 48 hours.', time: '2 hours ago', read: false },
    { id: 3, type: 'payment', title: 'Statutory Payment Realized', message: '₹11,80,000 received via UPI for Unit A-102 from Meenakshi Natarajan.', time: 'Yesterday at 17:15', read: true },
    { id: 4, type: 'lead', title: 'New Hot Lead Assigned', message: 'Kavitha & R. Ramesh Babu (+91 98840 99128) assigned to Rohan Sharma from Meta Campaign.', time: '2 days ago', read: true },
    { id: 5, type: 'visit', title: 'VIP Site Visit Scheduled', message: 'Harish Chandra Roy scheduled sample flat visit this Thursday at 3:00 PM.', time: '3 days ago', read: true },
  ]);

  const markAllRead = () => {
    setItems(items.map((i) => ({ ...i, read: true })));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-card border border-estate-border shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black text-estate-navy">System Notifications & Alerts</h1>
            <span className="text-xs bg-red-50 text-red-700 font-bold px-2 py-0.5 rounded-full border border-red-200">
              {items.filter((i) => !i.read).length} Unread
            </span>
          </div>
          <p className="text-xs text-estate-muted mt-0.5">
            Operational reminders, payment realizations, manager approval queues and SLA escalations
          </p>
        </div>

        <button
          onClick={markAllRead}
          className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5"
        >
          <Check size={14} />
          <span>Mark All as Read</span>
        </button>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-card border border-estate-border shadow-sm divide-y divide-estate-border overflow-hidden">
        {items.map((item) => (
          <div
            key={item.id}
            className={`p-4 flex items-start justify-between gap-4 transition-colors text-xs ${
              !item.read ? 'bg-blue-50/30' : 'hover:bg-slate-50'
            }`}
          >
            <div className="flex items-start gap-3.5">
              <div
                className={`p-2 rounded-xl shrink-0 ${
                  item.type === 'booking'
                    ? 'bg-blue-50 text-estate-blue'
                    : item.type === 'alert'
                    ? 'bg-rose-50 text-estate-red'
                    : item.type === 'payment'
                    ? 'bg-emerald-50 text-estate-green'
                    : 'bg-purple-50 text-purple-600'
                }`}
              >
                {item.type === 'booking' && <FileCheck size={18} />}
                {item.type === 'alert' && <AlertTriangle size={18} />}
                {item.type === 'payment' && <CreditCard size={18} />}
                {item.type === 'lead' && <Users size={18} />}
                {item.type === 'visit' && <Calendar size={18} />}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <p className="font-bold text-slate-900 text-sm">{item.title}</p>
                  {!item.read && (
                    <span className="w-2 h-2 rounded-full bg-estate-blue"></span>
                  )}
                </div>
                <p className="text-slate-600 mt-0.5 leading-relaxed">{item.message}</p>
                <span className="text-[10px] text-slate-400 mt-1.5 block font-mono">{item.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

