import { NextResponse } from 'next/server';
import { INITIAL_COMPANIES, INITIAL_LEADS, INITIAL_UNITS, INITIAL_BOOKINGS, INITIAL_PAYMENTS } from '@/lib/mockData';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const companyId = searchParams.get('companyId') || 'comp-prestige';

    const leads = INITIAL_LEADS.filter((l) => l.companyId === companyId);
    const units = INITIAL_UNITS.filter((u) => u.companyId === companyId);
    const bookings = INITIAL_BOOKINGS.filter((b) => b.companyId === companyId);
    const payments = INITIAL_PAYMENTS.filter((p) => p.companyId === companyId);

    const totalBooked = bookings.reduce((acc, b) => acc + (b.agreedPrice || 0), 0);
    const totalCollected = payments.reduce((acc, p) => acc + (p.amount || 0), 0);

    return NextResponse.json({
      success: true,
      message: 'Dashboard summary retrieved successfully',
      data: {
        totalLeads: leads.length + 140,
        hotLeads: leads.filter((l) => l.priority === 'Hot').length + 12,
        availableUnits: units.filter((u) => u.status === 'Available').length + 32,
        blockedUnits: units.filter((u) => u.status === 'Blocked').length,
        bookedUnits: bookings.length + 28,
        monthlyBookedValue: totalBooked + 285000000,
        totalCollected: totalCollected + 215000000,
        totalOutstanding: Math.max(0, (totalBooked + 285000000) - (totalCollected + 215000000)),
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Internal Server Error', error: error.message },
      { status: 500 }
    );
  }
}

