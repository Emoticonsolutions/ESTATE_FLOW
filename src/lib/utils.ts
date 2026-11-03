import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { LeadPriority, LeadStatus, UnitStatus, BookingStatus } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Indian Rupee formatting (e.g. ₹75,00,000 or ₹1.25 Cr)
export function formatINR(amount: number, compact = false): string {
  if (isNaN(amount)) return '₹0';
  if (compact) {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    }
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)} L`;
    }
    if (amount >= 1000) {
      return `₹${(amount / 1000).toFixed(1)}k`;
    }
  }

  // Format with standard Indian commas: 12,34,567
  const parts = Math.round(amount).toString().split('.');
  let lastThree = parts[0].substring(parts[0].length - 3);
  const otherNumbers = parts[0].substring(0, parts[0].length - 3);
  if (otherNumbers !== '') {
    lastThree = ',' + lastThree;
  }
  const formatted = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;
  return `₹${formatted}`;
}

export function formatDate(dateString?: string): string {
  if (!dateString) return '-';
  try {
    const d = new Date(dateString);
    return d.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return dateString;
  }
}

export function formatDateTime(dateString?: string): string {
  if (!dateString) return '-';
  try {
    const d = new Date(dateString);
    return d.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return dateString;
  }
}

// Unit status badge styles matching the specification:
// Available: Green #16A36A
// Blocked: Orange #E9A23B
// Booked: Blue #3478C9
// Sold: Grey #7B8794
// Hold: Purple #8965C7
export function getUnitStatusStyle(status: UnitStatus) {
  switch (status) {
    case 'Available':
      return {
        bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        dot: 'bg-[#16A36A]',
        hex: '#16A36A',
        badge: 'bg-[#16A36A] text-white',
      };
    case 'Blocked':
      return {
        bg: 'bg-amber-50 text-amber-700 border-amber-200',
        dot: 'bg-[#E9A23B]',
        hex: '#E9A23B',
        badge: 'bg-[#E9A23B] text-white',
      };
    case 'Reserved':
    case 'On Hold':
      return {
        bg: 'bg-purple-50 text-purple-700 border-purple-200',
        dot: 'bg-[#8965C7]',
        hex: '#8965C7',
        badge: 'bg-[#8965C7] text-white',
      };
    case 'Booked':
      return {
        bg: 'bg-blue-50 text-blue-700 border-blue-200',
        dot: 'bg-[#3478C9]',
        hex: '#3478C9',
        badge: 'bg-[#3478C9] text-white',
      };
    case 'Sold':
      return {
        bg: 'bg-slate-100 text-slate-700 border-slate-300',
        dot: 'bg-[#7B8794]',
        hex: '#7B8794',
        badge: 'bg-[#7B8794] text-white',
      };
    default:
      return {
        bg: 'bg-gray-100 text-gray-700 border-gray-200',
        dot: 'bg-gray-400',
        hex: '#7B8794',
        badge: 'bg-gray-500 text-white',
      };
  }
}

// Lead priority styles:
// Hot: Red #DC5555
// Warm: Orange #E9A23B
// Cold: Blue #3478C9
// Qualified: Green #16A36A
export function getLeadPriorityStyle(priority: LeadPriority) {
  switch (priority) {
    case 'Hot':
      return {
        bg: 'bg-red-50 text-red-700 border-red-200',
        badge: 'bg-[#DC5555] text-white',
        border: 'border-l-4 border-l-[#DC5555]',
      };
    case 'Warm':
      return {
        bg: 'bg-amber-50 text-amber-700 border-amber-200',
        badge: 'bg-[#E9A23B] text-white',
        border: 'border-l-4 border-l-[#E9A23B]',
      };
    case 'Cold':
      return {
        bg: 'bg-blue-50 text-blue-700 border-blue-200',
        badge: 'bg-[#3478C9] text-white',
        border: 'border-l-4 border-l-[#3478C9]',
      };
    case 'Qualified':
      return {
        bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        badge: 'bg-[#16A36A] text-white',
        border: 'border-l-4 border-l-[#16A36A]',
      };
  }
}

export function getLeadStatusColor(status: LeadStatus): string {
  switch (status) {
    case 'New':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'Contacted':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'Qualified':
      return 'bg-teal-100 text-teal-800 border-teal-200';
    case 'Interested':
      return 'bg-indigo-100 text-indigo-800 border-indigo-200';
    case 'Site Visit Scheduled':
      return 'bg-amber-100 text-amber-800 border-amber-200';
    case 'Site Visit Completed':
      return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    case 'Negotiation':
      return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'Booked':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'Lost':
      return 'bg-rose-100 text-rose-800 border-rose-200';
  }
}

export function getBookingStatusStyle(status: BookingStatus) {
  switch (status) {
    case 'Confirmed':
      return 'bg-emerald-50 text-emerald-700 border border-emerald-300 font-medium';
    case 'Approved':
      return 'bg-blue-50 text-blue-700 border border-blue-300 font-medium';
    case 'Pending Approval':
      return 'bg-amber-50 text-amber-700 border border-amber-300 font-medium';
    case 'Draft':
      return 'bg-slate-100 text-slate-700 border border-slate-300 font-medium';
    case 'Cancelled':
    case 'Refunded':
      return 'bg-rose-50 text-rose-700 border border-rose-300 font-medium';
  }
}

