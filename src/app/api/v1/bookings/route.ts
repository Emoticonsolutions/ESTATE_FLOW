import { NextResponse } from 'next/server';
import { INITIAL_BOOKINGS } from '@/lib/mockData';

export async function GET() {
  return NextResponse.json({
    success: true,
    data: INITIAL_BOOKINGS,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const newBooking = {
      id: `book-${Date.now()}`,
      bookingNumber: `BK-PRESTIGE-2026-${Math.floor(100 + Math.random() * 900)}`,
      customerName: body.customerName,
      unitNumber: body.unitNumber,
      agreedPrice: Number(body.agreedPrice),
      bookingAmount: Number(body.bookingAmount),
      status: 'Pending Approval',
      bookingDate: new Date().toISOString().split('T')[0],
      allotmentLetterGenerated: false,
    };

    return NextResponse.json({
      success: true,
      message: 'Booking request created and submitted for manager approval',
      data: newBooking,
    }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: 'Booking creation failed', error: err.message },
      { status: 400 }
    );
  }
}

